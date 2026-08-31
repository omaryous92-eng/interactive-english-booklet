/* ============================================================
   navigation.js
   Active page highlighting, breadcrumb helpers
   ============================================================ */

(function() {
  'use strict';

  /**
   * Get the current page name from the URL
   */
  function getPageName() {
    const path = window.location.pathname;
    const parts = path.split('/').filter(p => p.length > 0);
    if (parts.length === 0) return 'Home';
    const last = parts[parts.length - 1];
    const name = last.replace('.html', '').replace(/-/g, ' ');
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  /**
   * Generate breadcrumbs dynamically
   * Usage: place <nav class="breadcrumbs" id="breadcrumbs"></nav> in your page
   */
  function generateBreadcrumbs() {
    const container = document.getElementById('breadcrumbs');
    if (!container) return;

    const path = window.location.pathname;
    const parts = path.split('/').filter(p => p.length > 0);

    let html = '<a href="/">Home</a>';

    if (parts.length > 0) {
      let currentPath = '';
      parts.forEach((part, index) => {
        currentPath += '/' + part;
        const isLast = index === parts.length - 1;
        const name = part.replace('.html', '').replace(/-/g, ' ');
        const display = name.charAt(0).toUpperCase() + name.slice(1);

        if (isLast) {
          html += `<span class="separator"> › </span><span class="current">${display}</span>`;
        } else {
          html += `<span class="separator"> › </span><a href="${currentPath}">${display}</a>`;
        }
      });
    }

    container.innerHTML = html;
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateBreadcrumbs);
  } else {
    generateBreadcrumbs();
  }

  // Also expose a helper to set breadcrumbs manually if needed
  window.breadcrumbHelpers = {
    getPageName: getPageName,
    generateBreadcrumbs: generateBreadcrumbs
  };

})();