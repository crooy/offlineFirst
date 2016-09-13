# offlineFirst
offline first

20 minuten
doel: denk over offline vanaf het eerste moment
uitleg stijl: walkthrough

——
title slide: shameless plug for withlocals
who am i and plug WL
—
slide:  empty screen with just title of the talk
text: Good evening.

Founder of WL, show some promo content
So if you are looking for new way to discover a city, or if you are foodie. Get yourself inspired at Withlocals.com, we have great locals offering things to do and food experiences.

Who likes special beer?
Who uses untappd?
Anybody ever tried to tag a beer in a bar without 3g


After this presentation you will know about offline websites.
You will think about offline first,
but most of all you will be annoyed with online-only websites.

slide: screenshot of no-network error in untappd
So why are so many mobile apps (web or native alike) treat being offline as an error?
Why is Hacker news not readable offline without installing an app on your phone?

There is a paradigm shift coming and its called offline-first.

During the course of this talk I will try to convince you of this.
I am going to show you how to stop making websites and start making offline first applications.
After this talk you will be annoyed with untappd and HackerNews too.
————————

slide: first Mobile first

text:
I think everybody here knows about ‘mobile first’. Bootstrap et al. have made it incredibly simple to make responsive websites. I think that once management and marketing are using a buzzword we can conclude it is no longer special.

At our company, management and marketing are not talking about offline-first. Do they ask for a responsive website? Yes.

------------
slide: horse vs car image something funny with ford reference

text: Why do no customers or managers ask for an offline first website?
Because offline first solves a problem that people accepted.
You cannot use the internet without internet… Well i am here to say that you can.

—————————

slide: offline first:
  - include mobile.first;
- load without internet
- have (partial) functionality while offline
- offer a progressive UX while switching between online/offline

text:
what makes an app offline, …

slide: we have the technology

- service workers
- web workers
- cache api
- storage api

text: explain service workers, etc.

---------
demo time:

show demo app loading normally, show offline, and show lie-fi version.

uncomment service worker magic, show loading offline show loading lie-fi
 - cache resources
 - cache XHR GET requests

demo image fallback

demo background sync

--------------
slide: happy unicorn

text: now this is great, and it works. This is just the technology. Now you are left with actual problems like: what should the fallback image be? what about conflicts. What if ...

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
