var staticCacheName = 'udacityGdi-proj';

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(staticCacheName).then(function(cache) {
     return cache.addAll([
       '/index.html',
       '/restaurant.html',
       '/js/main.js',
       '/js/restaurant_info.js',
       '/js/dbhelper.js',
       '/img/1.jpg','/img/2.jpg','/img/3.jpg','/img/4.jpg','/img/5.jpg','/img/6.jpg','/img/7.jpg','/img/8.jpg','/img/9.jpg','/img/10.jpg',
       '/css/style.css'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {

    return caches.open(staticCacheName).then(function (cache) {
        return cache.match(event.request.url).then(function (response) {
          if (response) {
            console.log("found cached version " + event.request.url)
            // Store the data again, if possible to get from network
            fetch(event.request).then(function (networkResponse) {
              // If thre is a response, delete old cache and store new one
              if (networkResponse) {
                console.log("Adding to cache " + event.request.url)
                cache['delete'](event.request.url);
                cache.put(event.request.url, networkResponse.clone());
              }
            });
            return response;
          }
          
          // It was not found in cache at all, save in cache and return
          return fetch(event.request).then(function (networkResponse) {
            cache.put(event.request.url, networkResponse.clone());
            return networkResponse;
          });

        });
      });

});