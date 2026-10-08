/* FilRouge — service worker : l'app fonctionne hors ligne, les données se mettent à jour en ligne. */
const VERSION = "filrouge-1.2.0";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon.svg", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./icons/icon-180.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // API Claude, liens externes : réseau direct
  const fresh = req.mode === "navigate" || url.pathname.endsWith("/data/meta.json") || url.pathname.endsWith("/data/works.json") || url.pathname.endsWith("/data/press.json") || url.pathname.endsWith("/index.html");
  if (fresh) {
    // réseau d'abord, copie locale si hors ligne
    e.respondWith(fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req.mode === "navigate" ? "./index.html" : req, copy)); }
      return res;
    }).catch(() => caches.match(req.mode === "navigate" ? "./index.html" : req, { ignoreSearch:true })));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch:true }).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  })));
});
