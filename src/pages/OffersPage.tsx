import { useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { bookingPath } from '../data/bookingLinks';
import { locations } from '../data/branches';
import { offersPage } from '../data/offersPage';
import { salonOffers, type OfferCategory } from '../data/offers';
import { Button } from '../components/ui/Button';
import { Eyebrow, Picture } from '../components/ui/Primitives';
import { cn } from '../lib/cn';

const filters: Array<{ id: 'all' | OfferCategory; label: string }> = [
  { id: 'all', label: 'All offers' },
  { id: 'hair', label: 'Hair colour & treatments' },
  { id: 'skin', label: 'Skin' },
  { id: 'value', label: 'Membership & gifting' },
];

/** A focused, shareable campaign page for GMB, paid campaigns and direct links. */
export default function OffersPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all');
  const offers = useMemo(() => salonOffers.filter((offer) => filter === 'all' || offer.category === filter), [filter]);
  return (
    <>
      <section className="bg-blush pb-14 pt-header-sm lg:pb-20 lg:pt-header">
        <div className="container-site grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{offersPage.hero.eyebrow}</Eyebrow>
            <h1 className="mt-3 max-w-3xl text-balance font-display text-hero font-medium leading-[1.05] text-ink">Offers worth making time for in Bangalore.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">Choose the service you are considering, then select the Xing salon that is easiest for you. We confirm your appointment and final details before we begin.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={bookingPath}>Choose a salon & book</Button>
              <Button variant="outline" href="#current-offers">Browse current offers</Button>
            </div>
          </div>
          <div className="rounded-card border border-berry/15 bg-cream p-5 lg:col-span-5">
            <p className="text-sm font-semibold text-berry">Why book directly with Xing?</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink">
              {['Free consultation before major colour or treatment services', 'Price and suitability confirmed with your salon', 'Three Bangalore salons: Sarjapur Road, HSR Layout and Brookfield'].map((line) => <li key={line} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-berry" />{line}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <section id="current-offers" className="bg-cream py-14 lg:py-24">
        <div className="container-site">
          <Eyebrow>Current offers</Eyebrow>
          <h2 className="heading mt-3 text-ink">Choose what you want to feel better about.</h2>
          <div role="tablist" aria-label="Offer categories" className="no-scrollbar -mx-4 mt-7 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {filters.map((item) => <button key={item.id} type="button" role="tab" aria-selected={filter === item.id} onClick={() => setFilter(item.id)} className={cn('min-h-11 shrink-0 rounded-full border px-4 text-sm font-medium', filter === item.id ? 'border-berry bg-berry text-cream' : 'border-ink/15 text-ink hover:border-berry')}>{item.label}</button>)}
          </div>
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => <li key={offer.id} id={offer.id} className="overflow-hidden rounded-card border border-ink/10 bg-white shadow-soft">
              <Picture image={offer.image} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw" className="aspect-[4/3] w-full object-cover" />
              <div className="p-5"><p className="text-sm font-semibold text-berry">{offer.badge}</p><h3 className="mt-1 font-display text-3xl font-medium text-ink">{offer.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{offer.sub}</p><p className="mt-4 text-xs text-muted">Available at {offer.branches.map((id) => locations.find((location) => location.id === id)?.name).join(' · ')}</p><Button href={`${bookingPath}?service=${encodeURIComponent(offer.bookingService)}`} className="mt-5 w-full" wrap>{offer.bookingService ? `Book ${offer.title}` : 'Ask about this offer'}</Button></div>
            </li>)}
          </ul>
          <p className="mt-8 text-sm text-muted">{offersPage.smallPrint}</p>
        </div>
      </section>
    </>
  );
}
