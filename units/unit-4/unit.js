/* ============================================================
   unit.js
   Unit 4 specific interactions: Flip cards
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  const flipCards = document.querySelectorAll('.flip-card');

  flipCards.forEach(function(card) {
    card.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });

    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.classList.toggle('flipped');
      }
    });

    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Flip card to see definition');
  });

  console.log('✅ Unit 4 interactions initialized.');
});