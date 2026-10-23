/* Mathe Mission 5 — Service Worker (Offline-Nutzung, schnelles Laden) */
var CACHE = 'mathe-mission-5-v2';
var DATEIEN = [
  './','./index.html','./css/app.css',
  './js/data.js','./js/gen.js','./js/state.js','./js/ui.js','./js/exam.js','./js/games.js','./js/app.js',
  './manifest.json','./icons/icon-192.png','./icons/icon-512.png'
];
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(DATEIEN); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(k){
    return Promise.all(k.map(function(n){ return n===CACHE?null:caches.delete(n); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e){
  if(e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function(r){
      return r || fetch(e.request).then(function(res){
        var kopie = res.clone();
        caches.open(CACHE).then(function(c){ try{ c.put(e.request, kopie); }catch(x){} });
        return res;
      }).catch(function(){ return caches.match('./index.html'); });
    })
  );
});
