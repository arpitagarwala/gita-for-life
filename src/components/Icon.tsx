export default function Icon({name,size=22}:{name:string;size?:number}) {
 const paths:Record<string,React.ReactNode> = {
 book:<><path d="M12 5c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1Z"/><path d="M12 5v15"/></>,
 arrow:<path d="M4 12h16m-6-6 6 6-6 6"/>,
 sun:<><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>,
 moon:<path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z"/>,
 search:<><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
 heart:<path d="M20.8 4.6c-2.3-2.3-6-1.8-8.8 1.4C9.2 2.8 5.5 2.3 3.2 4.6c-4 4 .8 9.4 8.8 15.4 8-6 12.8-11.4 8.8-15.4Z"/>,
 leaf:<><path d="M20 3C5 1 1 11 7 17c6 6 16 2 13-14Z"/><path d="M4 21 16 9"/></>,
 bookmark:<path d="M6 3h12v19l-6-4-6 4Z"/>,
 spark:<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z"/>,
 check:<path d="m5 12 4 4L20 5"/>,
 sound:<path d="m11 4-6 5H2v6h3l6 5Zm4 4c3 2 3 6 0 8m3-11c5 4 5 10 0 14"/>,
 pen:<path d="m16 3 5 5-12 12-6 1 1-6ZM13 6l5 5"/>,
 people:<><circle cx="9" cy="7" r="3"/><path d="M2 21v-3a7 7 0 0 1 14 0v3m1-17a3 3 0 0 1 0 6m2 4a6 6 0 0 1 3 5v2"/></>,
 };
 return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]||paths.spark}</svg>;
}