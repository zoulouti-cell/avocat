// Brand refresh 20261029b
'use strict';
/* Cache only public app shells, never authenticated responses or user records. */
const CACHE='avocat-qalam-shell-v7';
const SHELL=['./assets/office-hakim-emblem.png','./assets/office-rachid-emblem.png','./brand-theme.js?v=20261029f','./brand-theme.css?v=20261029f','./assets/brand-ar-light.webp','./assets/brand-ar-dark.webp','./assets/brand-la-light.png','./assets/brand-la-dark.webp','./office.html','./app.webmanifest','./icon-192.png','./icon-512.png','./header-controls.js?v=20261029','./header-controls.css?v=20261029','./party-form.js?v=20261029','./party-form.css?v=20261029'];
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
  if(url.origin!==self.location.origin)return;
  const asset=url.pathname.split('/').pop();
  if(req.mode!=='navigate'&&SHELL.some(path=>new URL(path,self.location.href).pathname===url.pathname)){event.respondWith(fetch(req).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(req,copy)))}return response}).catch(()=>caches.match(req).then(cached=>cached||new Response('',{status:503}))));return}

  if(['header-controls.js','header-controls.css','party-form.js','party-form.css'].includes(asset)){
    event.respondWith(fetch(req).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(req,copy)));}return response;}).catch(()=>caches.match(req)));
    return;
  }
  if(req.mode!=='navigate')return;
  const page=url.pathname.split('/').pop();
  if(page!=='office.html'&&page!=='office-rachid.html')return;
  event.respondWith(fetch(req).then(response=>{
    if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(req,copy)));}
    return response;
  }).catch(()=>caches.match(req).then(cached=>cached||new Response('App unavailable offline until it has been opened once online.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}}))));
});
