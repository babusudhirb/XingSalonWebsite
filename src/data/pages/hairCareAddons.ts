import { img, serviceHero } from '../content';
import { h1For, seoFor } from './catalogue';
import type { IconKey, ServicePageContent } from './types';

type HairCarePageConfig = {
  slug: string;
  label: string;
  eyebrow: string;
  sub: string;
  introTitle: string;
  intro: string;
  menuTitle: string;
  concern: string;
  benefits: Array<{ icon: IconKey; title: string }>;
  heroImage?: ServicePageContent['hero']['image'];
  related: Array<{ slug: string; text: string }>;
};

const standardChips: ServicePageContent['hero']['chips'] = [
  { icon: 'users', label: 'For men & women' },
  { icon: 'award', label: 'Expert consultation' },
  { icon: 'shield', label: 'Price confirmed before we start' },
];

function createHairCarePage(config: HairCarePageConfig): ServicePageContent {
  return {
    slug: config.slug,
    seo: seoFor(config.slug),
    hero: {
      eyebrow: `Hair Care · ${config.eyebrow}`,
      h1: h1For(config.slug),
      sub: config.sub,
      chips: standardChips,
      image: config.heroImage ?? serviceHero('hair-spa', 'Relaxing hair spa wash and scalp massage at Xing Salon'),
    },
    whatsappText: `Hi, I’d like to book ${config.label} at Xing`,
    whatsappSuffix: '. My hair concern is ___.',
    intro: {
      eyebrow: config.eyebrow,
      title: config.introTitle,
      paragraphs: [
        config.intro,
        'Your Xing stylist begins with a quick consultation to understand your hair, routine and the result you want. We recommend the right service for you and confirm the price before we begin at Sarjapur Road, HSR Layout or Brookfield.',
      ],
    },
    menu: {
      title: config.menuTitle,
      text: 'Available at all three Xing salons in Bangalore.',
      askText: `Not sure whether this is right for your ${config.concern}? Ask us on WhatsApp.`,
    },
    audience: {
      title: `Who ${config.label} Is For`,
      items: [`People looking for help with ${config.concern}`, 'Clients who want a professional consultation before choosing a service', 'Anyone booking at Xing Sarjapur Road, HSR Layout or Brookfield'],
      note: 'Your stylist checks your hair and scalp first, then recommends the service that fits your needs.',
    },
    benefits: { title: `Why Choose Xing for ${config.label}`, items: config.benefits },
    process: {
      title: 'What to Expect',
      steps: [
        { title: 'Consultation', text: 'We check your hair and talk through the finish you want.' },
        { title: 'Service chosen for you', text: 'Your stylist selects the right approach for your hair and concern.' },
        { title: 'Care & finish', text: 'We complete your service and share simple aftercare advice.' },
      ],
    },
    aftercare: {
      title: 'Aftercare Tips',
      tips: [
        'Use products recommended for your hair and scalp needs.',
        'Use heat protection before blow drying, ironing or curling.',
        'Book a follow-up consultation if your hair or scalp concern continues.',
      ],
    },
    offerBand: { title: 'Care for Your Hair at Xing', text: 'Ask your salon about the current offer that best fits your appointment.' },
    locationsTitle: `${config.label} Near You in Bangalore`,
    faqTitle: `${config.label} FAQs`,
    faqs: [
      { q: `Who is ${config.label} for?`, a: `It is suited to clients who want help with ${config.concern}. Your stylist will assess your hair and recommend the right option during a free consultation.` },
      { q: `Is ${config.label} available at every Xing salon?`, a: 'Yes. You can book at Xing Sarjapur Road, HSR Layout or Brookfield in Bangalore.' },
      { q: `How is the price decided?`, a: 'The price depends on your hair length, density and the care required. We confirm it with you before we begin.' },
    ],
    related: { title: 'More Hair Care Services', items: config.related },
    cta: `Ready to care for your hair? Book ${config.label} at Xing today.`,
  };
}

export const blowDryingStyling = createHairCarePage({
  slug: 'blow-drying-styling', label: 'Blow Drying & Styling', eyebrow: 'Haircuts & Styling',
  sub: 'Professional blow dries, ironing, curls and waves for a polished everyday or event-ready finish.',
  introTitle: 'Blow Drying & Hair Styling in Sarjapur Road, HSR Layout & Brookfield',
  intro: 'Whether you want smooth volume, sleek straight hair, soft waves or defined curls, Xing stylists create a finish that suits your hair texture and plans for the day.',
  menuTitle: 'Blow Drying & Styling Services', concern: 'desired finish',
  heroImage: img('svc-hair', 'Professional blow dry and hair styling at Xing Salon Bangalore', 640, 480),
  benefits: [{ icon: 'sun', title: 'Smooth volume' }, { icon: 'waves', title: 'Curls and waves' }, { icon: 'sparkles', title: 'Event-ready finish' }],
  related: [{ slug: 'womens-haircut-styling', text: 'Haircuts, layers and complete styling.' }, { slug: 'keratin-treatment', text: 'Frizz control and glossy manageability.' }],
});

