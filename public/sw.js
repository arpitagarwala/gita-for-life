const CACHE='gita-for-life-v5';
const CORE=['/','/gita.json','/icon.svg','/icons/icon-192.png','/icons/icon-512.png','/manifest.webmanifest','/offline.html'];
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);await cache.addAll(CORE);
 const response=await cache.match('/');const html=await response.text();
 const assets=[...new Set([...html.matchAll(/(?:src|href)="(\/_next\/[^\"]+)"/g)].map(m=>m[1].replaceAll('&amp;','&')))];
 await cache.addAll(assets);
})()));
self.addEventListener('message',event=>{
 if(event.data?.type==='ACTIVATE_UPDATE')self.skipWaiting();
 // Client navigation requests a reading payload rather than a full document.
 // Save the document too, so reopening a visited verse works while offline.
 const path=event.data?.path;
 if(event.data?.type==='CACHE_PAGE'&&typeof path==='string'&&/^\/(?:about|\d{1,2}(?:\/\d{1,2})?)?$/.test(path))event.waitUntil((async()=>{
  try{
   const response=await fetch(new Request(new URL(path,self.location.origin),{headers:{Accept:'text/html'}}));
   if(!response.ok||!response.headers.get('Content-Type')?.includes('text/html'))return;
   const html=await response.clone().text();const cache=await caches.open(CACHE);await cache.put(path,response);
   const assets=[...new Set([...html.matchAll(/(?:src|href)="(\/_next\/[^\"]+)"/g)].map(m=>m[1].replaceAll('&amp;','&')))];
   await Promise.all(assets.map(async asset=>{if(!await cache.match(asset))await cache.addAll([asset]);}));
  }catch{/* A future online visit can retry saving this page. */}
 })());
});
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 const keys=await caches.keys();await Promise.all(keys.filter(key=>key.startsWith('gita-for-life-')&&key!==CACHE).map(key=>caches.delete(key)));
 await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 const request=event.request;const url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin)return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);const cached=await cache.match(request);
  if(cached&&(url.pathname.startsWith('/_next/static/')||url.pathname.startsWith('/guidance/')))return cached;
  try{
   const response=await fetch(request,{signal:AbortSignal.timeout(6000)});
   if(response.ok&&!response.redirected)await cache.put(request,response.clone());
   if(response.status>=500&&cached)return cached;
   return response;
  }catch{return cached||(request.mode==='navigate'?await cache.match('/offline.html'):null)||new Response('Offline',{status:503,headers:{'Content-Type':'text/plain'}});}
 })());
});
