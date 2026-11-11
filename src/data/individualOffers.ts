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
const limited = ['Limited-time offer; availability and final details are confirmed by your salon before starting.', 'One offer per service; offers cannot be combined unless your salon confirms otherwise.'];

const serviceOffer = (id: string, category: IndividualOfferCategory, title: string, kicker: string, value: string, image: Img, service: string, duration: string, includes: string[], bestFor: string[]): IndividualOffer => ({
  id, category, title, kicker, value, description: value, image, service, duration, includes, bestFor, terms: limited,
  faqs: [
    { q: `What does the ${title} offer cover?`, a: `Your stylist or therapist confirms what is included in this ${title.toLowerCase()} offer before the appointment begins.` },
    { q: 'Can I book at any Xing salon?', a: 'Yes. Choose Sarjapur Road, HSR Layout or Brookfield when you book, and the salon will confirm availability.' },
  ],
});

export const individualOffers: IndividualOffer[] = [
  {
    ...serviceOffer('global-hair-colour', 'Hair Colour', 'Global Hair Colour', 'Any-length offer', '₹3,999 · Save ₹2,000', photo('global-hair-colour-offer', 'Global hair colour offer at Xing Salon: ₹3,999 at any length, saving ₹2,000'), 'global-hair-color', '1–2 hours', ['Colour consultation', 'Shade selection', 'All-over colour application', 'Finish styling'], ['Grey coverage', 'Refreshing faded colour', 'A complete colour change']),
    description: 'One even, all-over shade selected in consultation for your hair goals, skin tone and desired finish.',
  },
  {
    ...serviceOffer('highlights', 'Hair Colour', 'Hair Highlights', 'Limited-time offer', '40% off · ₹399 per streak', photo('highlights-offer', 'Hair highlights offer at Xing Salon: ₹399 per streak with 40% off'), 'highlights', '2–3 hours', ['Colour consultation', 'Placement plan', 'Lightening and toning where needed', 'Finish styling'], ['A first step into colour', 'Adding brightness', 'Dimension without all-over colour']),
    description: 'Brighter, dimensional strands with 8–10 streaks recommended for a beautifully blended result.',
  },
  {
    ...serviceOffer('balayage', 'Hair Colour', 'Premium Balayage Hair Colour', 'Premium quality. Stunning results.', 'Starting from ₹5,499', photo('balayage-offer', 'Premium balayage hair colour offer at Xing Salon, starting from ₹5,499'), 'balayage', '2–3 hours', ['Colour consultation', 'Personalised placement', 'Toning where needed', 'Finish styling'], ['Low-maintenance colour', 'Soft brightness', 'A lived-in dimension']),
    description: 'Hand-painted, dimensional colour designed around your inspiration, skin tone and preferred finish.',
  },
  {
    ...serviceOffer('crazy-fashion-colour', 'Hair Colour', 'Crazy Hair Colour', 'Limited-time offer', 'Flat 40% off · ₹499 per streak', photo('crazy-fashion-offer', 'Crazy hair colour offer at Xing Salon: ₹499 per streak with 40% off'), 'fashion-color', '3–5 hours', ['Colour consultation', 'Shade and placement plan', 'Colour application', 'Finish styling'], ['A bold change', 'Creative streaks', 'Statement colour']),
    description: 'Bold, creative colour streaks in shades chosen around your look, with expert placement and finish styling.',
  },
  {
    ...serviceOffer('keratin', 'Hair Treatments', 'Hair Keratin', 'Flat · any length', '₹4,999', photo('keratin-offer', 'Hair keratin offer at Xing Salon: ₹4,999 at any length'), 'keratin-treatment', '2–3 hours', ['Hair consultation', 'Treatment plan', 'Keratin application', 'Aftercare guidance'], ['Frizz control', 'A smoother finish', 'Easier daily styling']),
    description: 'A professional keratin treatment for smoother hair, frizz control and long-lasting manageability.',
  },
  {
    ...serviceOffer('nanoplastia', 'Hair Treatments', 'Hair Nanoplastia', 'Sleeker. Smoother. Stronger.', 'Starting from ₹5,999', photo('nanoplastia-offer', 'Hair Nanoplastia offer at Xing Salon, starting from ₹5,999'), 'nanoplastia', '2–3 hours', ['Hair consultation', 'Texture assessment', 'Treatment application', 'Care plan'], ['Wavy or curly hair', 'A natural smoother finish', 'Easy styling']),
    description: 'A smoothing option chosen around your texture for frizz control, natural shine and lasting smoothness.',
  },
  {
    ...serviceOffer('olaplex-bond-repair', 'Hair Treatments', 'Olaplex Bond Repair Treatment', 'Stronger. Healthier. Shinier.', '₹2,999', photo('olaplex-offer', 'Olaplex bond repair treatment offer at Xing Salon: ₹2,999'), 'olaplex-bond-repair', 'About 60 minutes', ['Hair assessment', 'Bond-repair treatment', 'Conditioning care', 'Aftercare advice'], ['Colour-treated hair', 'Heat-stressed hair', 'A softness and strength reset']),
    description: 'Targeted bond-repair care that helps improve strength, elasticity, smoothness and shine.',
  },
  {
    ...serviceOffer('hydra-facial', 'Skin & Care', 'Hydra Facial', 'Complete 6-step process', '35% off · ₹3,499', photo('hydra-facial-offer', 'Hydra Facial offer at Xing Salon: ₹3,499 with 35% off'), 'hydra-facial', '60–90 minutes', ['Skin check', 'Cleanse and exfoliation', 'Pore care and hydration', 'Glow finish'], ['Dull-looking skin', 'A pre-event reset', 'Dehydrated skin']),
    description: 'A six-step facial with deep cleansing, pore care and intense hydration for glowing, radiant-looking skin.',
  },
  {
    ...serviceOffer('body-polish', 'Skin & Care', 'Head-to-Toe Body Polish', 'Smooth. Radiant. Refreshingly you.', '₹4,999', photo('body-polish-offer', 'Head-to-toe body polish offer at Xing Salon: ₹4,999'), 'body-polish', '2–3 hours', ['Consultation', 'Exfoliation', 'Polishing ritual', 'Moisture finish'], ['Dry-looking skin', 'A special occasion', 'A full-body reset']),
    description: 'A relaxing full-body ritual with deep exfoliation to lift tan and dullness, leaving skin softer and glowing.',
  },
  {
    ...serviceOffer('hair-spa', 'Hair Treatments', 'Hair Spa 2 + 1 Offer', 'Relax. Repair. Rejuvenate.', 'Starting from ₹1,999', photo('hair-spa-offer', 'Hair Spa 2 plus 1 offer at Xing Salon, starting from ₹1,999'), 'moroccan-hair-spa', 'About 60 minutes per visit', ['Hair and scalp check', 'Nourishing spa care', 'Relaxing finish', 'Home-care guidance'], ['Dry or stressed hair', 'Regular hair care', 'A restorative routine']),
    description: 'A nourishing hair-spa series to deeply condition hair, improve softness and add a healthy-looking shine.',
  },
  {
    ...serviceOffer('anti-dandruff-scalp-treatment', 'Hair Treatments', 'Anti-Dandruff Scalp Treatment', 'Cleanse. Soothe. Revive.', '₹1,999', photo('anti-dandruff-scalp-offer', 'Anti-dandruff scalp treatment offer at Xing Salon: ₹1,999'), 'anti-dandruff-hair-spa', 'About 60 minutes', ['Scalp assessment', 'Targeted anti-dandruff care', 'Soothing scalp treatment', 'Aftercare guidance'], ['Visible dandruff', 'An irritated scalp', 'A cleaner scalp reset']),
    description: 'A scalp-focused treatment to help remove dandruff, soothe irritation and leave hair feeling refreshed.',
  },
  {
    ...serviceOffer('anti-aging-facial', 'Skin & Care', 'Monthly Express Facial', 'Monthly facial offer', '₹2,499', photo('monthly-facial-offer', 'Monthly Express Facial offer at Xing Salon: ₹2,499'), 'express-facial', '45–90 minutes', ['Skin check', 'Cleanse and treatment', 'Nourishing care', 'Aftercare guidance'], ['A refreshed look', 'Dry or tired-looking skin', 'A regular skin-care ritual']),
    description: 'A six-step express facial with deep cleansing, intense hydration and a healthy, radiant-looking finish.',
  },
  {
    id: 'birthday', category: 'Celebrations & Value', title: 'Birthday Offer', kicker: 'Celebrate you', value: '20% off for your entire birthday week', description: 'Make your birthday week your salon week with a celebratory 20% off offer, confirmed by your preferred Xing salon.', image: photo('birthday-offer', 'Xing Birthday Offer: 20% off for your entire birthday week'), duration: 'Confirmed with your salon', includes: ['Birthday consultation', 'Service recommendation', 'Celebration benefit confirmation', 'Booking support'], bestFor: ['Your birthday week', 'A self-care plan', 'Celebrating with friends'], terms: ['Valid within seven days of your birthday.', 'Monday to Thursday only; show ID at the salon and book ahead where possible.'], faqs: [{ q: 'When can I use the birthday offer?', a: 'It is valid within seven days of your birthday, subject to salon confirmation.' }, { q: 'Do I need proof of my birthday?', a: 'Please carry a valid ID to the salon.' }],
  },
  {
    id: 'anniversary', category: 'Celebrations & Value', title: 'Anniversary Offer', kicker: 'Celebrate together', value: '20% off for your entire anniversary week', description: 'Celebrate your special week with a shared salon plan or personal service, with 20% off confirmed by your preferred Xing salon.', image: photo('anniversary-offer', 'Xing Anniversary Offer: 20% off for your entire anniversary week'), duration: 'Confirmed with your salon', includes: ['Advance booking support', 'Service recommendation', 'Celebration benefit confirmation', 'Salon consultation'], bestFor: ['Your anniversary week', 'A couple’s self-care plan', 'A meaningful treat'], terms: ['Valid within seven days of your anniversary.', 'Monday to Thursday only; mention it when booking and reserve ahead.'], faqs: [{ q: 'When can I use the anniversary offer?', a: 'It is valid within seven days of your anniversary, subject to availability.' }, { q: 'Do I need to book in advance?', a: 'Yes, advance booking is required so your salon can confirm the plan.' }],
  },
  {
    id: 'membership', category: 'Celebrations & Value', title: 'Xing Membership', kicker: 'More care. More value.', value: 'Up to 30% off', description: 'A membership for regular hair, skin and nail care, giving you more value across a year of visits.', image: photo('membership-offer', 'Xing Membership: up to 30% off hair, skin and nail care'), duration: 'Valid for one year', includes: ['Up to 30% off', 'Use across salon services', 'One-year validity', 'Personal booking support'], bestFor: ['Regular salon visits', 'Treatment or colour upkeep', 'Families'], terms: ['Valid for one year from purchase.', 'Your salon confirms the plan, value and branch use before purchase.'], faqs: [{ q: 'How does Xing Membership work?', a: 'You choose a plan with the salon and use its value on eligible services during the year.' }, { q: 'Can membership be used for different services?', a: 'Ask your salon to confirm the eligible services and use conditions for your selected plan.' }],
  },
  {
    id: 'gift-cards', category: 'Celebrations & Value', title: 'Xing Gift Cards', kicker: 'Gift a Xing experience', value: 'A thoughtful gift for hair, skin or nail care', description: 'Choose a value, add a personal message and give friends or family the freedom to choose a Xing experience they will love.', image: photo('gift-cards-offer', 'Xing Gift Cards for hair, skin and nail care'), duration: 'Redeem when convenient', includes: ['A chosen value', 'Personal message', 'Use toward salon services', 'Booking support'], bestFor: ['Birthdays', 'Anniversaries', 'Thank-you gifts'], terms: ['Redeemable on salon services.', 'Your salon confirms current bonus value and redemption details.'], faqs: [{ q: 'How do I buy a gift card?', a: 'Message or visit your preferred Xing salon to choose the value and personal message.' }, { q: 'What can a gift card be used for?', a: 'Your salon confirms the eligible hair, skin and nail services when it is purchased or redeemed.' }],
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
