import { serviceHero } from '../content';
import { h1For, seoFor } from './catalogue';
import type { IconKey, ServicePageContent } from './types';

type Config = {
  slug: string;
  label: string;
  section: string;
  intro: string;
  concern: string;
  benefits: Array<{ icon: IconKey; title: string }>;
  related: Array<{ slug: string; text: string }>;
};

const chips: ServicePageContent['hero']['chips'] = [
  { icon: 'users', label: 'For men & women' },
  { icon: 'award', label: 'Expert consultation' },
  { icon: 'shield', label: 'Price confirmed before we start' },
];

function createSkinBodyPage(config: Config): ServicePageContent {
  return {
    slug: config.slug,
    seo: seoFor(config.slug),
    hero: { eyebrow: `Skin Care · ${config.section}`, h1: h1For(config.slug), sub: config.intro, chips, image: serviceHero('hydra-facial', `${config.label} at Xing Salon Bangalore`) },
    whatsappText: `Hi, I’d like to book ${config.label} at Xing`,
    intro: {
      eyebrow: config.section,
      title: `${config.label} in Sarjapur Road, HSR Layout & Brookfield`,
      paragraphs: [config.intro, 'Every Xing appointment starts with a quick consultation, so your therapist can understand your skin or care goal and recommend the right service. We confirm the price before we begin at Sarjapur Road, HSR Layout or Brookfield.'],
    },
    menu: { title: config.label, text: 'Available at all three Xing salons in Bangalore.', askText: `Not sure whether this is right for your ${config.concern}? Ask us on WhatsApp.` },
    audience: { title: `Who ${config.label} Is For`, items: [`People looking for help with ${config.concern}`, 'Clients who want professional care and a consultation first', 'Anyone booking at Xing Sarjapur Road, HSR Layout or Brookfield'], note: 'Your therapist checks your needs first and recommends the right service for you.' },
    benefits: { title: `Why Choose Xing for ${config.label}`, items: config.benefits },
    process: { title: 'What to Expect', steps: [{ title: 'Consultation', text: 'We understand your skin or care goal before starting.' }, { title: 'Tailored service', text: 'Your therapist selects the appropriate care for your needs.' }, { title: 'Finish & guidance', text: 'We complete your service and share simple aftercare advice.' }] },
    aftercare: { title: 'Aftercare Tips', tips: ['Follow the aftercare advice from your therapist.', 'Use gentle products that suit your skin or nail-care needs.', 'Book your next visit when you want to maintain the result.'] },
    offerBand: { title: 'Care for Yourself at Xing', text: 'Ask your salon about the current offer that best fits your appointment.' },
    locationsTitle: `${config.label} Near You in Bangalore`,
    faqTitle: `${config.label} FAQs`,
    faqs: [
      { q: `Who is ${config.label} for?`, a: `It is suited to clients looking for help with ${config.concern}. Your therapist will discuss your needs and recommend the right approach during a free consultation.` },
      { q: `Is ${config.label} available at every Xing salon?`, a: 'Yes. You can book at Xing Sarjapur Road, HSR Layout or Brookfield in Bangalore.' },
      { q: 'How is the price decided?', a: 'The price depends on the care required and the service selected. We confirm it with you before we begin.' },
    ],
    related: { title: 'More Skin Care Services', items: config.related },
    cta: `Ready to book ${config.label}? Visit Xing today.`,
  };
}

