import { Check, MapPin, Phone } from 'lucide-react';
import type { LegacyOfferRoute } from '../data/staticOfferPages';
import { locations } from '../data/branches';
import { offerPage, offerPath, type OfferPageId } from '../data/offerPages';
import { bookingPath } from '../data/bookingLinks';
import { Button } from '../components/ui/Button';
import { Eyebrow, Picture } from '../components/ui/Primitives';
import { WhatsAppIcon } from '../components/ui/Decor';
import { formatPrice } from '../data/offers';
import { cn } from '../lib/cn';

const labels: Record<OfferPageId, string> = {
  'hair-colour': 'Hair colour',
  'hair-treatment': 'Hair treatment',
  'skin-care': 'Skin care',
};

/** One responsive page for the six historic GMB/campaign offer URLs. */
export default function LegacyOfferPage({ route }: { route: LegacyOfferRoute }) {
  const salon = locations.find((location) => location.id === route.salonId)!;
  const page = offerPage(route.offerId);
  const message = encodeURIComponent(`Hi Xing ${salon.name}, I would like to know more about your ${page.name.toLowerCase()}.`);
  const whatsappHref = `${salon.whatsappHref}?text=${message}`;
  const bookingHref = `${bookingPath}?salon=${route.salonId}&service=${encodeURIComponent(page.name)}`;

  return (
    <>
      <section className="bg-blush pb-12 pt-header-sm lg:pb-20 lg:pt-header">
        <div className="container-site grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Eyebrow>Current salon offers · {salon.name}</Eyebrow>
            <h1 className="mt-3 max-w-3xl text-balance font-display text-hero font-medium leading-[1.05] text-ink">{page.name} at Xing {salon.name}, Bangalore.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">Talk to our team before you book. We will confirm the right service, price and appointment time for your hair or skin goals.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={bookingHref}>Book at {salon.name}</Button>
              <Button href={whatsappHref} external variant="outline" className="gap-2"><WhatsAppIcon className="size-4" />Ask on WhatsApp</Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              <a className="inline-flex min-h-11 items-center gap-2 hover:text-berry" href={salon.phoneHref}><Phone className="size-4 text-berry" />{salon.phone}</a>
              <a className="inline-flex min-h-11 items-center gap-2 hover:text-berry" href={salon.directionsUrl} target="_blank" rel="noopener noreferrer"><MapPin className="size-4 text-berry" />Get directions</a>
            </div>
          </div>
          <div className="overflow-hidden rounded-card border border-berry/15 bg-cream shadow-soft lg:col-span-5">
            <Picture image={page.image} eager priority sizes="(min-width:1024px) 40vw, 90vw" className="aspect-[4/3] w-full object-cover" />
            <p className="p-4 text-sm text-muted">Consultation-led care at Xing {salon.name}. Final suitability and pricing are confirmed by the salon.</p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 lg:py-24">
        <div className="container-site">
          <Eyebrow>Choose your offer</Eyebrow>
          <h2 className="heading mt-3 text-ink">A better salon visit starts with the right plan.</h2>
          <div className="no-scrollbar -mx-4 mt-7 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" aria-label="Offer types">
            {(['hair-colour', 'hair-treatment', 'skin-care'] as OfferPageId[]).map((id) => (
              <a key={id} href={offerPath(id, route.salonId)} aria-current={id === route.offerId ? 'page' : undefined} className={cn('flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors', id === route.offerId ? 'border-berry bg-berry text-cream' : 'border-ink/15 text-ink hover:border-berry hover:text-berry')}>
                {labels[id]}
              </a>
            ))}
          </div>
          <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" aria-label="Salon locations">
            {locations.map((location) => (
              <a key={location.id} href={offerPath(route.offerId, location.id as LegacyOfferRoute['salonId'])} aria-current={location.id === salon.id ? 'page' : undefined} className={cn('flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm', location.id === salon.id ? 'border-gold bg-gold/15 text-ink' : 'border-ink/15 text-ink hover:border-berry hover:text-berry')}>
                {location.name}
              </a>
            ))}
          </div>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {page.offers.map((offer) => (
              <li key={offer.name} className="flex min-h-64 flex-col rounded-card border border-ink/10 bg-white p-5 shadow-soft">
                <p className="text-sm font-semibold text-berry">Limited-time salon offer</p>
                <h3 className="mt-3 font-display text-3xl leading-tight text-ink">{offer.name}</h3>
                <div className="mt-auto pt-6">
                  {offer.was && <p className="text-sm text-muted line-through">Was {formatPrice(offer.was)}</p>}
                  <p className="font-display text-4xl text-berry">{formatPrice(offer.price)}</p>
                  {offer.unit && <p className="mt-1 text-sm text-muted">{offer.unit}</p>}
                  <Button href={`${bookingHref}&offer=${encodeURIComponent(offer.name)}`} className="mt-5 w-full" wrap>Book this offer</Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-card border border-berry/15 bg-blush p-5 sm:p-7">
            <h2 className="font-display text-3xl text-ink">Before you visit</h2>
            <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-ink sm:grid-cols-3">
              {['Tell us your hair or skin history during booking.', 'Your stylist confirms suitability before starting.', 'Offer availability and final details are confirmed by the salon.'].map((line) => <li className="flex gap-2" key={line}><Check className="mt-0.5 size-4 shrink-0 text-berry" />{line}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
