/* ═══════════════════════════════════════════════════════
   DR. KRISHAN SINGH — IR MICROSITE 3
   main.js  |  Navbar · Theme Toggle · Scroll Animations
══════════════════════════════════════════════════════ */

'use strict';

/* ── Theme Toggle ─────────────────────────────────── */
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

// Load saved preference (default: dark)
const savedTheme = localStorage.getItem('ks-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('ks-theme', next);
});


/* ── Navbar: Scroll Behaviour ─────────────────────── */
const navbar = document.getElementById('navbar');

const handleNavScroll = () => {
  if (window.scrollY > 20) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll(); // run on load


/* ── Navbar: Active Link on Scroll ───────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const updateActiveLink = () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) - 20;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', updateActiveLink, { passive: true });


/* ── Mobile Menu ──────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks = document.querySelectorAll('.mob-link');

hamburger?.addEventListener('click', () => {
  const isOpen = mobileMenu?.classList.toggle('open');
  hamburger?.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu?.classList.remove('open');
    hamburger?.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (mobileMenu?.classList.contains('open') &&
    !mobileMenu.contains(e.target) &&
    !hamburger?.contains(e.target)) {
    mobileMenu.classList.remove('open');
    hamburger?.classList.remove('open');
    document.body.style.overflow = '';
  }
});


/* ── Scroll Reveal Animations ─────────────────────── */
const animatedElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
  threshold: 0.05,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedElements.forEach(el => observer.observe(el));

// Reveal elements currently in viewport on load
const revealVisibleOnLoad = () => {
  animatedElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('in-view');
    }
  });
};

revealVisibleOnLoad();
window.addEventListener('load', revealVisibleOnLoad);


/* ── Smooth scroll for all anchor links ───────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Form Submission Handler ───────────────────────── */
const KSContactForm = document.getElementById('advisory-form');
const KSFormStatus = document.getElementById('form-status');

KSContactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (KSFormStatus) {
    KSFormStatus.textContent = "Submitting secure consultation request...";
    KSFormStatus.className = "form-status-message success";
    KSFormStatus.style.display = "block";
  }

  const submitBtn = KSContactForm.querySelector('.form-submit-btn');
  if (submitBtn) submitBtn.disabled = true;

  // Simulate email sending simulation
  setTimeout(() => {
    if (KSFormStatus) {
      KSFormStatus.textContent = "Thank you. Your consultation request has been submitted securely. We will be in touch shortly.";
      KSFormStatus.className = "form-status-message success";
    }

    KSContactForm.reset();
    if (submitBtn) submitBtn.disabled = false;

    setTimeout(() => {
      if (KSFormStatus) {
        KSFormStatus.style.opacity = '0';
        KSFormStatus.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          KSFormStatus.style.display = 'none';
          KSFormStatus.style.opacity = '1';
        }, 500);
      }
    }, 6000);
  }, 1200);
});
