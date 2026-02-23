/**
 * Ortofrutticola Ravanelli & Carminati - Static Site Scripts
 * Vanilla JS - mobile menu toggle, hero slider
 */
(function () {
  'use strict';

  // Mobile menu toggle
  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      toggle.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click (for anchor-style links within same page)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Hero slider on home page
  function initHeroSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return;

    const slides = sliderContainer.querySelectorAll('.slide');
    const prevBtn = sliderContainer.querySelector('.slider-btn.prev');
    const nextBtn = sliderContainer.querySelector('.slider-btn.next');
    const dots = sliderContainer.querySelectorAll('.slider-dots .dot');
    if (slides.length === 0) return;

    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
      currentSlide = (index + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        s.classList.toggle('active', i === currentSlide);
      });
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === currentSlide);
      });
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function prevSlide() {
      showSlide(currentSlide - 1);
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        showSlide(i);
      });
    });

    // Auto-advance every 5 seconds
    slideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    sliderContainer.addEventListener('mouseenter', function () {
      clearInterval(slideInterval);
    });
    sliderContainer.addEventListener('mouseleave', function () {
      slideInterval = setInterval(nextSlide, 5000);
    });

    showSlide(0);
  }

  // Logo click - navigate to home (static version, no triple-tap admin)
  function initLogoClick() {
    const logo = document.querySelector('.navbar .logo');
    if (logo) {
      logo.addEventListener('click', function () {
        window.location.href = 'index.html';
      });
    }
  }

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initMobileMenu();
      initHeroSlider();
      initLogoClick();
    });
  } else {
    initMobileMenu();
    initHeroSlider();
    initLogoClick();
  }
})();
