'use client';
import Link from 'next/link';
import Reader from './Reader';
import {useLanguage} from './Language';
import {CHAPTERS_HI} from '@/data/chapters-hi';
import type {Explanation} from '@/data/explanations';
import type {StudyNote} from '@/data/study-notes';
type Props={chapter:number;verse:number;nameEnglish:string;sanskrit:string;transliteration:string;meaning:string;meaningHindi:string;explanation:Explanation;study:StudyNote;englishSource?:string;hindiSource?:string;previous:string|null;next:string|null;topics:{title:string;connection:string;refs:string[]}[]};
export default function VerseContent(p:Props){
 const {language,tr}=useLanguage();
 const refs=[...new Set(p.topics.flatMap(t=>t.refs))].filter(r=>r!==p.chapter+'.'+p.verse);
 return <main id="main" className="reader-wrap"><nav className="breadcrumb" aria-label={tr('Breadcrumb')}><Link href="/">{tr('Home')}</Link><span>/</span><Link href={'/'+p.chapter}>{tr('Chapter')} {p.chapter}</Link><span>/ {tr('Shloka')} {p.verse}</span></nav><header className="reader-heading"><span className="eyebrow">{language==='hi'?CHAPTERS_HI[p.chapter].title:p.nameEnglish}</span><h1>{tr('Shloka')} {p.chapter}.{p.verse}</h1><Link className="text-link" href={'/'+p.chapter}>{tr('See the full chapter ↗')}</Link></header><Reader {...p}/>{p.topics.length>0&&<section className="reader-related"><span className="eyebrow">{tr('Read together')}</span><h2>{tr('See the connections.')}</h2>{p.topics.map(topic=><details key={topic.title} style={{marginTop:20}}><summary>{tr(topic.title)}</summary><p style={{marginTop:15}}>{tr(topic.connection)}</p></details>)}<div className="related-links">{refs.map(r=><Link key={r} href={'/'+r.replace('.','/')}>{tr('Shloka')} {r} ↗</Link>)}</div></section>}</main>;
}
