// AutoBookr - Shared JavaScript

// Theme (dark/light) toggle
(function() {
    const storageKey = 'autobookr-theme';
    const root = document.documentElement;

    function getPreferredTheme() {
        const saved = localStorage.getItem(storageKey);
        if (saved === 'dark' || saved === 'light') return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }
    }

    function updateToggleLabel(btn) {
        if (!btn) return;
        const isDark = root.getAttribute('data-theme') === 'dark';
        btn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
        btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    applyTheme(getPreferredTheme());

    document.addEventListener('DOMContentLoaded', function() {
        const nav = document.querySelector('.nav-content');
        if (!nav) return;

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'theme-toggle';
        updateToggleLabel(toggle);

        const navLinks = nav.querySelector('.nav-links');
        if (navLinks) {
            nav.insertBefore(toggle, navLinks);
        } else {
            nav.appendChild(toggle);
        }

        toggle.addEventListener('click', function() {
            const isDark = root.getAttribute('data-theme') === 'dark';
            const next = isDark ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem(storageKey, next);
            updateToggleLabel(toggle);
        });
    });
})();

// Checkout banner
(function() {
    const q = new URLSearchParams(window.location.search);
    const state = q.get('checkout');
    if (!state) return;
    const msg = document.createElement('div');
    msg.style.maxWidth = '1100px';
    msg.style.margin = '92px auto 0';
    msg.style.padding = '12px 16px';
    msg.style.borderRadius = '10px';
    msg.style.fontWeight = '600';
    msg.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, sans-serif';
    if (state === 'success') {
        msg.style.background = '#dcfce7';
        msg.style.color = '#166534';
        msg.textContent = '✅ Payment successful (test mode). We\'ll contact you shortly to set up AutoBookr.';
    } else if (state === 'cancel') {
        msg.style.background = '#fef3c7';
        msg.style.color = '#92400e';
        msg.textContent = '⚠️ Checkout cancelled. You can choose any plan whenever you\'re ready.';
    } else {
        return;
    }
    document.body.prepend(msg);
})();

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});

// Highlight current nav link
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Scroll reveal animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedSelectors = [
        '.step',
        '.pricing-card',
        '.testimonial',
        '.feature-card',
        '.faq-item',
        '.benefit-item',
        '.use-case-item',
        '.stat-card',
        '.contact-form',
        '.contact-info',
        '.page-header h1',
        '.page-header p',
        '.section-title'
    ];

    const animatedElements = document.querySelectorAll(animatedSelectors.join(','));
    animatedElements.forEach(function(el, index) {
        el.classList.add('reveal');
        el.style.transitionDelay = Math.min(index * 40, 280) + 'ms';
    });

    if (!('IntersectionObserver' in window)) {
        animatedElements.forEach(function(el) {
            el.classList.add('in-view');
        });
        return;
    }

    const observer = new IntersectionObserver(function(entries, obs) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });

    animatedElements.forEach(function(el) {
        observer.observe(el);
    });
});

// Premium card tilt/parallax
(function() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const cardSelectors = [
        '.pricing-card',
        '.testimonial',
        '.feature-card',
        '.benefit-item',
        '.use-case-item',
        '.stat-card'
    ];

    const cards = document.querySelectorAll(cardSelectors.join(','));
    cards.forEach(function(card) {
        card.classList.add('tilt-card');

        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;
            card.style.transform = 'perspective(900px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-3px)';
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
})();

// Results stats count-up animation
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;

    function animateValue(el) {
        const raw = (el.getAttribute('data-target') || el.textContent || '').trim();
        const num = parseFloat(raw.replace(/[^\d.]/g, ''));
        if (!num || Number.isNaN(num)) return;

        const prefixMatch = raw.match(/^[^\d]*/);
        const suffixMatch = raw.match(/[^\d.]+$/);
        const prefix = prefixMatch ? prefixMatch[0] : '';
        const suffix = suffixMatch ? suffixMatch[0] : '';
        const decimals = raw.includes('.') ? (raw.split('.')[1] || '').replace(/[^\d]/g, '').length : 0;

        const duration = 1200;
        const start = performance.now();

        function frame(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = num * eased;
            const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
            el.textContent = prefix + formatted + suffix;
            if (progress < 1) requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
    }

    if (!('IntersectionObserver' in window)) {
        stats.forEach(animateValue);
        return;
    }

    const observer = new IntersectionObserver(function(entries, obs) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.45 });

    stats.forEach(function(stat) {
        stat.setAttribute('data-target', stat.textContent.trim());
        stat.textContent = stat.textContent.trim().replace(/[\d.]/g, '0');
        observer.observe(stat);
    });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;
            
            // Simulate form submission
            setTimeout(function() {
                btn.textContent = '✓ Message Sent!';
                btn.style.background = '#10b981';
                contactForm.reset();
                setTimeout(function() {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1000);
        });
    }
});
