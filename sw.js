const CACHE_NAME = "dida-ji-cache-v29-unlimited-library";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./dida-ji.html",
  "./food-query.html",
  "./food-library.html",
  "./food-catalog.json",
  "./2026-09-17-食物评判逻辑说明-from%20Codex.md",
  "./manifest.webmanifest",
  "./icon.svg",
  "./assets/2026-09-17-滴答记水滴标识-from%20Codex.svg",
  "./assets/2026-09-17-冰咖啡抠图-v2-from%20Codex.png",
  "./assets/2026-09-17-番茄炒蛋抠图-v2-from%20Codex.png",
  "./assets/2026-09-17-蒸蛋抠图-v2-from%20Codex.png",
  "./assets/2026-09-17-清汤面抠图-v2-from%20Codex.png",
  "./assets/2026-09-17-牛油果抠图-v2-from%20Codex.png",
  "./assets/2026-09-17-日式饭团抠图-v2-from%20Codex.png",
  "./assets/2026-09-17-麻辣火锅抠图-v2-from%20Codex.png",
  "./assets/2026-06-26-bowel-icon-hard-pebbles-from-Codex.png",
  "./assets/2026-06-26-bowel-icon-lumpy-hard-from-Codex.png",
  "./assets/2026-06-26-bowel-icon-smooth-formed-from-Codex.png",
  "./assets/2026-06-26-bowel-icon-soft-mushy-from-Codex.png",
  "./assets/2026-06-26-bowel-icon-watery-from-Codex.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => {
      return caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        });
      });
    })
  );
});
