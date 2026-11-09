import { Check, Clock3, MapPin, Sparkles } from 'lucide-react';
import { locations } from '../../data/branches';
import type { ServicePageContent } from '../../data/pages/types';
import type { ServiceCategory } from '../../data/services';

interface ServiceEssentialsProps {
  page: ServicePageContent;
  category: ServiceCategory;
}

/** Fully visible booking guidance. Detailed sections below provide the full service information. */
export function ServiceEssentials({ page, category }: ServiceEssentialsProps) {
  const rightFor = page.audience?.items.slice(0, 3) ?? [`Anyone looking for ${category.title.toLowerCase()} tailored to their needs.`];
  const steps = page.process?.steps.slice(0, 4) ?? [];
  const aftercare = page.aftercare.tips?.slice(0, 2) ?? page.aftercare.groups?.flatMap((group) => group.tips).slice(0, 2) ?? [];
  const timing = page.process?.duration ?? 'Your stylist confirms the appointment time before starting, based on your hair, skin or nail assessment.';

  return (
    <section aria-labelledby="service-essentials" className="border-b border-ink/10 bg-cream py-9 sm:py-12">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="eyebrow">Before You Book</p>
          <h2 id="service-essentials" className="mt-2 font-display text-3xl font-medium text-ink sm:text-4xl">Plan your service with confidence</h2>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="svc-card p-5">
            <span className="grid size-10 place-items-center rounded-full bg-blush text-berry"><Sparkles aria-hidden className="size-5" /></span>
            <h3 className="mt-4 font-semibold text-ink">Right for you if…</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">{rightFor.map((item) => <li key={item} className="flex gap-2"><Check aria-hidden className="mt-1 size-3.5 shrink-0 text-berry" />{item}</li>)}</ul>
          </article>
          <article className="svc-card p-5">
            <span className="grid size-10 place-items-center rounded-full bg-blush text-berry"><Clock3 aria-hidden className="size-5" /></span>
            <h3 className="mt-4 font-semibold text-ink">Your appointment</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{timing}</p>
            {steps.length > 0 && <ol className="mt-4 space-y-1.5 text-sm text-ink">{steps.map((step, index) => <li key={step.title}><span className="mr-2 text-berry">{index + 1}.</span>{step.title}</li>)}</ol>}
          </article>
          <article className="svc-card p-5">
            <span className="grid size-10 place-items-center rounded-full bg-blush text-berry"><Check aria-hidden className="size-5" /></span>
            <h3 className="mt-4 font-semibold text-ink">After your visit</h3>
            {aftercare.length > 0 ? <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">{aftercare.map((tip) => <li key={tip} className="flex gap-2"><Check aria-hidden className="mt-1 size-3.5 shrink-0 text-berry" />{tip}</li>)}</ul> : <p className="mt-3 text-sm leading-relaxed text-muted">Your therapist will share simple aftercare tailored to your service.</p>}
          </article>
          <article className="svc-card p-5">
            <span className="grid size-10 place-items-center rounded-full bg-blush text-berry"><MapPin aria-hidden className="size-5" /></span>
            <h3 className="mt-4 font-semibold text-ink">Available at</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed">{locations.map((location) => <li key={location.id}><a href={location.path} className="text-berry underline-offset-4 hover:underline">{location.name}</a></li>)}</ul>
          </article>
        </div>
      </div>
    </section>
  );
}
