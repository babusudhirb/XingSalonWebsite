// The offer pages (/hair-colour-offers and the rest) are for all three salons. The salon is chosen only when the
// visitor acts: a WhatsApp, Call or Book/Enquire tap opens "Choose your salon", and the action then goes to that
// salon. The choice is remembered under the site's own key (src/lib/branch.ts), so the rest of the site follows it.
(() => {
  // Keep in step with src/data/branches.ts (name, the first three areasServed, phone, WhatsApp when it differs).
  const SALONS = [
    { id: 'sarjapur-road', name: 'Sarjapur Road', areas: 'Sarjapur Road, Kasavanahalli, Kaikondrahalli', phone: '8970007440' },
    { id: 'hsr-layout', name: 'HSR Layout', areas: 'HSR Layout Sector 1, Sector 2, Sector 3', phone: '9380812348' },
    { id: 'brookfield', name: 'Brookfield', areas: 'AECS Layout, Brookfield, Kundalahalli', phone: '7996666012', whatsapp: '8147111344' },
  ];
  const display = (digits) => `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;

  // The question and icon follow the tap, as on the rest of the site (src/components/BranchPicker.tsx).
  const ICONS = {
    call: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-2.97.78.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-1.98-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.83-.2-.48-.4-.42-.56-.42h-.47a.9.9 0 0 0-.66.31c-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.74 2.65 4.21 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.11-.22-.17-.47-.29Z"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  };
  const TITLES = {
    call: 'Which salon would you like to call?',
    whatsapp: 'Which salon would you like to WhatsApp?',
    book: 'Which salon would you like to visit?',
  };
  const PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
  const CHEVRON = '<svg class="salon-picker-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';
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
  <div class="salon-picker-list">${SALONS.map(
    (s) => `<button type="button" data-pick="${s.id}">
      <span class="salon-picker-icon"></span>
      <span class="salon-picker-text">
        <span class="salon-picker-name">Xing ${s.name}<span class="salon-picker-badge">Last used</span></span>
        <span class="salon-picker-areas">${PIN}<span>${s.areas}</span></span>
        <span class="salon-picker-phone" data-call="${display(s.phone)}" data-whatsapp="${display(s.whatsapp ?? s.phone)}"></span>
      </span>
      ${CHEVRON}
    </button>`,
  ).join('')}</div>
</div>`;
  document.body.append(dialog);

  let pending = null;
  let bypass = null;

  const actionOf = (element) => {
    const href = element?.getAttribute?.('href') ?? '';
    return href.includes('wa.me') ? 'whatsapp' : href.startsWith('tel:') ? 'call' : 'book';
  };

  const open = (onPick, action = 'book') => {
    pending = onPick;
    const current = remembered();
    dialog.dataset.action = action;
    dialog.querySelector('#salonPickerTitle').textContent = TITLES[action];
    dialog.querySelectorAll('.salon-picker-icon').forEach((icon) => (icon.innerHTML = ICONS[action]));
    dialog.querySelectorAll('.salon-picker-phone').forEach((line) => (line.textContent = line.dataset[action] ?? ''));
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
      open((salon) => replay(element, salon), actionOf(element));
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
      }, 'book');
    },
    true,
  );
})();
