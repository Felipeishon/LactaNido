self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                '/', // Alias for index.html
                '/index.html',
                '/agendamiento.html',
                '/productos.html',
                '/styles.css',
                '/main.js',
                '/scripts/agendamiento.js',
                '/Images/logo.jpg',
                '/Images/logo_trans.png',
                '/Images/background.jpg',
                '/manifest.json'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
