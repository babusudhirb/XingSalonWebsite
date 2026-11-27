// The offer pages (/hair-colour-offers and the rest) are for all three salons. The salon is chosen only when the
// visitor acts: a WhatsApp, Call or Book/Enquire tap opens "Choose your salon", and the action then goes to that
// salon. The choice is remembered under the site's own key (src/lib/branch.ts), so the rest of the site follows it.
(() => {
  // Keep in step with src/data/branches.ts (name, area, phone, WhatsApp when it differs).
  const SALONS = [
    { id: 'sarjapur-road', name: 'Sarjapur Road', area: 'Kasavanahalli', phone: '8970007440' },
    { id: 'hsr-layout', name: 'HSR Layout', area: '24th Main Rd', phone: '9380812348' },
    { id: 'brookfield', name: 'Brookfield', area: 'AECS Layout', phone: '7996666012', whatsapp: '8147111344' },
  ];
  const STORAGE_KEY = 'xing-branch';
  const BOOK = '[data-lead-open], button[class*="-book"], a[href="#enquire"]';
  const ACTION = `a[href*="wa.me"], a[href^="tel:"], ${BOOK}`;

  const remembered = () => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  };
  const remember = (id) => {
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // Private mode or blocked storage: the choice applies to this tap only.
    }
  };

  const dialog = document.createElement('dialog');
  dialog.className = 'salon-picker';
  dialog.setAttribute('aria-labelledby', 'salonPickerTitle');
  dialog.innerHTML = `<div class="salon-picker-panel">
  <div class="salon-picker-head"><h2 id="salonPickerTitle">Choose your salon</h2><button type="button" class="salon-picker-close" aria-label="Close">×</button></div>
  <div class="salon-picker-list">${SALONS.map((s) => `<button type="button" data-pick="${s.id}"><strong>Xing ${s.name}</strong><span>${s.area}</span></button>`).join('')}</div>
</div>`;
  document.body.append(dialog);

  let pending = null;
  let bypass = null;

  const open = (onPick) => {
    pending = onPick;
    const current = remembered();
    dialog.querySelectorAll('[data-pick]').forEach((button) => button.classList.toggle('is-current', button.dataset.pick === current));
    dialog.showModal();
    (dialog.querySelector('.is-current') ?? dialog.querySelector('[data-pick]')).focus();
  };

  dialog.querySelector('.salon-picker-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    pending = null;
  });
  // A tap on the backdrop (the dialog itself, outside its panel) closes it; Esc closes it natively.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.querySelectorAll('[data-pick]').forEach((button) =>
    button.addEventListener('click', () => {
      const salon = SALONS.find((s) => s.id === button.dataset.pick);
      const onPick = pending;
      remember(salon.id);
      dialog.close();
      onPick?.(salon);
    }),
  );

  const setFormSalon = (salon) => document.querySelectorAll('form input[name="salon"]').forEach((input) => (input.value = salon.name));

  // Re-run the original tap with the chosen salon. data-branch adds the salon to the site's click analytics.
  const replay = (element, salon) => {
    element.dataset.branch = salon.id;
    const href = element.getAttribute('href') ?? '';
    if (href.includes('wa.me')) {
      const text = (new URL(href, location.href).searchParams.get('text') ?? '').replace(/^Hi Xing[^!]*!/, `Hi Xing ${salon.name}!`);
      element.setAttribute('href', `https://wa.me/91${salon.whatsapp ?? salon.phone}${text ? `?text=${encodeURIComponent(text)}` : ''}`);
    } else if (href.startsWith('tel:')) {
      element.setAttribute('href', `tel:+91${salon.phone}`);
    } else {
      setFormSalon(salon);
    }
    bypass = element;
    element.click();
  };

  // Capture, on window: ahead of the page's own handlers (which open the enquiry dialog) and the analytics.
  window.addEventListener(
    'click',
    (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const element = target?.closest(ACTION);
      // Links already tied to one salon (#location) and the site header (its own salon picker) are left alone.
      if (!element || element.closest('[data-salon], [data-site-header], .salon-picker')) return;
      if (element === bypass) {
        bypass = null;
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      open((salon) => replay(element, salon));
    },
    true,
  );

  // A form sent without a salon (e.g. the enquiry that opens on its own) asks for one first.
  window.addEventListener(
    'submit',
    (event) => {
      const form = event.target;
      const input = form instanceof HTMLFormElement ? form.querySelector('input[name="salon"]') : null;
      if (!input || input.value) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      open((salon) => {
        setFormSalon(salon);
        form.requestSubmit();
      });
    },
    true,
  );
})();
