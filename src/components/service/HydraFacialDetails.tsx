import { Check } from 'lucide-react';

/** Production-informed, non-medical decision support for the Hydra Facial service page. */
export function HydraFacialDetails() {
  return (
    <>
      <section className="bg-cream py-14 lg:py-20">
        <div className="container-site max-w-3xl">
          <p className="eyebrow">Good to Know</p>
          <h2 className="heading mt-3">Hydra Facial Is More Than a Clean-up</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">A clean-up is useful for a quick refresh. A Hydra Facial is a planned cleanse, exfoliation, pore-care and hydration session chosen around your skin condition and timeline. The right session and repeat schedule matter more than simply booking a facial before an event.</p>
          <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            <div className="py-5"><h3 className="font-display text-xl font-medium text-ink">Bangalore pollution and daily build-up</h3><p className="mt-2 text-sm leading-relaxed text-muted">Traffic, dust, sunscreen and changing weather can leave pores looking congested and skin looking dull. The consultation helps tailor the balance of cleansing and hydration to your skin.</p></div>
            <div className="py-5"><h3 className="font-display text-xl font-medium text-ink">Indoor cooling can feel drying</h3><p className="mt-2 text-sm leading-relaxed text-muted">Air-conditioned routines can leave skin looking dehydrated even when it feels oily. Hydration is included so the result feels comfortable, not stripped.</p></div>
            <div className="py-5"><h3 className="font-display text-xl font-medium text-ink">Plan ahead for an event</h3><p className="mt-2 text-sm leading-relaxed text-muted">For an event, tell your therapist the date and your skin history. They can help you choose an appropriate appointment window and aftercare routine.</p></div>
          </div>
        </div>
      </section>
      <section className="bg-blush py-14 lg:py-20">
        <div className="container-site max-w-3xl">
          <p className="eyebrow">Expected Outcomes</p>
          <h2 className="heading mt-3">What You May Notice Over Time</h2>
          <ol className="mt-8 divide-y divide-berry/20 border-y border-berry/20">
            <li className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr]"><strong className="font-display text-xl font-medium text-ink">Same day</strong><p className="text-sm leading-relaxed text-muted">Skin can look fresher, more hydrated and smoother after the session.</p></li>
            <li className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr]"><strong className="font-display text-xl font-medium text-ink">Over weeks</strong><p className="text-sm leading-relaxed text-muted">A consistent routine can help maintain a clearer-looking, more even and comfortable complexion.</p></li>
            <li className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr]"><strong className="font-display text-xl font-medium text-ink">With upkeep</strong><p className="text-sm leading-relaxed text-muted">Your therapist can recommend a schedule that fits your skin goals, lifestyle and home care.</p></li>
          </ol>
        </div>
      </section>
      <section className="bg-cream py-14 lg:py-20">
        <div className="container-site max-w-3xl">
          <p className="eyebrow">Choose Your Plan</p>
          <h2 className="heading mt-3">Hydra Facial Pathways</h2>
          <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            <div className="py-5"><h3 className="font-display text-xl font-medium text-ink">Signature Hydra Facial <span className="text-berry">· From ₹3,499</span></h3><p className="mt-2 text-sm leading-relaxed text-muted">A cleanse, pore-care and hydration session for visible freshness.</p></div>
            <div className="py-5"><h3 className="font-display text-xl font-medium text-ink">Brightening Hydra Boost <span className="text-berry">· From ₹4,499</span></h3><p className="mt-2 text-sm leading-relaxed text-muted">A glow-focused option for dull or uneven-looking skin.</p></div>
            <div className="py-5"><h3 className="font-display text-xl font-medium text-ink">Clarifying Hydra Protocol <span className="text-berry">· From ₹4,299</span></h3><p className="mt-2 text-sm leading-relaxed text-muted">A congestion-focused option with a calming, barrier-conscious approach.</p></div>
          </div>
        </div>
      </section>
      <section className="bg-blush py-14 lg:py-20">
        <div className="container-site max-w-3xl">
          <p className="eyebrow">Client Results</p>
          <h2 className="heading mt-3">What Clients Notice</h2>
          <div className="mt-8 divide-y divide-berry/20 border-y border-berry/20 text-sm leading-relaxed text-muted">
            <blockquote className="py-5">“My skin looked hydrated and clean right away.” <cite className="block pt-2 not-italic font-medium text-ink">— Aparna, Indiranagar</cite></blockquote>
            <blockquote className="py-5">“After two sessions, my makeup sat much better and my pores looked refined.” <cite className="block pt-2 not-italic font-medium text-ink">— Ritika, Whitefield</cite></blockquote>
            <blockquote className="py-5">“I did it three days before my event and the photos looked fantastic.” <cite className="block pt-2 not-italic font-medium text-ink">— Tanvi, Jayanagar</cite></blockquote>
          </div>
          <p className="mt-6 flex gap-2 text-xs leading-relaxed text-muted"><Check aria-hidden className="mt-0.5 size-3.5 shrink-0 text-berry" />Results and suitability vary by skin condition. Tell your therapist about active sensitivity, acne or recent procedures before booking.</p>
        </div>
      </section>
    </>
  );
}
