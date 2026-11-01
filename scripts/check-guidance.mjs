import fs from 'node:fs';import ts from 'typescript';import vm from 'node:vm';import assert from 'node:assert/strict';
const code=ts.transpileModule(fs.readFileSync('src/data/guidance.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;const context={exports:{}};vm.runInNewContext(code,context);const {TOPICS,matchTopics}=context.exports;
const verses=JSON.parse(fs.readFileSync('public/gita.json','utf8'));const refs=new Set(verses.map(v=>v.chapter+'.'+v.verse));
for(const t of TOPICS){assert.ok(t.refs.length>=3);for(const ref of t.refs)assert.ok(refs.has(ref),'Missing cited verse '+ref);}
assert.equal(matchTopics('I am worried about my exams')[0].id,'worry');assert.equal(matchTopics('I need focus for study')[0].id,'focus');assert.equal(matchTopics('घर परिवार')[0].id,'relationships');assert.equal(matchTopics('चिंता और तनाव')[0].id,'worry');assert.equal(matchTopics('stellar nebula').length,0);assert.equal(matchTopics('billing').length,0);
console.log('Guidance checks passed: all references exist; English/Hindi matching and unknown-topic fallback verified.');
