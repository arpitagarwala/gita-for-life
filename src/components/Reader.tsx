'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import Icon from './Icon';
import {useLanguage} from './Language';
import type {Explanation} from '@/data/explanations';
type Props={chapter:number;verse:number;sanskrit:string;transliteration:string;meaning:string;meaningHindi:string;explanation:Explanation;previous:string|null;next:string|null};
export default function Reader(p:Props){
 const {language,tr}=useLanguage();
 const ref=p.chapter+'.'+p.verse;
 const [saved,setSaved]=useState(false);
 const [message,setMessage]=useState('');
 const [speaking,setSpeaking]=useState(false);
 useEffect(()=>{try{const items=JSON.parse(localStorage.getItem('gita-saved-v1')||'[]');setSaved(Array.isArray(items)&&items.includes(ref));localStorage.setItem('gita-last-v1',p.chapter+'/'+p.verse);}catch{}},[ref,p.chapter,p.verse]);
 useEffect(()=>{setSpeaking(false);return()=>{if('speechSynthesis' in window)window.speechSynthesis.cancel();};},[language,ref]);
 function bookmark(){try{const raw=JSON.parse(localStorage.getItem('gita-saved-v1')||'[]');const items=Array.isArray(raw)?raw:[];localStorage.setItem('gita-saved-v1',JSON.stringify(saved?items.filter(x=>x!==ref):[...items,ref]));setSaved(!saved);setMessage(saved?'Shloka removed from saved verses.':'Shloka saved on this device.');}catch{setMessage('Your browser could not save this shloka.');}}
 const translation=language==='hi'?p.meaningHindi:p.meaning;
 const explanation=language==='hi'?p.explanation.hi:p.explanation.en;
 async function share(){try{await navigator.clipboard.writeText(tr('Bhagavad Gita')+' '+ref+'\n'+translation+'\n\n'+tr('Simple explanation')+'\n'+explanation+'\n'+window.location.href);setMessage('Verse and link copied.');}catch{setMessage('To share this verse, copy the page address from your browser.');}}
 function listen(){if(!('speechSynthesis' in window)){setMessage('Read aloud is not supported in this browser.');return;}if(speaking){window.speechSynthesis.cancel();setSpeaking(false);return;}const utterance=new SpeechSynthesisUtterance(translation+'\n'+tr('Simple explanation')+'\n'+explanation);utterance.lang=language==='hi'?'hi-IN':'en-IN';utterance.rate=.85;utterance.onend=()=>setSpeaking(false);utterance.onerror=()=>{setSpeaking(false);setMessage('Read aloud could not start. Please try again.');};window.speechSynthesis.speak(utterance);setSpeaking(true);}
 const range=p.explanation.start===p.explanation.end?p.chapter+'.'+p.explanation.start:p.chapter+'.'+p.explanation.start+'–'+p.chapter+'.'+p.explanation.end;
 return <>
 <div className="reader-controls"><button onClick={bookmark} aria-pressed={saved}><Icon name={saved?'check':'bookmark'} size={18}/>{tr(saved?'Saved':'Save shloka')}</button><button onClick={listen}><Icon name="sound" size={18}/>{tr(speaking?'Stop reading':'Read aloud')}</button><button onClick={()=>void share()}>{tr('Copy & share ↗')}</button></div>
 <div className="reader-card"><span className="eyebrow">{tr('Bhagavad Gita')} · {ref}</span><p className="sanskrit" lang="sa">{p.sanskrit}</p><details><summary>{tr('Transliteration · pronunciation guide')}</summary><p className="transliteration">{p.transliteration}</p></details><h2>{tr(language==='hi'?'Hindi translation':'English translation')}</h2><p className="translation" lang={language}>{translation}</p><p className="small muted">{tr('Translation')}: {language==='hi'?'स्वामी तेजोमयानन्द':'Swami Sivananda'} · <Link href="/about">{tr('Sources & context')}</Link></p>
 <section className="shloka-explanation" aria-label={tr('Simple explanation')}><h2>{tr('Simple explanation')}</h2><p lang={language}>{explanation}</p><p className="small muted">{tr('Passage context')} · {range}</p></section></div>
 <p role="status" className="small muted">{tr(message)}</p>
 <nav className="verse-navigation" aria-label={tr('Verse navigation')}>{p.previous?<Link href={p.previous}>← {tr('Previous shloka')}</Link>:<span/>}{p.next?<Link href={p.next}>{tr('Next shloka')} →</Link>:<Link href="/">{tr('Return home')} →</Link>}</nav>
 </>;
}
