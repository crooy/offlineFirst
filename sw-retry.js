importScripts('bower_components/localforage/dist/localforage.min.js');

function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

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
  'bower_components/localforage/dist/localforage.min.js'
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

function queueMsg(msg){
  return localforage.getItem("queue").then((q)=>{
      const queue = q || [];
      queue.push(msg);
      localforage.setItem("queue", queue);
      console.log("queued the message ", msg);
      return queue;
  });
}

function removeFromQueue(msg){
  return localforage.getItem("queue").then((q)=>{
      const queue = q || [];
      const filteredQueue = queue.filter((x)=> !isEquivalent(x,msg));
      localforage.setItem("queue", filteredQueue);
      console.log("removed the message from the queue", msg);
      return queue;
  });
}

self.addEventListener('message', function(event) {
  console.log("sw got message ", event);
  if (event.data.msgType === "postLater"){
    queueMsg(event.data);
  }
});

self.addEventListener('sync', function (event) {
  console.log("sw got sync ", event);
  if (event.tag === 'postNow') {
    const results = sendPostQueue(self).then((returnMessages)=>{
      if (!returnMessages) return ;
      return returnMessages.map((msg)=>{
        if (!msg) return ;
        return self.clients.matchAll().then(all => all.map(client => client.postMessage(msg)));
      })
    })
    event.waitUntil(results);
  }
});

const sendPostQueue = function(self){
  return localforage.getItem("queue").then((queue)=>{
    if (!queue) return null;
    return Promise.all(queue.map((msg)=>{
      return fetch(msg.url, msg.opt)
        .then(function(res){
          return res.json();
        }).then((data)=>{
          removeFromQueue(msg);
          return data;
        }).catch(()=>{
          return null;
        })
    }));
  });
}
