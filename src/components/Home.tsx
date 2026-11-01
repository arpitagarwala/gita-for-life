'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Icon from './Icon';
import { useLanguage } from './Language';
import { CHAPTERS_HI } from '@/data/chapters-hi';
import { TOPICS, type Topic } from '@/data/guidance';
import Guidance from './Guidance';
type Chapter = {
    chapter: number;
    name: string;
    nameEnglish: string;
    versesCount: number;
    summary: string;
};
type Verse = {
    chapter: number;
    verse: number;
    sanskrit: string;
    meaning: string;
    meaningHindi: string;
    transliteration: string;
};
type Note = {
    id: string;
    date: string;
    text: string;
};
const examples = ['I’m worried about my exams', 'I feel overwhelmed at work', 'I want more peace at home'];
export default function Home({ chapters }: {
    chapters: Chapter[];
}) {
    const { language, tr } = useLanguage();
    const [guidanceRequest,setGuidanceRequest]=useState<{text:string;nonce:number}|null>(null);
    const [search, setSearch] = useState('');
    const [verses, setVerses] = useState<Verse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [saved, setSaved] = useState<string[]>([]);
    const [last, setLast] = useState('');
    const [notes, setNotes] = useState<Note[]>([]);
    const [note, setNote] = useState('');
    const [message, setMessage] = useState('');
    const [practiceTab, setPracticeTab] = useState('reflections');
    const [audience, setAudience] = useState('Everyone');
    useEffect(() => { try {
        const b = JSON.parse(localStorage.getItem('gita-saved-v1') || '[]');
        if (Array.isArray(b))
            setSaved(b.filter(x => typeof x === 'string'));
        const n = JSON.parse(localStorage.getItem('gita-notes-v1') || '[]');
        if (Array.isArray(n))
            setNotes(n.filter(x => x && typeof x.text === 'string' && typeof x.id === 'string'));
        setLast(localStorage.getItem('gita-last-v1') || '');
    }
    catch { } }, []);
    async function load() { if (verses.length || loading)
        return; setLoading(true); setError(''); try {
        const response = await fetch('/gita.json');
        if (!response.ok)
            throw Error();
        setVerses(await response.json());
    }
    catch {
        setError('The verse library could not load. Check your connection and try again.');
    }
    finally {
        setLoading(false);
    } }
    function guide(value:string,_topic?:Topic){setGuidanceRequest(previous=>({text:tr(value),nonce:(previous?.nonce||0)+1}));}
    function saveNote() { if (!note.trim())
        return; const next = [{ id: Date.now().toString(), date: new Date().toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), text: note.trim() }, ...notes]; try {
        localStorage.setItem('gita-notes-v1', JSON.stringify(next));
        setNotes(next);
        setNote('');
        setMessage('Reflection saved on this device.');
    }
    catch {
        setMessage('Your browser could not save this reflection. Please copy it somewhere safe.');
    } }
    function remove(id: string) { const next = notes.filter(n => n.id !== id); try {
        localStorage.setItem('gita-notes-v1', JSON.stringify(next));
        setNotes(next);
    }
    catch {
        setMessage('Could not update device storage.');
    } }
    function exportNotes() { const blob = new Blob([notes.map(n => n.date + '\n' + n.text).join('\n\n---\n\n')], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'my-gita-reflections.txt'; a.click(); URL.revokeObjectURL(url); }
    const q = search.trim().toLowerCase();
    const results = q ? verses.filter(v => [v.chapter + '.' + v.verse, v.sanskrit, v.meaning, v.meaningHindi, v.transliteration].some(t => t.toLowerCase().includes(q))) : [];
    return <main id="main">
 <section className="hero section-width"><div className="hero-copy"><span className="eyebrow"><span className="tiny-line"/>{tr(" AN ANCIENT CONVERSATION. A NEW PERSPECTIVE.")}</span><h1>{tr("Life has questions.")}<br />{tr("Find a little ")}<em>{tr("clarity.")}</em></h1><p className="hero-description">{tr("The wisdom of the Bhagavad Gita, for the life you live today. Read, reflect, and find your next step\u2014one shloka at a time.")}</p><div className="hero-actions"><a className="button primary" href="#guidance">{tr("Find guidance ")}<Icon name="arrow" size={19}/></a><a className="button secondary" href="#chapters"><Icon name="book" size={19}/>{tr(" Explore the Gita")}</a></div><div className="hero-facts"><span><Icon name="check" size={15}/>{tr(" Always free")}</span><span><Icon name="check" size={15}/>{tr(" No sign-up")}</span><span><Icon name="check" size={15}/>{tr(" For everyone")}</span></div></div>
 <div className="hero-art"><svg viewBox="0 0 560 440" role="img" aria-label={tr("A peaceful sunrise over layered hills and a lotus")}><defs><linearGradient id="sky" x2="0" y2="1"><stop stopColor="#eee8d9"/><stop offset="1" stopColor="#f9f5ea"/></linearGradient><linearGradient id="hill" x2="0" y2="1"><stop stopColor="#587262"/><stop offset="1" stopColor="#294f41"/></linearGradient><pattern id="lines" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M0 12 12 0" stroke="#fff" strokeOpacity=".04"/></pattern></defs><path d="M30 400V220C30-40 530-40 530 220v180Z" fill="url(#sky)"/><circle cx="282" cy="159" r="77" fill="#d5a35c"/><circle cx="282" cy="159" r="94" fill="none" stroke="#d5a35c" opacity=".25"/><circle cx="282" cy="159" r="114" fill="none" stroke="#d5a35c" opacity=".15"/><path d="M30 280Q130 150 239 249T530 219V400H30Z" fill="#bdc6ae"/><path d="M30 315Q169 230 278 288T530 260V400H30Z" fill="#899d83"/><path d="M30 357Q137 275 280 325T530 310V400H30Z" fill="url(#hill)"/><path d="M30 375Q180 335 310 373T530 350v50H30Z" fill="#244e40"/><path d="M30 400V220C30-40 530-40 530 220v180Z" fill="url(#lines)"/><g stroke="#f9f5ea" strokeWidth="1.3" fill="none" opacity=".6"><path d="M282 354q-55-26 0-92 55 66 0 92Z"/><path d="M282 354q-72 2-74-68 64 16 74 68Z"/><path d="M282 354q72 2 74-68-64 16-74 68Z"/><path d="M282 354q-76 25-105-32 62-11 105 32Z"/><path d="M282 354q76 25 105-32-62-11-105 32Z"/></g><path d="m99 140 12-5 12 5m294-32 10-5 10 5" fill="none" stroke="#6c7965" strokeWidth="2"/><path d="M12 402h536" stroke="#d4cebe"/></svg><div className="art-caption"><span className="caption-line"/>{tr(" STILLNESS WITHIN. POSSIBILITY AHEAD.")}</div></div></section>
 <div className="intro-band"><div className="section-width intro-inner"><span><strong>18</strong>{tr(" chapters to explore")}</span><span><strong>700+</strong>{tr(" shlokas of wisdom")}</span><span><Icon name="people" size={20}/>{tr(" One shared human journey")}</span><span className="intro-sanskrit" lang="sa">योगः कर्मसु कौशलम् <small>{tr("Yoga is skill in action \u00B7 2.50")}</small></span></div></div>
 <section id="guidance" className="section-width guidance-section"><div className="section-heading"><div><span className="eyebrow">{tr("A PLACE TO BEGIN")}</span><h2>{tr("What\u2019s on your mind?")}</h2></div><p>{tr("You don\u2019t need the perfect words.")}<br />{tr("Start with what you\u2019re feeling.")}</p></div><Guidance requested={guidanceRequest} daily={<aside className="daily-card"><div className="daily-heading"><Icon name="sun" size={20}/><span>{tr("A MOMENT OF WISDOM")}</span><span className="pill">{tr("TODAY")}</span></div><span className="quote-mark">“</span><p className="daily-sanskrit" lang="sa">कर्मण्येवाधिकारस्ते<br />मा फलेषु कदाचन।</p><blockquote>{tr("Focus on the work that is yours to do, without claiming its fruits.")}</blockquote><p className="small">{tr("A reflection on Bhagavad Gita 2.47")}</p><Link className="text-link" href="/2/47">{tr("Sit with this shloka ")}<Icon name="arrow" size={18}/></Link></aside>} onReflect={value=>{setNote(value);setPracticeTab('reflections');}}/>
 <div className="topics-heading"><h3>{tr("Or explore what you\u2019re navigating")}</h3><span className="small muted">{tr("Everyday life. Timeless perspectives.")}</span></div><div className="topic-grid">{TOPICS.map(t => <button className="topic-card" key={t.id} onClick={() => guide(tr(t.title), t)}><span className={'topic-icon ' + t.id}><Icon name={t.icon}/></span><span><strong>{tr(t.title)}</strong><small>{tr(t.description)}</small></span><span className="topic-arrow">↗</span></button>)}</div></section>
 <section className="audience-section"><div className="section-width"><span className="eyebrow">{tr("DIFFERENT LIVES. SHARED QUESTIONS.")}</span><h2>{tr("Wisdom that meets you where you are.")}</h2><div className="audience-tabs" role="group" aria-label={tr("Explore guidance for your life")}>{['Everyone', 'Students', 'Professionals', 'Home & family'].map(a => <button className={audience === a ? 'selected' : ''} aria-pressed={audience === a} onClick={() => setAudience(a)} key={a}>{tr(a)}</button>)}</div><p className="audience-description">{audience === 'Students' ? tr("Exams, distractions, comparison, and the pressure to choose a future. Start with a little focus and faith in your effort.") : audience === 'Professionals' ? tr("Deadlines, difficult decisions, and a search for meaningful work. Explore responsibility with balance and care.") : audience === 'Home & family' ? tr("Caring for others, sharing responsibilities, and finding a moment for yourself. Your everyday efforts matter.") : tr("Whether you\u2019re finding your path, building a career, caring for a home, or simply trying to understand yourself\u2014there\u2019s a place for you here.")}</p><button className="text-link" onClick={() => { const t = TOPICS.find(t => t.id === (audience === 'Students' ? 'focus' : audience === 'Professionals' ? 'work' : audience === 'Home & family' ? 'relationships' : 'purpose'))!; guide(t.title, t); }}>{tr("Explore a relevant perspective ")}<Icon name="arrow" size={18}/></button></div></section>
 <section id="chapters" className="section-width library-section"><div className="section-heading"><div><span className="eyebrow">{tr("THE COMPLETE BHAGAVAD GITA")}</span><h2>{tr("A conversation worth returning to.")}</h2></div><p>{tr("Sanskrit, transliteration, English & Hindi.")}<br />{tr("Read at your own pace.")}</p></div><div className="library-toolbar"><label className="search-box"><Icon name="search"/><input value={search} onFocus={() => void load()} onChange={e => { setSearch(e.target.value); void load(); }} placeholder={tr("Search a word, feeling, or verse (e.g. 2.47)")} aria-label={tr("Search all verses")}/>{search && <button onClick={() => setSearch('')} aria-label={tr("Clear search")}>×</button>}</label>{last && /^\d+\/\d+$/.test(last) ? <Link className="text-link" href={'/' + last}>{tr("Continue ")}{last.replace('/', '.')} <Icon name="arrow" size={18}/></Link> : <Link className="text-link" href="/1/1">{tr("Begin reading ")}<Icon name="arrow" size={18}/></Link>}</div>{q ? <div className="search-results" aria-live="polite">{loading ? <p>{tr("Searching the library\u2026")}</p> : error ? <p>{error}<button onClick={() => void load()}>{tr("Retry")}</button></p> : <><p>{results.length}{tr(" matching shlokas")}{results.length > 30 ? tr(" \u00B7 Showing the first 30") : ''}</p>{results.slice(0, 30).map(v => <Link className="search-result" href={'/' + v.chapter + '/' + v.verse} key={v.chapter + '.' + v.verse}><strong>{v.chapter}.{v.verse}</strong><span>{(language === 'hi' ? v.meaningHindi : v.meaning).slice(0, 230)}</span><Icon name="arrow" size={17}/></Link>)}{!results.length && <p>{tr("Try a simpler word such as \u201Cmind\u201D, \u201Caction\u201D, \u201Cpeace\u201D, or a reference such as \u201C6.26\u201D.")}</p>}</>}</div> : <div className="chapter-grid">{chapters.map(c => <Link className="chapter-card" href={'/' + c.chapter} key={c.chapter}><span className="chapter-number">{String(c.chapter).padStart(2, '0')}</span><div><small className="chapter-sanskrit" lang="sa">{c.name}</small><h3>{language === 'hi' ? CHAPTERS_HI[c.chapter].title : c.nameEnglish}</h3><span className="small muted">{c.versesCount}{tr(" shlokas")}</span></div><span className="chapter-arrow">↗</span></Link>)}</div>}<p className="library-note small muted">{tr("The traditional count is 700. This edition includes Arjuna\u2019s opening question in chapter 13, giving 701 entries.")}</p></section>
 <section id="practice" className="practice-section"><div className="section-width"><div className="section-heading"><div><span className="eyebrow">{tr("MAKE THE WISDOM YOUR OWN")}</span><h2>{tr("A small practice. A lasting difference.")}</h2></div><p>{tr("No streak to chase. No perfect way to begin.")}<br />{tr("Just a little space for yourself.")}</p></div><div className="practice-layout"><div className="practice-intro"><span className="soft-icon"><Icon name="pen" size={27}/></span><h3>{tr("Read. Pause. Reflect.")}</h3><p>{tr("What stood out to you today? What could you try a little differently tomorrow?")}</p><p className="small muted">{tr("Keep the thoughts you want to return to. Export your reflections whenever you\u2019d like a copy.")}</p><div className="practice-tabs"><button className={practiceTab === 'reflections' ? 'selected' : ''} onClick={() => setPracticeTab('reflections')}>{tr("Reflections (")}{notes.length})</button><button className={practiceTab === 'saved' ? 'selected' : ''} onClick={() => setPracticeTab('saved')}>{tr("Saved shlokas (")}{saved.length})</button></div></div><div className="journal-card">{practiceTab === 'reflections' ? <><label htmlFor="reflection">{tr("A moment for your thoughts")}</label><textarea id="reflection" rows={5} value={note} onChange={e => setNote(e.target.value)} placeholder={tr("Today, I\u2019m learning to\u2026")} maxLength={10000}/><div className="journal-actions"><span className="small muted">{tr("Your private reflections")}</span><button className="button primary" onClick={saveNote} disabled={!note.trim()}>{tr("Save reflection ")}<Icon name="check" size={18}/></button></div><p role="status" className="small">{tr(message)}</p>{notes.length > 0 && <><button className="text-link" onClick={exportNotes}>{tr("Export my reflections \u2193")}</button><div className="notes">{notes.map(n => <article key={n.id}><time className="small muted">{n.date}</time><p>{n.text}</p><button className="small" onClick={() => remove(n.id)} aria-label={tr('Delete reflection from') + ' ' + n.date}>{tr("Delete reflection")}</button></article>)}</div></>}</> : <><h3>{tr("Your saved shlokas")}</h3>{saved.length ? saved.map(ref => <Link className="search-result" key={ref} href={'/' + ref.replace('.', '/')}><Icon name="bookmark"/><span>{tr("Bhagavad Gita ")}{ref}</span><Icon name="arrow" size={18}/></Link>) : <p>{tr("Keep a verse close. Open any shloka in the reader and choose \u201CSave shloka\u201D to find it here.")}</p>}<a href="#chapters" className="text-link">{tr("Explore the chapters ")}<Icon name="arrow" size={18}/></a></>}</div></div></div></section>
 <section className="closing section-width"><Icon name="leaf" size={27}/><p>{tr("You don\u2019t have to figure out your whole life today.")}</p><span>{tr("Begin with one thought. One shloka. One small step.")}</span></section>
 </main>;
}
