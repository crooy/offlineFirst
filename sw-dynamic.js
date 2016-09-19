self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open('dynamic-caches')
    .then(function (cache) {

      return cache.match(event.request)
      .then(function (cachedResponse) {

        if (cachedResponse) return cachedResponse;

        return fetch(event.request)
          .then(function (onlineResponse) {
            cache.put(event.request, onlineResponse.clone());
            return onlineResponse;
          });
      });
    })
  );
});
