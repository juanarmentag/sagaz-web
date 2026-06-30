/**
 * SAGAZ — Main JavaScript
 * Animaciones, canvas hero, menú móvil y reveal on scroll
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initCounterAnimation();
    initHeroCanvas();
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
   COUNTER ANIMATION
   ========================================= */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animateCounter = (el) => {
        const target = parseFloat(el.dataset.target);
        if (isNaN(target)) return;

        const isDecimal = target % 1 !== 0;
        const duration = prefersReducedMotion ? 0 : 2000;
        const startTime = performance.now();

        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = eased * target;

            el.textContent = isDecimal
                ? current.toFixed(1)
                : Math.floor(current).toLocaleString('es-MX');

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

/* =========================================
   HERO CANVAS — Architectural Constellation
   Abstract geometric visualization evoking
   structure, precision and data flow.
   ========================================= */
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
        const rect = canvas.parentElement.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio, 2);
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Color palette
    const colors = {
        bg: '#f5f5f0',
        grid: 'rgba(0,0,0,0.04)',
        gridStrong: 'rgba(0,0,0,0.08)',
        gold: '#c9a227',
        goldLight: 'rgba(201,162,39,0.25)',
        red: '#b91c1c',
        redLight: 'rgba(185,28,28,0.12)',
        black: '#0a0a0a',
        white: 'rgba(255,255,255,0.6)'
    };

    // Generate static nodes
    const generateNodes = () => [
        { x: 0.15, y: 0.20, r: 3, pulse: 0.5, type: 'gold' },
        { x: 0.35, y: 0.15, r: 2.5, pulse: 0.7, type: 'black' },
        { x: 0.55, y: 0.22, r: 4, pulse: 0.4, type: 'gold' },
        { x: 0.78, y: 0.18, r: 2, pulse: 0.6, type: 'black' },
        { x: 0.85, y: 0.35, r: 3.5, pulse: 0.5, type: 'red' },
        { x: 0.25, y: 0.40, r: 2, pulse: 0.8, type: 'black' },
        { x: 0.45, y: 0.38, r: 3, pulse: 0.3, type: 'gold' },
        { x: 0.68, y: 0.42, r: 2.5, pulse: 0.6, type: 'black' },
        { x: 0.12, y: 0.55, r: 4, pulse: 0.4, type: 'gold' },
        { x: 0.32, y: 0.58, r: 2, pulse: 0.7, type: 'black' },
        { x: 0.52, y: 0.52, r: 3.5, pulse: 0.5, type: 'red' },
        { x: 0.72, y: 0.60, r: 2.5, pulse: 0.6, type: 'black' },
        { x: 0.88, y: 0.55, r: 3, pulse: 0.4, type: 'gold' },
        { x: 0.20, y: 0.75, r: 2.5, pulse: 0.7, type: 'black' },
        { x: 0.42, y: 0.72, r: 4, pulse: 0.3, type: 'gold' },
        { x: 0.62, y: 0.78, r: 2, pulse: 0.5, type: 'black' },
        { x: 0.82, y: 0.75, r: 3.5, pulse: 0.6, type: 'red' },
        { x: 0.48, y: 0.88, r: 3, pulse: 0.4, type: 'gold' },
    ];

    const connections = [
        [0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,4],
        [5,8],[8,9],[9,10],[10,11],[11,7],[8,13],[13,14],
        [14,15],[15,16],[14,17],[10,6],[9,1],[13,0],[16,11]
    ];

    let nodes = generateNodes();

    const draw = () => {
        const width = canvas.width / Math.min(window.devicePixelRatio, 2);
        const height = canvas.height / Math.min(window.devicePixelRatio, 2);
        const cx = width / 2;
        const cy = height / 2;

        ctx.clearRect(0, 0, width, height);

        // Background
        ctx.fillStyle = colors.bg;
        ctx.fillRect(0, 0, width, height);

        // Subtle radial gradient overlay
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.7);
        grad.addColorStop(0, 'rgba(255,255,255,0.4)');
        grad.addColorStop(1, 'rgba(245,245,240,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Architectural grid lines
        ctx.strokeStyle = colors.grid;
        ctx.lineWidth = 0.5;
        const gridSpacing = 40;
        for (let x = 0; x < width; x += gridSpacing) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSpacing) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }

        // Strong diagonal construction lines
        ctx.strokeStyle = colors.gridStrong;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([4, 8]);
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(width, height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(width, 0); ctx.lineTo(0, height); ctx.stroke();
        ctx.setLineDash([]);

        // Connection lines between nodes
        connections.forEach(([a, b]) => {
            const n1 = nodes[a];
            const n2 = nodes[b];
            const x1 = n1.x * width;
            const y1 = n1.y * height;
            const x2 = n2.x * width;
            const y2 = n2.y * height;

            const dist = Math.hypot(x2 - x1, y2 - y1);
            const maxDist = Math.max(width, height) * 0.45;
            const alpha = Math.max(0, 1 - dist / maxDist) * 0.15;

            ctx.strokeStyle = `rgba(10,10,10,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        });

        // Animated data packet on random connection
        const packetConn = Math.floor((time * 0.3) % connections.length);
        const [pa, pb] = connections[packetConn];
        const p1 = nodes[pa];
        const p2 = nodes[pb];
        const packetT = (time * 0.3) % 1;
        const px = p1.x * width + (p2.x * width - p1.x * width) * packetT;
        const py = p1.y * height + (p2.y * height - p1.y * height) * packetT;

        ctx.fillStyle = colors.gold;
        ctx.shadowColor = colors.gold;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Nodes
        nodes.forEach((node, i) => {
            const nx = node.x * width;
            const ny = node.y * height;
            const pulse = Math.sin(time * node.pulse + i * 1.3) * 0.3 + 1;

            let fill, stroke, radius;
            switch (node.type) {
                case 'gold':
                    fill = colors.goldLight;
                    stroke = colors.gold;
                    radius = node.r * pulse;
                    break;
                case 'red':
                    fill = colors.redLight;
                    stroke = colors.red;
                    radius = node.r * pulse;
                    break;
                default:
                    fill = 'rgba(10,10,10,0.06)';
                    stroke = 'rgba(10,10,10,0.25)';
                    radius = node.r * pulse * 0.8;
            }

            // Glow for gold nodes
            if (node.type === 'gold') {
                ctx.shadowColor = colors.gold;
                ctx.shadowBlur = 12 * pulse;
            }

            ctx.fillStyle = fill;
            ctx.strokeStyle = stroke;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(nx, ny, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Inner dot for black nodes
            if (node.type === 'black') {
                ctx.fillStyle = colors.black;
                ctx.beginPath();
                ctx.arc(nx, ny, radius * 0.35, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // Floating geometric rectangles (abstract lots/units)
        const rects = [
            { x: 0.22, y: 0.30, w: 0.08, h: 0.06, rot: 0.1 },
            { x: 0.58, y: 0.28, w: 0.10, h: 0.08, rot: -0.05 },
            { x: 0.35, y: 0.62, w: 0.12, h: 0.05, rot: 0.08 },
            { x: 0.68, y: 0.50, w: 0.07, h: 0.10, rot: -0.12 },
        ];

        rects.forEach((rect, i) => {
            const rx = rect.x * width;
            const ry = rect.y * height;
            const rw = rect.w * width;
            const rh = rect.h * height;
            const floatY = Math.sin(time * 0.4 + i * 2) * 3;

            ctx.save();
            ctx.translate(rx + rw/2, ry + rh/2 + floatY);
            ctx.rotate(rect.rot);
            ctx.strokeStyle = 'rgba(10,10,10,0.08)';
            ctx.lineWidth = 1;
            ctx.strokeRect(-rw/2, -rh/2, rw, rh);

            // Fill based on "state"
            const states = ['rgba(255,255,255,0.5)', 'rgba(185,28,28,0.06)', 'rgba(10,10,10,0.5)'];
            ctx.fillStyle = states[i % 3];
            ctx.fillRect(-rw/2, -rh/2, rw, rh);
            ctx.restore();
        });

        // Corner accents
        ctx.strokeStyle = 'rgba(201,162,39,0.2)';
        ctx.lineWidth = 1.5;
        const cornerSize = 20;
        // Top-left
        ctx.beginPath(); ctx.moveTo(20, 40); ctx.lineTo(20, 20); ctx.lineTo(40, 20); ctx.stroke();
        // Bottom-right
        ctx.beginPath(); ctx.moveTo(width-40, height-20); ctx.lineTo(width-20, height-20); ctx.lineTo(width-20, height-40); ctx.stroke();

        time += 0.016;
        animationId = requestAnimationFrame(draw);
    };

    draw();

    // Pause when not visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animationId) draw();
            } else {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        });
    });
    observer.observe(canvas);
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
