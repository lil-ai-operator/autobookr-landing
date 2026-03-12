// AutoBookr - Shared JavaScript

// Mobile menu toggle
window.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});

// Checkout banner
(function() {
    const q = new URLSearchParams(window.location.search);
    const state = q.get('checkout');
    if (!state) return;

    const msg = document.createElement('div');
    msg.className = 'checkout-banner ' + (state === 'success' ? 'success' : 'cancel');
    msg.textContent = state === 'success'
        ? 'Payment successful. We will contact you shortly about setup.'
        : 'Checkout cancelled. You can come back and choose a plan whenever you are ready.';
    document.body.prepend(msg);
})();

// Highlight current nav link
window.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Add loading state on navigation CTAs
window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.cta-button, .pricing-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const href = btn.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('javascript')) {
                btn.classList.add('loading');
            }
        });
    });
});

// Simple reveal animation
window.addEventListener('DOMContentLoaded', function() {
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
    animatedElements.forEach(function(el) {
        el.classList.add('reveal');
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
    }, { threshold: 0.15, rootMargin: '0px 0px -4% 0px' });

    animatedElements.forEach(function(el) {
        observer.observe(el);
    });
});

// Results stats count-up animation
window.addEventListener('DOMContentLoaded', function() {
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
window.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        if (!btn) return;
        const originalText = btn.textContent;
        btn.textContent = 'Thanks — we will be in touch';
        btn.disabled = true;
        contactForm.reset();

        setTimeout(function() {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2500);
    });
});

// Revenue calculator
window.addEventListener('DOMContentLoaded', function() {
    const avgJobValue = document.getElementById('avgJobValue');
    const missedCalls = document.getElementById('missedCalls');
    const recoveryRate = document.getElementById('recoveryRate');
    const planType = document.getElementById('planType');

    if (!avgJobValue || !missedCalls || !recoveryRate || !planType) return;

    function formatGBP(value) {
        return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(value);
    }

    function calculateRecovery() {
        const avg = Number(avgJobValue.value || 0);
        const missed = Number(missedCalls.value || 0);
        const rate = Number(recoveryRate.value || 0) / 100;
        const plan = Number(planType.value || 0);

        const weekly = avg * missed * rate;
        const monthly = weekly * 4;
        const annual = monthly * 12;
        const net = monthly - plan;

        const weeklyEl = document.getElementById('weeklyRecovery');
        const monthlyEl = document.getElementById('monthlyRecovery');
        const annualEl = document.getElementById('annualRecovery');
        const netEl = document.getElementById('netProfit');

        if (weeklyEl) weeklyEl.textContent = formatGBP(weekly);
        if (monthlyEl) monthlyEl.textContent = formatGBP(monthly);
        if (annualEl) annualEl.textContent = formatGBP(annual);
        if (netEl) netEl.textContent = formatGBP(net);
    }

    [avgJobValue, missedCalls, recoveryRate, planType].forEach(function(el) {
        el.addEventListener('input', calculateRecovery);
        el.addEventListener('change', calculateRecovery);
    });

    calculateRecovery();
});

// FAQ accordion
window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.faq-item .faq-question').forEach(function(button) {
        button.addEventListener('click', function() {
            const item = button.closest('.faq-item');
            const answer = item ? item.querySelector('.faq-answer') : null;
            if (!item || !answer) return;

            const isOpen = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(function(other) {
                other.classList.remove('active');
                const otherAnswer = other.querySelector('.faq-answer');
                if (otherAnswer) otherAnswer.style.display = 'none';
            });

            if (!isOpen) {
                item.classList.add('active');
                answer.style.display = 'block';
            }
        });
    });
});
