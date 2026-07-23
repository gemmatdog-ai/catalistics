document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Active Link Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const itemPath = item.getAttribute('href');
        if (itemPath === currentPath) {
            item.classList.add('active');
        }
    });

    // EmailJS Integration
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Initialize EmailJS (using the provided Public Key)
        // Note: The script tag for EmailJS must be included in the HTML file
        // e.g. <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
        
        emailjs.init("ziLnha91scpGjFABh");

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const statusDiv = document.getElementById('form-status');
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Reset status
            statusDiv.className = 'form-status';
            statusDiv.textContent = 'Sending message...';
            statusDiv.style.display = 'block';
            submitBtn.disabled = true;

            // Service ID: service_zrcbbpw
            // Template ID: template_o9loxgq
            emailjs.sendForm('service_zrcbbpw', 'template_o9loxgq', this)
                .then(() => {
                    statusDiv.className = 'form-status success';
                    statusDiv.textContent = 'Thank you! Your message has been sent successfully.';
                    contactForm.reset();
                    submitBtn.disabled = false;
                }, (error) => {
                    statusDiv.className = 'form-status error';
                    statusDiv.textContent = 'Oops! Something went wrong. Please try again later.';
                    console.error('EmailJS Error:', error);
                    submitBtn.disabled = false;
                });
        });
    }

    // Scroll reveal animation (simple implementation)
    const fadeElements = document.querySelectorAll('.feature-card, .service-detail, .contact-grid');
    
    const checkScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        fadeElements.forEach(element => {
            const boxTop = element.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize initial styles for elements to be faded in
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on load
});
