
// Files required to make this app work offline
const REQUIRED_FILES = [
  'style.css',
  'index.html',
  '/', // Separate URL than index.html!
  'app.js',  
  'imgs/noimage.jpg',
  'bower_components/fullpage.js/jquery.fullPage.css',
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/fullpage.js/jquery.fullPage.min.js'
];

self.addEventListener('install', function (event) {
  // Perform install step:  loading each required file into cache
  event.waitUntil(
    caches.open('dependencies-cache')
    .then(function (cache) {
      // Add all offline dependencies to the cache
      return cache.addAll(REQUIRED_FILES);
    })
    .then(function () {
      // At this point everything has been cached
      return self.skipWaiting();
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      // Cache hit - return the response from the cached version
      if (response) {
        return response;
      }

      // Not in cache - return the result from the live server
      // `fetch` is essentially a "fallback"
      return fetch(event.request);
    }).catch(function (err) {
      // If both fail, show a generic fallback:
      if (event.request.url.endsWith(".jpg") || event.request.url.endsWith(".png")) {
        return caches.match('imgs/noimage.jpg');
      }
      throw err;
    })
  );
});
