import { CalendarHeart, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { individualOfferById, individualOfferPath } from '../data/individualOffers';

const celebrationOffers = ['birthday', 'anniversary'].map((id) => individualOfferById(id)!).filter(Boolean);

/** A clear, bookable home for the salon's birthday and anniversary promotion. */
export default function CelebrationOffersPage() {
  return (
    <>
      <section className="overflow-hidden bg-ink pb-12 pt-32 text-cream lg:pb-20 lg:pt-44">
        <div className="container-site grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold"><Sparkles aria-hidden className="size-4" /> Celebrate with Xing</p>
            <h1 className="font-display text-5xl leading-[0.94] sm:text-6xl lg:text-7xl">Birthday &amp; anniversary offers</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80">Make your milestone feel even more special with a salon celebration. Your Xing salon confirms the applicable celebration benefit and appointment details before you visit.</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-cream/90">
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2"><CalendarHeart aria-hidden className="size-4 text-gold" /> Monday–Thursday</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2"><CheckCircle2 aria-hidden className="size-4 text-gold" /> Advance booking</span>
            </div>
          </div>
          <div className="rounded-card border border-gold/30 bg-cream/5 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Your celebration benefit</p>
            <p className="mt-4 font-display text-4xl leading-none text-gold sm:text-5xl">Planned around your occasion</p>
            <p className="mt-5 max-w-md text-cream/75">Choose your preferred Xing salon and mention the offer when booking. Our team will confirm availability and help plan your visit.</p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 lg:py-24">
        <div className="container-site space-y-10 lg:space-y-16">
          {celebrationOffers.map((offer, index) => (
            <article id={offer.id} key={offer.id} className="grid scroll-mt-28 overflow-hidden rounded-card border border-ink/10 bg-white shadow-soft lg:grid-cols-2">
              <img src={offer.image.src} alt={offer.image.alt ?? ''} width={offer.image.width} height={offer.image.height} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" className="h-full min-h-64 w-full object-cover" />
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-berry">{offer.kicker}</p>
                <h2 className="mt-3 font-display text-5xl leading-none text-ink sm:text-6xl">{offer.title}</h2>
                <p className="mt-5 text-2xl font-semibold text-berry">{offer.value}</p>
                <p className="mt-4 text-base text-muted">{offer.description}</p>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.08em] text-ink/70">{offer.terms[0]}</p>
                <Button className="mt-8 self-start" href={individualOfferPath(offer.id)}>View offer</Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
