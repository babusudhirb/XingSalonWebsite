import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { m } from 'framer-motion';
import { cn } from '../../lib/cn';

export interface MegaPanel {
  id: string;
  label: string;
  title: string;
  description?: string;
  links: Array<{ label: string; href: string; note?: string }>;
}

interface SectionMegaMenuProps {
  id: string;
  label: string;
  isActive: boolean;
  underline: ReactNode;
  panels: MegaPanel[];
  viewAll: { label: string; href: string };
}

const CLOSE_DELAY_MS = 350;

/** Shared desktop flyout for Offers, Salons, Blogs and FAQ. Categories change on hover, just like Services. */
export function SectionMegaMenu({ id, label, isActive, underline, panels, viewAll }: SectionMegaMenuProps) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const root = useRef<HTMLLIElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef(0);
  const panel = panels[tab] ?? panels[0];
  const panelId = `${id}-mega-menu`;

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

  useEffect(() => {
    if (!open) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      close();
      button.current?.focus();
    };
    const onDown = (event: PointerEvent) => !(root.current && event.composedPath().includes(root.current)) && close();
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const focusTab = (index: number) => root.current?.querySelectorAll<HTMLElement>('[role="tab"]')[index]?.focus();
  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === 'ArrowDown' ? index + 1 : event.key === 'ArrowUp' ? index - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? panels.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    const selected = (next + panels.length) % panels.length;
    setTab(selected);
    focusTab(selected);
  };

  return (
    <li ref={root} className="flex h-full items-center" onMouseEnter={show} onMouseLeave={hideSoon}>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? close() : show())}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowDown') return;
          event.preventDefault();
          show();
          requestAnimationFrame(() => focusTab(tab));
        }}
        className={cn('relative inline-flex items-center gap-1 whitespace-nowrap py-2 text-sm transition-colors hover:text-berry', isActive || open ? 'font-medium text-berry' : 'text-ink')}
      >
        {label}
        <ChevronDown aria-hidden className={cn('size-3.5 transition-transform duration-200', open && 'rotate-180')} />
        {isActive && underline}
      </button>

      {open && (
        <>
          <div aria-hidden onClick={close} onMouseEnter={hideSoon} className="absolute inset-x-0 top-full h-screen bg-ink/30" />
          <m.div
            id={panelId}
            onMouseEnter={show}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute inset-x-0 top-full border-t border-ink/10 bg-cream shadow-lift"
          >
            <div className="container-site grid max-h-[72vh] grid-cols-[13rem_1fr] gap-8 overflow-y-auto py-6">
              <div role="tablist" aria-orientation="vertical" aria-label={`${label} categories`} className="flex flex-col gap-1 border-r border-ink/10 pr-6">
                {panels.map((entry, index) => {
                  const selected = index === tab;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      role="tab"
                      id={`${id}-tab-${entry.id}`}
                      aria-selected={selected}
                      aria-controls={`${panelId}-panel`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setTab(index)}
                      onMouseEnter={() => setTab(index)}
                      onKeyDown={(event) => onTabKey(event, index)}
                      className={cn('flex min-h-11 items-center rounded-xl px-3 text-left text-sm font-medium transition-colors', selected ? 'bg-berry text-cream' : 'text-ink hover:bg-blush')}
                    >
                      {entry.label}
                    </button>
                  );
                })}
              </div>
              <div role="tabpanel" id={`${panelId}-panel`} aria-labelledby={`${id}-tab-${panel.id}`} tabIndex={0} className="min-w-0 outline-none">
                <p className="text-eyebrow font-medium uppercase text-berry">{label}</p>
                <h2 className="mt-2 font-display text-3xl font-medium text-ink">{panel.title}</h2>
                {panel.description && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{panel.description}</p>}
                <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {panel.links.map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      <a href={link.href} onClick={close} className="block min-h-16 rounded-xl border border-ink/10 bg-white/60 px-4 py-3 transition-colors hover:border-berry/35 hover:bg-blush">
                        <span className="flex items-start justify-between gap-3 text-sm font-semibold leading-snug text-ink">
                          {link.label}
                          <ArrowRight aria-hidden className="mt-0.5 size-4 shrink-0 text-berry" />
                        </span>
                        {link.note && <span className="mt-1 block text-xs leading-relaxed text-muted">{link.note}</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-ink/10">
              <div className="container-site py-3.5">
                <a href={viewAll.href} onClick={close} className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-berry px-4 text-xs font-semibold text-cream transition-colors hover:bg-berrydark">
                  {viewAll.label}
                  <ArrowRight aria-hidden className="size-4" />
                </a>
              </div>
            </div>
          </m.div>
        </>
      )}
    </li>
  );
}
