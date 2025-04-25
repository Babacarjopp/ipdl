document.addEventListener('DOMContentLoaded', () => {
    console.log('AI Academy website loaded!');
    // Mettre en évidence le lien de navigation actif
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
    link.style.fontWeight = 'bold';
    link.style.textDecoration = 'underline';
    }
    });
    });
    