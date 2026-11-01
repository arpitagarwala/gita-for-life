'use client';
import Link from 'next/link';
import {useLanguage} from './Language';
import {CHAPTERS_HI} from '@/data/chapters-hi';
type Chapter={chapter:number;name:string;nameEnglish:string;summary:string;verses:{verse:number;sanskrit:string;meaning:string;meaningHindi:string}[]};
export default function ChapterContent({chapter:c}:{chapter:Chapter}){
 const {language,tr}=useLanguage();
 const title=language==='hi'?CHAPTERS_HI[c.chapter].title:c.nameEnglish;
 return <main id="main" className="reader-wrap"><nav className="breadcrumb" aria-label={tr('Breadcrumb')}><Link href="/">{tr('Home')}</Link><span>/</span><Link href="/#chapters">{tr('Bhagavad Gita')}</Link><span>/ {tr('Chapter')} {c.chapter}</span></nav><header className="reader-heading"><span className="eyebrow">{tr('Chapter')} {c.chapter} · {c.verses.length} {tr('shlokas')}</span><h1>{title}</h1><p lang="sa" className="sanskrit">{c.name}</p><p className="chapter-summary">{language==='hi'?CHAPTERS_HI[c.chapter].summary:c.summary}</p><Link className="button primary" href={'/'+c.chapter+'/1'}>{tr('Begin this chapter')} →</Link></header><div className="verse-list">{c.verses.map(v=>{const meaning=language==='hi'?v.meaningHindi:v.meaning;return <Link href={'/'+c.chapter+'/'+v.verse} key={v.verse}><strong>{tr('Shloka')} {c.chapter}.{v.verse} ↗</strong><p className="sanskrit" lang="sa">{v.sanskrit.split('\n').slice(0,2).join('\n')}</p><p lang={language}>{meaning.slice(0,200)}{meaning.length>200?'…':''}</p></Link>;})}</div><nav className="verse-navigation" aria-label={tr('Chapter navigation')}>{c.chapter>1?<Link href={'/'+(c.chapter-1)}>← {tr('Chapter')} {c.chapter-1}</Link>:<Link href="/">← {tr('Home')}</Link>}{c.chapter<18&&<Link href={'/'+(c.chapter+1)}>{tr('Chapter')} {c.chapter+1} →</Link>}</nav></main>;
}
