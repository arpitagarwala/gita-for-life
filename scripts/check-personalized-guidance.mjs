import fs from 'node:fs';import ts from 'typescript';import vm from 'node:vm';import assert from 'node:assert/strict';import crypto from 'node:crypto';
const scope={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/guidance-engine.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,scope);
const {SemanticIndex,answerQuestion,earlyAnswer,analyseQuestion,restoreDocumentVectors}=scope.exports;
const read=name=>fs.readFileSync('public/guidance/'+name);
const json=name=>JSON.parse(read(name));
const manifest=json('manifest.json');const corpus=json(manifest.corpus);
assert.equal(crypto.createHash('sha256').update(read(manifest.corpus)).digest('hex'),manifest.corpusSha256);
assert.equal(corpus.documents.length,701);assert.equal(new Set(corpus.documents.map(d=>d.ref)).size,701);
const floats=name=>{const b=read(name);return new Float32Array(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength));};
const bytes=Buffer.concat(manifest.parts.map(read));
const vectorBytes=read(manifest.vectors);const vectors=restoreDocumentVectors(manifest,new Int8Array(vectorBytes.buffer,vectorBytes.byteOffset,vectorBytes.byteLength),floats(manifest.vectorScales));
const index=new SemanticIndex(corpus,manifest,json(manifest.lexicon),new Int8Array(bytes.buffer,bytes.byteOffset,bytes.byteLength),floats(manifest.scales),vectors);
const fixtures=JSON.parse(fs.readFileSync('scripts/fixtures/guidance-parity.json','utf8'));
for(const f of fixtures){const actual=index.encode(f.text);assert.equal(actual.length,256);for(let i=0;i<256;i++)assert.ok(Math.abs(actual[i]-f.vector[i])<.00001,'Encoder mismatch: '+f.text);}
const cases=[
 {question:'My colleague takes credit for my work, but I am scared of damaging our relationship.',accept:ref=>ref==='17.15'},
 {question:'I have an exam in three days and keep scrolling whenever I feel stuck.',accept:ref=>ref==='6.26'||ref==='6.35'},
 {question:'I am caring for my parents and children and have no time left for myself.',accept:ref=>ref==='6.17'},
 {question:'My boss wants me to falsify invoices to hit our targets.',accept:ref=>['16.1','16.2','16.3','17.15'].includes(ref)},
 {question:'I feel ashamed to ask my teacher a question.',accept:ref=>ref==='4.34'},
 {question:'How can I donate without expecting something in return?',accept:ref=>/^17\.2[012]$/.test(ref)},
 {question:'How do I lead a team by example rather than forcing them?',accept:ref=>/^3\.2[1-6]$/.test(ref)},
 {question:'मुझे परीक्षा की चिन्ता है और पढ़ाई करते समय फोन देखने लगता हूँ।',accept:ref=>ref==='6.26'},
 {question:'घर के सारे काम और बच्चों की देखभाल से थक गई हूँ।',accept:ref=>ref==='6.17'}
];
const valid=new Set(corpus.documents.map(doc=>doc.ref));
for(const test of cases){const result=answerQuestion(index,test.question);assert.equal(result.kind,'guidance',test.question);assert.ok(result.hits.some(hit=>test.accept(hit.document.ref)),'Irrelevant result: '+test.question);assert.equal(new Set(result.hits.map(hit=>hit.document.passage)).size,result.hits.length);for(const step of result.steps){assert.ok(valid.has(step.ref));assert.ok(step.text.en.length>20&&/[\u0900-\u097f]/.test(step.text.hi));}}
const exam=answerQuestion(index,cases[1].question);
assert.equal(exam.context.deadline,'in three days');assert.ok(exam.steps.some(step=>/phone/i.test(step.text.en)));assert.ok(exam.steps.some(step=>/in three days/.test(step.text.en)));
const home=answerQuestion(index,cases[2].question);assert.notDeepEqual(exam.steps.map(x=>x.text.en),home.steps.map(x=>x.text.en));assert.ok(home.steps.some(step=>/shared|help|rest/i.test(step.text.en)));
const pressured=answerQuestion(index,'My boss wants me to falsify invoices. I cannot quit because I need the income.');
assert.ok(pressured.context.constraints.includes('income'));assert.ok(pressured.steps.some(step=>/confidential|honest alternative/i.test(step.text.en)));
const before=answerQuestion(index,'I feel stressed about work.');
const after=answerQuestion(index,'I feel stressed about work.\nI care for my parents after each shift and have no time to sleep.','I care for my parents after each shift and have no time to sleep.');
assert.ok(after.hits.some(x=>x.document.ref==='6.17'));assert.notDeepEqual(before.steps.map(x=>x.text.en),after.steps.map(x=>x.text.en));
const pair=answerQuestion(index,'How do Gita 2.47 and 6.26 connect?');assert.equal(pair.hits.length,2);assert.equal(pair.hits[0].document.ref,'2.47');assert.equal(pair.hits[1].document.ref,'6.26');assert.ok(pair.connections[0].en.includes('effort')&&pair.connections[0].en.includes('attention'));
for(const ref of ['1.1','4.34','11.32','13.35','17.20','18.78'])assert.equal(answerQuestion(index,'Explain Gita '+ref).hits[0].document.ref,ref);
for(const q of ['help','What should I do?','How do I install a printer?'])assert.equal(earlyAnswer(q).kind,'clarify');
for(const q of ['I want to kill myself','I am not suicidal but I want to end my life','My husband hits me','I want to hurt someone','I have chest pain and cannot breathe','मुझे जीना नहीं चाहता, खुद को नुकसान पहुँचाना है']){const result=earlyAnswer(q);assert.equal(result?.kind,'support',q);assert.equal(result.hits.length,0);assert.equal(result.steps.length,0);}
assert.equal(earlyAnswer('I am not suicidal; I am overwhelmed with my exams.'),null);
assert.ok(!analyseQuestion('My colleague keeps testing my patience.').signals.some(s=>s.id==='exam'));
assert.ok(!analyseQuestion('People give me compliments and I depend on them.').signals.some(s=>s.id==='giving'));
assert.equal(analyseQuestion('मेरी परीक्षा तीन दिन में है।').deadline,'तीन दिन');
const totalBytes=['lexicon.json','scales.bin','verses.bin','verse-scales.bin','manifest.json',...manifest.parts].reduce((sum,name)=>sum+read(name).length,0);assert.ok(totalBytes<6_000_000,'Guidance model download exceeded budget');
console.log('Personalized guidance passed: bilingual semantic relevance, new verse connections, refinement, deadlines, constraints, encoder parity, ambiguity, and safety. Static matching assets: '+(totalBytes/1e6).toFixed(2)+' MB.');
