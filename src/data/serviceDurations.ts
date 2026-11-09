/**
 * Owner-approved appointment guidance. Keep this separate from price and availability: duration is surfaced on
 * every matching service page and can be updated without touching presentation code.
 */
export const serviceDurations: Record<string, string> = {
  'womens-haircut-styling': '45–60 minutes',
  'mens-haircut-beard-grooming': '30–45 minutes',
  'kids-haircut': '20–40 minutes',
  'blow-drying-styling': 'About 30 minutes',

  balayage: '2–3 hours',
  highlights: '2–3 hours',
  'global-hair-color': '1–2 hours',

  'keratin-treatment': '2–3 hours',
  'hair-smoothening': '2–3 hours',
  nanoplastia: '2–3 hours',
  'olaplex-bond-repair': '60 minutes',

  'hydra-facial': '60–90 minutes',
  'facial-cleanup': '45–90 minutes',
  'ultra-premium-facial': '45–90 minutes',
  'premium-facial': '45–90 minutes',
  'express-facial': '45–90 minutes',
  waxing: '45–90 minutes',
  'threading-detan': '45–90 minutes',
  'de-tan': '45–90 minutes',
  'body-polish': '2–3 hours',
  'arms-legs-body-polish': '2–3 hours',

  manicure: '45–90 minutes',
  pedicure: '45–90 minutes',
  'alga-mani-pedi': '45–90 minutes',
  'crystal-mani-pedi': '45–90 minutes',

  'nail-extensions': '60–120 minutes',
  'temporary-nail-extensions': '60–120 minutes',
  'hard-gel-extensions': '60–120 minutes',
  'extension-removal': '60–120 minutes',
  'uv-builder-overlay': '60–120 minutes',
  'hard-gel-overlay': '60–120 minutes',
  'nail-refilling': '60–120 minutes',
  'poly-gel-overlay': '60–120 minutes',
  'nail-art': '60–120 minutes',
  'cat-eye-nail-art': '60–120 minutes',
  'marble-nail-art': '60–120 minutes',
  'french-nail-art': '60–120 minutes',

  'anti-dandruff-hair-spa': '60 minutes',
  'anti-hairfall-hair-spa': '60 minutes',
  'moroccan-hair-spa': '60 minutes',
  'tribond-hair-spa': '60 minutes',
};
