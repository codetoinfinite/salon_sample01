// Aurea Salon — main.js

/* ── HEADER SCROLL ── */
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── MOBILE NAV ── */
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
}));

/* ── COUNTER ANIMATION ── */
function animateCount(el) {
  const target = +el.dataset.target;
  const duration = 2200;
  const start = performance.now();
  const tick = now => {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(tick);
}

/* ── INTERSECTION OBSERVER ── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    if (e.target.classList.contains('fade-up')) {
      e.target.classList.add('visible');
    }
    if (e.target.classList.contains('counter')) {
      animateCount(e.target);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up, .counter').forEach(el => io.observe(el));

/* ── SERVICES TABS ── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(tab)?.classList.add('active');
  });
});

/* ── TESTIMONIALS CAROUSEL ── */
(function () {
  const slides = document.querySelectorAll('.testi-slide');
  const dots = document.querySelectorAll('.testi-dot');
  if (!slides.length) return;
  let cur = 0, timer;

  function go(n) {
    slides[cur].classList.remove('active');
    dots[cur]?.classList.remove('active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur]?.classList.add('active');
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => go(cur + 1), 5000);
  }

  document.querySelector('.testi-arrow.prev')?.addEventListener('click', () => { go(cur - 1); startTimer(); });
  document.querySelector('.testi-arrow.next')?.addEventListener('click', () => { go(cur + 1); startTimer(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); startTimer(); }));
  startTimer();
})();

/* ── TIMELINE SLIDER ── */
(function () {
  const track = document.querySelector('.tl-track');
  if (!track) return;
  const slides = track.querySelectorAll('.tl-slide');
  let idx = 0;

  function perView() {
    return window.innerWidth > 900 ? 3 : window.innerWidth > 600 ? 2 : 1;
  }

  function move() {
    const slideW = slides[0].offsetWidth + 24;
    track.style.transform = `translateX(-${idx * slideW}px)`;
  }

  document.querySelector('.tl-arrow.prev')?.addEventListener('click', () => {
    if (idx > 0) { idx--; move(); }
  });
  document.querySelector('.tl-arrow.next')?.addEventListener('click', () => {
    if (idx < slides.length - perView()) { idx++; move(); }
  });

  window.addEventListener('resize', move, { passive: true });
})();

/* ── SMOOTH SCROLL for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
