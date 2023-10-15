var CACHE_NAME = "expensify-service-worker-v1";
var urlsToCache = [
  "/",
  "./index.html",
  "/account",
  "/transaction",
  "/landing",
  "/transfer",
];
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (
            key !== "expensify-service-worker-v1" &&
            key !== "expensify-dynamic-v1"
          ) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        return response || fetch(event.request);
      })
      .then((data) => {
        return caches.open("expensify-dynamic-v1").then((cache) => {
          cache.put(event.request.url, data.clone());
          return data;
        });
      })
      .catch((error) => {
        if (error.message === "Failed to fetch") {
          console.log("Network connection lost");
        }
      })
  );
});
