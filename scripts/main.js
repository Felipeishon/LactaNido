import { setupForm } from './formHandler.js';
import { setupMenu } from './menuHandler.js';
import { registerServiceWorker } from './serviceWorkerHandler.js';
import { setupContactForm } from './contactFormHandler.js'; // Importa el nuevo módulo

setupForm();
setupMenu();
registerServiceWorker();
setupContactForm(); // Llama a la función para inicializar el formulario de contacto