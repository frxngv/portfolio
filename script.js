// ====== ELEGANT SMOOTH SCROLL & ANIMATIONS ======

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initSmoothScrolling();
    initScrollAnimations();
    initNavigation();
    initFloatingElements();
    initTypewriterEffect();
    initScrollProgress();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const headerHeight = document.querySelector('.elegant-nav').offsetHeight;
                
                window.scrollTo({
                    top: offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll-based animations
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
                
                // Stagger children animations
                if (entry.target.classList.contains('skills-grid')) {
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
        '.skill-card, .about-content, .contact-content, .project-placeholder'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Navigation effects
function initNavigation() {
    const nav = document.querySelector('.elegant-nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        // Hide/show nav on scroll
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;

        // Change nav background on scroll
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.8)';
            nav.style.backdropFilter = 'blur(20px)';
        }
    });
}

// Floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Randomize animation delays for more natural movement
        const delay = index * 2;
        element.style.animationDelay = `${delay}s`;
        
        // Add mouse move parallax effect
        document.addEventListener('mousemove', (e) => {
            const speed = (index + 1) * 0.3;
            const x = (e.clientX / window.innerWidth - 0.5) * speed * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * speed * 20;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Typewriter effect for code window
function initTypewriterEffect() {
    const codeLines = document.querySelectorAll('.code-line');
    let currentLine = 0;
    
    function typeLine() {
        if (currentLine < codeLines.length) {
            const line = codeLines[currentLine];
            const text = line.textContent;
            line.textContent = '';
            line.style.opacity = '1';
            
            let charIndex = 0;
            function typeChar() {
                if (charIndex < text.length) {
                    line.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, 50);
                } else {
                    currentLine++;
                    setTimeout(typeLine, 500);
                }
            }
            typeChar();
        }
    }
    
    // Start typing when hero section is in view
    const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setTimeout(typeLine, 1000);
            heroObserver.unobserve(entries[0].target);
        }
    });
    
    heroObserver.observe(document.querySelector('.hero'));
}

// Scroll progress indicator
function initScrollProgress() {
    const scrollTrack = document.querySelector('.scroll-track');
    const scrollProgress = document.querySelector('.scroll-progress');
    
    if (scrollTrack && scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            scrollProgress.style.height = `${Math.min(scrollPercentage, 100)}%`;
        });
    }
}

// Enhanced hover effects
function initHoverEffects() {
    // Skill cards hover
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });

    // Contact method hover
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.method-icon');
            icon.style.transform = 'scale(1.1)';
            icon.style.background = 'var(--gradient-primary)';
            icon.style.color = 'white';
        });
        
        method.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.method-icon');
            icon.style.transform = 'scale(1)';
            icon.style.background = 'var(--surface)';
            icon.style.color = 'var(--primary)';
        });
    });
}

// Initialize hover effects after a short delay
setTimeout(initHoverEffects, 1000);

// Performance optimized scroll handler
const optimizedScroll = () => {
    // Any additional scroll-based functionality can go here
};

window.addEventListener('scroll', optimizedScroll);