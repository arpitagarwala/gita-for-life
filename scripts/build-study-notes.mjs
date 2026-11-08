import fs from 'node:fs';
const counts=[47,72,43,42,29,47,30,28,34,42,55,20,35,27,20,24,28,78];
const notes={};
for(let i=1;i<=18;i++){
 const rows=fs.readFileSync(`src/data/study/${i}.txt`,'utf8').trim().split(/\r?\n/).map(line=>line.split('|'));
 if(rows.length!==counts[i-1])throw Error(`Chapter ${i}: expected ${counts[i-1]}, received ${rows.length}`);
 for(const [j,row] of rows.entries()){if(row.length!==2||row.some(t=>t.length<15))throw Error(`Invalid note ${i}.${j+1}`);notes[`${i}.${j+1}`]={en:row[0],hi:row[1]};}
}
fs.writeFileSync('src/data/verse-insights.json',JSON.stringify(notes,null,2)+'\n');
console.log(`Prepared ${Object.keys(notes).length} original bilingual verse insights.`);
