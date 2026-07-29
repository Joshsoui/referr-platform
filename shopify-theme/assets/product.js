(function () {
  'use strict';

  const form = document.querySelector('[data-product-form]');
  if (!form) return;

  const mainImage = document.querySelector('[data-product-main-image]');
  const thumbs = document.querySelectorAll('[data-product-thumb]');
  const stickyAtc = document.querySelector('[data-sticky-atc]');
  const addToCartBtn = form.querySelector('[type="submit"]');
  const qtyInput = form.querySelector('[data-quantity-input]');
  const qtyMinus = form.querySelector('[data-quantity-minus]');
  const qtyPlus = form.querySelector('[data-quantity-plus]');

  /* Gallery */
  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const src = thumb.dataset.fullSrc;
      if (mainImage && src) {
        mainImage.src = src;
        mainImage.srcset = '';
      }
      thumbs.forEach((t) => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
    });
  });

  /* Quantity */
  if (qtyMinus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      const val = parseInt(qtyInput.value, 10) || 1;
      if (val > 1) qtyInput.value = val - 1;
    });
  }
  if (qtyPlus && qtyInput) {
    qtyPlus.addEventListener('click', () => {
      const val = parseInt(qtyInput.value, 10) || 1;
      qtyInput.value = val + 1;
    });
  }

  /* Sticky ATC on mobile */
  if (stickyAtc && addToCartBtn) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        stickyAtc.classList.toggle('is-visible', !entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(addToCartBtn);
  }

  /* Add to cart AJAX */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Toevoegen...';

    try {
      const formData = new FormData(form);
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Add to cart failed');
      btn.textContent = 'Toegevoegd ✓';
      document.dispatchEvent(new CustomEvent('cart:updated'));
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 2000);
    } catch {
      btn.textContent = 'Fout — probeer opnieuw';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 2000);
    }
  });
})();