export const deTan = createSkinBodyPage({ slug: 'de-tan', label: 'De-tan', section: 'Monthly Essentials', intro: 'Targeted care for the appearance of tan on the face, neck, arms or legs, leaving skin refreshed and more even-looking.', concern: 'sun-exposed, uneven-looking skin', benefits: [{ icon: 'sun', title: 'Targeted care' }, { icon: 'sparkles', title: 'Fresh appearance' }, { icon: 'heart', title: 'Tailored consultation' }], related: [{ slug: 'facial-cleanup', text: 'A thorough cleanse for fresh-looking skin.' }, { slug: 'waxing', text: 'Smooth, polished skin from head to toe.' }] });
export const ultraPremiumFacial = createSkinBodyPage({ slug: 'ultra-premium-facial', label: 'Ultra Premium Facial', section: 'Facials', intro: 'Our most indulgent facial ritual for intensive care, relaxation and a visibly refreshed, radiant-looking complexion.', concern: 'deep facial care and relaxation', benefits: [{ icon: 'crown', title: 'Intensive care' }, { icon: 'sparkles', title: 'Radiant-looking skin' }, { icon: 'heart', title: 'Relaxing ritual' }], related: [{ slug: 'hydra-facial', text: 'Seven steps of deep cleansing and hydration.' }, { slug: 'premium-facial', text: 'Deep nourishment for soft, radiant-looking skin.' }] });
export const premiumFacial = createSkinBodyPage({ slug: 'premium-facial', label: 'Skin Brightening / Vitamin E Facial', section: 'Facials', intro: 'A nourishing Vitamin E facial that helps brighten the look of skin while leaving it soft, comfortable and refreshed with a healthy-looking glow.', concern: 'brighter-looking skin and a healthy glow', benefits: [{ icon: 'heart', title: 'Vitamin E nourishment' }, { icon: 'sparkles', title: 'Brighter-looking skin' }, { icon: 'smile', title: 'Relaxing massage' }], related: [{ slug: 'hydra-facial', text: 'Seven steps of deep cleansing and hydration.' }, { slug: 'express-facial', text: 'Targeted anti-aging care for refreshed-looking skin.' }] });
export const expressFacial = createSkinBodyPage({ slug: 'express-facial', label: 'Anti-Aging Facial', section: 'Facials', intro: 'A targeted facial that nourishes and refreshes mature-looking skin, supporting a smoother, more radiant appearance through relaxing professional care.', concern: 'refreshed, radiant-looking skin', benefits: [{ icon: 'clock', title: 'Targeted facial care' }, { icon: 'sparkles', title: 'Radiant-looking skin' }, { icon: 'droplets', title: 'Nourish and refresh' }], related: [{ slug: 'premium-facial', text: 'Vitamin E nourishment for brighter-looking skin.' }, { slug: 'facial-cleanup', text: 'A thorough cleanse for fresh-looking skin.' }] });
export const armsLegsBodyPolish = createSkinBodyPage({ slug: 'arms-legs-body-polish', label: 'Arms & Legs Body Polish', section: 'Body Polish', intro: 'Focused exfoliation and polish for arms and legs, helping skin feel soft, smooth and ready for your favourite outfits.', concern: 'dry or dull-looking arms and legs', benefits: [{ icon: 'sparkles', title: 'Smooth feel' }, { icon: 'sun', title: 'Even-looking glow' }, { icon: 'heart', title: 'Focused care' }], related: [{ slug: 'body-polish', text: 'A full head-to-toe body-polish ritual.' }, { slug: 'waxing', text: 'Smooth skin for arms, legs and more.' }] });
export const algaManiPedi = createSkinBodyPage({ slug: 'alga-mani-pedi', label: 'Alga Mani & Pedi', section: 'Manicure & Pedicure', intro: 'A rejuvenating manicure and pedicure with deeper nourishment and a longer massage for cared-for hands and feet.', concern: 'tired hands and feet that need deeper nourishment', benefits: [{ icon: 'waves', title: 'Deep nourishment' }, { icon: 'smile', title: 'Longer massage' }, { icon: 'sparkles', title: 'Cared-for finish' }], related: [{ slug: 'manicure', text: 'A complete deluxe classic-care ritual.' }, { slug: 'crystal-mani-pedi', text: 'Extra softness for hands and feet.' }] });
export const crystalManiPedi = createSkinBodyPage({ slug: 'crystal-mani-pedi', label: 'Crystal Mani & Pedi', section: 'Manicure & Pedicure', intro: 'An elevated manicure and pedicure with extra exfoliation and nourishment for visibly softer, smoother hands and feet.', concern: 'extra softness and nourishment for hands and feet', benefits: [{ icon: 'droplets', title: 'Extra softness' }, { icon: 'sparkles', title: 'Polished finish' }, { icon: 'heart', title: 'Nourishing ritual' }], related: [{ slug: 'manicure', text: 'A complete deluxe classic-care ritual.' }, { slug: 'alga-mani-pedi', text: 'Deep nourishment and a longer massage.' }] });
export const deluxeManiPedi = createSkinBodyPage({ slug: 'manicure', label: 'Deluxe Mani & Pedi', section: 'Manicure & Pedicure', intro: 'A complete manicure and pedicure ritual with nail shaping, cuticle care, exfoliation, massage and polish for neat, refreshed hands and feet.', concern: 'regular care for hands and feet', benefits: [{ icon: 'sparkles', title: 'Classic care' }, { icon: 'smile', title: 'Relaxing massage' }, { icon: 'heart', title: 'Hands and feet' }], related: [{ slug: 'alga-mani-pedi', text: 'Deep nourishment and a longer massage.' }, { slug: 'crystal-mani-pedi', text: 'Extra softness for hands and feet.' }] });
export const heelPeelTreatment = createSkinBodyPage({ slug: 'pedicure', label: 'Heel Peel Treatment', section: 'Manicure & Pedicure', intro: 'A targeted foot treatment that helps soften and smooth rough, dry or cracked-looking heels for more comfortable-feeling feet.', concern: 'rough, dry or cracked-looking heels', benefits: [{ icon: 'layers', title: 'Targeted heel care' }, { icon: 'sparkles', title: 'Smoother feel' }, { icon: 'heart', title: 'Comfortable feet' }], related: [{ slug: 'alga-mani-pedi', text: 'Deep nourishment for hands and feet.' }, { slug: 'manicure', text: 'A complete deluxe classic-care ritual.' }] });
