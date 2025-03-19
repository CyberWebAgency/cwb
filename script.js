// Optimization: Use DOMContentLoaded for faster initial rendering
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables to reduce DOM queries
    const nav = document.querySelector('nav');
    const heroVideo = document.getElementById('hero-video');
    const heroImageOverlay = document.getElementById('hero-image-overlay');
    const heroSection = document.getElementById('home');

    // Set hero section as interactive
    if (heroSection) {
        heroSection.classList.add('interactive-container');
    }

    // Initialize AOS with better performance settings
AOS.init({
    duration: 800,
        once: true, // Changed to true for better performance
        offset: 100,
        easing: 'ease-out',
        disable: 'mobile', // Disable on mobile for better performance
        mirror: false // Don't mirror animations on scrolling up
    });

    // Mobile Menu Toggle with optimized event handling
    initMobileMenu();

    // Smooth scroll with better performance
    initSmoothScroll();

    // Add scroll event listener for navbar with throttle for performance
    initScrollEffects();

    // Form validation and submission handling
    initContactForm();

    // Auto-typed text for hero section
    initTypeWriter();

    // Add parallax effect to hero section - optimized
    initParallaxEffects();

    // Initialize counters for stats
    initCounters();

    // Add hero image/video interaction effects
    initHeroInteraction();

    // Lazy load images for better performance
    initLazyLoading();

    // Apply hover effects for "Why Choose Us" cards
    initChooseCards();

    // Initialize about section interactive elements
    initAboutInteractions();

    // Function to initialize more vibrant animations
    enhanceAnimations();
});

// Extract functions to improve maintainability and performance

function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Add animation class
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('animate-fade-in');
            }
        });
    }
}

function initSmoothScroll() {
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
            
            // Hide mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
            
        const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Optimization: Use requestAnimationFrame for smoother scrolling
                window.requestAnimationFrame(() => {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                });
            }
        });
    });
}

// Throttle function to limit execution of events
function throttle(fn, delay) {
    let last = 0;
    return function() {
        const now = new Date().getTime();
        if (now - last < delay) {
            return;
        }
        last = now;
        return fn.apply(this, arguments);
    };
}

function initScrollEffects() {
    const nav = document.querySelector('nav');
    
    // Throttled scroll handler for better performance
    const handleScroll = throttle(() => {
    if (window.scrollY > 50) {
            nav.classList.add('shadow-md', 'py-2');
            nav.classList.remove('py-4');
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
            nav.classList.remove('shadow-md', 'py-2');
            nav.classList.add('py-4');
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        }
        
        // Add active class to current section links
        highlightActiveSection();
    }, 100);

    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set correct state
    handleScroll();
}

function highlightActiveSection() {
    // Get all sections
    const sections = document.querySelectorAll('section[id]');
    
    // Get current scroll position
    let scrollY = window.scrollY;
    
    // Loop through sections to get height, top and ID values
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Remove active class from all links
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function initContactForm() {
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields with single query for better performance
            const formElements = contactForm.elements;
            const name = formElements.name.value;
            const email = formElements.email.value;
            const subject = formElements.subject?.value || '';
            const message = formElements.message.value;
            
            // Simple validation
            let isValid = true;
            let errorFields = [];
            
            if (!name.trim()) {
                isValid = false;
                errorFields.push('name');
            }
            
            if (!email.trim() || !isValidEmail(email)) {
                isValid = false;
                errorFields.push('email');
            }
            
            if (!message.trim()) {
                isValid = false;
                errorFields.push('message');
            }
            
            // Mark fields with errors - single DOM operation for better performance
            contactForm.querySelectorAll('input, textarea').forEach(field => {
                field.classList.remove('border-red-500');
                if (field.id && errorFields.includes(field.id)) {
                    field.classList.add('border-red-500');
                }
            });
            
            if (isValid) {
                // Simulate form submission with loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
                
                // Simulate API call with timeout
                setTimeout(() => {
                    // Show success message
                    contactForm.reset();
                    submitButton.innerHTML = '<i class="fas fa-check mr-2"></i> Message Sent!';
                    submitButton.classList.remove('bg-blue-600');
                    submitButton.classList.add('bg-green-600');
                    
                    // Reset after 3 seconds
                    setTimeout(() => {
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                        submitButton.classList.remove('bg-green-600');
                        submitButton.classList.add('bg-blue-600');
                    }, 3000);
                }, 1500);
            }
        });
    }
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function initTypeWriter() {
    const heroTitle = document.querySelector('#home h1');
    if (heroTitle && !window.matchMedia('(max-width: 640px)').matches) { // Skip on mobile for better performance
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }
}

