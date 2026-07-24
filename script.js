/**
 * CollegeConnect — landing page JS
 *
 * Kept minimal:
 *   1. Smooth-scroll for the "See how it works" link
 *   2. Hero card settle-in animation on load
 *   3. Respects prefers-reduced-motion
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ----------------------------------------------------------------
  // 1. Smooth-scroll for #how-it-works link
  // ----------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ----------------------------------------------------------------
  // 2. Hero card settle-in animation
  // ----------------------------------------------------------------
  if (!prefersReducedMotion) {
    const cards = document.querySelectorAll('.event-card');

    // Wait for everything to paint, then orchestrate the settle
    window.addEventListener('load', function settleIn() {
      cards.forEach(function (card, i) {
        const delay = 150 + i * 120; // stagger start times

        // Final resting rotation based on data-settle
        const settle = card.getAttribute('data-settle') || '1';
        let targetRotation;

        switch (settle) {
          case '1': targetRotation = -5; break;
          case '2': targetRotation = 4;  break;
          case '3': targetRotation = -3; break;
          case '4': targetRotation = 6;  break;
          default:  targetRotation = 0;
        }

        // Start scattered — random rotation, higher offset
        const startRotation = targetRotation + (Math.random() * 14 - 7);
        const startY = (Math.random() - 0.5) * 40;

        card.style.transition = 'none';
        card.style.transform = 'rotate(' + startRotation + 'deg) translateY(' + startY + 'px)';

        // Force reflow
        void card.offsetHeight;

        // Animate to settled position
        setTimeout(function () {
          card.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
          card.style.transform = 'rotate(' + targetRotation + 'deg) translateY(0px)';
        }, delay);
      });
    });
  } else {
    // Reduced motion: just apply final rotations immediately
    const cards = document.querySelectorAll('.event-card');
    cards.forEach(function (card) {
      const settle = card.getAttribute('data-settle') || '1';
      let targetRotation;

      switch (settle) {
        case '1': targetRotation = -3; break;
        case '2': targetRotation = 2;  break;
        case '3': targetRotation = -1; break;
        case '4': targetRotation = 3;  break;
        default:  targetRotation = 0;
      }

      card.style.transition = 'none';
      card.style.transform = 'rotate(' + targetRotation + 'deg) translateY(0px)';
    });
  }

})();

