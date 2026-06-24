/* =====================================================
   The Realest Detailing And Services Co — JS
   ===================================================== */

(function () {
  'use strict';

  // ── Navbar scroll effect ────────────────────────────
  var navbar = document.getElementById('navbar');
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
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── Smooth active nav link highlighting ────────────
  var sections = document.querySelectorAll('section[id]');
  var navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveNav() {
    var current = '';
    sections.forEach(function (section) {
      var sTop = section.offsetTop - 120;
      if (window.scrollY >= sTop) {
        current = section.getAttribute('id');
      }
    });
    navItems.forEach(function (a) {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = 'var(--red)';
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ── Intersection observer entrance animations ───────
  if ('IntersectionObserver' in window) {
    var animTargets = document.querySelectorAll(
      '.service-card, .why-card, .review-card, .gallery-item, .faq-item, .quote-info-card, .about-badge'
    );
    animTargets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    // Stagger cards within their parent grid
    ['service-card', 'why-card', 'review-card', 'gallery-item'].forEach(function (cls) {
      document.querySelectorAll('.' + cls).forEach(function (card, i) {
        card.style.transitionDelay = (i % 3) * 80 + 'ms';
      });
    });

    animTargets.forEach(function (el) { observer.observe(el); });
  }

  // ── Gallery Lightbox ────────────────────────────────
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery-item[data-lightbox="true"]').forEach(function (item) {
    item.addEventListener('click', function () {
      var src = item.getAttribute('data-src');
      var caption = item.getAttribute('data-caption') || '';
      lightboxImg.setAttribute('src', src);
      lightboxImg.setAttribute('alt', caption);
      lightboxCaption.textContent = caption;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(function () {
      lightboxImg.setAttribute('src', '');
    }, 300);
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // ── FAQ Accordion ───────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      var answer = btn.nextElementSibling;

      // Close all
      document.querySelectorAll('.faq-question').forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.classList.remove('open');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });

  // ── Quote Form handling ─────────────────────────────
  var quoteForm = document.getElementById('quoteForm');
  var quoteSuccess = document.getElementById('quoteSuccess');

  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var required = quoteForm.querySelectorAll('[required]');
      var valid = true;
      required.forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#D72626';
          field.addEventListener('input', function () {
            field.style.borderColor = '';
          }, { once: true });
        }
      });

      if (!valid) return;

      var submitBtn = quoteForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      setTimeout(function () {
        quoteForm.reset();
        document.getElementById('fileLabel').textContent = 'Click to upload photos (JPG, PNG)';
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Get My Free Quote <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
        if (quoteSuccess) {
          quoteSuccess.style.display = 'flex';
          setTimeout(function () {
            quoteSuccess.style.display = 'none';
          }, 7000);
        }
      }, 1200);
    });
  }

  // ── File upload label update ─────────────────────────
  var fileInput = document.getElementById('qPhotos');
  var fileLabel = document.getElementById('fileLabel');
  if (fileInput && fileLabel) {
    fileInput.addEventListener('change', function () {
      if (fileInput.files && fileInput.files.length > 0) {
        fileLabel.textContent = fileInput.files.length + ' photo(s) selected';
      } else {
        fileLabel.textContent = 'Click to upload photos (JPG, PNG)';
      }
    });
  }

  // ── Phone number formatting ─────────────────────────
  var phoneInput = document.getElementById('qPhone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      var val = phoneInput.value.replace(/\D/g, '').substring(0, 10);
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

  // ── Smooth scroll for anchor buttons ────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = anchor.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = 70;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
