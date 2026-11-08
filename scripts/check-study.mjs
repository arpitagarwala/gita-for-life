import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import ts from 'typescript';
function readModule(file,require=()=>{throw Error('Unexpected import');}){const scope={exports:{},require};vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true,resolveJsonModule:true}}).outputText,scope);return scope.exports;}
const insights=JSON.parse(fs.readFileSync('src/data/verse-insights.json','utf8'));
const {getStudyNote}=readModule('src/data/study-notes.ts',path=>{assert.equal(path,'./verse-insights.json');return insights;});
const {getExplanation}=readModule('src/data/explanations.ts');const {GITA_CHAPTERS}=readModule('src/data/gita.ts');
const en=new Set(),hi=new Set();let total=0;
for(const c of GITA_CHAPTERS)for(const v of c.verses){const ref=`${c.chapter}.${v.verse}`;const note=getStudyNote(c.chapter,v.verse);const passage=getExplanation(c.chapter,v.verse);total++;
 for(const lang of ['en','hi']){for(const section of ['insight','context','practice','reflection']){assert.ok(note[section][lang].length>=15,`${ref} missing ${lang} ${section}`);if(lang==='hi')assert.match(note[section][lang],/[\u0900-\u097f]/);}const full=[note.insight[lang],passage[lang],note.context[lang],note.practice[lang],note.reflection[lang]].join(' ');assert.ok(full.split(/\s+/).length>=100,`${ref} explanation too short in ${lang}`);}
 assert.ok(!/did not comment/i.test(v.meaning+' '+v.meaningHindi),`Placeholder ${ref}`);assert.match(v.meaningHindi,/[\u0900-\u097f]/);en.add(note.insight.en);hi.add(note.insight.hi);
 if(v.englishSource||v.hindiSource)assert.match((v.englishSource??'')+(v.hindiSource??''),/Gita for Life|गीता फॉर लाइफ/);
}
assert.equal(total,701);assert.equal(Object.keys(insights).length,701);assert.equal(en.size,701);assert.equal(hi.size,701);
assert.ok(!GITA_CHAPTERS[17].verses[44].meaning.startsWith('5.10'));
console.log('Verified 701 unique English/Hindi insights, complete study sections (100+ words per language), and credited replacement renderings.');
