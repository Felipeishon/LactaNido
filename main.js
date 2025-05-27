import { setupMenu } from './scripts/menuHandler.js';
import { registerServiceWorker } from './scripts/serviceWorkerHandler.js';

document.addEventListener('DOMContentLoaded', function() {
    setupMenu();
    registerServiceWorker();
});