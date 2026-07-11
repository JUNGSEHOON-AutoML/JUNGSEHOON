/* =============================================
   Jung Se-Hoon Portfolio — script.js
   Navbar · Mobile menu · Reveal · Counter
   Lightbox Gallery · Touch swipe · Keyboard nav
   ============================================= */
'use strict';

/* ─── DOM Refs ─── */
const navbar         = document.getElementById('navbar');
const hamburger      = document.getElementById('hamburger-btn');
const navLinks       = document.getElementById('nav-links');
const backToTop      = document.getElementById('back-to-top');
const navAnchors     = document.querySelectorAll('.nav-links a');
const sections       = document.querySelectorAll('section[id]');
const scrollProgress = document.getElementById('scroll-progress');

/* ─── Navbar scroll ─── */
function handleNavScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  backToTop.classList.toggle('visible', window.scrollY > 400);

  // Scroll Progress Bar Update
  const winScroll = window.scrollY || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
  if (scrollProgress) {
    scrollProgress.style.width = scrolled + '%';
  }

  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 90) current = s.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', handleNavScroll, { passive: true });

/* ─── Mobile menu ─── */
function toggleMenu() {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}
function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
hamburger.addEventListener('click', toggleMenu);
navAnchors.forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('click', e => {
  if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) closeMenu();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (navLinks.classList.contains('open')) { closeMenu(); hamburger.focus(); }
    if (lightboxEl && !lightboxEl.hidden) closeLightbox();
  }
});

/* ─── Back to top ─── */
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ─── Smooth scroll ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ─── Reveal animation ─── */
const revealObs = new IntersectionObserver(
  entries => entries.forEach((en, i) => {
    if (en.isIntersecting) {
      setTimeout(() => en.target.classList.add('visible'), Number(en.target.dataset.delay || 0));
      revealObs.unobserve(en.target);
    }
  }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
['.pub-card','.timeline-item','.skill-group','.project-card','.edu-card','.event-card','.activity-item','.stat-card','.contact-card','.about-text','.about-stats','.section-header']
  .forEach(sel => document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('reveal'); el.dataset.delay = i * 80; revealObs.observe(el);
  }));

/* ─── Stat counter ─── */
function animateCounter(el) {
  const text = el.textContent.trim();
  const m = text.match(/([\+\#]?)(\d+(?:\.\d+)?)(%?)/);
  if (!m) return;
  const [, prefix, raw, suffix] = m;
  const target = parseFloat(raw);
  const dec = raw.includes('.') ? raw.split('.')[1].length : 0;
  let cur = 0; const step = target / (1200 / 16);
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = prefix + cur.toFixed(dec) + suffix;
    if (cur >= target) clearInterval(t);
  }, 16);
}
const statObs = new IntersectionObserver(
  entries => entries.forEach(en => {
    if (en.isIntersecting) {
      const v = en.target.querySelector('.stat-value');
      if (v && !v.dataset.animated) { v.dataset.animated = '1'; animateCounter(v); }
    }
  }),
  { threshold: 0.5 }
);
document.querySelectorAll('.stat-card').forEach(c => statObs.observe(c));

/* ═══════════════════════════════════
   LIGHTBOX
═══════════════════════════════════ */
const lightboxEl  = document.getElementById('lightbox');
const backdrop    = document.getElementById('lb-backdrop');
const lbClose     = document.getElementById('lb-close');
const lbPrev      = document.getElementById('lb-prev');
const lbNext      = document.getElementById('lb-next');
const lbMediaWrap = document.getElementById('lb-media-wrap');
const lbCaption   = document.getElementById('lb-caption');
const lbCounter   = document.getElementById('lb-counter');
const lbThumbs    = document.getElementById('lb-thumbs');

let gallery = [];   // [{src, alt, type}]
let current = 0;

/* Build thumbnail strip */
function buildThumbs() {
  lbThumbs.innerHTML = '';
  if (gallery.length <= 1) return;
  gallery.forEach((item, i) => {
    const t = document.createElement('div');
    t.className = 'lb-thumb' + (i === current ? ' active' : '');
    t.setAttribute('role', 'button');
    t.setAttribute('tabindex', '0');
    t.setAttribute('aria-label', `이미지 ${i + 1}: ${item.alt}`);
    const img = document.createElement('img');
    img.src   = item.src;
    img.alt   = item.alt;
    t.appendChild(img);
    t.addEventListener('click', () => goTo(i));
    t.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(i); } });
    lbThumbs.appendChild(t);
  });
}

/* Render current item */
function renderItem() {
  const item = gallery[current];
  lbMediaWrap.innerHTML = '';

  if (item.type === 'iframe') {
    const iframe = document.createElement('iframe');
    iframe.src = item.src;
    iframe.title = item.alt;
    iframe.className = 'lb-iframe';
    iframe.style.width = '100%';
    iframe.style.height = '60vh';
    iframe.style.border = 'none';
    lbMediaWrap.appendChild(iframe);
  } else {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    lbMediaWrap.appendChild(img);
  }

  lbCaption.textContent = item.alt;
  lbCounter.textContent = `${current + 1} / ${gallery.length}`;

  // Update thumb active state
  lbThumbs.querySelectorAll('.lb-thumb').forEach((t, i) => {
    t.classList.toggle('active', i === current);
  });

  // Arrow states
  lbPrev.disabled = gallery.length <= 1;
  lbNext.disabled = gallery.length <= 1;
}

function goTo(idx) {
  current = (idx + gallery.length) % gallery.length;
  renderItem();
  // Scroll active thumb into view
  const activeThumb = lbThumbs.querySelector('.lb-thumb.active');
  if (activeThumb) activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

function openLightbox(items, startIndex = 0) {
  gallery = items;
  current = startIndex;
  buildThumbs();
  renderItem();

  lightboxEl.hidden = false;
  document.body.style.overflow = 'hidden';

  // Animate in
  requestAnimationFrame(() => {
    backdrop.classList.add('open');
    lightboxEl.classList.add('open');
  });

  lbClose.focus();
}

function closeLightbox() {
  backdrop.classList.remove('open');
  lightboxEl.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxEl.hidden = true; lbMediaWrap.innerHTML = ''; }, 300);
}

lbClose.addEventListener('click', closeLightbox);
backdrop.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', () => goTo(current - 1));
lbNext.addEventListener('click', () => goTo(current + 1));

/* Keyboard navigation */
document.addEventListener('keydown', e => {
  if (lightboxEl.hidden) return;
  if (e.key === 'ArrowLeft')  goTo(current - 1);
  if (e.key === 'ArrowRight') goTo(current + 1);
});

/* Touch / swipe */
let touchStartX = 0, touchStartY = 0;
lbMediaWrap.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });
lbMediaWrap.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    goTo(dx < 0 ? current + 1 : current - 1);
  }
}, { passive: true });

/* ─── Attach gallery to project cards ─── */
document.querySelectorAll('.project-card[data-gallery]').forEach(card => {
  const items = JSON.parse(card.getAttribute('data-gallery'));
  const wrap  = card.querySelector('.project-img-wrap[role="button"]');
  if (!wrap) return;

  wrap.addEventListener('click', () => openLightbox(items, 0));
  wrap.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(items, 0); }
  });
});

/* ─── Attach gallery to event cards ─── */
document.querySelectorAll('.event-card[data-gallery]').forEach(card => {
  const items = JSON.parse(card.getAttribute('data-gallery'));
  card.addEventListener('click', () => openLightbox(items, 0));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(items, 0); }
  });
});

/* ─── Initial call ─── */
handleNavScroll();
