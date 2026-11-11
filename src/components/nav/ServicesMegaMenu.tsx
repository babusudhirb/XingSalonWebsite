import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { m } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { servicesHubPath, type ServiceCategory, visibleCategories } from '../../data/services';
import { cn } from '../../lib/cn';
import { currentPage, serviceHref } from '../../lib/route';
import { bookingWhatsappHref } from '../../lib/whatsapp';
import { ICONS } from '../service/icons';
import { WhatsAppIcon } from '../ui/Decor';

const NAV_LINK = 'relative whitespace-nowrap py-2 text-sm transition-colors hover:text-berry';
const PANEL_ID = 'services-menu';
/** Pointer leaving the item: wait this long before closing, so a diagonal move to the panel doesn't close it. */
// Gives visitors enough time to move from the header to the panel without losing it.
const CLOSE_DELAY_MS = 350;

const categoryLinkLabel = (title: string) => `View ${title} Services`;

/** The category the visitor is browsing, so the menu opens on it; Hair Care otherwise. */
const startTab = Math.max(
  0,
  visibleCategories.findIndex((category) => category.groups.some((group) => group.services.some((service) => service.slug === currentPage?.slug))),
);

function ServiceLinks({ category, onNavigate }: { category: ServiceCategory; onNavigate: () => void }) {
  const grouped = category.groups.some((group) => group.title);
  return (
    <div className={cn('grid gap-x-5 gap-y-4', grouped ? 'grid-cols-4' : 'grid-cols-1')}>
      {category.groups.map((group) => (
        <div key={group.key} className={cn('min-w-0', grouped && 'rounded-xl border border-ink/10 bg-white/60 p-3')}>
          {group.title && <p className="text-eyebrow font-medium uppercase text-berry">{group.title}</p>}
          <ul className={cn(grouped ? 'mt-2 space-y-0.5' : 'grid grid-cols-3 gap-x-6 gap-y-1')}>
            {group.services.map((service) => (
              <li key={service.slug}>
                <a
                  href={serviceHref(service.slug)}
                  onClick={onNavigate}
                  aria-current={currentPage?.slug === service.slug ? 'page' : undefined}
                  className="block rounded-md px-1.5 py-1 transition-colors hover:bg-blush focus-visible:bg-blush"
                >
                  <span className={cn('flex items-center gap-1.5 whitespace-nowrap text-[13px] leading-5', currentPage?.slug === service.slug ? 'font-semibold text-berry' : 'font-medium text-ink')}>
                    {service.menuLabel}
                    {service.badge && <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-semibold text-ink">{service.badge}</span>}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Desktop "Services": a panel under the header with the categories down the left and their services on the right. */
export function ServicesMegaMenu({ label, isActive, underline }: { label: string; isActive: boolean; underline: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(startTab);
  const root = useRef<HTMLLIElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef(0);
  const category = visibleCategories[tab];

  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hideSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };
  const close = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(false);
  };

  // Esc closes and returns to the button; a click anywhere else closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      close();
      button.current?.focus();
    };
    // The path, not the target: inside a shadow root (the header on the offer pages) the target is the root's host.
    const onDown = (e: PointerEvent) => !(root.current && e.composedPath().includes(root.current)) && close();
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const focusTab = (index: number) => root.current?.querySelectorAll<HTMLElement>('[role="tab"]')[index]?.focus();

  const onButtonKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'ArrowDown') return;
    e.preventDefault();
    show();
    requestAnimationFrame(() => focusTab(tab));
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = e.key === 'ArrowDown' ? index + 1 : e.key === 'ArrowUp' ? index - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? visibleCategories.length - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const wrapped = (next + visibleCategories.length) % visibleCategories.length;
    setTab(wrapped);
    focusTab(wrapped);
  };

  return (
    // Full header height, so the pointer never leaves the item on its way down to the panel.
    <li ref={root} className="flex h-full items-center" onMouseEnter={show} onMouseLeave={hideSoon}>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => (open ? close() : show())}
        onKeyDown={onButtonKey}
        className={cn(NAV_LINK, 'inline-flex items-center gap-1', isActive || open ? 'font-medium text-berry' : 'text-ink')}
      >
        {label}
        <ChevronDown aria-hidden className={cn('size-3.5 transition-transform duration-200', open && 'rotate-180')} />
        {isActive && underline}
      </button>

      {open && (
        <>
          {/* Dims the page under the panel; the header stays clear. A tap closes the menu. */}
          <div aria-hidden onClick={close} onMouseEnter={hideSoon} className="absolute inset-x-0 top-full h-screen bg-ink/30" />
          <m.div
            id={PANEL_ID}
            onMouseEnter={show}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute inset-x-0 top-full border-t border-ink/10 bg-cream shadow-lift"
          >
            <div className="container-site grid max-h-[80vh] grid-cols-[13rem_1fr] gap-8 overflow-y-auto py-6">
              <div role="tablist" aria-orientation="vertical" aria-label="Service categories" className="flex flex-col gap-1 border-r border-ink/10 pr-6">
                {visibleCategories.map((entry, i) => {
                  const Icon = ICONS[entry.icon];
                  const selected = i === tab;
                  return (
                    <button
                      key={entry.key}
                      type="button"
                      role="tab"
                      id={`services-tab-${entry.key}`}
                      aria-selected={selected}
                      aria-controls={`${PANEL_ID}-panel`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setTab(i)}
                      onMouseEnter={() => setTab(i)}
                      onKeyDown={(e) => onTabKey(e, i)}
                      className={cn(
                        'flex min-h-11 items-center gap-3 rounded-xl px-3 text-left text-sm font-medium transition-colors',
                        selected ? 'bg-berry text-cream' : 'text-ink hover:bg-blush',
                      )}
                    >
                      <Icon aria-hidden className="size-5 shrink-0" strokeWidth={1.5} />
                      {entry.title}
                    </button>
                  );
                })}
              </div>
              <div role="tabpanel" id={`${PANEL_ID}-panel`} aria-labelledby={`services-tab-${category.key}`} tabIndex={0} className="min-w-0 outline-none">
                <ServiceLinks category={category} onNavigate={close} />
              </div>
            </div>
            <div className="border-t border-ink/10">
              <div className="container-site flex items-center justify-between gap-6 py-3.5">
                <div className="flex flex-wrap items-center gap-2">
                  <a href="/menu/xing-salons-menu-catalog-2026.pdf" target="_blank" rel="noopener noreferrer" onClick={close} className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-berry px-5 text-sm font-semibold text-cream transition-colors hover:bg-berrydark">
                    Explore Our Full Salon Menu
                    <ArrowRight aria-hidden className="size-4" />
                  </a>
                  <a href={servicesHubPath} onClick={close} className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-berry/30 px-4 text-sm font-semibold text-berry transition-colors hover:border-berry hover:bg-blush">
                    View All Services
                    <ArrowRight aria-hidden className="size-4" />
                  </a>
                  {visibleCategories.map((entry) => (
                    <a key={entry.key} href={entry.path} onClick={close} className="inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-sm font-medium text-ink transition-colors hover:bg-blush hover:text-berry">
                      {categoryLinkLabel(entry.title)}
                      <ArrowRight aria-hidden className="size-3.5" />
                    </a>
                  ))}
                </div>
                <a
                  href={bookingWhatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink hover:text-berry"
                >
                  <WhatsAppIcon className="size-4 text-whatsapp" />
                  Free consultation · Book on WhatsApp
                </a>
              </div>
            </div>
          </m.div>
        </>
      )}
    </li>
  );
}
