'use client';
import {createContext,useCallback,useContext,useEffect,useMemo,useState} from 'react';
import {HINDI} from '@/data/hindi';
export type Language='en'|'hi';
type Locale={language:Language;setLanguage:(value:Language)=>void;tr:(text:string)=>string};
const LanguageContext=createContext<Locale|null>(null);
export function LanguageProvider({children}:{children:React.ReactNode}){
 const [language,setValue]=useState<Language>('en');
 useEffect(()=>{try{if(localStorage.getItem('gita-language')==='hi')setValue('hi');}catch{}},[]);
 useEffect(()=>{document.documentElement.lang=language;},[language]);
 const setLanguage=useCallback((value:Language)=>{setValue(value);try{localStorage.setItem('gita-language',value);}catch{}},[]);
 const tr=useCallback((text:string)=>language==='hi'?text.replace(text.trim(),HINDI[text.trim()]??text.trim()):text,[language]);
 const value=useMemo(()=>({language,setLanguage,tr}),[language,setLanguage,tr]);
 return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export function useLanguage(){const locale=useContext(LanguageContext);if(!locale)throw Error('LanguageProvider is required');return locale;}
