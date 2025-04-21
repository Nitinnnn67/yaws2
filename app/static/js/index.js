// Main website JavaScript file
'use strict';

// Wait for DOM content to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initAnimations();
  initFormValidation();
  initCarousel();
  initNoticeBoard();
  initCaptions();
  initDateTime();
  initLeadershipSlideshow();
  
  // Only initialize parallax on larger screens
  if (window.innerWidth > 768) {
    initParallax();
  }
});

// Global variables
let isScrollPaused = false;
let scrollInterval = null;

/**
 * Animation on scroll functionality
 */
function initAnimations() {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.content, .feature-card, .achievement-card, .stat-card, .campus-card');
    
    if (elements.length === 0) {
      return;
    }
    
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        element.classList.add('in-view');
      } else {
        element.classList.remove('in-view');
      }
    });
  };
  
  // Add scroll event listener with throttling
  let scrollThrottleTimer;
  window.addEventListener('scroll', () => {
    if (!scrollThrottleTimer) {
      scrollThrottleTimer = setTimeout(() => {
        animateOnScroll();
        scrollThrottleTimer = null;
      }, 100);
    }
  });
  
  // Run once on initial load
  animateOnScroll();
}

/**
 * Form validation for input fields
 */
function initFormValidation() {
  const formInputs = document.querySelectorAll('.m3-text-field input');
  
  formInputs.forEach(input => {
    const validateInput = () => {
      const field = input.closest('.m3-text-field');
      if (input.validity.valid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
      } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
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
        const successMsg = document.createElement('div');
        successMsg.textContent = 'Thank you for subscribing!';
        successMsg.classList.add('m3-success-message');
        
        this.appendChild(successMsg);
        emailField.value = '';
        
        setTimeout(() => {
          successMsg.remove();
        }, 3000);
      }
    });
  }
}

/**
 * Carousel/Slideshow functionality
 */
function initCarousel() {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.carousel-item');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  
  if (slides.length === 0 || !indicatorsContainer) {
    console.error("Carousel elements not found");
    return;
  }
  
  // Create indicators
  slides.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    indicator.onclick = () => goToSlide(index);
    indicatorsContainer.appendChild(indicator);
  });
  
  const indicators = document.querySelectorAll('.indicator');
  
  function updateSlides() {
    if (!slides[currentSlide] || !indicators[currentSlide]) {
      return;
    }
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }
  
  function moveSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    updateSlides();
  }
  
  function goToSlide(index) {
    if (index < 0 || index >= slides.length) {
      return;
    }
    currentSlide = index;
    updateSlides();
  }
  
  // Auto advance slides
  setInterval(() => moveSlide(1), 10000);
  
  // Initialize first slide
  updateSlides();
  
  // Make moveSlide available globally
  window.moveSlide = moveSlide;
}

/**
 * Notice board functionality including auto-scrolling and API-based notice fetching
 */
