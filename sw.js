/* Kütüphane PWA Service Worker */
const VERSION = "v4";
const SHELL_CACHE = `kutuphane-shell-${VERSION}`;
const ASSET_CACHE = `kutuphane-assets-${VERSION}`;

const SHELL_FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== SHELL_CACHE && k !== ASSET_CACHE)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Cross-origin (PDF.js CDN, fonts) — stale-while-revalidate
  if (url.origin !== self.location.origin) {
    event.respondWith(staleWhileRevalidate(req, ASSET_CACHE));
    return;
  }

  // Navigation requests — network falling back to cached index.html
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() =>
        caches.match("./index.html").then((r) => r || caches.match("./"))
      )
    );
    return;
  }

  // PDFs and book covers — cache-first (large, immutable assets)
  if (/\.(pdf|jpg|jpeg|png|webp|gif|svg)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(req, ASSET_CACHE));
    return;
  }

  // Shell files (css, js, manifest, html) — network-first.
  // Geliştirmede eski cache'in takılı kalmaması için ağı önceleriz; offline'da cache devreye girer.
  event.respondWith(networkFirst(req, SHELL_CACHE));
});

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res && res.status === 200) cache.put(req, res.clone());
    return res;
  } catch (err) {
    // Önce birebir eşleşme; yoksa query string'i (cache-bust ?v=...) yok say.
    const cached =
      (await cache.match(req)) ||
      (await cache.match(req, { ignoreSearch: true }));
    return cached || Response.error();
  }
}

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res && res.status === 200) cache.put(req, res.clone());
    return res;
  } catch (err) {
    return cached || Response.error();
  }
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  const fetchPromise = fetch(req)
    .then((res) => {
      if (res && res.status === 200) cache.put(req, res.clone());
      return res;
    })
    .catch(() => null);
  return cached || (await fetchPromise) || Response.error();
}

self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") self.skipWaiting();
});
