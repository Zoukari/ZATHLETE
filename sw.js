// Network-first : l'app se met toujours à jour, le cache ne sert que hors ligne.
const CACHE = 'zathlete-v11';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      const c = r.clone();
      caches.open(CACHE).then(cache => cache.put(e.request, c)).catch(()=>{});
      return r;
    }).catch(() => caches.match(e.request))
  );
});