function initNoticeBoard() {
  // Notice fetch variables
  let currentGeneralPage = 1;
  let currentExamPage = 1;
  const perPage = 5;
  let loading = false;
  let scrollTimer = null;
  
  // Get notice content elements
  const generalNoticeContent = document.getElementById('generalNoticeContent');
  const examNoticeContent = document.getElementById('examNoticeContent');
  const generalNoticesContainer = document.getElementById('generalNoticesContainer');
  const examNoticesContainer = document.getElementById('examNoticesContainer');
  
  // Check if elements exist
  if (!generalNoticeContent || !examNoticeContent) return;

  // Format dates in IST timezone
  function formatDate(dateString) {
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'Asia/Kolkata' // IST timezone
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  }

  // Fetch notices from the API
  async function fetchNotices(page, type = 'general') {
    try {
      loading = true;
      const loadingElement = document.getElementById('noticeLoading');
      if (loadingElement) loadingElement.style.display = 'block';

      const response = await fetch(`/api/notices?page=${page}&per_page=${perPage}&type=${type}`);
      const data = await response.json();
      
      // Select the appropriate container based on notice type
      const noticeContainer = type === 'general' 
        ? document.getElementById('generalNoticeContent') 
        : document.getElementById('examNoticeContent');
      
      if (!noticeContainer) return;
      
      // Filter notices to only show those from the past 2 days
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      
      const recentNotices = data.notices.filter(notice => {
        const noticeDate = new Date(notice.date_uploaded);
        return noticeDate >= twoDaysAgo;
      });
      
      recentNotices.forEach(notice => {
        const noticeElement = document.createElement('div');
        noticeElement.className = 'notice';
        noticeElement.innerHTML = `
          <span class="notice-date">${formatDate(notice.date_uploaded)}</span>
          <a href="${notice.url}" target="_blank" class="notice-link">
            ${notice.title}
            <span class="material-icons notice-icon">arrow_forward</span>
          </a>
        `;
        noticeContainer.appendChild(noticeElement);
      });

      // Update load more button visibility if it exists
      const loadMoreButton = document.getElementById(`loadMore${type.charAt(0).toUpperCase() + type.slice(1)}Button`);
      if (loadMoreButton) {
        loadMoreButton.style.display = data.has_next ? 'block' : 'none';
      }
    } catch (error) {
      console.error(`Error fetching ${type} notices:`, error);
    } finally {
      loading = false;
      const loadingElement = document.getElementById('noticeLoading');
      if (loadingElement) loadingElement.style.display = 'none';
    }
  }

  // Initial fetch of notices
  fetchNotices(currentGeneralPage, 'general');
  fetchNotices(currentExamPage, 'exam');

  // Set up load more button functionality
  const loadMoreGeneralBtn = document.getElementById('loadMoreGeneralButton');
  if (loadMoreGeneralBtn) {
    loadMoreGeneralBtn.addEventListener('click', () => {
      if (!loading) {
        currentGeneralPage++;
        fetchNotices(currentGeneralPage, 'general');
      }
    });
  }

  const loadMoreExamBtn = document.getElementById('loadMoreExamButton');
  if (loadMoreExamBtn) {
    loadMoreExamBtn.addEventListener('click', () => {
      if (!loading) {
        currentExamPage++;
        fetchNotices(currentExamPage, 'exam');
      }
    });
  }

  // Set up hover event listeners to pause/resume animation
  if (generalNoticeContent) {
    generalNoticeContent.addEventListener('mouseenter', function() {
      this.style.animationPlayState = 'paused';
    });
    
    generalNoticeContent.addEventListener('mouseleave', function() {
      this.style.animationPlayState = 'running';
    });
  }
  
  if (examNoticeContent) {
    examNoticeContent.addEventListener('mouseenter', function() {
      this.style.animationPlayState = 'paused';
    });
    
    examNoticeContent.addEventListener('mouseleave', function() {
      this.style.animationPlayState = 'running';
    });
  }
  
  // Allow manual scrolling on the container
  if (generalNoticesContainer) {
    generalNoticesContainer.addEventListener('wheel', function(e) {
      // Prevent default behavior only if inside container
      e.stopPropagation();
      
      // Manual scrolling
      if (e.deltaY > 0) {
        // Scrolling down
        this.scrollTop += 30;
      } else {
        // Scrolling up
        this.scrollTop -= 30;
      }
    });
  }
  
  if (examNoticesContainer) {
    examNoticesContainer.addEventListener('wheel', function(e) {
      // Prevent default behavior only if inside container
      e.stopPropagation();
      
      // Manual scrolling
      if (e.deltaY > 0) {
        // Scrolling down
        this.scrollTop += 30;
      } else {
        // Scrolling up
        this.scrollTop -= 30;
      }
    });
  }
  
  // Export pause/resume scroll functions for use in HTML
  window.pauseScroll = function() {
    const generalContent = document.querySelector('#generalNoticeContent');
    const examContent = document.querySelector('#examNoticeContent');
    
    if (generalContent) generalContent.style.animationPlayState = 'paused';
    if (examContent) examContent.style.animationPlayState = 'paused';
    
    if (scrollTimer) clearTimeout(scrollTimer);
  };
  
  window.resumeScroll = function() {
    const generalContent = document.querySelector('#generalNoticeContent');
    const examContent = document.querySelector('#examNoticeContent');
    
    scrollTimer = setTimeout(() => {
      if (generalContent) generalContent.style.animationPlayState = 'running';
      if (examContent) examContent.style.animationPlayState = 'running';
    }, 500);
  };
  
  // Export these functions for use in HTML
  window.switchNoticeTab = function(type) {
    // Update tab active state
    document.getElementById('generalNoticeTab').classList.toggle('active', type === 'general');
    document.getElementById('examNoticeTab').classList.toggle('active', type === 'exam');
    
    // Show/hide appropriate container
    document.getElementById('generalNoticesContainer').style.display = type === 'general' ? 'block' : 'none';
    document.getElementById('examNoticesContainer').style.display = type === 'exam' ? 'block' : 'none';
  };
}

