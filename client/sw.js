var CACHE_NAME = "expensify-service-worker-v8";
var DYNAMIC_CACHE_NAME = "expensify-dynamic-v8";
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
          if (key !== CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  const excludedUrls = ["/quotes/random?limit=5"];

  if (excludedUrls.some((url) => event.request.url.includes(url))) {
    event.respondWith(fetch(event.request));
  } else {
    event.respondWith(
      caches
        .match(event.request)
        .then(function (response) {
          return response || fetch(event.request);
        })
        .then((data) => {
          return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(event.request.url, data.clone());
            return data;
          });
        })
        .catch((error) => {
          if (error.message === "Failed to fetch") {
            console.log("Network connection lost");
            throw "Failed to fetch";
          }
        })
    );
  }
});
