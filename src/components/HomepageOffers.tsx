import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { bookingPath } from '../data/bookingLinks';
import { salonOffers, type SalonOffer } from '../data/offers';
import { Button } from './ui/Button';
import { Picture } from './ui/Primitives';
import { Section, SectionHeader } from './service/SectionHeader';

const OFFERS_PER_SLIDE = 3;
const slides = Array.from({ length: Math.ceil(salonOffers.length / OFFERS_PER_SLIDE) }, (_, index) => salonOffers.slice(index * OFFERS_PER_SLIDE, (index + 1) * OFFERS_PER_SLIDE));

const offerLabel = (offer: SalonOffer) => {
  if (offer.id === 'keratin') return 'Hair Treatment Offer';
  if (offer.id === 'hair-colour') return 'Hair Colour Offer';
  if (offer.id === 'hydra-facial') return 'Skin Care Offer';
  if (offer.id === 'tuesday') return 'Salon Offer';
  if (offer.id === 'membership') return 'Membership Offer';
  return 'Gift Offer';
};

/** Homepage preview of every current offer. The appointment flow chooses the salon after a visitor claims one. */
export function HomepageOffers() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 10_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <Section tone="tint" id="offers">
      <SectionHeader eyebrow="Current Offers" title="Offers worth making time for." text="Choose the offer that fits your plan. Select your preferred salon when you book." />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {slides[activeSlide].map((offer) => (
          <article key={offer.id} className="svc-card flex h-full flex-col overflow-hidden bg-white">
            <Picture image={offer.image} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw" className="aspect-square w-full object-cover" />
            <div className="flex flex-1 flex-col p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-berry">{offerLabel(offer)}</p>
              <h3 className="mt-2 font-display text-3xl font-medium text-ink">{offer.title} Offer</h3>
              <p className="mt-2 text-sm font-semibold text-berry">{offer.badge}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{offer.sub}</p>
              <Button href={offer.bookingService ? `${bookingPath}?service=${encodeURIComponent(offer.bookingService)}` : bookingPath} className="mt-5 w-full" wrap>
                Claim this offer
                <ArrowRight aria-hidden className="size-4" />
              </Button>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-2" aria-label="Offer carousel controls">
        {slides.map((_, index) => (
          <button key={index} type="button" onClick={() => setActiveSlide(index)} aria-label={`Show offer group ${index + 1}`} aria-current={activeSlide === index} className={`h-2 rounded-full transition-all ${activeSlide === index ? 'w-6 bg-berry' : 'w-2 bg-berry/30 hover:bg-berry/60'}`} />
        ))}
      </div>
      <p className="mt-5 text-center text-xs text-muted">Offers rotate every 10 seconds. Terms apply; we confirm the offer details before your appointment.</p>
    </Section>
  );
}
