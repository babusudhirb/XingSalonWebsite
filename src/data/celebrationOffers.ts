/** Birthday and anniversary promotion page, including the terms supplied by the salon. */
export const celebrationOffersPath = '/birthday-anniversary-offers';

export const celebrationOffers = [
  {
    id: 'birthday',
    eyebrow: 'Birthday offer',
    title: 'Happy Birthday!',
    image: '/images/birthday-offer.png',
    alt: 'Birthday cake with balloons beside Xing Birthday offer details',
    validity: 'Valid within 7 days of your birthday.',
    conditions: 'Mon–Thu only · Show ID at salon · Advance booking preferred',
  },
  {
    id: 'anniversary',
    eyebrow: 'Anniversary offer',
    title: 'Happy Anniversary!',
    image: '/images/anniversary-offer.png',
    alt: 'Couple enjoying a salon pedicure beside Xing Anniversary offer details',
    validity: 'Valid within 7 days of your anniversary.',
    conditions: 'Mon–Thu only · Mention at booking · Advance booking required',
  },
] as const;
