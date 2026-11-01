import Home from '@/components/Home';
import { GITA_CHAPTERS } from '@/data/gita';
export default function Page() {
 return <Home chapters={GITA_CHAPTERS.map(c => ({chapter:c.chapter,name:c.name,nameEnglish:c.nameEnglish,versesCount:c.verses.length,summary:c.summary}))} />;
}