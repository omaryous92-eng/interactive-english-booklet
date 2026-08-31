/* ============================================================
   main.js
   App Initialization, Hamburger Toggle
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ---------- Hamburger Menu ----------
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('active');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
      if (mobileNav.classList.contains('open')) {
        if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
          mobileNav.classList.remove('open');
          hamburger.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  }

  // ---------- Mark Active Nav Link ----------
  const currentPath = window.location.pathname;

  // Desktop nav
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === 'index.html' && currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
      link.classList.add('active');
    } else if (currentPath.includes(href) && href !== 'index.html') {
      link.classList.add('active');
    }
  });

  // Mobile nav
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === 'index.html' && currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
      link.classList.add('active');
    } else if (currentPath.includes(href) && href !== 'index.html') {
      link.classList.add('active');
    }
  });

  // ---------- Fade-in observer ----------
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  console.log('📘 Interactive E-Book initialized!');
});