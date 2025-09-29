// ====== SMOOTH SCROLL AND MOBILE MENU FUNCTIONALITY ======

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }
    });
    
    // Simple fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.section');
    
    const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for fade elements
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check on load
    fadeInOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', fadeInOnScroll);
});