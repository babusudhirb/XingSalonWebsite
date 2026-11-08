// The three offers each salon has (hair colour, hair treatment, skin care), as the offer cards, the popup and
// llms.txt show them: a name, the prices from the salon's posters and a photo. Each links to that salon's own offer
// page (src/data/staticOfferPages.ts).
import type { Img } from './content';
import { formatPrice, type BranchId } from './offers';
import { salonOfferPages, type OfferPageId } from './staticOfferPages';

export type { OfferPageId };

export interface OfferPage {
  id: OfferPageId;
  name: string;
  offers: Array<{ name: string; price: number; unit?: string; was?: number; image: Img; kicker: string; description: string }>;
  image: Img;
}

const photo = (id: string, alt: string): Img => ({
  src: `/images/offers/${id}-800.webp`,
  srcSet: `/images/offers/${id}-480.webp 480w, /images/offers/${id}-800.webp 800w`,
  avifSrcSet: `/images/offers/${id}-480.avif 480w, /images/offers/${id}-800.avif 800w`,
  width: 800,
  height: 1000,
  alt,
});

export const offerPages: OfferPage[] = [
  {
    id: 'hair-colour',
    name: 'Hair Colour Offers',
    offers: [
      { name: 'Global Hair Colour', price: 3999, was: 5999, image: photo('global-hair-colour', 'Global hair colour offer at Xing Salon'), kicker: 'An all-over refresh', description: 'A rich, even shade from root to tip for a complete colour refresh.' },
      { name: 'Highlights', price: 399, unit: 'per streak', was: 499, image: photo('highlights', 'Hair highlights offer at Xing Salon'), kicker: 'Light & dimension', description: 'Add contrast and dimension with placement tailored to your hair.' },
      { name: 'Balayage', price: 5499, was: 7999, image: photo('balayage', 'Balayage hair colour offer at Xing Salon'), kicker: 'Softly blended colour', description: 'A dimensional, hand-painted look shaped around your inspiration.' },
      { name: 'Crazy Fashion Colour', price: 499, unit: 'per streak', was: 799, image: photo('fashion-colour', 'Crazy fashion hair colour offer at Xing Salon'), kicker: 'Make it your statement', description: 'Explore a bolder shade and make it entirely your own.' },
    ],
    image: photo('global-hair-colour', 'Hair colour offers at Xing Premium Unisex Salon, Bangalore'),
  },
  {
    id: 'hair-treatment',
    name: 'Hair Treatment Offers',
    offers: [
      { name: 'Keratin', price: 4999, was: 7999, image: photo('keratin', 'Hair keratin treatment offer at Xing Salon'), kicker: 'Smooth. Strong. Polished.', description: 'A smoothing treatment for sleeker, more manageable hair.' },
      { name: 'Nanoplastia', price: 5999, image: photo('nanoplastia', 'Hair nanoplastia treatment offer at Xing Salon'), kicker: 'Sleeker. Smoother. Stronger.', description: 'A smoother, shinier finish planned for your hair type and goals.' },
      { name: 'Olaplex Bond Repair', price: 2999, was: 3999, image: photo('olaplex', 'Olaplex bond repair treatment offer at Xing Salon'), kicker: 'Stronger. Healthier. Shinier.', description: 'Bond-repair care that helps improve strength, softness and elasticity.' },
      { name: 'Anti-Dandruff Scalp Treatment', price: 1999, was: 2999, image: photo('anti-dandruff', 'Anti-dandruff scalp treatment offer at Xing Salon'), kicker: 'Cleanse. Soothe. Revive.', description: 'Targeted scalp care to help remove dandruff and restore balance.' },
    ],
    image: photo('keratin', 'Hair treatment offers at Xing Premium Unisex Salon, Bangalore'),
  },
  {
    id: 'skin-care',
    name: 'Skin Care Offers',
    offers: [
      { name: 'Hydra Facial', price: 3499, was: 5499, image: photo('hydra-facial', 'Hydra facial offer at Xing Salon'), kicker: 'Deep cleanse. Hydrate. Radiate.', description: 'A six-step facial focused on deep cleansing, hydration and fresh glow.' },
      { name: 'Body Polish', price: 4999, was: 7999, image: photo('body-polish', 'Body polish offer at Xing Salon'), kicker: 'Smooth. Radiant. Refreshing.', description: 'A full-body polishing ritual for exfoliation and refreshed-looking skin.' },
      { name: 'Hair Spa 2+1', price: 1999, image: photo('hair-spa', 'Hair spa offer at Xing Salon'), kicker: 'Relax. Repair. Rejuvenate.', description: 'Nourishing care to condition, strengthen and restore softness.' },
      { name: 'Anti-Aging Facial', price: 2499, image: photo('express-facial', 'Anti-aging facial offer at Xing Salon'), kicker: 'Nourish. Smooth. Refresh.', description: 'A targeted facial for nourishment and a visibly refreshed finish.' },
    ],
    image: photo('hydra-facial', 'Skin care offers at Xing Premium Unisex Salon, Bangalore'),
  },
];

export const offerPage = (id: OfferPageId) => offerPages.find((page) => page.id === id)!;

/** Where an offer lives for a salon: its own offer page. */
export const offerPath = (id: OfferPageId, salon: BranchId) => salonOfferPages[salon][id];

/** The lowest price on the page: "from ₹399 per streak". */
export const fromLabel = (page: OfferPage) => {
  const lowest = page.offers.reduce((low, offer) => (offer.price < low.price ? offer : low));
  return `from ${formatPrice(lowest.price)}${lowest.unit ? ` ${lowest.unit}` : ''}`;
};

/** The biggest saving on the page, if it shows any: "Save up to ₹3,000". */
export const saveLabel = (page: OfferPage) => {
  const most = Math.max(0, ...page.offers.map((offer) => (offer.was ? offer.was - offer.price : 0)));
  return most ? `Save up to ${formatPrice(most)}` : '';
};

/** The offer page that fits a service page, if one does: colour services, hair treatments, facials and body polish. */
const BY_SERVICE: Record<string, OfferPageId> = {
  'global-hair-color': 'hair-colour',
  highlights: 'hair-colour',
  balayage: 'hair-colour',
  'fashion-color': 'hair-colour',
  'keratin-treatment': 'hair-treatment',
  'hair-smoothening': 'hair-treatment',
  'hair-straightening': 'hair-treatment',
  nanoplastia: 'hair-treatment',
  cysteine: 'hair-treatment',
  'hair-spa': 'skin-care',
  'hydra-facial': 'skin-care',
  'facial-cleanup': 'skin-care',
  'body-polish': 'skin-care',
};
export const offerPageForService = (slug: string): OfferPageId | undefined => BY_SERVICE[slug];
