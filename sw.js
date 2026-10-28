'use strict';
/* Cache only public app shells, never authenticated responses or user records. */
const CACHE='avocat-qalam-shell-v1';
const SHELL=['./office.html','./app.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(names=>Promise.all(names.filter(n=>n.startsWith('avocat-qalam-shell-')&&n!==CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin||req.mode!=='navigate')return;
  const page=url.pathname.split('/').pop();
  if(page!=='office.html'&&page!=='office-rachid.html')return;
  event.respondWith(fetch(req).then(response=>{
    if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(req,copy)));}
    return response;
  }).catch(()=>caches.match(req).then(cached=>cached||new Response('App unavailable offline until it has been opened once online.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}}))));
});
