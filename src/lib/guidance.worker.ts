/// <reference lib="webworker" />
import {SemanticIndex,answerQuestion,earlyAnswer,restoreDocumentVectors,type Corpus,type ModelManifest} from './guidance-engine';
let loaded:Promise<SemanticIndex>|null=null;
async function loadIndex(progress:()=>void):Promise<SemanticIndex>{
 const base=new URL('/guidance/',self.location.origin);
 const get=async(name:string)=>{if(!/^[a-z0-9._-]+$/i.test(name))throw Error('Invalid asset');const response=await fetch(new URL(name,base));if(!response.ok)throw Error('Could not load reading suggestions');return response;};
 const manifest=await (await get('manifest.json')).json() as ModelManifest;
 if(manifest.rows>60000||manifest.dimensions!==256||manifest.documentVectors!==2||manifest.quantization!=='q4')throw Error('Unsupported guidance index');
 const [lexicon,corpusResponse,scales,vectorBytes,vectorScales,...parts]=await Promise.all([
  get(manifest.lexicon).then(r=>r.json()),
  get(manifest.corpus).then(r=>r.arrayBuffer()),
  get(manifest.scales).then(r=>r.arrayBuffer()),
  get(manifest.vectors).then(r=>r.arrayBuffer()),
  get(manifest.vectorScales).then(r=>r.arrayBuffer()),
  ...manifest.parts.map(name=>get(name).then(r=>r.arrayBuffer()))
 ]);
 const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',corpusResponse))].map(x=>x.toString(16).padStart(2,'0')).join('');
 if(hash!==manifest.corpusSha256)throw Error('Guidance files need to be refreshed');
 const corpus=JSON.parse(new TextDecoder().decode(corpusResponse)) as Corpus;
 const weights=new Int8Array(parts.reduce((sum,part)=>sum+part.byteLength,0));let offset=0;
 for(const part of parts){weights.set(new Int8Array(part),offset);offset+=part.byteLength;}
 progress();
 const vectors=restoreDocumentVectors(manifest,new Int8Array(vectorBytes),new Float32Array(vectorScales));
 return new SemanticIndex(corpus,manifest,lexicon,weights,new Float32Array(scales),vectors);
}
self.addEventListener('message',async(event:MessageEvent<{id:number;question:string;goal?:string}>)=>{
 const {id,question,goal=''}=event.data;
 if(typeof id!=='number'||typeof question!=='string')return;
 const input=question.trim().slice(0,4000);
 try{
  const immediate=earlyAnswer(input);
  if(immediate){self.postMessage({id,type:'result',answer:immediate});return;}
  self.postMessage({id,type:'progress'});
  if(!loaded)loaded=loadIndex(()=>self.postMessage({id,type:'progress'})).catch(error=>{loaded=null;throw error;});
  const index=await loaded;
  self.postMessage({id,type:'result',answer:answerQuestion(index,input,goal)});
 }catch{
  self.postMessage({id,type:'error'});
 }
});
