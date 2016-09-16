
function queueMsg(msg){
  return localforage.getItem("queue").then((q)=>{
      const queue = q || [];
      queue.push(msg);
      console.log("queued the message ", msg);
      return localforage.setItem("queue", queue);
  });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw-retry.js', {scope: '/'})
  // .then(registration => navigator.serviceWorker.ready)
  // .then(registration => {
  //   registration.sync.register({
  //     id:'postNow',
  //     minRequiredNetwork: 'network-online'
  //   }).then(() => {
  //       console.log('Sync registered');
  //   });
  // });

  navigator.serviceWorker.addEventListener('message', function(msg) {
    console.log("app got message ", event);
    alert(JSON.stringify(msg.data));
  });
}

function sendAMessage(text) {
  queueMsg({
    msgType: "postLater",
    url: "http://jsonplaceholder.typicode.com/posts",
    opt: {
      method: 'post',
      body: JSON.stringify({
        title: 'foo',
        body: text || "bar",
        userId: 1
      })
    }
  }).then(()=>{
    navigator.serviceWorker.ready.then(function(registration) {
      registration.sync.register('postNow').then(() => {
          console.log('Sync registered');
      });
    })
  });

}
