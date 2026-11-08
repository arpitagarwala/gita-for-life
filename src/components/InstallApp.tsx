'use client';
import {useEffect,useRef,useState} from 'react';
import {useLanguage} from './Language';

type InstallPrompt=Event & {prompt:()=>Promise<void>;userChoice:Promise<{outcome:'accepted'|'dismissed'}>};
export default function InstallApp(){
 const {language}=useLanguage();const hi=language==='hi';
 const [prompt,setPrompt]=useState<InstallPrompt|null>(null);
 const [installed,setInstalled]=useState(false);const [busy,setBusy]=useState(false);
 const [ios,setIos]=useState(false);const [message,setMessage]=useState('');
 const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{
  const display=window.matchMedia('(display-mode: standalone)');
  const update=()=>setInstalled(display.matches||Boolean((navigator as Navigator & {standalone?:boolean}).standalone));
  update();setIos(/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1));
  const available=(event:Event)=>{event.preventDefault();setPrompt(event as InstallPrompt);};
  const done=()=>{setInstalled(true);setPrompt(null);dialog.current?.close();};
  window.addEventListener('beforeinstallprompt',available);window.addEventListener('appinstalled',done);display.addEventListener('change',update);
  return()=>{window.removeEventListener('beforeinstallprompt',available);window.removeEventListener('appinstalled',done);display.removeEventListener('change',update);};
 },[]);
 async function install(){
  if(!prompt){dialog.current?.showModal();return;}
  setBusy(true);setMessage('');
  try{await prompt.prompt();const result=await prompt.userChoice;if(result.outcome==='accepted')dialog.current?.close();}
  catch{setMessage(hi?'अभी इंस्टॉल नहीं हो सका। ब्राउज़र मेनू से पुनः प्रयास करें।':'Installation could not start. Try the browser menu.');dialog.current?.showModal();}
  finally{setPrompt(null);setBusy(false);}
 }
 if(installed)return null;
 return <><button className="install-button" onClick={()=>void install()} disabled={busy} aria-haspopup="dialog">{busy?(hi?'कृपया प्रतीक्षा करें…':'Please wait…'):(hi?'ऐप इंस्टॉल करें':'Install app')} <span aria-hidden="true">↓</span></button>
 <dialog className="install-dialog" ref={dialog} onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close();}} aria-labelledby="install-title">
 <button className="dialog-close icon-button" onClick={()=>dialog.current?.close()} aria-label={hi?'बन्द करें':'Close'}>×</button>
 <span className="eyebrow">{hi?'गीता आपके साथ':'YOUR DAILY COMPANION'}</span><h2 id="install-title">{hi?'गीता को अपने उपकरण पर रखें।':'Keep the Gita close.'}</h2>
 <p>{hi?'होम स्क्रीन से सीधे खोलें। पढ़े हुए पृष्ठ और सहेजे मनन इसी उपकरण पर उपलब्ध रहते हैं।':'Open straight from your home screen. Previously visited pages and saved reflections stay on this device.'}</p>
 {prompt?<button className="button" onClick={()=>void install()} disabled={busy}>{hi?'अभी इंस्टॉल करें':'Install now'} ↓</button>:<ol>{ios?<><li>{hi?'Safari में यह वेबसाइट खोलें।':'Open this website in Safari.'}</li><li>{hi?'शेयर बटन दबाएँ, फिर “होम स्क्रीन पर जोड़ें” चुनें।':'Tap Share, then choose “Add to Home Screen”.'}</li><li>{hi?'यदि विकल्प दिखे तो “वेब ऐप के रूप में खोलें” चालू रखें और “जोड़ें” दबाएँ।':'Keep “Open as Web App” enabled if shown, then tap Add.'}</li></>:<><li>{hi?'Chrome या Edge में यह वेबसाइट खोलें।':'Open this website in Chrome or Edge.'}</li><li>{hi?'ब्राउज़र के मेनू में “ऐप इंस्टॉल करें” या “होम स्क्रीन पर जोड़ें” चुनें।':'In the browser menu, choose “Install app” or “Add to Home screen”.'}</li><li>{hi?'इंस्टॉल की पुष्टि करें। यदि विकल्प न दिखे तो थोड़ी देर बाद ऑनलाइन पुनः प्रयास करें।':'Confirm installation. If the option is missing, stay online and try again shortly.'}</li></>}</ol>}
 <p className="small muted">{hi?'इंटरनेट के बिना पढ़ने के लिए पहले इच्छित पृष्ठ ऑनलाइन खोलें। पहली बार मार्गदर्शन लेने के लिए इंटरनेट चाहिए; उसके बाद डाउनलोड हुए साधन ऑफलाइन काम कर सकते हैं।':'Visit the pages you want to read while online first. Guidance needs an initial online download; downloaded guidance assets can then work offline.'}</p><p role="status">{message}</p>
 </dialog></>;
}
