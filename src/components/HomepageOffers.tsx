import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { bookingPath } from '../data/bookingLinks';
import { individualOfferPath, individualOffers, type IndividualOffer } from '../data/individualOffers';
import { Button } from './ui/Button';
import { Picture } from './ui/Primitives';
import { Section, SectionHeader } from './service/SectionHeader';

const OFFERS_PER_SLIDE = 3;
const slides = Array.from({ length: Math.ceil(individualOffers.length / OFFERS_PER_SLIDE) }, (_, index) => individualOffers.slice(index * OFFERS_PER_SLIDE, (index + 1) * OFFERS_PER_SLIDE));

const offerLabel = (offer: IndividualOffer) => offer.category;

/** Homepage offer gallery. Visitors control the cards, then either learn the details or book their salon. */
export function HomepageOffers() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const canGoBack = activeSlide > 0;
  const canGoForward = activeSlide < slides.length - 1;

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 10_000);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <Section tone="tint" id="offers">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <SectionHeader eyebrow="Current Offers" title="Salon Offers, Clearly Explained." text="See the value, choose your offer, then select your preferred salon when you book." />
        <Button variant="outline" href="/offers" arrow={false} className="shrink-0">
          View All Offers
          <ArrowRight aria-hidden className="size-4" />
        </Button>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
        {slides[activeSlide].map((offer) => (
          <article key={offer.id} className="svc-card flex h-full flex-col overflow-hidden bg-white">
            <Picture image={offer.image} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw" className="aspect-[4/3] w-full object-cover" />
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
      </div>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3" aria-label="Offer gallery controls">
        <button type="button" onClick={() => setActiveSlide((current) => current - 1)} disabled={!canGoBack} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/15 px-4 text-sm font-medium text-ink transition hover:border-berry hover:text-berry disabled:cursor-not-allowed disabled:opacity-40">
          <ArrowLeft aria-hidden className="size-4" />
          Previous
        </button>
        <div className="flex gap-2" aria-label={`Offer group ${activeSlide + 1} of ${slides.length}`}>
          {slides.map((_, index) => (
            <button key={index} type="button" onClick={() => setActiveSlide(index)} aria-label={`Show offer group ${index + 1}`} aria-current={activeSlide === index} className={`grid size-11 place-items-center ${activeSlide === index ? 'text-berry' : 'text-berry/40 hover:text-berry'}`}>
              <span className={`h-2 rounded-full transition-all ${activeSlide === index ? 'w-6 bg-berry' : 'w-2 bg-current'}`} />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setActiveSlide((current) => current + 1)} disabled={!canGoForward} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/15 px-4 text-sm font-medium text-ink transition hover:border-berry hover:text-berry disabled:cursor-not-allowed disabled:opacity-40">
          Next
          <ArrowRight aria-hidden className="size-4" />
        </button>
      </div>
      <p className="mt-4 text-center text-xs text-muted">Choose an offer at your own pace. Terms apply; your salon confirms the final details before your appointment.</p>
    </Section>
  );
}