export const rootTouchUp = createHairCarePage({
  slug: 'root-touch-up', label: 'Root Touch-up', eyebrow: 'Hair Colour',
  sub: 'Refresh visible regrowth and grey roots while keeping your colour looking even and polished.',
  introTitle: 'Root Touch-ups in Sarjapur Road, HSR Layout & Brookfield',
  intro: 'A root touch-up focuses colour on the new growth, making it a practical way to refresh grey coverage or blend regrowth between global colour appointments.',
  menuTitle: 'Root Touch-up Services', concern: 'visible regrowth or grey coverage',
  heroImage: img('color-global', 'Global hair colour and root touch-up at Xing Salon Bangalore', 640, 480),
  benefits: [{ icon: 'palette', title: 'Even-looking colour' }, { icon: 'shield', title: 'Ammonia-free option' }, { icon: 'clock', title: 'Focused colour refresh' }],
  related: [{ slug: 'global-hair-color', text: 'One rich, even shade from roots to ends.' }, { slug: 'highlights', text: 'Dimension and brightness with highlights.' }],
});

export const olaplexBondRepair = createHairCarePage({
  slug: 'olaplex-bond-repair', label: 'Olaplex Bond Repair', eyebrow: 'Hair Treatments',
  sub: 'Bond-building care for hair affected by colouring, bleaching, heat styling or dryness.',
  introTitle: 'Olaplex Bond Repair in Sarjapur Road, HSR Layout & Brookfield',
  intro: 'Olaplex bond repair is designed for hair that feels stressed after chemical colour, bleaching or frequent heat styling. Your stylist will advise whether it works best as a focused treatment or alongside another service.',
  menuTitle: 'Olaplex Bond Repair Treatment', concern: 'colour or heat-stressed hair',
  benefits: [{ icon: 'layers', title: 'Bond-building care' }, { icon: 'shield', title: 'Supports colour-treated hair' }, { icon: 'sparkles', title: 'Softer-feeling lengths' }],
  related: [{ slug: 'moroccan-hair-spa', text: 'Nourishing care for dry or frizzy hair.' }, { slug: 'global-hair-color', text: 'Global colour with optional bond care.' }],
});

const spaPage = (slug: string, label: string, concern: string, intro: string, benefits: HairCarePageConfig['benefits']) =>
  createHairCarePage({
    slug, label, eyebrow: 'Hair Spa', sub: intro, introTitle: `${label} in Sarjapur Road, HSR Layout & Brookfield`, intro,
    menuTitle: label, concern, benefits,
    related: [{ slug: 'olaplex-bond-repair', text: 'Bond-building care for stressed hair.' }, { slug: 'moroccan-hair-spa', text: 'Nourishing care for dry or frizzy hair.' }],
  });

export const antiDandruffHairSpa = spaPage('anti-dandruff-hair-spa', 'Anti-Dandruff Hair Spa', 'flakes and scalp discomfort', 'A clarifying, scalp-focused hair spa that helps leave flakes and itchiness feeling more cared for.', [{ icon: 'wind', title: 'Fresh-feeling scalp' }, { icon: 'droplets', title: 'Targeted scalp care' }, { icon: 'sparkles', title: 'Clean, refreshed finish' }]);
export const antiHairfallHairSpa = spaPage('anti-hairfall-hair-spa', 'Anti-Hairfall Hair Spa', 'weak hair and breakage', 'A nourishing scalp and length ritual for hair that feels weak or is prone to breakage-related hair fall.', [{ icon: 'heart', title: 'Root-focused care' }, { icon: 'shield', title: 'Helps reduce breakage' }, { icon: 'droplets', title: 'Nourishing ritual' }]);
export const moroccanHairSpa = spaPage('moroccan-hair-spa', 'Moroccan Hair Spa', 'dryness and frizz', 'A nourishing hair spa to soften dry lengths, tame frizz and bring out a smoother, glossier finish.', [{ icon: 'sparkles', title: 'Glossy finish' }, { icon: 'droplets', title: 'Deep nourishment' }, { icon: 'waves', title: 'Softer movement' }]);
export const tribondHairSpa = spaPage('tribond-hair-spa', 'Tribond Hair Spa', 'weak, brittle or over-styled hair', 'A strengthening spa for hair that feels weak, brittle or stressed by regular styling.', [{ icon: 'shield', title: 'Strengthening care' }, { icon: 'layers', title: 'Supports stressed hair' }, { icon: 'heart', title: 'Soft, cared-for feel' }]);
