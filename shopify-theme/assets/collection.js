(function () {
  'use strict';

  const filterToggle = document.querySelector('[data-filter-toggle]');
  const filters = document.querySelector('[data-collection-filters]');
  const filterClose = document.querySelector('[data-filter-close]');

  if (filterToggle && filters) {
    filterToggle.addEventListener('click', () => filters.classList.add('is-open'));
    filterClose?.addEventListener('click', () => filters.classList.remove('is-open'));
    filters.addEventListener('click', (e) => {
      if (e.target === filters) filters.classList.remove('is-open');
    });
  }

  const sortSelect = document.querySelector('[data-sort-select]');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const url = new URL(window.location.href);
      url.searchParams.set('sort_by', sortSelect.value);
      window.location.href = url.toString();
    });
    const params = new URLSearchParams(window.location.search);
    const current = params.get('sort_by');
    if (current) sortSelect.value = current;
  }
})();
