import type { Img } from './content';

export type IndividualOfferCategory = 'Hair Colour' | 'Hair Treatments' | 'Skin & Care' | 'Celebrations & Value';

export interface IndividualOffer {
  id: string;
  category: IndividualOfferCategory;
  title: string;
  kicker: string;
  value: string;
  description: string;
  image: Img;
  service?: string;
  duration: string;
  includes: string[];
  bestFor: string[];
  terms: string[];
  faqs: Array<{ q: string; a: string }>;
}

const photo = (name: string, alt: string): Img => ({ src: `/images/offers/${name}-800.webp`, srcSet: `/images/offers/${name}-480.webp 480w, /images/offers/${name}-800.webp 800w`, avifSrcSet: `/images/offers/${name}-480.avif 480w, /images/offers/${name}-800.avif 800w`, width: 800, height: 1000, alt });
const salonPhoto = (name: string, alt: string): Img => ({ src: `/images/${name}.webp`, srcSet: `/images/${name}-480.webp 480w, /images/${name}.webp 800w`, width: 800, height: 600, alt });
const limited = ['Limited-time offer; availability and final details are confirmed by your salon before starting.', 'One offer per service; offers cannot be combined unless your salon confirms otherwise.'];

const serviceOffer = (id: string, category: IndividualOfferCategory, title: string, kicker: string, value: string, image: Img, service: string, duration: string, includes: string[], bestFor: string[]): IndividualOffer => ({
  id, category, title, kicker, value, description: value, image, service, duration, includes, bestFor, terms: limited,
  faqs: [
    { q: `What does the ${title} offer cover?`, a: `Your stylist or therapist confirms what is included in this ${title.toLowerCase()} offer before the appointment begins.` },
    { q: 'Can I book at any Xing salon?', a: 'Yes. Choose Sarjapur Road, HSR Layout or Brookfield when you book, and the salon will confirm availability.' },
  ],
});

