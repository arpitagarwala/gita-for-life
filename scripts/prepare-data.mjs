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
