# offlineFirst
offline first

20 minuten
doel: denk over offline vanaf het eerste moment
uitleg stijl: walkthrough

——
title slide: shameless plug for withlocals
who am i and plug WL
—
slide: black empty screen
text: Good evening.

Who here likes to take out his phone on the toilet to read something? HackerNews perhaps?  
Anybody here ever used his phone to avoid a conversation with some weirdo in the bus or an elevator, or something?
What do you do when you realize you have no 3g or wifi? Do you fake reading something or do you switch to instapaper?

Why is Hacker news not readable offline without installing an app on your phone?

After this talk you will want to make every webapp offline first.
I am going to show you how to stop making websites and start making offline first applications.
————————

slide: Mobile first first,

text:
I think everybody here knows about ‘mobile first’. Bootstrap et al. have made it incredibly simple to make responsive websites. I think that once management and marketing are using a buzzword we can conclude it is no longer special. 

At my company management and marketing are not talking about offline-first. Because it solves a problem that people accept to have, which is that you cannot use the internet when you dont have internet….accept that you can!

—————————

slide: offline first applications:
  - include mobile.first;
- load without internet
- have (partial) functionality while offline
- offer a progressive UX while switching between online/offline

text:
what makes an app offline, …

——————

slide:
Atwood's Law: any application that can be written in JavaScript, will eventually be written in JavaScript.
+ Service worker
+ Storage API
=>
the only difference between an offline first webapp and a mobile app is the appstore.

text:
A couple of months ago, i was at a board meeting where our mobile app became once again topic of dicussion.. anectode, current app sucks, need a new app, when, not time. why not mobile first web app ??? nobody knows what that is or understands it. So i added some offline-js-sauce to our booking management webapp, in order to explain the concept that you use the site while being offline. The first moral of this story is that no non-techies
——————



==== end

All you need to do is employ a service worker

service-worker-slide:
  -  “proxy” between your JS and the internet
- intercept fetch-events
- background sync
- push notifications

A service worker is a proxy between your normal code and the network. 

- things you can do with it
- 


App: LostBoy - help the boy to find his lost stuff.
- notify on missing stuff
- notify on found stuff
App: drinkmetmaten
- notify on drinking beer, include location, reason
- show friends drinking beer


show offline cache using service workers





1. demo web based slideshow die offline first is :-)
2. uitleg service worker vs appcache vs webworker
    1. appcache is deprecated, so no need to know more
    2. service workers : Background service that handles network requests
    3. web workers: Mimics multithreading
3. service/web workers: no DOM interaction
    1. communicate via events/messages
    2. not talking about web workers in this talk
4. wat kan service worker?
    1. (pre)caching
    2. add authentication headers
    3. return cached content as fallback
    4. background sync
    5. push notification
5. Offline-first: don’t make websites, make applications
    1. always fast re-loading applications
    2. provide funny or meaning full functionality for offline users
    3. push notifications, push notifications
    4. adding a service worker for offline application from the start forces:
        1. thinking about data-storage and synchronisation (serialisation only or read/write from storage)
        2. thinking about cache invalidation (hash-filenames)

