import { CalendarCheck2, MapPin, Sparkles } from 'lucide-react';
import { BookingFlow } from '../components/BookingModal';
import { bookingPath } from '../data/bookingLinks';

/** A standalone, shareable home for the existing booking flow. */
export default function BookingPage() {
  const query = new URLSearchParams(window.location.search);
  const service = query.get('service') ?? '';
  const location = query.get('salon') ?? '';
  const detail = query.get('detail') ?? '';
  const offer = query.get('offer') ?? '';

  return (
    <>
      <section className="bg-berrydark pb-8 pt-28 text-cream lg:pb-10 lg:pt-32">
        <div className="container-site grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold"><Sparkles aria-hidden className="size-4" /> Xing Premium Salons</p>
            <h1 className="mt-3 font-display text-4xl leading-none sm:text-5xl">Book your appointment</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/85">Choose your service, salon and preferred time. We’ll send your request to the right Xing team on WhatsApp for confirmation.</p>
          </div>
          <ul className="grid gap-2 text-sm text-cream/90 sm:grid-cols-2 lg:grid-cols-1">
            <li className="flex items-center gap-3"><CalendarCheck2 aria-hidden className="size-5 text-gold" /> Pick a convenient date and time</li>
            <li className="flex items-center gap-3"><MapPin aria-hidden className="size-5 text-gold" /> Choose Sarjapur Road, HSR Layout or Brookfield</li>
          </ul>
        </div>
      </section>

      <section className="bg-cream py-12 lg:py-20">
        <div className="container-site max-w-3xl">
          <div className="overflow-hidden rounded-card border border-ink/10 bg-white shadow-soft">
            <BookingFlow service={service} location={location} detail={detail} offer={offer} />
          </div>
          <p className="mt-5 text-center text-xs text-muted">You can share this link directly: <a href={bookingPath} className="font-medium text-berry underline underline-offset-2">xingsalons.com{bookingPath}</a></p>
        </div>
      </section>
    </>
  );
}
