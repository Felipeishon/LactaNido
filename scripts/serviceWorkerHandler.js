export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then((registration) => {
                    console.log('Service Worker registrado con éxito:', registration);
                })
                .catch((error) => {
                    console.log('Registro del Service Worker fallido:', error);
                });
        });
    }
}