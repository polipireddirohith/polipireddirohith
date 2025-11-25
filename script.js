// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===== ACTIVE NAVIGATION LINK =====
const sections = document.querySelectorAll('section');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// ===== SMOOTH SCROLL =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('style').match(/width:\s*(\d+%)/)[1];
            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

skillBars.forEach(bar => {
    const originalWidth = bar.style.width;
    bar.style.width = '0';
    bar.setAttribute('data-width', originalWidth);
    skillObserver.observe(bar);
});

// ===== SCROLL ANIMATIONS =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .about-content');

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                elementObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        elementObserver.observe(element);
    });
};

// Initialize scroll animations
animateOnScroll();

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send the data to a server
    console.log('Form submitted:', formData);

    // Show success message
    alert('Thank you for your message! I will get back to you soon.');

    // Reset form
    contactForm.reset();
});

// ===== TYPING EFFECT FOR HERO SUBTITLE =====
const subtitle = document.querySelector('.hero-subtitle');
const subtitleText = subtitle.textContent;
subtitle.textContent = '';

let charIndex = 0;
const typingSpeed = 100;

function typeWriter() {
    if (charIndex < subtitleText.length) {
        subtitle.textContent += subtitleText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// ===== CURSOR TRAIL EFFECT =====
const createCursorTrail = () => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        const dx = mouseX - trailX;
        const dy = mouseY - trailY;

        trailX += dx * 0.1;
        trailY += dy * 0.1;

        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';

        requestAnimationFrame(animateTrail);
    }

    animateTrail();
};

// Add cursor trail styles
const style = document.createElement('style');
style.textContent = `
    .cursor-trail {
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
    }
    
    @media (max-width: 768px) {
        .cursor-trail {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Initialize cursor trail on desktop only
if (window.innerWidth > 768) {
    createCursorTrail();
}

// ===== PARALLAX EFFECT FOR GRADIENT ORBS =====
const orbs = document.querySelectorAll('.gradient-orb');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===== STATS COUNTER ANIMATION =====
const stats = document.querySelectorAll('.stat-number');

const animateStats = () => {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue);

                if (!isNaN(numericValue)) {
                    let currentValue = 0;
                    const increment = numericValue / 50;
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= numericValue) {
                            target.textContent = finalValue;
                            clearInterval(timer);
                        } else {
                            target.textContent = Math.floor(currentValue) + '+';
                        }
                    }, 30);
                }

                statsObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
};

animateStats();

// ===== PROJECT CARDS TILT EFFECT =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== LAZY LOADING FOR IMAGES =====
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
};

lazyLoadImages();

// ===== THEME TOGGLE (Optional - can be enabled) =====
const createThemeToggle = () => {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = '🌙';
    toggle.setAttribute('aria-label', 'Toggle theme');
    document.body.appendChild(toggle);

    const themeStyle = document.createElement('style');
    themeStyle.textContent = `
        .theme-toggle {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-gradient);
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1000;
            box-shadow: var(--shadow-lg);
            transition: all var(--transition-base);
        }
        
        .theme-toggle:hover {
            transform: scale(1.1) rotate(20deg);
            box-shadow: var(--shadow-glow);
        }
        
        @media (max-width: 768px) {
            .theme-toggle {
                bottom: 1rem;
                right: 1rem;
                width: 40px;
                height: 40px;
                font-size: 1.2rem;
            }
        }
    `;
    document.head.appendChild(themeStyle);
};

// Uncomment to enable theme toggle
// createThemeToggle();

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
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

// ===== CONSOLE EASTER EGG =====
console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cLooking at the code? I like your style! 🚀', 'font-size: 14px; color: #764ba2;');
console.log('%cFeel free to reach out if you want to collaborate!', 'font-size: 12px; color: #4facfe;');

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Add loaded class styles
    const loadStyle = document.createElement('style');
    loadStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadStyle);
});

// ===== SCROLL TO TOP BUTTON =====
const createScrollToTop = () => {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(button);

    const buttonStyle = document.createElement('style');
    buttonStyle.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            left: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--bg-card);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: var(--text-primary);
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all var(--transition-base);
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            background: var(--primary-gradient);
            transform: translateY(-5px);
            box-shadow: var(--shadow-glow);
        }
        
        @media (max-width: 768px) {
            .scroll-to-top {
                bottom: 1rem;
                left: 1rem;
                width: 40px;
                height: 40px;
                font-size: 1.2rem;
            }
        }
    `;
    document.head.appendChild(buttonStyle);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 500) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    }, 100));

    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

createScrollToTop();

// ===== INITIALIZE ALL FEATURES =====
console.log('Portfolio initialized successfully! ✨');
