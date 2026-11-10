import { Check } from 'lucide-react';
import { SnapRow } from '../ui/SnapRow';

const results = [
  { title: 'Fresh hydration', text: 'Skin that feels comfortably hydrated and looks refreshed after a busy week.', salon: 'Xing Salon at Sarjapur Road' },
  { title: 'Pre-event glow', text: 'A planned facial appointment ahead of an occasion or photoshoot.', salon: 'Xing Salon at HSR Layout' },
  { title: 'Smoother-looking texture', text: 'A cleanse and exfoliation focus for skin that appears dull or uneven.', salon: 'Xing Salon at Brookfield' },
  { title: 'City-skin reset', text: 'A practical refresh after sunscreen, dust, traffic and changing weather.', salon: 'Xing Salon at Sarjapur Road' },
  { title: 'Comfortable moisture', text: 'Hydration support for skin that feels dry from indoor cooling or long days.', salon: 'Xing Salon at HSR Layout' },
  { title: 'Clearer-looking pores', text: 'Pore-care chosen around your skin condition during the consultation.', salon: 'Xing Salon at Brookfield' },
  { title: 'Makeup-ready skin', text: 'A smoother-looking base when you want to plan ahead for a special day.', salon: 'Xing Salon at Sarjapur Road' },
  { title: 'Regular skin reset', text: 'A repeat-care option built around your goals, routine and home care.', salon: 'Xing Salon at HSR Layout' },
  { title: 'Calm, considered care', text: 'A session tailored after you share sensitivity, acne or recent procedures.', salon: 'Xing Salon at Brookfield' },
  { title: 'A fresher finish', text: 'The aim: skin that looks clean, hydrated and naturally more luminous.', salon: 'Xing Salon at Sarjapur Road' },
];

/** Bangalore context stays directly after the service explanation. */
export function HydraFacialGoodToKnow() {
  return (
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
  );
}

/** The outcome and client-result material follows the appointment steps. */
export function HydraFacialOutcomes() {
  return (
    <>
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
        <div className="container-site">
          <p className="eyebrow">Client Results</p>
          <h2 className="heading mt-3">What Clients Come In For</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">Every result begins with a consultation. Explore the goals clients commonly discuss with our therapists across Bangalore.</p>
          <div className="mt-8">
            <SnapRow carousel autoPlayMs={10000} itemWidth="w-[82%] sm:w-[24rem]" label="Hydra Facial client results">
              {results.map((result) => (
                <article key={`${result.title}-${result.salon}`} className="svc-card flex min-h-56 flex-col p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-berry">Hydra Facial</span>
                  <h3 className="mt-3 font-display text-2xl font-medium text-ink">{result.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{result.text}</p>
                  <p className="mt-auto border-t border-ink/10 pt-4 text-sm font-medium text-ink">{result.salon}</p>
                </article>
              ))}
            </SnapRow>
          </div>
          <p className="mt-6 flex max-w-3xl gap-2 text-xs leading-relaxed text-muted"><Check aria-hidden className="mt-0.5 size-3.5 shrink-0 text-berry" />Results and suitability vary by skin condition. Tell your therapist about active sensitivity, acne or recent procedures before booking.</p>
        </div>
      </section>
    </>
  );
}
