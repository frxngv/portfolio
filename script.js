// ====== MINIMALIST PORTFOLIO SCRIPT ======

document.addEventListener('DOMContentLoaded', function() {
    initFloatingNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initNavigationIndicator();
    initHoverEffects();
});

// Floating navigation behavior
function initFloatingNavigation() {
    const nav = document.querySelector('.floating-nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        // Add scrolled class for background change
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Hide/show nav on scroll direction
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            nav.style.transform = 'translateX(-50%) translateY(-100%)';
        } else {
            nav.style.transform = 'translateX(-50%) translateY(0)';
        }
        lastScrollY = window.scrollY;
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
                
                // Stagger animations for skill cards
                if (entry.target.classList.contains('skills-grid')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.skill-category, .about-content, .contact-content, .project-card, .highlight'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

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

// Navigation indicator
function initNavigationIndicator() {
    const navLinks = document.querySelectorAll('.nav-link');
    const indicator = document.querySelector('.nav-indicator');
    const sections = document.querySelectorAll('section[id]');
    
    function updateIndicator() {
        let currentSection = '';
        const scrollY = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        const currentLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
        if (currentLink && indicator) {
            const linkRect = currentLink.getBoundingClientRect();
            const navRect = currentLink.closest('.nav-container').getBoundingClientRect();
            
            indicator.style.width = `${linkRect.width}px`;
            indicator.style.left = `${linkRect.left - navRect.left}px`;
        }
    }
    
    window.addEventListener('scroll', updateIndicator);
    window.addEventListener('resize', updateIndicator);
    updateIndicator(); // Initial call
}

// Enhanced hover effects
function initHoverEffects() {
    // Skill cards hover
    const skillCards = document.querySelectorAll('.skill-category');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Contact method hover
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.method-icon');
            icon.style.transform = 'scale(1.1)';
        });
        
        method.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.method-icon');
            icon.style.transform = 'scale(1)';
        });
    });
}

// Mouse move effects for gradient spots
function initMouseEffects() {
    const spots = document.querySelectorAll('.gradient-spot');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        spots.forEach((spot, index) => {
            const speed = (index + 1) * 0.3;
            const x = (mouseX - 0.5) * speed * 40;
            const y = (mouseY - 0.5) * speed * 40;
            
            spot.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Initialize mouse effects
setTimeout(initMouseEffects, 1000);

// Performance optimized scroll handler
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

window.addEventListener('scroll', debounce(() => {
    // Additional scroll-based functionality
}, 10));

// Add elegant console message
console.log(`%c
╔═══════════════════════════════════════╗
║        FRANCISCO GONZÁLEZ-LLANOS      ║
║              VIVANCO                  ║
║        Kubernetes & CI/CD             ║
╚═══════════════════════════════════════╝
`, 'color: #FF6B35; font-family: monospace;');

console.log('%cMinimalist design focused on cloud-native technologies', 'color: #8A2BE2; font-size: 12px;');