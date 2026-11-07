// The offer URLs existed before the React site. Keep their exact spellings (including the historic
// "sarjapaura") so Google, GMB and existing campaign links keep working, but render them through
// the shared responsive offer experience.
import type { BranchId } from './offers';

export type OfferPageId = 'hair-colour' | 'hair-treatment' | 'skin-care';

const HSR: Record<OfferPageId, string> = {
  'hair-colour': '/hsrhaircoloroffers',
  'hair-treatment': '/hsrhairtreatmentoffers',
  'skin-care': '/hsrskincareoffers',
};

/** Each salon's three offer pages. Brookfield has none of its own yet: it uses HSR Layout's (valid at all salons). */
export const salonOfferPages: Record<BranchId, Record<OfferPageId, string>> = {
  'sarjapur-road': {
    'hair-colour': '/sarjapaurahaircoloroffers',
    'hair-treatment': '/sarjapurahairtreatmentoffers',
    'skin-care': '/sarjapuraskincareoffers',
  },
  'hsr-layout': HSR,
  // OWNER: add Brookfield's own offer pages; until then it shows HSR Layout's.
  brookfield: HSR,
};

/** Every copied page, once. */
export const staticPages = [...new Set(Object.values(salonOfferPages).flatMap((pages) => Object.values(pages)))];

export interface LegacyOfferRoute {
  path: string;
  salonId: BranchId;
  offerId: OfferPageId;
}

/** Details for a legacy URL, used by the shared React offer page. */
export const legacyOfferRoutes: LegacyOfferRoute[] = (Object.entries(salonOfferPages) as Array<[BranchId, Record<OfferPageId, string>]>).flatMap(
  ([salonId, pages]) => Object.entries(pages).map(([offerId, path]) => ({ path, salonId, offerId: offerId as OfferPageId })),
).filter((route, index, all) => all.findIndex((candidate) => candidate.path === route.path) === index);

export const legacyOfferByPath = Object.fromEntries(legacyOfferRoutes.map((route) => [route.path, route])) as Record<string, LegacyOfferRoute>;
