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
        const hamburger = nav.querySelector('.hamburger');

        if (hamburger) {
            nav.insertBefore(toggle, hamburger);
        } else if (navLinks) {
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
    
    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = newsletterForm.querySelector('input[type="email"]');
            const btn = newsletterForm.querySelector('button');
            const email = input.value;
            
            if (!email) return;
            
            const originalText = btn.textContent;
            btn.textContent = 'Subscribing...';
            btn.disabled = true;
            
            // Simulate subscription
            setTimeout(function() {
                btn.textContent = '✓ Subscribed!';
                btn.style.background = '#10b981';
                input.value = '';
                setTimeout(function() {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
                
                // Track subscription
                if (window.autobookrTrack) {
                    window.autobookrTrack.custom('newsletter_signup', { email: email });
                }
            }, 1000);
        });
    }
});

// ============================================
// Analytics Tracking - CTA Click Events
// ============================================
(function() {
    // Track all CTA button clicks
    function trackCTAClick(ctaType, ctaText, ctaHref) {
        const eventData = {
            event: 'cta_click',
            cta_type: ctaType,
            cta_text: ctaText,
            cta_href: ctaHref,
            page: window.location.pathname.split('/').pop() || 'index.html',
            timestamp: new Date().toISOString()
        };
        
        console.log('📊 Analytics:', JSON.stringify(eventData, null, 2));
        
        // Also dispatch a custom event for potential GTM/analytics tools
        window.dispatchEvent(new CustomEvent('autobookr_cta_click', { detail: eventData }));
    }
    
    // Track pricing button clicks specifically
    function trackPricingClick(planName, price, planType) {
        const eventData = {
            event: 'pricing_click',
            plan: planName,
            price: price,
            plan_type: planType,
            page: window.location.pathname.split('/').pop() || 'index.html',
            timestamp: new Date().toISOString()
        };
        
        console.log('📊 Analytics:', JSON.stringify(eventData, null, 2));
        window.dispatchEvent(new CustomEvent('autobookr_pricing_click', { detail: eventData }));
    }
    
    // Track nav link clicks
    function trackNavClick(navText, navHref) {
        const eventData = {
            event: 'nav_click',
            nav_text: navText,
            nav_href: navHref,
            timestamp: new Date().toISOString()
        };
        
        console.log('📊 Analytics:', JSON.stringify(eventData, null, 2));
        window.dispatchEvent(new CustomEvent('autobookr_nav_click', { detail: eventData }));
    }
    
    // Track all CTA buttons on page
    document.addEventListener('DOMContentLoaded', function() {
        // Main CTA buttons (hero, sections)
        document.querySelectorAll('.cta-button').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                trackCTAClick('main_cta', btn.textContent.trim(), btn.getAttribute('href'));
            });
        });
        
        // Pricing buttons
        document.querySelectorAll('.pricing-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                const card = btn.closest('.pricing-card');
                const planName = card ? card.querySelector('h3').textContent : 'Unknown';
                const priceEl = card ? card.querySelector('.price') : null;
                const price = priceEl ? priceEl.textContent.trim() : 'Unknown';
                trackPricingClick(planName, price, 'pricing_card');
            });
        });
        
        // Footer links (as CTAs)
        document.querySelectorAll('footer a').forEach(function(link) {
            link.addEventListener('click', function(e) {
                trackCTAClick('footer_link', link.textContent.trim(), link.getAttribute('href'));
            });
        });
        
        // Nav links (excluding external)
        document.querySelectorAll('.nav-links a').forEach(function(link) {
            link.addEventListener('click', function(e) {
                trackNavClick(link.textContent.trim(), link.getAttribute('href'));
            });
        });
        
        // Track page view on load
        console.log('📊 Analytics:', JSON.stringify({
            event: 'page_view',
            page: window.location.pathname.split('/').pop() || 'index.html',
            referrer: document.referrer || 'direct',
            timestamp: new Date().toISOString()
        }, null, 2));
    });
    
    // Expose tracking functions globally for manual tracking if needed
    window.autobookrTrack = {
        cta: trackCTAClick,
        pricing: trackPricingClick,
        nav: trackNavClick,
        custom: function(eventName, data) {
            console.log('📊 Analytics:', JSON.stringify({
                event: eventName,
                ...data,
                timestamp: new Date().toISOString()
            }, null, 2));
        }
    };
})();
