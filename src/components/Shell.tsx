'use client';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {LanguageProvider,useLanguage,type Language} from './Language';
import Icon from './Icon';
import InstallApp from './InstallApp';
import Motion from './Motion';

export default function Shell({children}:{children:React.ReactNode}) {
 return <LanguageProvider><ShellContent>{children}</ShellContent></LanguageProvider>;
}
function ShellContent({children}:{children:React.ReactNode}) {
 const {language,setLanguage,tr}=useLanguage();
 const [dark,setDark]=useState(false);
 const [large,setLarge]=useState(false);
 const [update,setUpdate]=useState<ServiceWorker|null>(null);
 const updateRequested=useRef(false);
 useEffect(()=>{
  if(!('serviceWorker' in navigator))return;
  let active=true;let registration:ServiceWorkerRegistration|undefined;
  let installing:ServiceWorker|null=null;
  const check=()=>{if(active&&registration?.waiting&&navigator.serviceWorker.controller)setUpdate(registration.waiting);};
  const found=()=>{installing?.removeEventListener('statechange',check);installing=registration?.installing??null;installing?.addEventListener('statechange',check);};
  navigator.serviceWorker.ready.then(reg=>{if(!active)return;registration=reg;check();found();reg.addEventListener('updatefound',found);});
  let reloading=false;let activating:ServiceWorker|null=null;
  const reloadWhenActive=()=>{if(activating?.state==='activated'){activating.removeEventListener('statechange',reloadWhenActive);window.location.reload();}};
  const changed=()=>{
   if(reloading||!updateRequested.current)return;
   reloading=true;activating=navigator.serviceWorker.controller;
   if(!activating||activating.state==='activated')window.location.reload();
   else activating.addEventListener('statechange',reloadWhenActive);
  };
  navigator.serviceWorker.addEventListener('controllerchange',changed);
  return()=>{active=false;registration?.removeEventListener('updatefound',found);installing?.removeEventListener('statechange',check);activating?.removeEventListener('statechange',reloadWhenActive);navigator.serviceWorker.removeEventListener('controllerchange',changed);};
 },[]);
 useEffect(()=>{try{const d=localStorage.getItem('gita-theme');const night=d?d==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;setDark(night);document.documentElement.dataset.theme=night?'dark':'light';const bigger=localStorage.getItem('gita-large')==='true';setLarge(bigger);document.documentElement.dataset.large=String(bigger);}catch{}if('serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js').catch(()=>{});},[]);
 function theme(){const next=!dark;setDark(next);document.documentElement.dataset.theme=next?'dark':'light';try{localStorage.setItem('gita-theme',next?'dark':'light');}catch{}}
 function font(){const next=!large;setLarge(next);document.documentElement.dataset.large=String(next);try{localStorage.setItem('gita-large',String(next));}catch{}}
 return <>
 <a className="skip" href="#main">{tr('Skip to content')}</a>
 <header className="site-header"><div className="nav-wrap">
 <Link className="brand" href="/" aria-label={tr('Gita for Life home')}><span className="brand-icon"><Icon name="book" size={25}/></span><span>{tr('Gita')}<span className="brand-light"> {tr('for Life')}</span><small>{tr('WISDOM FOR THE EVERYDAY')}</small></span></Link>
 <nav aria-label={tr('Main navigation')}><Link href="/#guidance">{tr('Find guidance')}</Link><Link href="/#chapters">{tr('Read the Gita')}</Link><Link href="/#practice">{tr('My practice')}</Link><span id="app-install"><InstallApp/></span></nav>
 <div className="nav-tools"><select className="language-select" value={language} onChange={e=>setLanguage(e.target.value as Language)} aria-label={tr('App language')}><option value="en">English</option><option value="hi">हिन्दी</option></select><button className="icon-button text-size" onClick={font} aria-pressed={large} aria-label={tr('Toggle larger text')}>A<span>A</span></button><button className="icon-button" onClick={theme} aria-label={tr(dark?'Use day mode':'Use night mode')}><Icon name={dark?'sun':'moon'}/></button></div>
 </div></header>
 <Motion/>{children}
 {update&&<div className="update-notice" role="status"><span>{language==='hi'?'नया संस्करण उपलब्ध है। पहले अपना मनन सहेज लें।':'An update is ready. Save your reflection first.'}</span><button onClick={()=>{updateRequested.current=true;update.postMessage({type:'ACTIVATE_UPDATE'});}}>{language==='hi'?'अपडेट करें':'Update app'}</button></div>}
 <footer className="site-footer"><div className="footer-top"><Link className="brand" href="/"><Icon name="book"/><span>{tr('Gita for Life')}</span></Link><span>{tr('A little wisdom. A little practice. Every day.')}</span><Link href="/about">{tr('About, sources & privacy ↗')}</Link></div><div className="footer-bottom"><span>{tr('Free to explore. Open to everyone.')}</span><span>{tr('Built by')} arpitagarwala · <a href="https://arpitagarwala.com" target="_blank" rel="noopener noreferrer">arpitagarwala.com</a></span></div></footer>
 </>;
}
