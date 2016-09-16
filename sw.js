
// Files required to make this app work offline
var REQUIRED_FILES = [
  'style.css',
  'index.html',
  '/', // Separate URL than index.html!
  'app.js',

  'bower_components/fullpage.js/jquery.fullPage.css',
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/fullpage.js/jquery.fullPage.min.js',
  'run_prettify.js'
];

self.addEventListener('install', function(event) {
  // Perform install step:  loading each required file into cache
  event.waitUntil(
    caches.open('dependencies-cache')
      .then(function(cache) {
        // Add all offline dependencies to the cache
        return cache.addAll(REQUIRED_FILES);
      })
      .then(function() {
      	// At this point everything has been cached
        return self.skipWaiting();
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return the response from the cached version
        if (response) {
          return response;
        }

        // Not in cache - return the result from the live server
        // `fetch` is essentially a "fallback"
        return fetch(event.request);
      }
    )
  );
});
