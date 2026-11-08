import fs from 'node:fs';
import sharp from 'sharp';
fs.mkdirSync('public/icons',{recursive:true});
const svg=fs.readFileSync('public/icon.svg');
for(const size of [192,512,180])await sharp(svg).resize(size,size).png().toFile(`public/icons/${size===180?'apple-touch-icon':`icon-${size}`}.png`);
await sharp({create:{width:512,height:512,channels:4,background:'#285241'}}).composite([{input:await sharp(svg).resize(330,330).png().toBuffer(),gravity:'centre'}]).png().toFile('public/icons/maskable-512.png');
