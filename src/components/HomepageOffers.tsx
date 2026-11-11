import { ArrowRight } from 'lucide-react';
import { bookingPath } from '../data/bookingLinks';
import { individualOfferPath, individualOffers, OFFER_IMAGE_FRAME, type IndividualOffer } from '../data/individualOffers';
import { Button } from './ui/Button';
import { Picture } from './ui/Primitives';
import { Section, SectionHeader } from './service/SectionHeader';
import { SnapRow } from './ui/SnapRow';

const offerLabel = (offer: IndividualOffer) => offer.category;

/** Homepage offer gallery. Visitors control the cards, then either learn the details or book their salon. */
export function HomepageOffers() {
  return (
    <Section tone="tint" id="offers">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <SectionHeader eyebrow="Current Offers" title="Salon Offers, Clearly Explained." text="See the value, choose your offer, then select your preferred salon when you book." />
        <Button variant="outline" href="/offers" arrow={false} className="shrink-0">
          View All Offers
          <ArrowRight aria-hidden className="size-4" />
        </Button>
      </div>
      <div className="mt-8">
        <SnapRow carousel autoPlayMs={10_000} itemWidth="w-[82%] sm:w-[24rem] lg:w-[23rem]" label="Current salon offers">
        {individualOffers.map((offer) => (
          <article key={offer.id} className="svc-card flex h-full flex-col overflow-hidden bg-white">
            <Picture image={offer.image} sizes="(min-width:1024px) 23rem, (min-width:640px) 24rem, 82vw" className={OFFER_IMAGE_FRAME} />
            <div className="flex flex-1 flex-col p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-berry">{offerLabel(offer)}</p>
              <h3 className="mt-2 font-display text-3xl font-medium leading-tight text-ink">{offer.title}</h3>
              <p className="mt-3 text-lg font-semibold text-berry">{offer.value}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{offer.description}</p>
              <div className="mt-auto flex gap-3 pt-5">
                <Button variant="outline" href={individualOfferPath(offer.id)} arrow={false} className="min-w-0 flex-1">
                  View Offer
                </Button>
                <Button href={offer.service ? `${bookingPath}?service=${encodeURIComponent(offer.service)}` : bookingPath} className="shrink-0 whitespace-nowrap">
                  Book Appointment
                </Button>
              </div>
            </div>
          </article>
        ))}
        </SnapRow>
      </div>
      <p className="mt-4 text-center text-xs text-muted">The carousel pauses while you hover or focus on an offer. Terms apply; your salon confirms final details before your appointment.</p>
    </Section>
  );
}
