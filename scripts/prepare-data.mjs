import fs from 'node:fs';import ts from 'typescript';import vm from 'node:vm';
const source=fs.readFileSync('src/data/gita.ts','utf8');
const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const context={exports:{}};vm.runInNewContext(code,context);
const chapters=context.exports.GITA_CHAPTERS;
const verses=chapters.flatMap(c=>c.verses.map(v=>({chapter:c.chapter,verse:v.verse,sanskrit:v.sanskrit,transliteration:v.transliteration,meaning:v.meaning,meaningHindi:v.meaningHindi})));
if(chapters.length!==18||verses.length!==701)throw new Error('Unexpected Gita corpus count');
for(const c of chapters){if(c.verses.length!==c.versesCount)throw new Error('Chapter count mismatch: '+c.chapter);for(let i=0;i<c.verses.length;i++){const v=c.verses[i];if(v.verse!==i+1||!v.sanskrit||!v.meaning||!v.meaningHindi)throw new Error('Missing verse content: '+c.chapter+'.'+v.verse);}}
fs.mkdirSync('public',{recursive:true});fs.writeFileSync('public/gita.json',JSON.stringify(verses));
console.log('Validated and prepared 18 chapters, 701 verse entries.');

const explainScope={exports:{}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/data/explanations.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,explainScope);
const passages={};
const documents=chapters.flatMap(c=>c.verses.map(v=>{const e=explainScope.exports.getExplanation(c.chapter,v.verse);const key=c.chapter+'.'+e.start+'-'+e.end;passages[key]={en:e.en,hi:e.hi,start:e.start,end:e.end};return {ref:c.chapter+'.'+v.verse,chapter:c.chapter,verse:v.verse,en:v.meaning,hi:v.meaningHindi,passage:key};}));
fs.mkdirSync('public/guidance',{recursive:true});
fs.writeFileSync('public/guidance/corpus.json',JSON.stringify({version:1,documents,passages}));

if(fs.existsSync('public/guidance/manifest.json')){const crypto=await import('node:crypto');const manifest=JSON.parse(fs.readFileSync('public/guidance/manifest.json','utf8'));const digest=crypto.createHash('sha256').update(fs.readFileSync('public/guidance/corpus.json')).digest('hex');if(digest!==manifest.corpusSha256)throw Error('Scripture or explanations changed. Rebuild the semantic index using scripts/build-semantic-model.py.');}
