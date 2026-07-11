/* =============================================
   Jung Se-Hoon Portfolio — script.js
   Navbar scroll · Mobile menu · Smooth scroll
   Back to top · Section highlight · Reveal
   ============================================= */

'use strict';

/* ─── DOM Refs ─── */
const navbar      = document.getElementById('navbar');
const hamburger   = document.getElementById('hamburger-btn');
const navLinks    = document.getElementById('nav-links');
const backToTop   = document.getElementById('back-to-top');
const navAnchors  = document.querySelectorAll('.nav-links a');
const sections    = document.querySelectorAll('section[id]');

/* ─── Navbar: scroll shadow ─── */
function handleNavScroll() {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back-to-top visibility
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Active nav link highlight
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 90;
    if (window.scrollY >= sectionTop) {
      current = section.id;
    }
  });
  navAnchors.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', handleNavScroll, { passive: true });

/* ─── Mobile hamburger menu ─── */
function toggleMenu() {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  // Prevent body scroll when menu open
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', toggleMenu);

// Close menu on link click
navAnchors.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)) {
    closeMenu();
  }
});

// Close menu on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    closeMenu();
    hamburger.focus();
  }
});

/* ─── Back to top ─── */
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── Intersection Observer: Reveal animations ─── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for child elements in a group
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Number(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// Add reveal class to elements that should animate in
const revealTargets = [
  '.pub-card',
  '.timeline-item',
  '.skill-group',
  '.project-card',
  '.edu-card',
  '.event-card',
  '.activity-item',
  '.stat-card',
  '.contact-card',
  '.about-text',
  '.about-stats',
  '.section-header',
];

revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    el.dataset.delay = i * 80;  // stagger
    revealObserver.observe(el);
  });
});

/* ─── Smooth scroll for all anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navH = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ─── Stat counter animation ─── */
function animateCounter(el) {
  const text = el.textContent.trim();
  // Extract numeric portion
  const match = text.match(/([\+\#]?)(\d+(?:\.\d+)?)(%?)/);
  if (!match) return;
  const prefix = match[1] || '';
  const target = parseFloat(match[2]);
  const suffix = match[3] || '';
  const decimals = (match[2].includes('.')) ? match[2].split('.')[1].length : 0;
  const duration = 1200;
  const step = 16;
  const steps = duration / step;
  let current = 0;
  const increment = target / steps;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = prefix + current.toFixed(decimals) + suffix;
  }, step);
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const valueEl = entry.target.querySelector('.stat-value');
        if (valueEl && !valueEl.dataset.animated) {
          valueEl.dataset.animated = 'true';
          animateCounter(valueEl);
        }
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat-card').forEach(card => {
  statObserver.observe(card);
});

/* ─── Initial call (in case page is already scrolled) ─── */
handleNavScroll();
