import { Check, Clock3, MapPin, Sparkles } from 'lucide-react';
import { locations } from '../../data/branches';

/** Concise, decision-first content used only by the Hydra Facial page. */
export function HydraFacialPlan() {
  return (
    <section aria-labelledby="hydra-plan" className="border-b border-ink/10 bg-cream py-10 sm:py-12">
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="eyebrow">Before You Book</p>
          <h2 id="hydra-plan" className="mt-2 font-display text-3xl font-medium text-ink sm:text-4xl">Plan your Hydra Facial with confidence</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">A quick skin check helps us choose the right cleanse, exfoliation and hydration balance for your skin, your routine and any event date you have in mind.</p>
        </div>

        <dl className="mt-7 grid divide-y divide-ink/10 border-y border-ink/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          <div className="py-4 sm:px-5 sm:first:pl-0"><dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-berry"><Sparkles aria-hidden className="size-4" />Starting from</dt><dd className="mt-2 font-display text-xl text-ink">₹3,499</dd></div>
          <div className="py-4 sm:px-5"><dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-berry"><Clock3 aria-hidden className="size-4" />Appointment time</dt><dd className="mt-2 font-display text-xl text-ink">60–90 minutes</dd></div>
          <div className="py-4 sm:px-5"><dt className="text-xs font-semibold uppercase tracking-[0.12em] text-berry">What to expect</dt><dd className="mt-2 text-sm leading-relaxed text-muted">Fresh, hydrated-looking skin the same day.</dd></div>
          <div className="py-4 sm:pl-5"><dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-berry"><MapPin aria-hidden className="size-4" />Available at</dt><dd className="mt-2 text-sm leading-relaxed text-muted">{locations.map((location) => location.name).join(' · ')}</dd></div>
        </dl>

        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_1.75fr] lg:items-start">
          <aside className="border-l-2 border-berry pl-4 text-sm leading-relaxed text-muted"><strong className="font-semibold text-ink">Worth mentioning first:</strong> let your therapist know about active sensitivity, acne, recent procedures or pregnancy before your appointment.</aside>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            <div className="grid gap-1 py-3 sm:grid-cols-[1fr_auto]"><div><h3 className="font-semibold text-ink">Signature Hydra Facial</h3><p className="mt-1 text-sm text-muted">Cleanse, pore-care and hydration for visible freshness.</p></div><span className="text-sm font-semibold text-berry">From ₹3,499</span></div>
            <div className="grid gap-1 py-3 sm:grid-cols-[1fr_auto]"><div><h3 className="font-semibold text-ink">Brightening Hydra Boost</h3><p className="mt-1 text-sm text-muted">A glow-focused option for dull or uneven-looking skin.</p></div><span className="text-sm font-semibold text-berry">From ₹4,499</span></div>
            <div className="grid gap-1 py-3 sm:grid-cols-[1fr_auto]"><div><h3 className="font-semibold text-ink">Clarifying Hydra Protocol</h3><p className="mt-1 text-sm text-muted">Congestion-focused care with a calming, barrier-conscious approach.</p></div><span className="text-sm font-semibold text-berry">From ₹4,299</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HydraFacialOutcomes() {
  return (
    <section aria-labelledby="hydra-outcomes" className="bg-cream py-12 lg:py-14">
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="eyebrow">Your Results</p>
          <h2 id="hydra-outcomes" className="heading mt-3">What You May Notice Over Time</h2>
        </div>
        <div className="mt-7 grid divide-y divide-ink/10 border-y border-ink/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="py-4 md:px-5 md:first:pl-0"><h3 className="font-display text-xl text-ink">Same day</h3><p className="mt-2 text-sm leading-relaxed text-muted">Skin can look fresher, smoother and more hydrated after the session.</p></div>
          <div className="py-4 md:px-5"><h3 className="font-display text-xl text-ink">Over weeks</h3><p className="mt-2 text-sm leading-relaxed text-muted">A consistent routine can help maintain a clearer-looking, more even complexion.</p></div>
          <div className="py-4 md:pl-5"><h3 className="font-display text-xl text-ink">With upkeep</h3><p className="mt-2 text-sm leading-relaxed text-muted">Your therapist can suggest a schedule that fits your skin goals and home care.</p></div>
        </div>
        <div className="mt-7 grid gap-4 text-sm leading-relaxed text-muted md:grid-cols-3">
          <blockquote className="border-l-2 border-berry/40 pl-3">“My skin looked hydrated and clean right away.”<cite className="mt-1 block not-italic text-xs font-medium text-ink">— Aparna, Indiranagar</cite></blockquote>
          <blockquote className="border-l-2 border-berry/40 pl-3">“My makeup sat much better and my pores looked refined.”<cite className="mt-1 block not-italic text-xs font-medium text-ink">— Ritika, Whitefield</cite></blockquote>
          <blockquote className="border-l-2 border-berry/40 pl-3">“I did it before my event and the photos looked fantastic.”<cite className="mt-1 block not-italic text-xs font-medium text-ink">— Tanvi, Jayanagar</cite></blockquote>
        </div>
        <p className="mt-6 flex max-w-3xl gap-2 text-xs leading-relaxed text-muted"><Check aria-hidden className="mt-0.5 size-3.5 shrink-0 text-berry" />Results and suitability vary by skin condition. We will tailor your appointment around your concerns and timeline.</p>
      </div>
    </section>
  );
}
