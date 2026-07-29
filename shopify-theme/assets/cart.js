(function () {
  'use strict';

  document.querySelectorAll('[data-cart-quantity]').forEach((input) => {
    input.addEventListener('change', async () => {
      const key = input.dataset.cartQuantity;
      const quantity = parseInt(input.value, 10);
      await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity }),
      });
      window.location.reload();
    });
  });

  document.querySelectorAll('[data-cart-remove]').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const key = btn.dataset.cartRemove;
      await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity: 0 }),
      });
      window.location.reload();
    });
  });
})();
