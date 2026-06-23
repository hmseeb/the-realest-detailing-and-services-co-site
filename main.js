/* =====================================================
   The Realest Detailing And Services Co — JS
   ===================================================== */

(function () {
  'use strict';

  // ── Navbar scroll effect ────────────────────────────
  const navbar = document.getElementById('navbar');
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ── Mobile nav toggle ───────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── Smooth active nav link highlighting ────────────
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(function (section) {
      const sTop = section.offsetTop - 100;
      if (window.scrollY >= sTop) {
        current = section.getAttribute('id');
      }
    });
    navItems.forEach(function (a) {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = 'var(--gold)';
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ── Service cards entrance animation ───────────────
  if ('IntersectionObserver' in window) {
    const cards = document.querySelectorAll('.service-card, .contact-card, .about-badge');
    cards.forEach(function (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach(function (card) { observer.observe(card); });

    // Stagger service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(function (card, i) {
      card.style.transitionDelay = (i * 80) + 'ms';
    });
  }

  // ── Contact form handling ───────────────────────────
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#E53E3E';
          field.addEventListener('input', function () {
            field.style.borderColor = '';
          }, { once: true });
        }
      });

      if (!valid) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      // Simulate form submission
      setTimeout(function () {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
        successMsg.style.display = 'flex';
        setTimeout(function () {
          successMsg.style.display = 'none';
        }, 6000);
      }, 1200);
    });
  }

  // ── Phone number formatting ─────────────────────────
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      let val = phoneInput.value.replace(/\D/g, '').substring(0, 10);
      if (val.length >= 7) {
        val = '(' + val.substring(0,3) + ') ' + val.substring(3,6) + '-' + val.substring(6);
      } else if (val.length >= 4) {
        val = '(' + val.substring(0,3) + ') ' + val.substring(3);
      } else if (val.length >= 1) {
        val = '(' + val;
      }
      phoneInput.value = val;
    });
  }

})();
