// The offer pages, served as supplied (content/offer-pages/<slug>.html): their own HTML, CSS and scripts. One page per
// offer for all three salons; the visitor picks a salon when they tap WhatsApp, Call or Book (salon-picker.js).
// The old per-salon pages (/hsrhaircoloroffers and the rest) redirect here (src/data/services.ts → redirects).

export type OfferPageId = 'hair-colour' | 'hair-treatment' | 'skin-care';

export const offerPagePaths: Record<OfferPageId, string> = {
  'hair-colour': '/hair-colour-offers',
  'hair-treatment': '/hair-treatment-offers',
  'skin-care': '/skin-care-offers',
};

/** Every copied page, once. */
export const staticPages = Object.values(offerPagePaths);
