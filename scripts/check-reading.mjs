import fs from 'node:fs';
import ts from 'typescript';
import vm from 'node:vm';
import assert from 'node:assert/strict';
function readModule(file){const scope={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,scope);return scope.exports;}
const {getExplanation}=readModule('src/data/explanations.ts');
const {GITA_CHAPTERS}=readModule('src/data/gita.ts');
const {HINDI}=readModule('src/data/hindi.ts');
const {TOPICS,matchTopics}=readModule('src/data/guidance.ts');
const passages=new Set();
for(const chapter of GITA_CHAPTERS){for(const verse of chapter.verses){const explanation=getExplanation(chapter.chapter,verse.verse);assert.ok(explanation.en.length>60);assert.ok(explanation.hi.length>60);assert.ok(/[\u0900-\u097f]/.test(explanation.hi));assert.ok(explanation.start<=verse.verse&&explanation.end>=verse.verse&&explanation.end<=chapter.verses.length);assert.notEqual(explanation.en,verse.meaning);assert.notEqual(explanation.hi,verse.meaningHindi);passages.add(chapter.chapter+'.'+explanation.start+'-'+explanation.end);}}
for(const topic of TOPICS){for(const text of [topic.title,topic.description,topic.connection,topic.question,...topic.steps])assert.ok(HINDI[text],'Missing Hindi guidance: '+text);}
const home=fs.readFileSync('src/components/Home.tsx','utf8');const ast=ts.createSourceFile('Home.tsx',home,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);let checked=0;function visit(node){if(ts.isCallExpression(node)&&node.expression.getText(ast)==='tr'&&node.arguments.length&&ts.isStringLiteral(node.arguments[0])){const key=node.arguments[0].text.trim();if(/[a-z]/i.test(key)){assert.ok(HINDI[key],'Missing Hindi UI: '+key);checked++;}}ts.forEachChild(node,visit);}visit(ast);
assert.equal(matchTopics('मुझे परीक्षा की चिन्ता है')[0].id,'worry');
assert.equal(matchTopics('मुझे एकाग्रता चाहिए')[0].id,'focus');
for(const file of ['src/components/Home.tsx','src/components/Shell.tsx','src/components/Reader.tsx','src/components/AboutContent.tsx'])assert.ok(!/\bAI\b|Codex|browser.s speech|speech service|backend/i.test(fs.readFileSync(file,'utf8')),'Technical product copy remains in '+file);
console.log('Verified explanations for 701 shlokas across '+passages.size+' passage notes, '+checked+' translated homepage labels, all Hindi guidance, and removed technical copy.');
