import { bodyPolish } from './body-polish';
import { threadingDetan } from './threading-detan';
import { waxing } from './waxing';
import { facialCleanup } from './facial-cleanup';
import { nanoplastia } from './nanoplastia';
import { balayage, fashionColor, globalHairColor, highlights } from './hair-color';
import { hydraFacial } from './hydra-facial';
import { kidsHaircut } from './kids-haircut';
import { nailCuttingFiling, nailPolish, quickNailCare } from './nail-care';
import { acrylicGelPolish, catEyeNailArt, chromeNailArt, extensionRemoval, frenchNailArt, hardGelExtensions, hardGelOverlay, marbleNailArt, nailRefilling, polyGelOverlay, temporaryNailExtensions, uvBuilderOverlay } from './nailAddons';
import { mensHaircutBeardGrooming } from './mens-haircut-beard-grooming';
import { hairSmoothening, keratinTreatment } from './smoothing';
import type { ServicePageContent } from './types';
import { womensHaircutStyling } from './womens-haircut-styling';
import { algaManiPedi, armsLegsBodyPolish, crystalManiPedi, deTan, deluxeManiPedi, expressFacial, heelPeelTreatment, premiumFacial, ultraPremiumFacial } from './skinBodyAddons';
import {
  antiDandruffHairSpa,
  antiHairfallHairSpa,
  blowDryingStyling,
  moroccanHairSpa,
  olaplexBondRepair,
  tribondHairSpa,
} from './hairCareAddons';

/** Published service pages, keyed by slug. A service without an entry here has no page yet. */
export const servicePages: Record<string, ServicePageContent> = Object.fromEntries(
  [
    mensHaircutBeardGrooming,
    womensHaircutStyling,
    kidsHaircut,
    blowDryingStyling,
    globalHairColor,
    highlights,
    balayage,
    fashionColor,
    keratinTreatment,
    hairSmoothening,
    olaplexBondRepair,
    antiDandruffHairSpa,
    antiHairfallHairSpa,
    moroccanHairSpa,
    tribondHairSpa,
    nanoplastia,
    hydraFacial,
    facialCleanup,
    deTan,
    ultraPremiumFacial,
    premiumFacial,
    expressFacial,
    bodyPolish,
    armsLegsBodyPolish,
    waxing,
    threadingDetan,
    deluxeManiPedi,
    heelPeelTreatment,
    algaManiPedi,
    crystalManiPedi,
    acrylicGelPolish,
    chromeNailArt,
    temporaryNailExtensions,
    hardGelExtensions,
    extensionRemoval,
    uvBuilderOverlay,
    hardGelOverlay,
    nailRefilling,
    polyGelOverlay,
    catEyeNailArt,
    marbleNailArt,
    frenchNailArt,
    nailCuttingFiling,
    nailPolish,
    quickNailCare,
  ].map((page) => [page.slug, page]),
);

export type { ServicePageContent } from './types';
