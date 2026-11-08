'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import Icon from './Icon';
import {useLanguage} from './Language';
import type {Explanation} from '@/data/explanations';
import type {StudyNote} from '@/data/study-notes';
type Props={chapter:number;verse:number;sanskrit:string;transliteration:string;meaning:string;meaningHindi:string;explanation:Explanation;study:StudyNote;englishSource?:string;hindiSource?:string;previous:string|null;next:string|null};
export default function Reader(p:Props){
 const {language,tr}=useLanguage();
 const ref=p.chapter+'.'+p.verse;
 const [saved,setSaved]=useState(false);
 const [message,setMessage]=useState('');
 const [speaking,setSpeaking]=useState(false);
 const [studyLanguage,setStudyLanguage]=useState<'en'|'hi'|null>(null);
 useEffect(()=>{try{const items=JSON.parse(localStorage.getItem('gita-saved-v1')||'[]');setSaved(Array.isArray(items)&&items.includes(ref));localStorage.setItem('gita-last-v1',p.chapter+'/'+p.verse);}catch{}},[ref,p.chapter,p.verse]);
 useEffect(()=>{setSpeaking(false);return()=>{if('speechSynthesis' in window)window.speechSynthesis.cancel();};},[language,ref]);
 function bookmark(){try{const raw=JSON.parse(localStorage.getItem('gita-saved-v1')||'[]');const items=Array.isArray(raw)?raw:[];localStorage.setItem('gita-saved-v1',JSON.stringify(saved?items.filter(x=>x!==ref):[...items,ref]));setSaved(!saved);setMessage(saved?'Shloka removed from saved verses.':'Shloka saved on this device.');}catch{setMessage('Your browser could not save this shloka.');}}
 const translation=language==='hi'?p.meaningHindi:p.meaning;
 const explanation=[p.study.insight[language],p.explanation[language],p.study.context[language],p.study.practice[language],p.study.reflection[language]].join('\n\n');
 const noteLanguage=studyLanguage??language;
 const noteHi=noteLanguage==='hi';
 async function share(){try{await navigator.clipboard.writeText(tr('Bhagavad Gita')+' '+ref+'\n'+translation+'\n\n'+tr('Simple explanation')+'\n'+explanation+'\n'+window.location.href);setMessage('Verse and link copied.');}catch{setMessage('To share this verse, copy the page address from your browser.');}}
 function listen(){if(!('speechSynthesis' in window)){setMessage('Read aloud is not supported in this browser.');return;}if(speaking){window.speechSynthesis.cancel();setSpeaking(false);return;}const utterance=new SpeechSynthesisUtterance(translation+'\n'+tr('Simple explanation')+'\n'+explanation);utterance.lang=language==='hi'?'hi-IN':'en-IN';utterance.rate=.85;utterance.onend=()=>setSpeaking(false);utterance.onerror=()=>{setSpeaking(false);setMessage('Read aloud could not start. Please try again.');};window.speechSynthesis.speak(utterance);setSpeaking(true);}
 const range=p.explanation.start===p.explanation.end?p.chapter+'.'+p.explanation.start:p.chapter+'.'+p.explanation.start+'–'+p.chapter+'.'+p.explanation.end;
 return <>
 <div className="reader-controls"><button onClick={bookmark} aria-pressed={saved}><Icon name={saved?'check':'bookmark'} size={18}/>{tr(saved?'Saved':'Save shloka')}</button><button onClick={listen}><Icon name="sound" size={18}/>{tr(speaking?'Stop reading':'Read aloud')}</button><button onClick={()=>void share()}>{tr('Copy & share ↗')}</button></div>
 <div className="reader-card"><span className="eyebrow">{tr('Bhagavad Gita')} · {ref}</span><p className="sanskrit" lang="sa">{p.sanskrit}</p><details><summary>{tr('Transliteration · pronunciation guide')}</summary><p className="transliteration">{p.transliteration}</p></details><h2>{tr(language==='hi'?'Hindi translation':'English translation')}</h2><p className="translation" lang={language}>{translation}</p><p className="small muted">{tr('Translation')}: {language==='hi'?(p.hindiSource??'स्वामी तेजोमयानन्द'):(p.englishSource??'Swami Sivananda')} · <Link href="/about">{tr('Sources & context')}</Link></p>
 <section className="shloka-explanation" aria-labelledby="study-title"><h2 id="study-title">{language==='hi'?'विस्तृत व्याख्या':'Detailed explanation'}</h2>
 <div className="study-language" role="group" aria-label={language==='hi'?'व्याख्या की भाषा':'Explanation language'}><button lang="en" aria-pressed={noteLanguage==='en'} className={noteLanguage==='en'?'selected':''} onClick={()=>setStudyLanguage('en')}>English</button><button lang="hi" aria-pressed={noteLanguage==='hi'} className={noteLanguage==='hi'?'selected':''} onClick={()=>setStudyLanguage('hi')}>हिन्दी</button></div>
 <div key={noteLanguage} lang={noteLanguage} className="study-body"><div className="study-section"><h3>{noteHi?'इस श्लोक का भाव':'This shloka’s insight'}</h3><p>{p.study.insight[noteLanguage]}</p><p>{p.explanation[noteLanguage]}</p><p className="small muted">{noteHi?'ऊपर का दूसरा अनुच्छेद साझा प्रसंग समझाता है। साथ पढ़ें:':'The second paragraph above explains the shared passage. Read together:'} {range}</p><div className="related-links">{Array.from({length:p.explanation.end-p.explanation.start+1},(_,i)=>p.explanation.start+i).filter(v=>v!==p.verse).map(v=><Link key={v} href={'/'+p.chapter+'/'+v}>{p.chapter}.{v} ↗</Link>)}</div></div>
 <div className="study-section"><h3>{noteHi?'अध्याय के सन्दर्भ में':'Within this chapter'}</h3><p>{p.study.context[noteLanguage]}</p></div>
 <div className="study-section"><h3>{noteHi?'जीवन में अभ्यास':'Putting it into practice'}</h3><p>{p.study.practice[noteLanguage]}</p><p className="small muted">{noteHi?'यह अभ्यास पूरे अध्याय के लिए साझा है।':'This practice is shared across the chapter.'}</p></div>
 <div className="study-reflection"><h3>{noteHi?'मनन का प्रश्न':'A question for reflection'}</h3><p>{p.study.reflection[noteLanguage]}</p></div>
 <p className="small muted">{noteHi?'ऐप की मौलिक अध्ययन-टिप्पणियाँ; अनुवाद से अलग।':'Original study notes for this app; separate from the translation.'} <Link href="/about">{noteHi?'स्रोत और दृष्टिकोण':'Sources and approach'} ↗</Link></p></div>
 </section></div>
 <p role="status" className="small muted">{tr(message)}</p>
 <nav className="verse-navigation" aria-label={tr('Verse navigation')}>{p.previous?<Link href={p.previous}>← {tr('Previous shloka')}</Link>:<span/>}{p.next?<Link href={p.next}>{tr('Next shloka')} →</Link>:<Link href="/">{tr('Return home')} →</Link>}</nav>
 </>;
}
