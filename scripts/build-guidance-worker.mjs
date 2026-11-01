import fs from 'node:fs';import ts from 'typescript';
const options={target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext};
const engine=ts.transpileModule(fs.readFileSync('src/lib/guidance-engine.ts','utf8'),{compilerOptions:options}).outputText;
const worker=ts.transpileModule(fs.readFileSync('src/lib/guidance.worker.ts','utf8').replace(/^import .*from '\.\/guidance-engine';\r?\n/m,''),{compilerOptions:options}).outputText;
fs.mkdirSync('public/guidance',{recursive:true});
fs.writeFileSync('public/guidance/worker.js','// Generated from the checked-in guidance engine and worker.\\n'.replace('\\n','\n')+engine+'\n'+worker);
console.log('Prepared standalone guidance worker.');
