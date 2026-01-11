// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
const body = document.getElementById('body');

// Function to apply light mode styles
function applyLightMode() {
    if (!body) return;
    
    // Add light mode class
    body.classList.add('light-mode');
    
    // Force update all text colors
    const allTextElements = body.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li, div, button');
    allTextElements.forEach(el => {
        const computedStyle = window.getComputedStyle(el);
        const color = computedStyle.color;
        
        // If text is white or very light, make it dark in light mode
        if (color.includes('rgb(255, 255, 255)') || color.includes('rgb(255, 255, 255)')) {
            if (!el.classList.contains('bg-clip-text') && !el.classList.contains('text-transparent')) {
                el.style.color = '#1e293b';
            }
        }
    });
}

// Function to remove light mode styles
function removeLightMode() {
    if (!body) return;
    body.classList.remove('light-mode');
    
    // Reset inline styles
    const allTextElements = body.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li, div, button');
    allTextElements.forEach(el => {
        if (el.style.color) {
            el.style.color = '';
        }
    });
}

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    applyLightMode();
    if (darkModeIcon) darkModeIcon.textContent = '☀️';
} else {
    removeLightMode();
    if (darkModeIcon) darkModeIcon.textContent = '🌙';
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        const isLightMode = body.classList.contains('light-mode');
        if (isLightMode) {
            removeLightMode();
            localStorage.setItem('theme', 'dark');
            if (darkModeIcon) darkModeIcon.textContent = '🌙';
        } else {
            applyLightMode();
            localStorage.setItem('theme', 'light');
            if (darkModeIcon) darkModeIcon.textContent = '☀️';
        }
    });
}

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('#testimonialContainer > div');
const totalTestimonials = testimonials.length;

function changeTestimonial(direction) {
    currentTestimonial += direction;
    
    if (currentTestimonial < 0) {
        currentTestimonial = totalTestimonials - 1;
    } else if (currentTestimonial >= totalTestimonials) {
        currentTestimonial = 0;
    }
    
    const translateX = -currentTestimonial * 100;
    document.getElementById('testimonialContainer').style.transform = `translateX(${translateX}%)`;
}

// Auto-rotate testimonials
setInterval(() => {
    changeTestimonial(1);
}, 5000);

// FAQ Accordion
function toggleFaq(button) {
    const faqItem = button.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const answer = item.querySelector('.faq-answer');
        answer.classList.add('hidden');
    });
    
    // Open clicked FAQ if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
        const answer = faqItem.querySelector('.faq-answer');
        answer.classList.remove('hidden');
    }
}

// Real-time Stats Animation
function animateStats() {
    const rpsElement = document.getElementById('rps');
    const customersElement = document.getElementById('customers');
    
    if (rpsElement) {
        let rps = 2.4;
        setInterval(() => {
            rps += (Math.random() - 0.5) * 0.1;
            rps = Math.max(2.0, Math.min(3.0, rps));
            rpsElement.textContent = rps.toFixed(1) + 'M';
        }, 2000);
    }
    
    if (customersElement) {
        let customers = 50247;
        setInterval(() => {
            customers += Math.floor(Math.random() * 5);
            customersElement.textContent = customers.toLocaleString();
        }, 3000);
    }
}

// Initialize stats animation
animateStats();

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
const darkModeIconMobile = document.getElementById('darkModeIconMobile');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenuBtn.textContent = mobileMenu.classList.contains('hidden') ? '☰' : '✕';
    });
}

// Mobile Dark Mode Toggle
if (darkModeToggleMobile && darkModeIconMobile) {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        darkModeIconMobile.textContent = '☀️';
    } else {
        darkModeIconMobile.textContent = '🌙';
    }
    
    darkModeToggleMobile.addEventListener('click', () => {
        if (body) {
            const isLightMode = body.classList.contains('light-mode');
            if (isLightMode) {
                removeLightMode();
                localStorage.setItem('theme', 'dark');
                darkModeIconMobile.textContent = '🌙';
                if (darkModeIcon) darkModeIcon.textContent = '🌙';
            } else {
                applyLightMode();
                localStorage.setItem('theme', 'light');
                darkModeIconMobile.textContent = '☀️';
                if (darkModeIcon) darkModeIcon.textContent = '☀️';
            }
        }
    });
}

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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections except hero section to avoid clipping issues
document.querySelectorAll('section > div').forEach(section => {
    // Skip the first section (hero) to prevent animation clipping on mobile
    const isHeroSection = section.closest('section') === document.querySelector('section:first-of-type');
    if (!isHeroSection) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    }
});

// Add parallax effect to hero section (disabled on mobile)
window.addEventListener('scroll', () => {
    // Only apply parallax on desktop (screen width > 768px)
    if (window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('section:first-of-type .container');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = Math.max(0.5, 1 - (scrolled / window.innerHeight) * 0.5);
        }
    } else {
        // Reset transform on mobile
        const heroContent = document.querySelector('section:first-of-type .container');
        if (heroContent) {
            heroContent.style.transform = 'translateY(0)';
            heroContent.style.opacity = '1';
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
const debouncedScroll = debounce(() => {
    // Additional scroll-based animations can be added here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Get all nav links (desktop and mobile)
    const navLinks = document.querySelectorAll('nav a[href]');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Remove active class from all links first
        link.classList.remove('nav-active');
        
        // Check if this link matches the current page
        if (href === currentPage || href.endsWith('/' + currentPage)) {
            link.classList.add('nav-active');
            
            // Also mark parent dropdown button as active if this is a dropdown item
            const dropdown = link.closest('.absolute');
            if (dropdown) {
                const parentButton = dropdown.previousElementSibling;
                if (parentButton && parentButton.tagName === 'BUTTON') {
                    parentButton.classList.add('nav-active');
                }
            }
            
            // Mark mobile dropdown parent button as active
            const mobileDropdown = link.closest('.mobile-dropdown-content');
            if (mobileDropdown) {
                const mobileParent = mobileDropdown.previousElementSibling;
                if (mobileParent && mobileParent.tagName === 'BUTTON') {
                    mobileParent.classList.add('nav-active');
                }
            }
        }
    });
    
    // Handle dropdown parent buttons - check if any child is active
    const dropdownButtons = document.querySelectorAll('nav .group button, nav .mobile-dropdown button');
    dropdownButtons.forEach(button => {
        const dropdown = button.nextElementSibling;
        if (dropdown) {
            const activeChild = dropdown.querySelector('.nav-active');
            if (activeChild) {
                button.classList.add('nav-active');
            }
        }
    });
}

// Initialize active nav links when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setActiveNavLink);
} else {
    setActiveNavLink();
}