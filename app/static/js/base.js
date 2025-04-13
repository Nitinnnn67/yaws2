document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const nav = document.querySelector('.nav');

    // Apply page transition effect to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('page-transition');
    }

    // Add spacing to content to prevent crowding
    const content = document.querySelector('#content');
    if (content) {
        content.style.padding = '20px';
        content.style.margin = '0 auto';
        content.style.maxWidth = '1200px';
    }

    // Simple dropdown approach without complex animations
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        // Remove any existing listeners
        const link = dropdown.querySelector('a');
        if (link) {
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            if (window.innerWidth <= 768) {
                newLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    dropdowns.forEach(other => {
                        if (other !== dropdown && other.classList.contains('active')) {
                            other.classList.remove('active');
                        }
                    });
                });
            }
        }
    });

    // Simple mobile nav toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('open');
        });
    }

    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.nav')) {
                navList.classList.remove('open');
                if (hamburger) hamburger.classList.remove('active');
                document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
            }
        }
    });

    // Rest of your existing code for form inputs, contact form, etc.
    const formInputs = document.querySelectorAll('.m3-text-field input');
    formInputs.forEach(input => {
        const validateInput = () => {
            const field = input.closest('.m3-text-field');
            if (field) {
                if (input.validity.valid) {
                    field.classList.remove('invalid');
                    field.classList.add('valid');
                } else {
                    field.classList.remove('valid');
                    field.classList.add('invalid');
                }
            }
        };
        
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', validateInput);
    });
    
    const newsletterForm = document.querySelector('.m3-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailField = this.querySelector('input[type="email"]');
            
            if (emailField && emailField.validity.valid) {
                if (!this.querySelector('.m3-success-message')) {
                    const successMsg = document.createElement('div');
                    successMsg.textContent = 'Thank you for subscribing!';
                    successMsg.classList.add('m3-success-message');
                    
                    this.appendChild(successMsg);
                    emailField.value = '';
                    
                    setTimeout(() => {
                        successMsg.remove();
                    }, 3000);
                }
            }
        });
    } 

    // Contact Form Functionality
    const contactBtn = document.createElement('div');
    contactBtn.className = 'floating-contact-btn';
    contactBtn.innerHTML = '<i class="material-icons">chat</i>';
    document.body.appendChild(contactBtn);

    const modalHtml = `
        <div class="contact-modal">
            <div class="contact-form-container">
                <button class="close-modal">&times;</button>
                <h2>Contact Us</h2>
                <form class="contact-form" id="contactForm">
                    <div class="form-group">
                        <input type="text" id="name" required placeholder="Your Name">
                    </div>
                    <div class="form-group">
                        <input type="tel" id="phone" required placeholder="Phone Number">
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" required placeholder="Email Address">
                    </div>
                    <div class="form-group">
                        <textarea id="message" rows="4" required placeholder="Your Message"></textarea>
                    </div>
                    <div class="contact-actions">
                        <button type="submit" class="contact-btn primary">
                            <i class="material-icons">send</i>
                            Send Message
                        </button>
                        <a href="tel:+918356901298" class="contact-btn secondary">
                            <i class="material-icons">phone</i>
                            Call Now
                        </a>
                        <a href="https://wa.me/+918356901298" target="_blank" class="contact-btn secondary">
                            
                            WhatsApp
                        </a>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Event Listeners
    const modal = document.querySelector('.contact-modal');
    const closeBtn = document.querySelector('.close-modal');
    const contactForm = document.getElementById('contactForm');

    contactBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to backend
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        modal.classList.remove('active');
        contactForm.reset();
    });
});