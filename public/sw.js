const CACHE='gita-for-life-v7';
const CORE=['/','/gita.json','/icon.svg','/icons/icon-192.png','/icons/icon-512.png','/manifest.webmanifest','/offline'];
// Redirected cached responses cannot satisfy a navigation whose redirect mode is manual.
function navigationSafe(response){return response?.redirected?new Response(response.body,{status:response.status,statusText:response.statusText,headers:response.headers}):response;}
function pagePath(path){return typeof path==='string'&&/^\/(?:about|\d{1,2}(?:\/\d{1,2})?)?$/.test(path);}
function pageAssets(html){return [...new Set([...html.matchAll(/(?:src|href)="(\/_next\/[^\"]+)"/g)].map(m=>m[1].replaceAll('&amp;','&')))];}
async function cachePage(path){
 if(!pagePath(path))return;
 try{
  const response=await fetch(new Request(new URL(path,self.location.origin),{headers:{Accept:'text/html'},signal:AbortSignal.timeout(10000)}));
  if(!response.ok||!response.headers.get('Content-Type')?.includes('text/html'))return;
  const html=await response.clone().text();const cache=await caches.open(CACHE);await cache.put(path,navigationSafe(response));
  await Promise.all(pageAssets(html).map(async asset=>{if(!await cache.match(asset))await cache.addAll([asset]);}));
 }catch{/* The saved app shell remains available if the connection is lost. */}
}
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);await cache.addAll(CORE);
 const response=await cache.match('/');await cache.addAll(pageAssets(await response.text()));
})()));
self.addEventListener('message',event=>{
 if(event.data?.type==='CACHE_PAGE')event.waitUntil(cachePage(event.data.path));
 if(event.data?.type==='ACTIVATE_UPDATE')event.waitUntil((async()=>{await cachePage(event.data.path);await self.skipWaiting();})());
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
  const safeCached=request.mode==='navigate'?navigationSafe(cached):cached;
  if(cached&&(url.pathname.startsWith('/_next/static/')||url.pathname.startsWith('/guidance/')))return cached;
  try{
   const response=await fetch(request,{signal:AbortSignal.timeout(6000)});
   if(response.ok&&!response.redirected)await cache.put(request,response.clone());
   if(response.status>=500&&safeCached)return safeCached;
   return response;
  }catch{return safeCached||(request.mode==='navigate'?navigationSafe(await cache.match('/offline')):null)||new Response('Offline',{status:503,headers:{'Content-Type':'text/plain'}});}
 })());
});
