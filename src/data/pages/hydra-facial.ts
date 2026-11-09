import { serviceHero } from '../content';
import type { ServicePageContent } from './types';

export const hydraFacial: ServicePageContent = {
  slug: 'hydra-facial',
  layout: 'compact',
  order: ['intro', 'benefits', 'process', 'aftercare', 'offers', 'faq', 'related'],
  seo: {
    title: '7-Step Hydra Facial in Bangalore | Bestseller – Xing Salon',
    description:
      'Deep-cleansing, hydrating 7-step hydra facial for glowing skin at Xing Salon, Sarjapur Road, HSR Layout & Brookfield. Buy 3, get 1 free. Book now.',
    keyword: 'hydra facial Bangalore',
    serviceType: 'Hydra Facial',
    areaServed: ['Bengaluru', 'Sarjapur Road', 'HSR Layout', 'Brookfield'],
  },
  hero: {
    eyebrow: 'Skin Care · Bestseller',
    h1: '7-Step Hydra Facial in Bangalore for Instantly Glowing Skin',
    sub: 'Deep cleansing, gentle exfoliation and intense hydration in one relaxing session, for skin that looks fresh, plump and glowing from the very first visit.',
    cta: 'Book Hydra Facial on WhatsApp',
    chips: [
      { icon: 'star', label: 'Bestseller' },
      { icon: 'clock', label: '60–90 minute session' },
      { icon: 'offer', label: 'Offer available' },
    ],
    image: serviceHero('hydra-facial', 'Hydra facial treatment with a skin device for deep cleansing and hydration'),
  },
  whatsappText: 'Hi, I’d like to book the 7-Step Hydra Facial at Xing',
  whatsappSuffix: '. My skin concern is ___',
  intro: {
    eyebrow: 'Skin Care',
    title: 'The Most-Loved Facial in Sarjapur Road, HSR Layout & Brookfield',
    paragraphs: [
      'For skin that looks dull, congested or dehydrated, our 7-Step Hydra Facial combines deep cleansing, gentle exfoliation, pore care and hydration in one relaxing session. It is a strong choice before an event or as a regular skin reset; your therapist starts with a skin check and tailors the session to your needs.',
    ],
  },
  menu: {
    eyebrow: 'Signature Facial',
    title: 'What’s Included in the 7-Step Hydra Facial',
  },
  process: {
    title: 'What Happens in Your Hydra Facial',
    steps: [
      { title: 'Skin check & cleanse', text: 'We begin by understanding your skin and removing surface build-up.' },
      { title: 'Exfoliation & pore care', text: 'The treatment is tailored to help skin feel clearer and smoother.' },
      { title: 'Hydration & nourishment', text: 'Hydrating care supports a fresh, comfortable-looking glow.' },
      { title: 'Finish & aftercare', text: 'You leave with simple guidance for maintaining the result.' },
    ],
  },
  benefits: {
    title: 'Benefits of a Hydra Facial',
    items: [
      { icon: 'droplets', title: 'Deep hydration' },
      { icon: 'layers', title: 'Cleaner-looking pores' },
      { icon: 'sparkles', title: 'Fresh, radiant-looking skin' },
      { icon: 'calendar', title: 'An event-ready reset' },
    ],
  },
  audience: {
    title: 'Is the Hydra Facial Right for You?',
    items: [
      'Dull or tired-looking skin',
      'Dehydrated, tight skin',
      'Congested pores and blackheads',
      'Uneven-looking texture',
      'Preparing for a wedding, party or photoshoot',
      'Anyone wanting a regular skin reset',
    ],
    note: 'Have very sensitive skin, active breakouts, a skin condition, or recent cosmetic or skin procedures, or are you pregnant? Tell your therapist before your session.',
  },
  aftercare: {
    title: 'Aftercare Tips for Lasting Glow',
    tips: [
      'Wear sunscreen daily, especially after exfoliation.',
      'Skip scrubs, peels and strong actives for a few days.',
      'Keep skin moisturised and drink plenty of water.',
      'Book your next session in 3–4 weeks if you want to maintain the result.',
    ],
  },
  offerBand: {
    title: 'Hydra Facial Offers',
    text: 'Pick the offer that fits your visit. Your salon will confirm which one applies when you book.',
  },
  locationsTitle: 'Hydra Facial Near You in Bangalore',
  faqTitle: 'Hydra Facial FAQs',
  faqs: [
    {
      q: 'What is a 7-step hydra facial?',
      a: 'It’s a multi-step facial that cleanses, exfoliates, clears pores and deeply hydrates your skin in one session, giving a fresh, glowing look.',
    },
    {
      q: 'How often should I get a hydra facial?',
      a: 'For best results, we recommend at least 3 sessions every 3–4 weeks, then regular maintenance. That’s why we offer Buy 3, Get 1 Free.',
    },
    {
      q: 'Will I see results after one session?',
      a: 'Most people notice brighter, smoother, more hydrated-looking skin right after their first session. Results build with regular treatments.',
    },
    {
      q: 'Is there any downtime?',
      a: 'There’s typically little to no downtime, so most people can go about their day. Follow our aftercare tips for the best results.',
    },
    {
      q: 'Where can I get a hydra facial in Bangalore?',
      a: 'At Xing Premium Unisex Salon in Sarjapur Road, HSR Layout and Brookfield.',
    },
  ],
  related: {
    title: 'Complete Your Glow',
    items: [
      { slug: 'facial-cleanup', text: 'Clean-ups and classic facials for a regular skin-care routine.' },
      { slug: 'threading-detan', text: 'Eyebrow threading and tan removal for face, arms and legs.' },
      { slug: 'body-polish', text: 'Scrub and polish for smooth, soft skin.' },
      { slug: 'waxing', text: 'Flavored, cartridge and stripless wax for face and body.' },
    ],
  },
  cta: 'Ready for your glow-up? Book your 7-Step Hydra Facial at Xing today.',
};
