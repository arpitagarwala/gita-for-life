import type {Metadata} from 'next';
import {getExplanation} from '@/data/explanations';
import {getStudyNote} from '@/data/study-notes';
import {notFound} from 'next/navigation';
import {GITA_CHAPTERS,getChapter,getVerse} from '@/data/gita';
import {TOPICS} from '@/data/guidance';
import VerseContent from '@/components/VerseContent';
type Props={params:Promise<{chapter:string;verse:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return GITA_CHAPTERS.flatMap(c=>c.verses.map(v=>({chapter:String(c.chapter),verse:String(v.verse)})));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {chapter,verse}=await params;const v=getVerse(Number(chapter),Number(verse));return v?{title:'Bhagavad Gita '+chapter+'.'+verse,description:v.meaning.slice(0,155),alternates:{canonical:'/'+chapter+'/'+verse}}:{};}
export default async function VersePage({params}:Props){const {chapter,verse}=await params;const c=getChapter(Number(chapter));const v=getVerse(Number(chapter),Number(verse));if(!c||!v)notFound();const pos=c.verses.findIndex(x=>x.verse===v.verse);const previous=pos>0?'/'+c.chapter+'/'+c.verses[pos-1].verse:c.chapter>1?'/'+(c.chapter-1)+'/'+getChapter(c.chapter-1)!.verses.at(-1)!.verse:null;const next=pos<c.verses.length-1?'/'+c.chapter+'/'+c.verses[pos+1].verse:c.chapter<18?'/'+(c.chapter+1)+'/1':null;const topics=TOPICS.filter(t=>t.refs.includes(c.chapter+'.'+v.verse)).map(({title,connection,refs})=>({title,connection,refs}));return <VerseContent chapter={c.chapter} verse={v.verse} nameEnglish={c.nameEnglish} sanskrit={v.sanskrit} transliteration={v.transliteration} meaning={v.meaning} meaningHindi={v.meaningHindi} explanation={getExplanation(c.chapter,v.verse)} study={getStudyNote(c.chapter,v.verse)} englishSource={v.englishSource} hindiSource={v.hindiSource} previous={previous} next={next} topics={topics}/>;}
