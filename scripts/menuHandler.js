export function setupMenu() {
    document.querySelector('header').addEventListener('click', function() {
        const nav = document.querySelector('nav ul');
        nav.classList.toggle('active');
    });
}