var CACHE_NAME = "my-pwa-cache-v1";
var urlsToCache = ["/", "./index.html", "./src/App.tsx"];
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        return response || fetch(event.request);
      })
      .then((data) => {
        return caches.open("dynamic").then((cache) => {
          cache.put(event.request.url, data.clone());
          return data;
        });
      })
  );
});
