/* ══ FORM MODULE ══════════════════════
   Responsibility: multi-step form + webhook
═══════════════════════════════════════ */
const WEBHOOK = 'SEU_WEBHOOK_N8N_URL'; // ← substituir

export function initForm() {
  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(x => x.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  // Smooth scroll on anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
    });
  });
}

export function nextStep() {
  const n = document.getElementById('nome')?.value.trim();
  const e = document.getElementById('email')?.value.trim();
  const w = document.getElementById('wpp')?.value.trim();
  if (!n || !e || !w) { alert('Por favor, preencha todos os campos.'); return; }
  if (!e.includes('@')) { alert('Insira um e-mail válido.'); return; }
  document.getElementById('fs1')?.classList.remove('act');
  document.getElementById('fs2')?.classList.add('act');
  const pd1 = document.getElementById('pd1');
  if (pd1) { pd1.classList.replace('act', 'dn'); pd1.textContent = '✓'; }
  document.getElementById('pd2')?.classList.add('act');
}

export function prevStep() {
  document.getElementById('fs2')?.classList.remove('act');
  document.getElementById('fs1')?.classList.add('act');
  document.getElementById('pd2')?.classList.remove('act');
  const pd1 = document.getElementById('pd1');
  if (pd1) { pd1.classList.replace('dn', 'act'); pd1.textContent = '1'; }
}

export async function send() {
  const p = document.getElementById('pss')?.value;
  const o = document.getElementById('ori')?.value;
  if (!p || !o) { alert('Por favor, preencha todos os campos.'); return; }
  const btn = document.querySelector('#fs2 .btn-orange');
  if (btn) { btn.textContent = 'Enviando...'; btn.disabled = true; }
  const payload = {
    nome:      document.getElementById('nome')?.value.trim(),
    email:     document.getElementById('email')?.value.trim(),
    whatsapp:  document.getElementById('wpp')?.value.trim(),
    pessoas: p, origem: o,
    roteiro: 'Minas Histórica com Vesperata',
    saida:   '09/10/2026',
    timestamp: new Date().toISOString()
  };
  try {
    if (WEBHOOK !== 'SEU_WEBHOOK_N8N_URL')
      await fetch(WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  } catch(e) { console.error(e); }
  document.getElementById('fs2')?.classList.remove('act');
  document.getElementById('prog')?.style.setProperty('display','none');
  document.getElementById('f-ok')?.classList.add('act');
}
