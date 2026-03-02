// AutoBookr - Shared JavaScript

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
