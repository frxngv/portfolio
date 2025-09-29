// ====== URBAN MINIMALIST SCRIPT ======

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Functionality
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar background on scroll
    const header = document.querySelector('.urban-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.9)';
            header.style.backdropFilter = 'blur(20px)';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Floating shapes animation enhancement
    const floatingShapes = document.querySelectorAll('.floating-shape');
    floatingShapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 2}s`;
    });

    // CTA button hover effects
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Skill category hover effects
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Terminal typing effect
    const terminalLine = document.querySelector('.terminal-line:last-child');
    if (terminalLine) {
        const text = terminalLine.textContent;
        terminalLine.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                terminalLine.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing when terminal is in view
        const terminalObserver = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                setTimeout(typeWriter, 1000);
                terminalObserver.unobserve(entries[0].target);
            }
        });
        
        terminalObserver.observe(document.querySelector('.visual-terminal'));
    }

    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }

    // Mouse move parallax effect
    document.addEventListener('mousemove', function(e) {
        const floatingShapes = document.querySelectorAll('.floating-shape');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Preloader (optional - can be removed)
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// Performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle for scroll events
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Enhanced scroll handler
window.addEventListener('scroll', throttle(function() {
    // Additional scroll-based animations can be added here
}, 100));

// Handle resize events
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on desktop
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    }
}, 250));

// Add some console art for fun
console.log(`
%cFRANCISCO G.V. - CLOUD ENGINEER
%cMinimalist Urban Design • Orange to Purple Gradient
%cBuilt with passion for cloud technologies 🚀
`,
'color: #FF6B35; font-size: 16px; font-weight: bold;',
'color: #8A2BE2; font-size: 12px;',
'color: #888; font-size: 10px;'
);