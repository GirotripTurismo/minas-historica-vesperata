/* ═══════════════════════════════════════
   APP.JS — Bundle para file:// protocol
   Cada função mantém seu escopo isolado.
   Ordem: Header → Reveal → Strips →
          Roteiro → Form → Init
═══════════════════════════════════════ */

/* ── HEADER ─────────────────────────── */
function initHeader() {
  const hdr = document.getElementById('hdr');
  const bar = document.getElementById('scroll-bar');
  window.addEventListener('scroll', () => {
    hdr.classList.toggle('solid', window.scrollY > 60);
    if (bar) {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) bar.style.width = (window.scrollY / total * 100) + '%';
    }
  }, { passive: true });
}

/* ── REVEAL ─────────────────────────── */
function initReveal() {
  document.querySelectorAll('.word-reveal').forEach(el => {
    const html = el.innerHTML;
    // Split only text nodes, preserve child elements (em, span)
    el.querySelectorAll('span, em').forEach(child => {
      const words = child.innerHTML.trim().split(/\s+/);
      child.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(' ');
    });
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.classList.contains('word-reveal')) {
        el.classList.add('fired');
        el.querySelectorAll('.word').forEach((w, i) => {
          w.style.transitionDelay = (100 + i * 65) + 'ms';
        });
      } else {
        el.classList.add('in');
      }
      obs.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.word-reveal, .from-left, .from-right, .scale-up').forEach(el => obs.observe(el));
}

/* ── STRIPS ─────────────────────────── */
function initStrips() {
  const container = document.getElementById('ves-strips');
  if (!container) return;
  const strips = container.querySelectorAll('.ves-strip');
  const dots   = document.querySelectorAll('.ves-dot');
  let current  = 0;
  let autoTimer;

  function setStrip(idx) {
    strips.forEach((s, i) => s.classList.toggle('act', i === idx));
    dots.forEach((d, i)   => d.classList.toggle('act', i === idx));
    current = idx;
  }
  window.setStrip = setStrip;

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      if (!container.matches(':hover')) setStrip((current + 1) % strips.length);
    }, 4000);
  }

  // Curtain open on scroll entry
  const obs = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    strips.forEach((s, i) => setTimeout(() => s.classList.add('open'), i * 110));
    setTimeout(() => { setStrip(0); startAuto(); }, strips.length * 110 + 250);
    obs.disconnect();
  }, { threshold: 0.25 });
  obs.observe(container);

  strips.forEach((s, i) => {
    s.addEventListener('mouseenter', () => { setStrip(i); clearInterval(autoTimer); });
    s.addEventListener('mouseleave', startAuto);
    s.addEventListener('click',      () => setStrip(i));
  });
  dots.forEach((d, i) => d.addEventListener('click', () => setStrip(i)));
}

/* ── ROTEIRO (pinned horizontal scroll) */
function initRoteiro() {
  const outer   = document.querySelector('.rot-pin-outer');
  const track   = document.querySelector('.rot-track');
  const panels  = document.querySelectorAll('.rot-panel');
  const dots    = document.querySelectorAll('.rot-dot-item');
  const dotsWrap= document.querySelector('.rot-dots');
  const hint    = document.querySelector('.rot-scroll-hint');
  const counter = document.querySelector('.rot-counter span');
  if (!outer || !track || panels.length === 0) return;

  const total = panels.length;
  let lastActive = -1;
  let hintShown  = false;

  function update() {
    const rect  = outer.getBoundingClientRect();
    const range = outer.offsetHeight - window.innerHeight;
    if (range <= 0) return;
    const scroll = -rect.top;
    const prog   = Math.max(0, Math.min(1, scroll / range));
    const tx     = prog * (total - 1) * 100;
    track.style.transform = `translateX(-${tx}vw)`;

    const activeIdx = Math.min(total - 1, Math.round(prog * (total - 1)));
    if (activeIdx !== lastActive) {
      panels.forEach((p, i) => p.classList.toggle('active', i === activeIdx));
      dots.forEach((d, i)   => d.classList.toggle('active', i === activeIdx));
      if (counter) counter.textContent = String(activeIdx + 1).padStart(2, '0');

      // Diamantina cinema
      if (activeIdx === total - 1) {
        const dia = panels[total - 1].querySelector('.dia-cinema');
        if (dia) setTimeout(() => dia.classList.add('fired'), 200);
      }
      lastActive = activeIdx;
    }

    if (dotsWrap) dotsWrap.classList.toggle('visible', scroll > 0 && scroll < range);
    if (!hintShown && scroll <= 0 && rect.top <= window.innerHeight * 0.9 && hint) {
      hint.classList.add('show');
    }
    if (scroll > 100 && hint) { hint.classList.remove('show'); hintShown = true; }
  }

  window.addEventListener('scroll', update, { passive: true });
  update();

  // Dot click → scroll to that panel
  dots.forEach((d, i) => {
    d.addEventListener('click', () => {
      const outerTop = outer.getBoundingClientRect().top + window.scrollY;
      const range    = outer.offsetHeight - window.innerHeight;
      window.scrollTo({ top: outerTop + (i / (total - 1)) * range, behavior: 'smooth' });
    });
  });

  // First panel active on load
  if (panels.length > 0) panels[0].classList.add('active');
}

/* ── FAQ ─────────────────────────────── */
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(x => x.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
}

/* ── SMOOTH SCROLL ───────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
    });
  });
}

/* ── FORM ────────────────────────────── */
window.nextStep = function() {
  const n = document.getElementById('nome').value.trim();
  const e = document.getElementById('email').value.trim();
  const w = document.getElementById('wpp').value.trim();
  if (!n || !e || !w) { alert('Por favor, preencha todos os campos.'); return; }
  if (!e.includes('@')) { alert('Insira um e-mail válido.'); return; }
  document.getElementById('fs1').classList.remove('act');
  document.getElementById('fs2').classList.add('act');
  const pd1 = document.getElementById('pd1');
  pd1.className = pd1.className.replace('act', 'dn');
  pd1.textContent = '✓';
  document.getElementById('pd2').classList.add('act');
};

window.prevStep = function() {
  document.getElementById('fs2').classList.remove('act');
  document.getElementById('fs1').classList.add('act');
  document.getElementById('pd2').classList.remove('act');
  const pd1 = document.getElementById('pd1');
  pd1.className = pd1.className.replace('dn', 'act');
  pd1.textContent = '1';
};

window.send = async function() {
  const WEBHOOK = 'SEU_WEBHOOK_N8N_URL';
  const p = document.getElementById('pss').value;
  const o = document.getElementById('ori').value;
  if (!p || !o) { alert('Por favor, preencha todos os campos.'); return; }
  const btn = document.querySelector('#fs2 .btn-orange');
  if (btn) { btn.textContent = 'Enviando...'; btn.disabled = true; }
  const payload = {
    nome:     document.getElementById('nome').value.trim(),
    email:    document.getElementById('email').value.trim(),
    whatsapp: document.getElementById('wpp').value.trim(),
    pessoas: p, origem: o,
    roteiro: 'Minas Histórica com Vesperata',
    saida:   '09/10/2026',
    timestamp: new Date().toISOString()
  };
  try {
    if (WEBHOOK !== 'SEU_WEBHOOK_N8N_URL')
      await fetch(WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  } catch(e) { console.error(e); }
  document.getElementById('fs2').classList.remove('act');
  document.getElementById('prog').style.display = 'none';
  document.getElementById('f-ok').classList.add('act');
};

/* ── INIT ORCHESTRATOR ───────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initReveal();
  initStrips();
  initRoteiro();
  initFAQ();
  initSmoothScroll();
});
