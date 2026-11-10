import { Check } from 'lucide-react';
import { locations } from '../../data/branches';
import type { ServicePageContent } from '../../data/pages/types';
import { SnapRow } from '../ui/SnapRow';

interface ServiceDecisionSupportProps {
  page: ServicePageContent;
  serviceLabel: string;
  categoryTitle: string;
}

const roleFor = (category: string) => (category.includes('Nail') ? 'nail technician' : category.includes('Skin') || category.includes('Body') ? 'skin therapist' : 'stylist');

/** Consistent service context directly after the description, without replacing service-specific content. */
export function ServiceGoodToKnow({ page, serviceLabel, categoryTitle }: ServiceDecisionSupportProps) {
  const role = roleFor(categoryTitle);
  const goals = page.audience?.items.slice(0, 3) ?? [];

  return (
    <section className="bg-cream py-14 lg:py-20">
      <div className="container-site max-w-3xl">
        <p className="eyebrow">Good to Know</p>
        <h2 className="heading mt-3">A Considered {serviceLabel} Starts with a Consultation</h2>
        <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">The best service is not a one-size-fits-all appointment. Your {role} first understands your starting point, your preferences and the result you have in mind, then confirms the plan before beginning.</p>
        <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          <div className="py-5"><h3 className="font-display text-xl font-medium text-ink">Your starting point matters</h3><p className="mt-2 text-sm leading-relaxed text-muted">Your natural hair, skin or nails, together with any previous work and sensitivity, help us choose the right approach for the appointment.</p></div>
          <div className="py-5"><h3 className="font-display text-xl font-medium text-ink">Tell us what you are planning for</h3><p className="mt-2 text-sm leading-relaxed text-muted">Whether this is regular care, a change of look or an occasion, sharing your timeline helps us recommend an appropriate session and aftercare.</p></div>
          {goals.length > 0 && <div className="py-5"><h3 className="font-display text-xl font-medium text-ink">A plan around your goal</h3><p className="mt-2 text-sm leading-relaxed text-muted">Common reasons clients book include {goals.map((goal) => goal.toLowerCase()).join(', ')}. We tailor the service after seeing what will work best for you.</p></div>}
        </div>
      </div>
    </section>
  );
}

/** A measured outcomes and client-goals layer that avoids invented customer claims. */
export function ServiceOutcomes({ page, serviceLabel, categoryTitle }: ServiceDecisionSupportProps) {
  const role = roleFor(categoryTitle);
  const goals = page.audience?.items.length ? page.audience.items : [`A personalised ${serviceLabel.toLowerCase()} plan`, 'A result that suits your routine', 'Clear guidance before you begin'];
  const cards = Array.from({ length: 10 }, (_, index) => ({ goal: goals[index % goals.length], salon: locations[index % locations.length].name }));

  return (
    <>
      <section className="bg-blush py-14 lg:py-20">
        <div className="container-site max-w-3xl">
          <p className="eyebrow">Expected Outcomes</p>
          <h2 className="heading mt-3">What to Expect from Your {serviceLabel}</h2>
          <ol className="mt-8 divide-y divide-berry/20 border-y border-berry/20">
            <li className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr]"><strong className="font-display text-xl font-medium text-ink">During your visit</strong><p className="text-sm leading-relaxed text-muted">Your {role} confirms the approach and explains the service as it progresses.</p></li>
            <li className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr]"><strong className="font-display text-xl font-medium text-ink">After your visit</strong><p className="text-sm leading-relaxed text-muted">You leave with a result shaped around your consultation, plus practical guidance for maintaining it.</p></li>
            <li className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr]"><strong className="font-display text-xl font-medium text-ink">With upkeep</strong><p className="text-sm leading-relaxed text-muted">The right aftercare and revisit schedule can help you continue enjoying the result between appointments.</p></li>
          </ol>
        </div>
      </section>
      <section className="bg-cream py-14 lg:py-20">
        <div className="container-site">
          <p className="eyebrow">Client Results</p>
          <h2 className="heading mt-3">What Clients Commonly Come In For</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">These are common starting goals. Your final service is always confirmed after a consultation with your {role}.</p>
          <div className="mt-8">
            <SnapRow carousel autoPlayMs={10000} itemWidth="w-[82%] sm:w-[24rem]" label={`${serviceLabel} client goals`}>
              {cards.map((card, index) => (
                <article key={`${card.goal}-${index}`} className="svc-card flex min-h-52 flex-col p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-berry">{serviceLabel}</span>
                  <h3 className="mt-3 font-display text-2xl font-medium text-ink">{card.goal}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">Discuss this goal in your consultation so we can recommend the right service plan and aftercare.</p>
                  <p className="mt-auto border-t border-ink/10 pt-4 text-sm font-medium text-ink">Xing Salon at {card.salon}</p>
                </article>
              ))}
            </SnapRow>
          </div>
          <p className="mt-6 flex max-w-3xl gap-2 text-xs leading-relaxed text-muted"><Check aria-hidden className="mt-0.5 size-3.5 shrink-0 text-berry" />Results and suitability vary by your starting point, goals and the care plan agreed during consultation.</p>
        </div>
      </section>
    </>
  );
}
