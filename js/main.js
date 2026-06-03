/* ══ MAIN ORCHESTRATOR ════════════════
   Imports and initialises all modules.
   Single entry point — no module talks
   directly to another.
═══════════════════════════════════════ */
import { initHeader }  from './header.js';
import { initReveal }  from './reveal.js';
import { initStrips }  from './strips.js';
import { initRoteiro } from './roteiro.js';
import { initForm, nextStep, prevStep, send } from './form.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initReveal();
  initStrips();
  initRoteiro();
  initForm();

  // Expose form functions to inline onclick handlers
  window.nextStep = nextStep;
  window.prevStep = prevStep;
  window.send     = send;
});
