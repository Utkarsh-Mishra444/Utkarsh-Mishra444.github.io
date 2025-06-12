// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typingText = document.querySelector('.typing-text');
const contactForm = document.querySelector('.contact-form');

// Mobile Navigation Toggle
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Typing Animation
const typingTexts = [
    'ML Engineer & Researcher',
    'Computer Vision Expert',
    'IIT Gandhinagar Graduate',
    'Deep Learning Enthusiast'
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = typingTexts[currentTextIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        typingText.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && currentCharIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
        typeSpeed = 500; // Pause before typing next word
    }
    
    setTimeout(typeText, typeSpeed);
}

// Start typing animation
if (typingText) {
    typeText();
}

// Smooth Scrolling for Navigation Links
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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .stat, .contact-item').forEach(el => {
    observer.observe(el);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Contact Form Handling
contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    this.reset();
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #4ecdc4, #44a08d)' : 
                    type === 'error' ? 'linear-gradient(45deg, #ff6b6b, #ee5a52)' : 
                    'linear-gradient(45deg, #667eea, #764ba2)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add Loading Animation to Page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth reveal animations for sections
const revealSections = document.querySelectorAll('section');
const revealSection = function(entries, observer) {
    const [entry] = entries;
    
    if (!entry.isIntersecting) return;
    
    entry.target.style.opacity = '1';
    entry.target.style.transform = 'translateY(0)';
    
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
});

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    sectionObserver.observe(section);
});

// Project Card Hover Effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
    });
});

// Skill Item Animations
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        this.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.boxShadow = 'none';
    });
});

// Social Links Hover Effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.15) rotate(10deg)';
        this.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.4)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        this.style.boxShadow = 'none';
    });
});

// Add cursor trail effect
let mouseX = 0;
let mouseY = 0;
let trailElements = [];

// Create trail elements
for (let i = 0; i < 5; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 6px;
        height: 6px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: ${1 - i * 0.2};
        transform: scale(${1 - i * 0.1});
        transition: all 0.1s ease;
    `;
    document.body.appendChild(trail);
    trailElements.push(trail);
}

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    trailElements.forEach((trail, index) => {
        setTimeout(() => {
            trail.style.left = (mouseX - 3) + 'px';
            trail.style.top = (mouseY - 3) + 'px';
        }, index * 50);
    });
});

// Hide trail on mobile
if (window.innerWidth <= 768) {
    trailElements.forEach(trail => {
        trail.style.display = 'none';
    });
}

// Stats Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
    }, 20);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat h4');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                animateCounter(counter, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add some easter eggs
let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.filter = 'hue-rotate(180deg)';
            showNotification('🎉 Easter egg activated! You found the secret!', 'success');
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 3000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

console.log('🚀 Welcome to Utkarsh\'s epic website! Try the Konami code: ↑↑↓↓←→←→BA'); 