function initParallaxEffects() {
    const heroVideo = document.getElementById('hero-video');
    const heroSection = document.getElementById('home');
    
    if (heroVideo && heroSection && !window.matchMedia('(max-width: 768px)').matches) { // Skip on mobile
        // Optimization: Use translate3d for hardware acceleration
        const parallaxScroll = throttle(() => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < heroSection.offsetHeight) {
                const translateY = scrollPosition * 0.2;
                heroVideo.style.transform = `scale(1.05) translate3d(0, ${translateY}px, 0)`;
            }
        }, 10);
        
        window.addEventListener('scroll', parallaxScroll);
    }
}

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => observer.observe(counter));
}

function initHeroInteraction() {
    const heroVideo = document.getElementById('hero-video');
    const heroImageOverlay = document.getElementById('hero-image-overlay');
    const heroSection = document.getElementById('home');
    
    if (heroVideo && heroImageOverlay && heroSection) {
        // Show overlay on mouse move or scroll
        heroSection.addEventListener('mousemove', throttle(() => {
            heroImageOverlay.style.opacity = '0.3';
            setTimeout(() => {
                heroImageOverlay.style.opacity = '0';
            }, 1000);
        }, 100));
        
        // Alternate between video and image on interval for visual interest
        let isVideoVisible = true;
        setInterval(() => {
            if (isVideoVisible) {
                heroImageOverlay.style.opacity = '0.2';
                setTimeout(() => {
                    heroImageOverlay.style.opacity = '0';
                    isVideoVisible = true;
                }, 2000);
                isVideoVisible = false;
            }
        }, 8000);
    }
}

function initLazyLoading() {
    // Use Intersection Observer for lazy loading images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            img.classList.add('lazy-load');
            imageObserver.observe(img);
        });
    }
}

// Apply hover effects for "Why Choose Us" cards
function initChooseCards() {
    const chooseCards = document.querySelectorAll('.choose-card');
    
    chooseCards.forEach(card => {
        const icon = card.querySelector('i');
        const originalColor = getComputedStyle(icon.parentElement).color;
        
        card.addEventListener('mouseenter', () => {
            const color = window.getComputedStyle(card).borderTopColor;
            icon.parentElement.style.color = color;
            icon.classList.add('fa-bounce');
        });
        
        card.addEventListener('mouseleave', () => {
            icon.parentElement.style.color = originalColor;
            icon.classList.remove('fa-bounce');
        });
    });
}

// Function to initialize more vibrant animations
function enhanceAnimations() {
    // Enhance AOS animations with custom classes
    const fadeElements = document.querySelectorAll('[data-aos="fade-up"]');
    fadeElements.forEach(el => {
        el.classList.add('will-change-transform');
    });
    
    // Add tilt effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    if (window.innerWidth > 768) {  // Only on desktop
        serviceCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                const angleX = (cardCenterY - e.clientY) / 25;
                const angleY = (e.clientX - cardCenterX) / 25;
                
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 500);
            });
        });
    }
}

// Initialize about section interactive elements
function initAboutInteractions() {
    // Feature cards animations
    const featureCards = document.querySelectorAll('.about-feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon i');
            if (icon) {
                icon.classList.add('fa-bounce');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon i');
            if (icon) {
                icon.classList.remove('fa-bounce');
            }
        });
    });
    
    // About image interactive effects
    const aboutImage = document.querySelector('.about-image');
    const badge = document.querySelector('.about-badge');
    
    if (aboutImage && badge) {
        // Add tilt effect to about image on mouse move
        const aboutImageContainer = document.querySelector('.about-image-container');
        
        if (aboutImageContainer && window.innerWidth > 768) {
            aboutImageContainer.addEventListener('mousemove', (e) => {
                const rect = aboutImageContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                aboutImage.style.transform = `scale(1.05) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            });
            
            aboutImageContainer.addEventListener('mouseleave', () => {
                aboutImage.style.transform = 'scale(1) rotateX(0) rotateY(0)';
            });
        }
        
        // Badge pulse effect
        badge.addEventListener('mouseenter', function() {
            this.classList.add('animate-pulse');
        });
        
        badge.addEventListener('mouseleave', function() {
            this.classList.remove('animate-pulse');
        });
    }
    
    // Floating tech element interaction
    const floatingTech = document.querySelector('.about-floating-tech');
    if (floatingTech) {
        floatingTech.addEventListener('click', function() {
            this.classList.add('animate-ping');
            setTimeout(() => {
                this.classList.remove('animate-ping');
            }, 500);
        });
    }
}
