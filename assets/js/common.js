document.addEventListener('DOMContentLoaded', function() {
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('show-menu');
        });
    }

    if (navLinks && navMenu && navToggle) {
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show-menu');
                navToggle.classList.remove('active');
            });
        });
    }
    
});