const cacheName = 'gas-chat-cache-v1';
const staticAssets = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json'
  // 必要に応じてアイコンなどのアセットも追加
];

self.addEventListener('install', async () => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(req) {
  const cachedResponse = await caches.match(req);
  return cachedResponse || fetch(req);
}
