'use client';
import Link from 'next/link';
import {useCallback,useEffect,useRef,useState} from 'react';
import {useLanguage} from './Language';
import {earlyAnswer,type GuidanceAnswer,type Pair} from '@/lib/guidance-engine';
import Icon from './Icon';
type Request={text:string;nonce:number}|null;
const EXAMPLES:Pair[]=[
 {en:'My colleague takes credit for my work, but I’m afraid to speak up.',hi:'सहकर्मी मेरे काम का श्रेय लेता है, लेकिन मैं बोलने से डरता हूँ।'},
 {en:'My exam is in three days, and I keep reaching for my phone.',hi:'मेरी परीक्षा तीन दिन में है, लेकिन बार-बार फोन देखने लगता हूँ।'},
 {en:'I care for my parents and children, and have no time for myself.',hi:'माता-पिता और बच्चों की देखभाल में अपने लिए समय नहीं बचता।'}
];
export default function Guidance({requested,daily,onReflect}:{requested:Request;daily:React.ReactNode;onReflect:(text:string)=>void}){
 const {language}=useLanguage();
 const text=(en:string,hi:string)=>language==='hi'?hi:en;
 const pick=(pair:Pair)=>pair[language];
 const [draft,setDraft]=useState('');
 const [details,setDetails]=useState('');
 const [context,setContext]=useState('');
 const [baseQuestion,setBaseQuestion]=useState('');
 const [answer,setAnswer]=useState<GuidanceAnswer|null>(null);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState(false);
 const [ready,setReady]=useState(false);
 const worker=useRef<Worker|null>(null);
 const job=useRef(0);
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const result=useRef<HTMLDivElement>(null);
 const clearTimer=useCallback(()=>{if(timer.current){clearTimeout(timer.current);timer.current=null;}},[]);
 const cancel=useCallback(()=>{job.current++;worker.current?.terminate();worker.current=null;clearTimer();setBusy(false);},[clearTimer]);
 const start=useCallback((question:string,extra='')=>{
  const clean=question.trim().slice(0,2000);if(!clean)return;
  const input=clean+(extra?'\n'+extra.trim().slice(0,1500):'');
  const id=++job.current;clearTimer();setError(false);setAnswer(null);
  setBaseQuestion(clean);setContext(extra);
  const immediate=earlyAnswer(input);
  if(immediate){setBusy(false);setAnswer(immediate);requestAnimationFrame(()=>result.current?.scrollIntoView({behavior:'smooth',block:'start'}));return;}
  setBusy(true);
  try{
   if(!worker.current){
    const next=new Worker('/guidance/worker.js',{type:'module'});worker.current=next;
    next.onmessage=event=>{
     if(event.data.id!==job.current)return;
     if(event.data.type==='result'){clearTimer();setAnswer(event.data.answer);setBusy(false);}
     else if(event.data.type==='error'){clearTimer();setError(true);setBusy(false);}
    };
    next.onerror=()=>{clearTimer();setError(true);setBusy(false);next.terminate();if(worker.current===next)worker.current=null;};
   }
   worker.current.postMessage({id,question:input,goal:extra});
   timer.current=setTimeout(()=>{if(id===job.current){worker.current?.terminate();worker.current=null;setError(true);setBusy(false);}},90000);
  }catch{clearTimer();setError(true);setBusy(false);}
  requestAnimationFrame(()=>result.current?.scrollIntoView({behavior:'smooth',block:'start'}));
 },[clearTimer]);
 useEffect(()=>{setReady(true);return()=>{job.current++;worker.current?.terminate();worker.current=null;clearTimer();};},[clearTimer]);
 useEffect(()=>{if(requested){setDraft(requested.text);setDetails('');start(requested.text);}},[requested,start]);
 function submit(){setDetails('');start(draft);}
 function refine(){if(!details.trim())return;const extra=[context,details.trim()].filter(Boolean).join('\n').slice(-1500);setDetails('');start(baseQuestion,extra);}
 return <>
 <div className="guidance-layout"><div className="question-card">
 <div className="card-label"><span className="soft-icon"><Icon name="spark"/></span><h3>{text('A perspective for your situation','आपकी परिस्थिति के लिए एक दृष्टि')}</h3></div>
 <form onSubmit={event=>{event.preventDefault();submit();}}>
 <label htmlFor="concern">{text('What is happening, and what would you like to change?','क्या हो रहा है और आप किस बात में बदलाव चाहते हैं?')}</label>
 <textarea id="concern" value={draft} onChange={e=>setDraft(e.target.value)} maxLength={2000} rows={4} required placeholder={text('Tell us about the situation, what feels difficult, and any limits you need to work within…','परिस्थिति, अपनी कठिनाई और जिन सीमाओं के भीतर रास्ता खोजना है, उनके बारे में बताएँ…')}/>
 <div className="input-bottom"><span><Icon name="leaf" size={15}/>{text('A little detail helps find a more useful perspective','थोड़ा विवरण उपयोगी दृष्टि खोजने में मदद करता है')}</span><button className="button primary" disabled={!ready||busy} type="submit">{busy?text('Finding a perspective…','दृष्टि खोज रहे हैं…'):text('Find my guidance','मार्गदर्शन देखें')}<Icon name="arrow" size={18}/></button></div>
 </form>
 <div className="try-prompts"><span>{text('For example:','उदाहरण:')}</span>{EXAMPLES.map((example,i)=><button key={i} disabled={!ready||busy} onClick={()=>{setDraft(pick(example));setDetails('');start(pick(example));}}>{pick(example)} ↗</button>)}</div>
 <p className="small muted">{text('Read the connected shlokas, reflect on your choices, and find one practical next step.','सम्बद्ध श्लोक पढ़ें, अपने विकल्पों पर मनन करें और एक व्यावहारिक अगला कदम चुनें।')}</p>
 </div>{daily}</div>
 {(busy||answer||error)&&<div className="results-panel personalized-results" id="guidance-result" ref={result} tabIndex={-1} aria-busy={busy}>
 <div className="result-title"><Icon name="spark"/><h3>{text('A perspective for your question','आपके प्रश्न के लिए एक दृष्टि')}</h3></div>
 {busy&&<div role="status" className="guidance-loading"><span className="loading-dot"/><p>{text('Finding relevant shlokas and considering their connections…','उपयुक्त श्लोक और उनके सम्बन्ध खोजे जा रहे हैं…')}</p><button className="text-link" onClick={cancel}>{text('Cancel','रोकें')}</button></div>}
 {error&&<div role="alert"><p>{text('This search could not finish. Check your connection and try again. Your question is still above.','खोज पूरी नहीं हो पाई। सम्पर्क जाँचकर फिर प्रयास करें। आपका प्रश्न ऊपर सुरक्षित है।')}</p><button className="button secondary" onClick={()=>start(baseQuestion,context)}>{text('Try again','फिर प्रयास करें')}</button></div>}
 {answer&&<>
 {answer.notice&&<div className="notice"><p>{pick(answer.notice)}</p></div>}
 {answer.kind==='guidance'&&<>
 <div className="question-understood"><span className="eyebrow">{text('THE SITUATION YOU DESCRIBED','आपकी बताई परिस्थिति')}</span><p>{baseQuestion}</p>{context&&<p className="small muted">{context}</p>}<div className="context-signals">{answer.context.signals.slice(0,5).map(signal=><span key={signal.id}>{pick(signal.label)}</span>)}{answer.context.deadline&&<span>{answer.context.deadline}</span>}</div></div>
 {answer.uncertain&&<p className="small muted">{text('These passages may offer a starting point. The question below can help make the guidance more relevant.','ये प्रसंग एक शुरुआत दे सकते हैं। नीचे के प्रश्न का उत्तर मार्गदर्शन को और प्रासंगिक बनाने में मदद करेगा।')}</p>}
 <h3>{text('Shlokas to read with your question','अपने प्रश्न के साथ पढ़ने योग्य श्लोक')}</h3>
 <div className="connected-verses">{answer.hits.map((hit,i)=><article className="connected-verse" key={hit.document.ref}><Link className="eyebrow" href={'/'+hit.document.ref.replace('.','/')}>0{i+1} · {text('BHAGAVAD GITA','भगवद्गीता')} {hit.document.ref} ↗</Link><p lang={language}>{hit.document[language].slice(0,450)}{hit.document[language].length>450?'…':''}</p><details><summary>{text('Understand the passage','प्रसंग समझें')}</summary><p className="verse-context" lang={language}>{pick(hit.explanation)}</p><span className="small muted">{text('Passage context','प्रसंग')} · {hit.document.chapter}.{hit.explanation.start}{hit.explanation.start!==hit.explanation.end?'–'+hit.document.chapter+'.'+hit.explanation.end:''}</span></details><Link className="text-link" href={'/'+hit.document.ref.replace('.','/')}>{text('Read the full shloka','पूरा श्लोक पढ़ें')}<Icon name="arrow" size={16}/></Link></article>)}</div>
 {answer.connections.length>0&&<section className="guidance-connections"><h3>{text('How these perspectives fit together','ये दृष्टियाँ साथ मिलकर क्या बताती हैं')}</h3>{answer.connections.map((connection,i)=><p key={i}>{pick(connection)}</p>)}</section>}
 {answer.steps.length>0&&<div className="practical"><div><h3>{text('A next step that fits your situation','आपकी परिस्थिति के अनुसार अगला कदम')}</h3><ol className="personal-steps">{answer.steps.map((step,i)=><li key={i}><p>{pick(step.text)}</p><Link href={'/'+step.ref.replace('.','/')} className="small text-link">{text('Reflecting on shloka','श्लोक पर मनन')} {step.ref} ↗</Link></li>)}</ol></div><div className="reflection-prompt"><Icon name="pen"/><h4>{text('A question to carry with you','मनन के लिए एक प्रश्न')}</h4><p>{pick(answer.reflection)}</p><a className="text-link" href="#practice" onClick={()=>onReflect(pick(answer.reflection)+'\n\n')}>{text('Write a reflection','अपना मनन लिखें')}<Icon name="arrow" size={17}/></a></div></div>}
 <p className="small muted">{text('The connections and next steps are reflections on the cited passages. Read their context and choose what fits your circumstances.','सम्बन्ध और अगले कदम उद्धृत प्रसंगों पर आधारित मनन हैं। सन्दर्भ पढ़ें और अपनी परिस्थिति के अनुसार चुनाव करें।')}</p>
 </>}
 {answer.kind!=='support'&&<form className="guidance-followup" onSubmit={event=>{event.preventDefault();refine();}}><span className="eyebrow">{text('MAKE THIS MORE USEFUL','इसे और उपयोगी बनाएँ')}</span><label htmlFor="guidance-detail">{pick(answer.followup)}</label><textarea id="guidance-detail" value={details} onChange={e=>setDetails(e.target.value)} rows={2} maxLength={1000} placeholder={text('Add a detail, a constraint, or the outcome you hope for…','कोई विवरण, सीमा या इच्छित परिणाम जोड़ें…')}/><button className="button secondary" disabled={!details.trim()||busy} type="submit">{text('Refine my guidance','मार्गदर्शन और स्पष्ट करें')}<Icon name="arrow" size={17}/></button></form>}
 </>}
 </div>}
 </>;
}
