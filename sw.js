// Bump version when deploying updates so users get fresh content
const CACHE_NAME = 'mafaheem-v2';
const urlsToCache = [
  './',
  './index.html',
  'https://fonts.googleapis.com/css2?family=Bangers&family=Amiri:wght@700&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
      .catch((err) => console.warn('Pre-cache failed:', err))
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

const OFFLINE_HTML = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>Offline</title><style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f0f2f5;color:#2c3e50;text-align:center;padding:20px}*{box-sizing:border-box}</style></head><body><div><h2>You\'re offline</h2><p>Mafaheem needs a connection to load. Visit the app once online, then it will work offline.</p></div></body></html>';

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const allowed = url.origin === location.origin ||
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com';
  if (allowed) {
    event.respondWith(
      caches.match(event.request)
        .then((cached) => {
          if (cached) return cached;
          return fetch(event.request).then((res) => {
            if (res.ok && res.type === 'basic') {
              const clone = res.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            }
            return res;
          }).catch(() => {
            if (event.request.destination === 'document' || event.request.mode === 'navigate') {
              return caches.match('./index.html')
                .then((r) => r || caches.match('./'))
                .then((r) => r || new Response(OFFLINE_HTML, { headers: { 'Content-Type': 'text/html' } }));
            }
            return new Response('Offline', { status: 503, statusText: 'Offline' });
          });
        })
    );
  }
});
