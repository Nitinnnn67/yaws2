document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
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



    // Mobile nav toggle
    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('open');
            
            // Prevent body scroll when mobile menu is open
            if (navList.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile nav when clicking outside (mobile only)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 991 && !e.target.closest('.nav')) {
            if (navList && navList.classList.contains('open')) {
                navList.classList.remove('open');
                document.body.style.overflow = '';
                
                // Close all open dropdowns when closing mobile nav
                document.querySelectorAll('.nav-item.dropdown .dropdown-menu.show').forEach(menu => {
                    menu.classList.remove('show');
                });
                document.querySelectorAll('.dropdown-submenu-menu.show').forEach(submenu => {
                    submenu.classList.remove('show');
                });
            }
            if (hamburger) hamburger.classList.remove('active');
        }
    });

    // Handle window resize - close dropdowns on size change
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            // Desktop mode - ensure mobile nav is closed and reset dropdowns
            if (navList) navList.classList.remove('open');
            if (hamburger) hamburger.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset all mobile dropdown states
            document.querySelectorAll('.nav-item.dropdown .dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
            document.querySelectorAll('.dropdown-submenu-menu.show').forEach(submenu => {
                submenu.classList.remove('show');
            });
        }
    });

    // Handle dropdown clicks on mobile/tablet with smooth animations
    document.addEventListener('click', function(e) {
        const dropdownToggle = e.target.closest('.nav-link.dropdown-toggle');
        
        if (dropdownToggle && window.innerWidth <= 991) {
            e.preventDefault();
            e.stopPropagation();
            
            const parentItem = dropdownToggle.closest('.nav-item.dropdown');
            const dropdownMenu = parentItem.querySelector('.dropdown-menu');
            
            if (dropdownMenu) {
                const isOpen = dropdownMenu.classList.contains('show');
                
                // Close all other dropdowns with animation
                document.querySelectorAll('.nav-item.dropdown .dropdown-menu.show').forEach(menu => {
                    if (menu !== dropdownMenu) {
                        menu.classList.remove('show');
                        // Also close any open submenus
                        menu.querySelectorAll('.dropdown-submenu-menu.show').forEach(submenu => {
                            submenu.classList.remove('show');
                        });
                    }
                });
                
                // Toggle current dropdown with animation
                if (isOpen) {
                    dropdownMenu.classList.remove('show');
                    // Close all submenus when closing main menu
                    dropdownMenu.querySelectorAll('.dropdown-submenu-menu.show').forEach(submenu => {
                        submenu.classList.remove('show');
                    });
                } else {
                    dropdownMenu.classList.add('show');
                }
            }
        }
        
        // Handle submenu clicks on mobile/tablet
        const submenuToggle = e.target.closest('.dropdown-submenu .dropdown-toggle');
        
        if (submenuToggle && window.innerWidth <= 991) {
            e.preventDefault();
            e.stopPropagation();
            
            const parentSubmenu = submenuToggle.closest('.dropdown-submenu');
            const submenuMenu = parentSubmenu.querySelector('.dropdown-submenu-menu');
            
            if (submenuMenu) {
                const isOpen = submenuMenu.classList.contains('show');
                
                // Close sibling submenus
                const parentDropdown = parentSubmenu.closest('.dropdown-menu');
                parentDropdown.querySelectorAll('.dropdown-submenu-menu.show').forEach(menu => {
                    if (menu !== submenuMenu) {
                        menu.classList.remove('show');
                    }
                });
                
                // Toggle current submenu with animation
                if (isOpen) {
                    submenuMenu.classList.remove('show');
                } else {
                    submenuMenu.classList.add('show');
                }
            }
        }
    });


    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Show/hide the button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top when clicked
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form validation
    const formInputs = document.querySelectorAll('.m3-text-field input');
    
    formInputs.forEach((input) => {
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
    
    // Newsletter form
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
        alert('Thank you for your message! We will get back to you soon.');
        modal.classList.remove('active');
        contactForm.reset();
    });
    
    // Bootstrap submenu dropdown functionality with hover support
    function initBootstrapSubmenus() {
        // Remove existing event listeners to prevent duplicates
        const existingElements = document.querySelectorAll('.dropdown-submenu > .dropdown-toggle');
        existingElements.forEach(el => {
            el.replaceWith(el.cloneNode(true));
        });
        
        // Handle submenu clicks on mobile
        document.querySelectorAll('.dropdown-submenu > .dropdown-toggle').forEach(function(element) {
            element.addEventListener('click', function(e) {
                // Only handle clicks on mobile
                if (window.innerWidth < 992) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const submenu = this.nextElementSibling;
                    const isOpen = submenu.classList.contains('show');
                    
                    // Close all other submenus at the same level
                    const parentDropdown = this.closest('.dropdown-menu');
                    parentDropdown.querySelectorAll('.dropdown-submenu-menu.show').forEach(function(openSubmenu) {
                        if (openSubmenu !== submenu) {
                            openSubmenu.classList.remove('show');
                        }
                    });
                    
                    // Toggle current submenu
                    if (isOpen) {
                        submenu.classList.remove('show');
                    } else {
                        submenu.classList.add('show');
                    }
                }
            });
        });
        
        // Desktop hover functionality
        if (window.innerWidth >= 992) {
            // Main dropdown hover
            document.querySelectorAll('.nav-item.dropdown').forEach(function(dropdown) {
                let mainTimeout;
                
                dropdown.addEventListener('mouseenter', function() {
                    clearTimeout(mainTimeout);
                    const menu = this.querySelector('.dropdown-menu');
                    if (menu) {
                        menu.classList.add('show');
                        this.classList.add('show');
                    }
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    const menu = this.querySelector('.dropdown-menu');
                    mainTimeout = setTimeout(() => {
                        if (menu) menu.classList.remove('show');
                        this.classList.remove('show');
                        // Close all submenus
                        this.querySelectorAll('.dropdown-submenu-menu.show').forEach(sub => {
                            sub.classList.remove('show');
                        });
                    }, 100);
                });
            });
            
            // Submenu hover (all levels)
            document.querySelectorAll('.dropdown-submenu').forEach(function(submenu) {
                let subTimeout;
                
                submenu.addEventListener('mouseenter', function() {
                    clearTimeout(subTimeout);
                    
                    // Close sibling submenus
                    const parent = this.parentElement;
                    parent.querySelectorAll(':scope > .dropdown-submenu > .dropdown-submenu-menu.show').forEach(sibling => {
                        if (sibling !== this.querySelector('.dropdown-submenu-menu')) {
                            sibling.classList.remove('show');
                        }
                    });
                    
                    // Open current submenu
                    const currentSubmenu = this.querySelector('.dropdown-submenu-menu');
                    if (currentSubmenu) {
                        currentSubmenu.classList.add('show');
                    }
                });
                
                submenu.addEventListener('mouseleave', function() {
                    const currentSubmenu = this.querySelector('.dropdown-submenu-menu');
                    if (currentSubmenu) {
                        subTimeout = setTimeout(() => {
                            // Only close if not hovering over the submenu itself
                            if (!currentSubmenu.matches(':hover') && !this.matches(':hover')) {
                                currentSubmenu.classList.remove('show');
                                // Close nested submenus too
                                currentSubmenu.querySelectorAll('.dropdown-submenu-menu.show').forEach(nested => {
                                    nested.classList.remove('show');
                                });
                            }
                        }, 100);
                    }
                });
            });
        }
        
        // Close all dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-item.dropdown')) {
                document.querySelectorAll('.nav-item.dropdown.show').forEach(function(dropdown) {
                    dropdown.classList.remove('show');
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) menu.classList.remove('show');
                });
                document.querySelectorAll('.dropdown-submenu-menu.show').forEach(function(submenu) {
                    submenu.classList.remove('show');
                });
            }
        });
    }
    
    // Initialize dropdowns
    initBootstrapSubmenus();
    
    // Re-initialize on window resize to handle desktop/mobile transitions
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Clean up existing state
            document.querySelectorAll('.dropdown-submenu-menu.show, .nav-item.dropdown.show').forEach(el => {
                el.classList.remove('show');
            });
            initBootstrapSubmenus();
        }, 250);
    });
});

