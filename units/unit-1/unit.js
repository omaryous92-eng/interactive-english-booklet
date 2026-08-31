/* ============================================================
   unit.js
   Unit 1 specific interactions: Flip cards
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ---------- Flip Card Toggle ----------
  const flipCards = document.querySelectorAll('.flip-card');

  flipCards.forEach(function(card) {
    card.addEventListener('click', function(e) {
      // Toggle the flipped class on the card
      this.classList.toggle('flipped');
    });

    // Optional: Add a keyboard accessibility for Enter/Space
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.classList.toggle('flipped');
      }
    });

    // Make focusable
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Flip card to see definition');
  });

  // ---------- Reset all cards (optional) ----------
  // You could add a "reset all" button if needed

  console.log('✅ Unit 1 interactions initialized.');
});