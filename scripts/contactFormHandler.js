// contactFormHandler.js

export function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;

        if (!name) {
            alert('Por favor, ingresa tu nombre.');
            return;
        }

        if (!email) {
            alert('Por favor, ingresa tu correo electrónico.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        if (!message) {
            alert('Por favor, ingresa tu mensaje.');
            return;
        }

        alert('Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.');
    });
}