export const individualOffers: IndividualOffer[] = [
  serviceOffer('global-hair-colour', 'Hair Colour', 'Global Hair Colour Offer', 'An all-over refresh', 'One even shade, tailored in consultation.', photo('global-hair-colour', 'Global hair colour at Xing Salon'), 'global-hair-color', '1–2 hours', ['Colour consultation', 'Shade selection', 'All-over colour application', 'Finish styling'], ['Grey coverage', 'Refreshing faded colour', 'A complete colour change']),
  serviceOffer('highlights', 'Hair Colour', 'Highlights Offer', 'Light and dimension', 'Brighter strands placed to flatter your natural hair.', photo('highlights', 'Hair highlights at Xing Salon'), 'highlights', '2–3 hours', ['Colour consultation', 'Placement plan', 'Lightening and toning where needed', 'Finish styling'], ['A first step into colour', 'Adding brightness', 'Dimension without all-over colour']),
  {
    ...serviceOffer('balayage', 'Hair Colour', 'Premium Balayage Hair Colour', 'Premium quality. Stunning results.', 'Starting from ₹5,499', photo('balayage-offer', 'Premium balayage hair colour offer at Xing Salon, starting from ₹5,499'), 'balayage', '2–3 hours', ['Colour consultation', 'Personalised placement', 'Toning where needed', 'Finish styling'], ['Low-maintenance colour', 'Soft brightness', 'A lived-in dimension']),
    description: 'Hand-painted, dimensional colour designed around your inspiration, skin tone and preferred finish.',
  },
  serviceOffer('crazy-fashion-colour', 'Hair Colour', 'Crazy Fashion Colour Offer', 'Make it your statement', 'Express your style with bold, creative colour placed around your look.', photo('fashion-colour', 'Crazy fashion hair colour at Xing Salon'), 'fashion-color', '3–5 hours', ['Colour consultation', 'Shade and placement plan', 'Colour application', 'Finish styling'], ['A bold change', 'Creative streaks', 'Statement colour']),
  serviceOffer('keratin', 'Hair Treatments', 'Keratin Treatment Offer', 'Smooth. Strong. Polished.', 'A consultation-led smoothing treatment for more manageable hair.', photo('keratin', 'Keratin treatment at Xing Salon'), 'keratin-treatment', '2–3 hours', ['Hair consultation', 'Treatment plan', 'Keratin application', 'Aftercare guidance'], ['Frizz control', 'A smoother finish', 'Easier daily styling']),
  serviceOffer('straightening-smoothening', 'Hair Treatments', 'Straightening & Smoothening Offer', 'Sleek, manageable hair', 'Choose the right smoothing direction after a hair assessment.', photo('keratin', 'Smooth hair treatment at Xing Salon'), 'hair-smoothening', '2–3 hours', ['Hair assessment', 'Treatment recommendation', 'Professional application', 'Aftercare guidance'], ['Persistent frizz', 'A sleeker look', 'Simpler styling']),
  serviceOffer('nanoplastia', 'Hair Treatments', 'Nanoplastia Offer', 'Sleeker. Smoother. Stronger.', 'A smoothing option selected around your texture and desired finish.', photo('nanoplastia', 'Nanoplastia hair treatment at Xing Salon'), 'nanoplastia', '2–3 hours', ['Hair consultation', 'Texture assessment', 'Treatment application', 'Care plan'], ['Wavy or curly hair', 'A natural smoother finish', 'Easy styling']),
  serviceOffer('olaplex-bond-repair', 'Hair Treatments', 'Olaplex Bond Repair Offer', 'Stronger. Healthier. Shinier.', 'Bond-repair care for hair that needs a considered recovery plan.', photo('olaplex', 'Olaplex bond repair at Xing Salon'), 'olaplex-bond-repair', 'About 60 minutes', ['Hair assessment', 'Bond-repair treatment', 'Conditioning care', 'Aftercare advice'], ['Colour-treated hair', 'Heat-stressed hair', 'A softness and strength reset']),
  serviceOffer('hydra-facial', 'Skin & Care', 'Hydra Facial Offer', 'Deep cleanse. Hydrate. Radiate.', 'A consultation-led facial for fresh, hydrated-looking skin.', photo('hydra-facial', 'Hydra Facial at Xing Salon'), 'hydra-facial', '60–90 minutes', ['Skin check', 'Cleanse and exfoliation', 'Pore care and hydration', 'Glow finish'], ['Dull-looking skin', 'A pre-event reset', 'Dehydrated skin']),
  serviceOffer('body-polish', 'Skin & Care', 'Body Polish Offer', 'Smooth. Radiant. Refreshing.', 'A full-body polishing ritual for softer, refreshed-looking skin.', photo('body-polish', 'Body polish at Xing Salon'), 'body-polish', '2–3 hours', ['Consultation', 'Exfoliation', 'Polishing ritual', 'Moisture finish'], ['Dry-looking skin', 'A special occasion', 'A full-body reset']),
  serviceOffer('hair-spa', 'Skin & Care', 'Hair Spa 2 + 1 Offer', 'Relax. Repair. Rejuvenate.', 'Nourishing care to condition and restore softness through a planned series.', photo('hair-spa', 'Hair spa at Xing Salon'), 'moroccan-hair-spa', 'About 60 minutes per visit', ['Hair and scalp check', 'Nourishing spa care', 'Relaxing finish', 'Home-care guidance'], ['Dry or stressed hair', 'Regular hair care', 'A restorative routine']),
  serviceOffer('anti-aging-facial', 'Skin & Care', 'Anti-Aging Facial Offer', 'Nourish. Smooth. Refresh.', 'Targeted facial care for a visibly refreshed, cared-for finish.', photo('express-facial', 'Anti-aging facial at Xing Salon'), 'express-facial', '45–90 minutes', ['Skin check', 'Cleanse and treatment', 'Nourishing care', 'Aftercare guidance'], ['A refreshed look', 'Dry or tired-looking skin', 'A regular skin-care ritual']),
  {
    id: 'birthday', category: 'Celebrations & Value', title: 'Birthday Offer', kicker: 'Make your birthday your salon day', value: 'A celebratory salon treat, planned around you.', description: 'Book a service around your birthday and let the salon confirm the applicable celebration benefit.', image: { src: '/images/birthday-offer.png', width: 800, height: 600, alt: 'Xing Birthday offer' }, duration: 'Confirmed with your salon', includes: ['Birthday consultation', 'Service recommendation', 'Celebration benefit confirmation', 'Booking support'], bestFor: ['Your birthday week', 'A self-care plan', 'Celebrating with friends'], terms: ['Valid within seven days of your birthday.', 'Monday to Thursday only; show ID at the salon and book ahead where possible.'], faqs: [{ q: 'When can I use the birthday offer?', a: 'It is valid within seven days of your birthday, subject to salon confirmation.' }, { q: 'Do I need proof of my birthday?', a: 'Please carry a valid ID to the salon.' }],
  },
  {
    id: 'anniversary', category: 'Celebrations & Value', title: 'Anniversary Offer', kicker: 'Celebrate together', value: 'A salon celebration for your special date.', description: 'Plan a shared celebration or a personal service around your anniversary.', image: { src: '/images/anniversary-offer.png', width: 800, height: 600, alt: 'Xing Anniversary offer' }, duration: 'Confirmed with your salon', includes: ['Advance booking support', 'Service recommendation', 'Celebration benefit confirmation', 'Salon consultation'], bestFor: ['Your anniversary week', 'A couple’s self-care plan', 'A meaningful treat'], terms: ['Valid within seven days of your anniversary.', 'Monday to Thursday only; mention it when booking and reserve ahead.'], faqs: [{ q: 'When can I use the anniversary offer?', a: 'It is valid within seven days of your anniversary, subject to availability.' }, { q: 'Do I need to book in advance?', a: 'Yes, advance booking is required so your salon can confirm the plan.' }],
  },
  {
    id: 'membership', category: 'Celebrations & Value', title: 'Xing Membership', kicker: 'More value for regular care', value: 'Up to 30% extra value across a year of visits.', description: 'A membership for regular hair, skin and nail care with a plan you can use over time.', image: salonPhoto('loc-hsr-5', 'Hair wash stations at Xing Salon HSR Layout'), duration: 'Valid for one year', includes: ['Up to 30% extra value', 'Use across salon services', 'One-year validity', 'Personal booking support'], bestFor: ['Regular salon visits', 'Treatment or colour upkeep', 'Families'], terms: ['Valid for one year from purchase.', 'Your salon confirms the plan, value and branch use before purchase.'], faqs: [{ q: 'How does Xing Membership work?', a: 'You choose a plan with the salon and use its value on eligible services during the year.' }, { q: 'Can membership be used for different services?', a: 'Ask your salon to confirm the eligible services and use conditions for your selected plan.' }],
  },
  {
    id: 'gift-cards', category: 'Celebrations & Value', title: 'Xing Gift Cards', kicker: 'Gift a Xing experience', value: 'A thoughtful gift for hair, skin or nail care.', description: 'Choose a value, add a personal message and let the recipient select the service that feels right.', image: salonPhoto('loc-hsr-4', 'Pedicure lounge at Xing Salon HSR Layout'), duration: 'Redeem when convenient', includes: ['A chosen value', 'Personal message', 'Use toward salon services', 'Booking support'], bestFor: ['Birthdays', 'Anniversaries', 'Thank-you gifts'], terms: ['Redeemable on salon services.', 'Your salon confirms current bonus value and redemption details.'], faqs: [{ q: 'How do I buy a gift card?', a: 'Message or visit your preferred Xing salon to choose the value and personal message.' }, { q: 'What can a gift card be used for?', a: 'Your salon confirms the eligible hair, skin and nail services when it is purchased or redeemed.' }],
  },
];

export const individualOfferPath = (id: string) => `/offers/${id}`;
export const individualOfferById = (id: string) => individualOffers.find((offer) => offer.id === id);
/** One consistent crop for every current-offer card or hero image. */
export const OFFER_IMAGE_FRAME = 'aspect-square w-full object-cover';

/** Keeps repeated offer slots fresh while remaining stable for a particular page and its prerendered HTML. */
export function rotatedIndividualOffers(seed: string, count = individualOffers.length) {
  const start = [...seed].reduce((total, character) => (total * 31 + character.charCodeAt(0)) >>> 0, 0) % individualOffers.length;
  const rotated = [...individualOffers.slice(start), ...individualOffers.slice(0, start)];
  return rotated.slice(0, Math.min(count, rotated.length));
}
