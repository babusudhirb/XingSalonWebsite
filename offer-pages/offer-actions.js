// The action row on every offer card of the offer pages (/hair-colour-offers and the rest): a large "Call now", WhatsApp
// beside a smaller "Book free consultation". Calling converts best, so it leads. The salon is chosen on tap
// (salon-picker.js, loaded after this file). Styles: site-theme.css (.offer-cta).
(() => {
  const PHONE =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/></svg>';
  const WHATSAPP =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-2.97.78.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-1.98-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.83-.2-.48-.4-.42-.56-.42h-.47a.9.9 0 0 0-.66.31c-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.74 2.65 4.21 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.11-.22-.17-.47-.29Z"/></svg>';
  const DEFAULT_PHONE = 'tel:+918970007440';

  document.querySelectorAll('.offer-card .offer-actions').forEach((actions) => {
    if (actions.classList.contains('offer-cta')) return;
    const card = actions.closest('.offer-card');
    // The card's own enquiry button: the page's script already opens the enquiry form from it, with this service.
    const book = actions.querySelector('[data-lead-open]');
    const service = book?.dataset.service || card.querySelector('h3')?.textContent.trim() || 'this offer';
    const existingWhatsapp = actions.querySelector('a[href*="wa.me"]');

    const call = document.createElement('a');
    call.className = 'offer-act offer-act-call';
    call.href = DEFAULT_PHONE;
    call.setAttribute('aria-label', `Call Xing about ${service}`);
    call.innerHTML = `${PHONE}<span>Call now</span>`;

    const whatsapp = document.createElement('a');
    whatsapp.className = 'offer-act offer-act-whatsapp';
    whatsapp.href = existingWhatsapp?.href || `https://wa.me/918970007440?text=${encodeURIComponent(`Hi Xing! I'd like to know about ${service}.`)}`;
    whatsapp.target = '_blank';
    whatsapp.rel = 'noopener';
    whatsapp.setAttribute('aria-label', `WhatsApp Xing about ${service}`);
    whatsapp.innerHTML = `${WHATSAPP}<span>WhatsApp</span>`;

    const row = [call, whatsapp];
    if (book) {
      book.className = 'offer-act offer-act-book';
      book.textContent = 'Book free consultation';
      row.push(book);
    }
    actions.replaceChildren(...row);
    actions.classList.add('offer-cta');
  });
})();
