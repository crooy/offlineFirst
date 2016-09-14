
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw-retry.js', {scope: '/'})
  .then(registration => navigator.serviceWorker.ready)
  .then(registration => {
    registration.sync.register('postNow').then(() => {
        console.log('Sync registered');
    });
  });

  navigator.serviceWorker.addEventListener('message', function(msg) {
    console.log("app got message ", event);
    alert(JSON.stringify(msg.data));
  });
}

function sendAMessage(){
  navigator.serviceWorker.controller.postMessage({
    msgType:"postLater",
    url: "http://jsonplaceholder.typicode.com/posts",
    opt:{
      method: 'post',
      body: JSON.stringify({
        title: 'foo',
         body: 'bar',
         userId: 1
      })
    }
  });
}
