document.addEventListener("DOMContentLoaded", function () {

  // 1. Mobile Navigation Toggle
  const menuToggle = document.getElementById("mobile-nav-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");

      // Toggle hamburger and close icon
      const icon = menuToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
      } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
      }
    });
  }

  // 2. Mobile Dropdown Toggle
  const dropdowns = document.querySelectorAll('.dropdown > a');
  
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
      // Only prevent default on mobile
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdownParent = this.parentElement;
        
        // Close other dropdowns
        document.querySelectorAll('.dropdown').forEach(d => {
          if (d !== dropdownParent) {
            d.classList.remove('active');
          }
        });
        
        // Toggle current dropdown
        dropdownParent.classList.toggle('active');
      }
    });
  });

  // Close mobile menu when clicking outside or on a regular link
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
      // If clicking outside nav or on a non-dropdown link
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
        
        // Close all dropdowns
        document.querySelectorAll('.dropdown').forEach(d => {
          d.classList.remove('active');
        });
      } else if (e.target.tagName === 'A' && !e.target.parentElement.classList.contains('dropdown')) {
        // Clicking on a regular nav link (not dropdown parent)
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
      }
    }
  });

  // Reset dropdown states on window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      document.querySelectorAll('.dropdown').forEach(d => {
        d.classList.remove('active');
      });
    }
  });

  // 2. Animate on Scroll (AOS) Initialization
  AOS.init({
      duration: 800, // values from 0 to 3000, with step 50ms
      once: true,     // whether animation should happen only once - while scrolling down
  });

  // 3. Gallery Slideshow
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show current slide
    if (slides[index]) {
      slides[index].classList.add('active');
      indicators[index].classList.add('active');
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }

  function stopSlideshow() {
    clearInterval(slideInterval);
  }

  // Initialize slideshow if slides exist
  if (slides.length > 0) {
    // Add click events to indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        stopSlideshow();
        startSlideshow(); // Restart the timer
      });
    });

    // Pause slideshow on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
      slideshowContainer.addEventListener('mouseenter', stopSlideshow);
      slideshowContainer.addEventListener('mouseleave', startSlideshow);
    }

    // Start the slideshow
    startSlideshow();
  }

  // 4. Smooth scroll for any internal links (optional, if you have any)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

});