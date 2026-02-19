// ============================================
// CUSTOM CURSOR (desktop only)
// ============================================
const cursorDot = document.getElementById('cursorDot');
if (cursorDot && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX - 4 + 'px';
        cursorDot.style.top = e.clientY - 4 + 'px';
        cursorDot.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });
}

// ============================================
// ACTIVE NAV LINK (pathname-based for multi-page)
// ============================================
(function setActiveNavLink() {
    const navLinksEl = document.getElementById('navLinks');
    if (!navLinksEl) return;

    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    const links = navLinksEl.querySelectorAll('a');

    const pageMap = {
        'index.html': 'Home',
        'rides.html': 'Rides',
        'school-fetes.html': 'School Fetes',
        'safety.html': 'Safety',
        'about.html': 'About',
        'contact.html': 'Contact',
        '': 'Home'
    };

    links.forEach(link => {
        link.classList.remove('active');
        const linkText = link.textContent.trim();
        if (pageMap[page] && linkText === pageMap[page]) {
            link.classList.add('active');
        }
    });
})();

// ============================================
// SCROLL REVEAL
// ============================================
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ============================================
// COUNTER ANIMATION
// ============================================
const counterElements = document.querySelectorAll('[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const countTo = parseInt(target.getAttribute('data-count'));
            const prefix = target.textContent.startsWith('$') ? '$' : '';
            const suffix = target.textContent.endsWith('+') ? '+' : (target.textContent.endsWith('M') ? 'M' : '+');
            let current = 0;
            const increment = Math.ceil(countTo / 40);
            const timer = setInterval(() => {
                current += increment;
                if (current >= countTo) {
                    current = countTo;
                    clearInterval(timer);
                }
                target.textContent = prefix + current + suffix;
            }, 40);
            counterObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

counterElements.forEach(el => counterObserver.observe(el));

// ============================================
// BACK TO TOP
// ============================================
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// FORM HANDLER
// ============================================
function handleFormSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-submit');
    if (!btn) return;
    const originalText = btn.textContent;
    btn.textContent = "Sent! We'll be in touch.";
    btn.style.background = 'var(--clr-green)';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        e.target.reset();
    }, 3000);
}

// ============================================
// FADE IN UP ANIMATION (for filter)
// ============================================
const fadeSheet = document.createElement('style');
fadeSheet.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(fadeSheet);

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS (same-page only)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
