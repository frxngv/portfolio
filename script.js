// ====== ULTRA-MINIMALIST PORTFOLIO SCRIPT ======

document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initScrollAnimations();
    initHoverEffects();
});

// Smooth scrolling for navigation
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const navHeight = document.querySelector('.floating-nav').offsetHeight;
                
                window.scrollTo({
                    top: offsetTop - navHeight - 40,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations for elements
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stagger animations for skill categories
                if (entry.target.classList.contains('skills-grid')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
                
                // Stagger animations for contact links
                if (entry.target.classList.contains('contact-links')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.about-content, .skills-grid, .contact-content, .skill-category, .contact-link'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Enhanced hover effects
function initHoverEffects() {
    // Skill category hover
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(10px)';
        });
    });

    // Contact link hover
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });

    // Navigation link hover
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = 'var(--accent)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = '';
        });
    });
}

// Add elegant console message
console.log(`%c
███████╗██████╗ ██████╗ ███╗   ██╗███████╗
██╔════╝██╔══██╗██╔══██╗████╗  ██║██╔════╝
█████╗  ██████╔╝██████╔╝██╔██╗ ██║███████╗
██╔══╝  ██╔══██╗██╔══██╗██║╚██╗██║╚════██║
███████╗██║  ██║██████╔╝██║ ╚████║███████║
╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═══╝╚══════╝
                                           
Minimalist Portfolio — Francisco González-Llanos Vivanco
`, 'color: #ff6b35; font-family: monospace;');

console.log('%cCrafted with precision and attention to detail', 'color: #a0a0a0; font-size: 12px;');