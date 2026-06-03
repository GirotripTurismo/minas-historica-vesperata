/* ══ REVEAL MODULE ════════════════════
   Responsibility: word-by-word title reveal
   + section entrance animations
═══════════════════════════════════════ */
export function initReveal() {
  // Split word-reveal elements
  document.querySelectorAll('.word-reveal').forEach(el => {
    const text = el.innerHTML;
    el.innerHTML = text.replace(/(\S+)/g, '<span class="word">$1</span>');
  });

  // Intersection observer for all animated elements
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      if (el.classList.contains('word-reveal')) {
        el.classList.add('fired');
        const words = el.querySelectorAll('.word');
        words.forEach((w, i) => {
          w.style.transitionDelay = `${i * 70}ms`;
        });
      } else {
        el.classList.add('in');
      }
      obs.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Observe all animated elements
  document.querySelectorAll(
    '.word-reveal, .from-left, .from-right, .scale-up'
  ).forEach(el => obs.observe(el));
}
