// Service Worker mínimo, necessário para o navegador considerar
// o site "instalável" como PWA (ícone próprio + tela cheia).

const CACHE_NAME = "wakehub-v1";

self.addEventListener("install", (event) => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    self.clients.claim();
});

// Passa as requisições direto (sem cache agressivo, já que o site
// depende de conexão MQTT em tempo real)
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
