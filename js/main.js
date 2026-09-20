/**
 * SAGAZ — Main JavaScript
 * Navbar, menú móvil, reveal on scroll y smooth scroll
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initSmoothScroll();
});

/* =========================================
   NAVBAR SCROLL STATE
   ========================================= */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const onScroll = () => {
        if (window.scrollY > 30) {
            navbar.classList.add('is-scrolled');
        } else {
            navbar.classList.remove('is-scrolled');
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* =========================================
   MENÚ MÓVIL
   ========================================= */
function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.mobile-menu');
    if (!toggle || !menu) return;

    const toggleMenu = () => {
        const isOpen = toggle.classList.toggle('is-active');
        menu.classList.toggle('is-open', isOpen);
        toggle.setAttribute('aria-expanded', isOpen);
        menu.setAttribute('aria-hidden', !isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    toggle.addEventListener('click', toggleMenu);

    // Cerrar al hacer click en un link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('is-open')) {
                toggleMenu();
            }
        });
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) {
            toggleMenu();
        }
    });
}

/* =========================================
   SCROLL REVEAL (IntersectionObserver)
   ========================================= */
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal-up, .reveal-fade');
    if (!elements.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        elements.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* =========================================
   SMOOTH SCROLL
   ========================================= */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            const navHeight = document.querySelector('.navbar')?.offsetHeight || 64;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}
