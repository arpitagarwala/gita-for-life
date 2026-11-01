"""One-time compact multilingual static embedding export. No runtime service.
Requires: numpy, safetensors, regex, requests (only download-semantic-source.py).
Run node scripts/prepare-data.mjs first, then this script. Ordinary builds use committed assets.
"""
from pathlib import Path
import json,unicodedata,hashlib,re
import regex
import numpy as np
from safetensors.numpy import load_file
from tokenizers import Tokenizer
REV='73908c3438cf03b6a01bcb9611d62b23d0726f08'
CACHE=Path('.cache/gita-semantic');OUT=Path('public/guidance');OUT.mkdir(parents=True,exist_ok=True)
corpus_bytes=(OUT/'corpus.json').read_bytes();corpus=json.loads(corpus_bytes)
tokenizer=json.loads((CACHE/'tokenizer.json').read_text(encoding='utf-8'))
raw=tokenizer['model']['vocab']
def kind(token):
    letters=token.replace('▁','')
    if not letters:return 'latin'
    has_hindi=False
    for ch in letters:
        if ch.isdigit() or unicodedata.category(ch).startswith('M'):continue
        name=unicodedata.name(ch,'')
        if 'DEVANAGARI' in name:has_hindi=True
        elif 'LATIN' not in name:return None
    return 'hi' if has_hindi else 'latin'
ranked=sorted(enumerate(raw),key=lambda x:(-x[1][1],x[0]))
original=Tokenizer.from_file(str(CACHE/'tokenizer.json'))
mandatory=set()
texts=[d['en']+' '+d['hi'] for d in corpus['documents']]+[p['en']+' '+p['hi'] for p in corpus['passages'].values()]+[Path('src/lib/guidance-engine.ts').read_text(encoding='utf-8')]
for text in texts:
    clean=' '.join(regex.findall(r'[\p{L}\p{M}\p{N}]+',unicodedata.normalize('NFKC',text).lower()))
    mandatory.update(original.encode(clean,add_special_tokens=False).ids)
selected=[];counts={'latin':0,'hi':0}
for index,(token,score) in ranked:
    group=kind(token)
    if group is None:continue
    # Keep frequent subwords and every available character in the supported scripts.
    if counts[group] < (18000 if group=='latin' else 7000) or len(token)==1 or index in mandatory:
        selected.append((index,token,float(score)));counts[group]+=1
selected.sort(key=lambda x:x[0])
print('Selected vocabulary',len(selected),counts,flush=True)
lookup={token:i for i,(_,token,_) in enumerate(selected)}
scores=np.array([score for _,_,score in selected],dtype=np.float64)
maximum=max(map(len,lookup))
def words(text):
    return regex.findall(r'[\p{L}\p{M}\p{N}]+',unicodedata.normalize('NFKC',text).lower())
memo={}
def encode_word(word):
    if word in memo:return memo[word]
    value='▁'+word;length=len(value);best=[-float('inf')]*(length+1);best[0]=0;back=[None]*(length+1)
    for start in range(length):
        if best[start]==-float('inf'):continue
        found=False
        for end in range(start+1,min(length,start+maximum)+1):
            index=lookup.get(value[start:end])
            if index is not None:
                score=best[start]+scores[index]
                if score>best[end]:best[end]=score;back[end]=(start,index)
                found=True
        if not found and best[start]-30>best[start+1]:
            best[start+1]=best[start]-30;back[start+1]=(start,-1)
    ids=[];at=length
    while at:
        part=back[at]
        if part is None:break
        at,index=part
        if index>=0:ids.append(index)
    memo[word]=ids[::-1];return memo[word]
def indices(text):return [i for word in words(text) for i in encode_word(word)]
full=load_file(CACHE/'model.safetensors')['embeddings']
matrix=full[np.array([i for i,_,_ in selected])].astype(np.float32)
# Keep all semantic dimensions; quantize each token independently.
reduced=matrix
scales=np.maximum(np.max(np.abs(reduced),axis=1)/7,1e-12).astype('<f4')
weights=np.clip(np.rint(reduced/scales[:,None]),-7,7).astype('i1')
restored=weights.astype(np.float32)*scales[:,None]
def embed(text):
    ids=indices(text)
    if not ids:return np.zeros(256,dtype=np.float32)
    value=np.mean(restored[ids],axis=0);norm=np.linalg.norm(value)
    return value/max(float(norm),1e-12)
vectors=[]
for doc in corpus['documents']:
    passage=corpus['passages'][doc['passage']]
    en=embed(doc['en']+' '+passage['en'])
    hi=embed(doc['hi']+' '+passage['hi'])
    vectors.append(np.stack([en,hi]))
vectors=np.array(vectors,dtype='<f4')
lexicon=[[token,round(score,6)] for _,token,score in selected]
(OUT/'lexicon.json').write_text(json.dumps(lexicon,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
packed=((weights[:,0::2].astype('i2')+7)|((weights[:,1::2].astype('i2')+7)<<4)).astype('u1')
payload=packed.tobytes();parts=[];chunk=921600
for i,start in enumerate(range(0,len(payload),chunk)):
    name=f'words-{i}.bin';(OUT/name).write_bytes(payload[start:start+chunk]);parts.append(name)
(OUT/'scales.bin').write_bytes(scales.tobytes());vector_scales=np.maximum(np.max(np.abs(vectors),axis=2)/127,1e-12).astype('<f4')
vector_bytes=np.clip(np.rint(vectors/vector_scales[:,:,None]),-127,127).astype('i1')
(OUT/'verses.bin').write_bytes(vector_bytes.tobytes())
(OUT/'verse-scales.bin').write_bytes(vector_scales.tobytes())
manifest={'version':'gita-semantic-1','vocabularySourceSha256':hashlib.sha256(Path('src/lib/guidance-engine.ts').read_bytes()).hexdigest(),'source':{'model':'minishlab/potion-multilingual-128M','revision':REV,'license':'MIT'},'dimensions':256,'rows':len(selected),'documents':len(vectors),'documentVectors':2,'quantization':'q4','vectorScales':'verse-scales.bin','corpusSha256':hashlib.sha256(corpus_bytes).hexdigest(),'lexicon':'lexicon.json','parts':parts,'scales':'scales.bin','vectors':'verses.bin','corpus':'corpus.json'}
(OUT/'manifest.json').write_text(json.dumps(manifest,separators=(',',':')),encoding='utf-8')
fixtures=[{'text':text,'vector':[round(float(x),7) for x in embed(text)]} for text in ['My colleague takes credit for my work','मुझे परीक्षा की चिन्ता है','I am caring for my parents and children','Should I lie to get promoted?','I feel ashamed to ask my teacher a question','How can I give without expecting a reward?']]
(CACHE/'parity-fixtures.json').write_text(json.dumps(fixtures,ensure_ascii=False),encoding='utf-8')
print('Quantization: q4 words, q8 document vectors; all 256 semantic dimensions retained.',flush=True)
print('Exported bytes',sum((OUT/name).stat().st_size for name in ['lexicon.json','scales.bin','verses.bin','verse-scales.bin','manifest.json']+parts),flush=True)
