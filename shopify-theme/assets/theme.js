(function () {
  'use strict';

  /* Mobile navigation */
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menuClose = document.querySelector('[data-menu-close]');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => mobileNav.classList.add('is-open'));
    menuClose?.addEventListener('click', () => mobileNav.classList.remove('is-open'));
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) mobileNav.classList.remove('is-open');
    });
  }

  /* FAQ accordion */
  document.querySelectorAll('[data-faq-question]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('[data-faq-item]');
      const isOpen = item.classList.contains('is-open');
      item.closest('[data-faq-list]')?.querySelectorAll('[data-faq-item]').forEach((el) => {
        el.classList.remove('is-open');
        el.querySelector('[data-faq-question]')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Product tabs */
  document.querySelectorAll('[data-tab-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tabBtn;
      const container = btn.closest('[data-tabs]');
      container.querySelectorAll('[data-tab-btn]').forEach((b) => b.classList.remove('is-active'));
      container.querySelectorAll('[data-tab-panel]').forEach((p) => p.classList.remove('is-active'));
      btn.classList.add('is-active');
      container.querySelector(`[data-tab-panel="${tabId}"]`)?.classList.add('is-active');
    });
  });

  /* Newsletter popup */
  const popup = document.querySelector('[data-newsletter-popup]');
  const popupClose = document.querySelector('[data-popup-close]');
  const POPUP_KEY = 'newsletter_popup_dismissed';

  if (popup && window.themeSettings?.showNewsletterPopup) {
    const dismissed = sessionStorage.getItem(POPUP_KEY);
    if (!dismissed) {
      setTimeout(() => popup.classList.add('is-open'), 5000);
    }
    popupClose?.addEventListener('click', () => {
      popup.classList.remove('is-open');
      sessionStorage.setItem(POPUP_KEY, '1');
    });
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.remove('is-open');
        sessionStorage.setItem(POPUP_KEY, '1');
      }
    });
  }

  /* Update cart count */
  function updateCartCount() {
    fetch('/cart.js')
      .then((r) => r.json())
      .then((cart) => {
        document.querySelectorAll('[data-cart-count]').forEach((el) => {
          el.textContent = cart.item_count;
          el.style.display = cart.item_count > 0 ? 'flex' : 'none';
        });
      })
      .catch(() => {});
  }

  updateCartCount();
  document.addEventListener('cart:updated', updateCartCount);
})();
