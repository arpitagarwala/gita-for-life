'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

export default function Motion(){
 const pathname=usePathname();
 useEffect(()=>{
  if(!('serviceWorker' in navigator))return;
  let active=true;
  navigator.serviceWorker.ready.then(registration=>{if(active)registration.active?.postMessage({type:'CACHE_PAGE',path:pathname});});
  return()=>{active=false;};
 },[pathname]);
 useEffect(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches||!('IntersectionObserver' in window))return;
  const selector='main > section, .section-width > .section-heading, .chapter-card, .topic-card, .verse-list > a, .reader-card, .reader-related, .journal-card';
  const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}},{threshold:.06});
  function watch(root:ParentNode){root.querySelectorAll<HTMLElement>(selector).forEach(element=>{if(element.dataset.reveal)return;element.dataset.reveal='true';observer.observe(element);});}
  watch(document);
  const mutations=new MutationObserver(()=>watch(document));mutations.observe(document.body,{childList:true,subtree:true});
  const change=()=>{if(reduced.matches){document.querySelectorAll('[data-reveal]').forEach(el=>el.classList.add('is-visible'));observer.disconnect();}};
  reduced.addEventListener('change',change);
  return()=>{observer.disconnect();mutations.disconnect();reduced.removeEventListener('change',change);document.querySelectorAll('[data-reveal]').forEach(el=>{delete (el as HTMLElement).dataset.reveal;el.classList.remove('is-visible');});};
 },[pathname]);
 return null;
}
