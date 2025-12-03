const CACHE_NAME = "site-cache-v1";
const FILES_TO_CACHE = [
  "/",              // home page
  "/index.html",
  "/styles.css",
  "/script.js",
  "/images/logo.png"
];

// Install Event - cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting(); // activate immediately
});

// Activate Event - clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// Fetch Event - serve from cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response OR fetch from internet
      return response || fetch(event.request);
    })
  );
});
