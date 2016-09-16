importScripts('bower_components/localforage/dist/localforage.min.js');

// Files required to make this app work offline
const REQUIRED_FILES = [
  'style.css',
  'index.html',
  '/', // Separate URL than index.html!
  'app2.js',
  'imgs/noimage.jpg',
  'bower_components/fullpage.js/jquery.fullPage.css',
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/fullpage.js/jquery.fullPage.min.js',
  'bower_components/localforage/dist/localforage.min.js',
  'run_prettify.js'
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

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

function removeFromQueue(msg){
  return localforage.getItem("queue").then((q)=>{
      const queue = q || [];
      const filteredQueue = queue.filter((x)=> JSON.stringify(msg) !== JSON.stringify(x));
      console.log("removed the message from the queue", msg);
      return localforage.setItem("queue", filteredQueue);
  });
}

self.addEventListener('sync', function (event) {
  console.log("sw got sync ", event);
  if (event.tag === 'postNow') {
    event.waitUntil(sendPostQueue(self).then((returnMessages)=>{
      if (!returnMessages) return ;
      return returnMessages.map((msg)=>{
        if (!msg) return ;
        return self.clients
                  .matchAll()
                  .then(all => {
                    return all.map(client => client.postMessage(msg))
                  });
      })
    }));
  }
});

const sendPostQueue = function(self){
  return localforage.getItem("queue").then((queue)=>{
    if (!queue) return null;
    console.log("sw going to post queue ", queue);
    return Promise.all(queue.map((msg)=>{
      return fetch(msg.url, msg.opt)
        .then(function(res){
          return res.json();
        }).then((data)=>{
          return removeFromQueue(msg).then(()=> data);
        })
    }));
  });
}
