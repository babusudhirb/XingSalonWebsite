import { ArrowRight } from 'lucide-react';
import { servicePages } from '../../data/pages';
import type { Service } from '../../data/services';
import { whatsappLink } from '../../lib/whatsapp';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

// The build renders these cards to plain HTML (vite.config.ts), so nothing here may import the router.

const CARD_SIZES = '(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw';

/** The card photo: the service page's hero photo. An illustration or a missing photo gets a typographic panel. */
function CardImage({ service, priority }: { service: Service; priority: boolean }) {
  const image = servicePages[service.slug]?.hero.image;
  if (!image || image.src.endsWith('.svg')) {
    return (
      <div aria-hidden className="grid aspect-video place-items-center bg-gradient-to-br from-blush to-[#F2B8C6] px-6 text-center">
        <span className="font-display text-3xl font-medium italic leading-tight text-berry">{service.menuLabel}</span>
      </div>
    );
  }
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.srcSet ? CARD_SIZES : undefined}
      alt={`${service.label} at Xing salon Bangalore`}
      width={image.width}
      height={image.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority && ({ fetchpriority: 'high' } as Record<string, string>))}
      className="aspect-video w-full object-cover"
    />
  );
}

/**
 * A service on /services/<category>: photo, name, one line, "View details" and a WhatsApp booking button. Every
 * service in the catalogue has a page (tests/catalogue.test.ts checks), so the link goes straight to it.
 */
export function ServiceListingCard({ service, priority = false, compact = false }: { service: Service; priority?: boolean; compact?: boolean }) {
  const badge = service.badge ?? (service.isNew ? 'New' : undefined);
  return (
    <article className={`flex h-full flex-col overflow-hidden border border-berry/10 bg-white shadow-soft ${compact ? 'rounded-2xl' : 'rounded-3xl'}`}>
      <div className="relative">
        <CardImage service={service} priority={priority} />
        {badge && (
          <p className="absolute left-3 top-3 inline-flex min-h-7 items-center rounded-full bg-gold px-3 text-xs font-semibold text-ink">{badge}</p>
        )}
      </div>
      <div className={`flex flex-1 flex-col ${compact ? 'p-4' : 'p-5'}`}>
        <h3 className={`text-balance font-display font-medium leading-tight text-ink ${compact ? 'text-xl' : 'text-2xl'}`}>{service.label}</h3>
        <p className={`flex-1 text-muted ${compact ? 'mt-1.5 text-sm leading-snug' : 'mt-2 text-base'}`}>{service.blurb}</p>
        <div className={`flex items-center justify-between gap-3 ${compact ? 'mt-2' : 'mt-4'}`}>
          <a
            href={`/services/${service.slug}`}
            className={`inline-flex min-h-10 items-center gap-1.5 font-semibold text-berry underline-offset-4 hover:underline ${compact ? 'text-sm' : 'text-base md:text-sm'}`}
          >
            View details
            <span className="sr-only"> of {service.label}</span>
            <ArrowRight aria-hidden className="size-4" />
          </a>
          <a
            href={whatsappLink(`Hi XING! I'd like to book ${service.label}.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Book ${service.label} on WhatsApp`}
            className={`grid shrink-0 place-items-center rounded-full bg-whatsapp text-white transition hover:brightness-110 ${compact ? 'size-10' : 'size-11'}`}
          >
            <WhatsAppIcon className="size-5" />
          </a>
        </div>
      </div>
    </article>
  );
}