/**
 * Hero caption animation
 */
function initCaptions() {
  const captions = [
    { title: "Join Us Today", text: "Experience world-class education and vibrant campus life." },
    { title: "Your Future Starts Here", text: "Explore endless learning opportunities at Saket College." },
    { title: "Learn, Grow, Succeed", text: "Join a community that fosters innovation and success." },
    { title: "Be a Part of Excellence", text: "Shape your career with our top-notch faculty and resources." }
  ];
  
  let currentIndex = 0;
  
  function changeCaption() {
    const titleElement = document.getElementById("caption-title");
    const textElement = document.getElementById("caption-text");
    
    if (!titleElement || !textElement) return;
    
    currentIndex = (currentIndex + 1) % captions.length;
    
    titleElement.style.opacity = "0";
    textElement.style.opacity = "0";
    
    setTimeout(() => {
      titleElement.textContent = captions[currentIndex].title;
      textElement.textContent = captions[currentIndex].text;
      
      titleElement.style.opacity = "1";
      textElement.style.opacity = "1";
    }, 500);
  }
  
  setInterval(changeCaption, 4000);
}

/**
 * Date and time display functionality
 */
function initDateTime() {
  const dateTimeElement = document.getElementById("dateTime");
  if (!dateTimeElement) return;
  
  function updateDateTime() {
    const now = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    
    dateTimeElement.textContent = now.toLocaleString('en-US', options);
  }
  
  setInterval(updateDateTime, 1000);
  updateDateTime(); // Initialize immediately
}

/**
 * Parallax scrolling effect
 */
function initParallax() {
  const parallaxSections = document.querySelectorAll('.parallax-section');
  if (parallaxSections.length === 0) return;
  
  let ticking = false;
  
  function updateParallax() {
    parallaxSections.forEach(section => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;
      const rect = section.getBoundingClientRect();
      
      // Only apply effect when section is in view
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        section.style.backgroundPosition = `50% ${rate}px`;
      }
    });
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  
  // Initial update
  updateParallax();
}

/**
 * Leadership photos slideshow functionality
 */
function initLeadershipSlideshow() {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.message-slide');
  const indicators = document.querySelectorAll('.message-indicator');
  
  if (!slides.length || !indicators.length) return;
  
  const totalSlides = slides.length;
  
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Update indicators
    indicators.forEach(indicator => {
      indicator.classList.remove('active');
    });
    
    // Show current slide
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    // Update counter if it exists
    const counter = document.querySelector('.message-count');
    if (counter) {
      counter.textContent = `${index + 1}/${totalSlides}`;
    }
    
    currentSlide = index;
  }
  
  function nextSlide() {
    let next = currentSlide + 1;
    if (next >= totalSlides) next = 0;
    showSlide(next);
  }
  
  function prevSlide() {
    let prev = currentSlide - 1;
    if (prev < 0) prev = totalSlides - 1;
    showSlide(prev);
  }
  
  // Set up indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(index);
    });
  });
  
  // Set up navigation buttons
  const prevBtn = document.querySelector('.message-prev');
  const nextBtn = document.querySelector('.message-next');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
    });
  }
  
  // Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000);
}

/**
 * Toggle expandable content for vision and mission sections
 */
window.toggleContent = function(id) {
  const content = document.querySelector(`#${id} .expanded-content`);
  const button = document.querySelector(`#${id} .expand-btn`);
  
  if (!content || !button) return;
  
  if (content.classList.contains('show')) {
    content.classList.remove('show');
    button.textContent = 'Read More';
  } else {
    content.classList.add('show');
    button.textContent = 'Read Less';
  }
}