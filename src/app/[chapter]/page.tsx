import type {Metadata} from 'next';
import ChapterContent from '@/components/ChapterContent';
import {notFound} from 'next/navigation';
import {GITA_CHAPTERS,getChapter} from '@/data/gita';
type Props={params:Promise<{chapter:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return GITA_CHAPTERS.map(c=>({chapter:String(c.chapter)}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {chapter}=await params;const c=getChapter(Number(chapter));return c?{title:'Chapter '+c.chapter+': '+c.nameEnglish,description:c.summary.slice(0,155),alternates:{canonical:'/'+chapter}}:{};}
export default async function ChapterPage({params}:Props){const {chapter}=await params;const c=getChapter(Number(chapter));if(!c)notFound();return <ChapterContent chapter={{chapter:c.chapter,name:c.name,nameEnglish:c.nameEnglish,summary:c.summary,verses:c.verses.map(({verse,sanskrit,meaning,meaningHindi})=>({verse,sanskrit,meaning,meaningHindi}))}}/>;}