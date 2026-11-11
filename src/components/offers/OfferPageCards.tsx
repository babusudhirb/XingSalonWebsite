import { ArrowRight } from 'lucide-react';
import { salonById } from '../../data/branches';
import { individualOfferPath, OFFER_IMAGE_FRAME, rotatedIndividualOffers, type IndividualOffer, type IndividualOfferCategory } from '../../data/individualOffers';
import type { BranchId } from '../../data/offers';
import { cn } from '../../lib/cn';
import { Section, SectionHeader } from '../service/SectionHeader';
import { Picture } from '../ui/Primitives';
import { SnapRow } from '../ui/SnapRow';

/** A shared offer card. Its whole surface opens the offer's own evergreen page. */
function OfferPageCard({ offer, className, salon }: { offer: IndividualOffer; className?: string; salon?: BranchId }) {
  return (
    <a href={individualOfferPath(offer.id)} data-cta={`offer-card-${offer.id}`} className={cn('svc-card svc-card-hover group flex h-full flex-col overflow-hidden', className)}>
      <Picture image={offer.image} sizes="(min-width:1024px) 23rem, (min-width:640px) 24rem, 82vw" className={OFFER_IMAGE_FRAME} />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="flex items-center justify-between gap-3 font-display text-2xl font-medium text-ink">
          {offer.title}
          <ArrowRight aria-hidden className="size-5 shrink-0 text-berry transition-transform duration-200 group-hover:translate-x-1.5 motion-reduce:transition-none" />
        </h3>
        <p className="mt-1 text-sm font-semibold text-berry">{offer.value}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{offer.description}</p>
        {salon && <p className="mt-auto pt-4 text-xs text-muted">Available to book at Xing {salonById(salon)!.name}</p>}
      </div>
    </a>
  );
}

interface OfferPagesSectionProps {
  /** One salon's offers (its own page). Without it, tabs switch between the three salons. */
  salon?: BranchId;
  /** Optional category focus for category landing pages. */
  only?: IndividualOfferCategory[];
  id?: string;
  tone?: 'white' | 'tint';
  title?: string;
  /** Kept for existing call sites; individual offers always link directly to their own page. */
  hideSalonTabs?: boolean;
}

/** Existing offer slots all use the same evergreen offer catalogue. */
export function OfferPagesSection({ salon, only, id = 'offers', tone = 'tint', title, hideSalonTabs = false }: OfferPagesSectionProps) {
  // Retained while older page call sites transition; direct offer pages no longer need salon tabs.
  void hideSalonTabs;
  // Every established placement exposes the same full offer set. `only` remains accepted so older category
  // call sites do not break, but it no longer hides the other offers from a visitor.
  void only;
  const offers = rotatedIndividualOffers(`${id}-${salon ?? title ?? 'all'}`);
  const active = salon;
  return (
    <Section tone={tone} id={id}>
      <SectionHeader eyebrow="Offers" title={title ?? (salon ? `Offers at Xing ${salonById(salon)!.name}` : 'Offers at Your Salon')} />
      <div className="mt-8">
        {offers.length > 1 ? (
          <SnapRow carousel autoPlayMs={5_000} itemWidth="w-[82%] sm:w-[24rem] lg:w-[23rem]" label={`${title ?? 'Current'} offers`}>
            {offers.map((offer) => (
              <OfferPageCard key={offer.id} offer={offer} salon={active} />
            ))}
          </SnapRow>
        ) : (
          <OfferPageCard offer={offers[0]} salon={active} className="max-w-sm" />
        )}
      </div>
      <p className="mt-4 text-xs text-muted">Terms apply. We confirm the offer and the price before we start.</p>
    </Section>
  );
}
