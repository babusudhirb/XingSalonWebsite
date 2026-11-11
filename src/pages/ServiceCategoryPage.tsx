// /services/hair-care, /services/skin-body, /services/nail-care. The whole page is plain links and images, so the
// build writes all of it as HTML (SHELLS in vite.config.ts) and it works before, or without, any script. Script
// only adds the chip bar's moving highlight and edge fades.
import { OfferPagesSection } from '../components/offers/OfferPageCards';
import { StaticFaq } from '../components/services/StaticFaq';
import type { IndividualOfferCategory } from '../data/individualOffers';
import { categoryFaqs } from '../data/hubFaqs';
import { useEffect, useMemo } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { CategoryHero } from '../components/services/CatalogueHero';
import { ServiceListingCard } from '../components/services/ServiceListingCard';
import { type ServiceCategory, visibleCategories } from '../data/services';
import { useHasShell } from '../hooks/useHasShell';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { cn } from '../lib/cn';

/** The offer pages for each category's services. Nail care has none. */
const CATEGORY_OFFERS: Record<string, IndividualOfferCategory[] | undefined> = { 'hair-care': ['Hair Colour', 'Hair Treatments'], 'skin-body': ['Skin & Care'] };

const CHIP = 'inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-base font-medium transition-colors duration-150 motion-reduce:transition-none md:text-sm';
const CHIP_ON = 'border-berry bg-berry text-cream';
const CHIP_OFF = 'border-ink/15 bg-white text-ink hover:border-berry';

/** Everything below the hero: the chip bar (for a category with several groups), each group's cards, and links on. */
export function CategoryBody({ category }: { category: ServiceCategory }) {
  const grouped = category.groups.length > 1;
  const others = visibleCategories.filter((entry) => entry.key !== category.key);
  const compactCards = category.key === 'hair';
  return (
    <>
      {grouped && (
        // Sticks under the header (or the top of the screen while the header hides); the chips scroll inside it.
        <nav aria-label={`${category.title} groups`} className="under-header sticky z-20 border-b border-ink/10 bg-cream/95 backdrop-blur-md">
          <div className="container-site">
            <div data-chip-row className="no-scrollbar flex gap-2 overflow-x-auto py-2.5">
              {category.groups.map((group, i) => (
                <a key={group.key} href={`#${group.key}`} data-chip={group.key} aria-current={i === 0 ? 'true' : undefined} className={cn(CHIP, i === 0 ? CHIP_ON : CHIP_OFF)}>
                  {group.chip ?? group.title}
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}

      {category.groups.map((group, i) => (
        // scroll-mt: room for the chip bar, on top of the header's own room, when a chip jumps here.
        <section key={group.key} id={group.key} aria-labelledby={`${group.key}-title`} className={cn('scroll-mt-16', compactCards ? 'py-8 lg:py-10' : 'py-12 lg:py-16', i % 2 === 0 ? 'bg-cream' : 'bg-blush')}>
          <div className="container-site">
            <h2 id={`${group.key}-title`} className="heading text-balance text-ink">
              {group.title ?? `All ${category.title} Services`}
            </h2>
            <ul className={cn('grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', compactCards ? 'mt-4 gap-2' : 'mt-6 gap-5')}>
              {group.services.map((service, j) => (
                <li key={service.slug}>
                  {/* The first card's photo can show on the first screen, so it loads straight away. */}
                  <ServiceListingCard service={service} priority={i === 0 && j === 0} compact={compactCards} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {CATEGORY_OFFERS[category.slug] && <OfferPagesSection only={CATEGORY_OFFERS[category.slug]} />}

      <section aria-labelledby="full-salon-menu" className="bg-blush py-12">
        <div className="container-site flex flex-col items-start justify-between gap-5 rounded-card border border-berry/10 bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-eyebrow font-medium uppercase text-berry">Complete catalogue</p>
            <h2 id="full-salon-menu" className="mt-2 font-display text-2xl font-medium text-ink">Explore Our Full Salon Menu</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">View the complete Xing Salons menu as a PDF.</p>
          </div>
          <a href="/menu/xing-salons-menu-catalog-2026.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-berry px-5 text-sm font-semibold text-cream transition hover:bg-berrydark">
            <BookOpen aria-hidden className="size-4" />
            Open Salon Menu PDF
          </a>
        </div>
      </section>

      <section aria-labelledby="more-categories" className="bg-cream py-12">
        <div className="container-site">
          <h2 id="more-categories" className="font-display text-2xl font-medium text-ink">
            Explore More at Xing
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {others.map((entry) => (
              <li key={entry.key}>
                <a href={entry.path} className="flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-berry/10 bg-white px-5 py-3 text-base font-medium text-ink shadow-soft hover:border-berry/40">
                  {entry.title}
                  <ArrowRight aria-hidden className="size-4 shrink-0 text-berry" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <StaticFaq title={`${category.title} Questions`} items={categoryFaqs[category.slug] ?? []} />
    </>
  );
}

/** The chip bar's script: the chip for the group on screen lights up and scrolls into view; edges fade when there's more. */
function useChipBar(category: ServiceCategory) {
  const ids = useMemo(() => category.groups.map((group) => group.key), [category]);
  const active = useScrollSpy(ids);

  useEffect(() => {
    const row = document.querySelector<HTMLElement>('[data-chip-row]');
    if (!row) return;
    const update = () => {
      const start = row.scrollLeft > 2;
      const end = row.scrollLeft + row.clientWidth < row.scrollWidth - 2;
      const mask = `linear-gradient(to right, ${start ? 'transparent' : 'black'}, black 24px, black calc(100% - 24px), ${end ? 'transparent' : 'black'})`;
      row.style.maskImage = mask;
      row.style.setProperty('-webkit-mask-image', mask);
    };
    update();
    row.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(row);
    return () => {
      row.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const row = document.querySelector<HTMLElement>('[data-chip-row]');
    row?.querySelectorAll<HTMLElement>('[data-chip]').forEach((chip) => {
      const on = chip.dataset.chip === active;
      chip.className = cn(CHIP, on ? CHIP_ON : CHIP_OFF);
      if (on) {
        chip.setAttribute('aria-current', 'true');
        row.scrollTo({ left: chip.offsetLeft - 16, behavior: 'smooth' });
      } else chip.removeAttribute('aria-current');
    });
  }, [active]);
}

export default function ServiceCategoryPage({ category }: { category: ServiceCategory }) {
  const hasShell = useHasShell();
  useChipBar(category);
  // With the build's HTML in place there is nothing to draw; without it, draw the same page.
  return hasShell ? null : (
    <>
      <CategoryHero category={category} />
      <CategoryBody category={category} />
    </>
  );
}
