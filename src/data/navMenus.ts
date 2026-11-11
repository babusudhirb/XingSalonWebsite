// The Offers, Gifts and Salons menus, for the desktop header and the mobile drawer.
import { locations, salonsPath } from './branches';
import type { Img } from './content';
import { celebrationOffersPath } from './celebrationOffers';
import { membershipPath } from './membershipLinks';
import type { BranchId } from './offers';
import { salonOfferPages, type OfferPageId } from './staticOfferPages';


export interface NavMenuItem {
  label: string;
  note?: string;
  href: string;
  highlight?: boolean;
  /** A small tag beside the label. */
  pill?: string;
  /** A rule above this item. */
  divider?: boolean;
  /** Smaller links under the item, e.g. a salon's three offer pages. */
  links?: { label: string; href: string }[];
}

export interface NavMenu {
  title: string;
  items: NavMenuItem[];
  /** A last link under the items, e.g. "Compare all salons". */
  viewAll?: { label: string; href: string };
  /** The big card at the top of the drawer's panel. */
  feature?: { image: Img; title: string; button: string; href: string };
}

const GIFT_ITEMS: NavMenuItem[] = [
  { label: 'Birthday & Anniversary Offers', href: celebrationOffersPath, divider: true },
  { label: 'Membership Offers', href: `${membershipPath}#membership` },
  { label: 'Gift Cards', href: `${membershipPath}#gift-cards` },
];

const OFFER_LINKS: { id: OfferPageId; label: string }[] = [
  { id: 'hair-colour', label: 'Hair Colour' },
  { id: 'hair-treatment', label: 'Hair Treatment' },
  { id: 'skin-care', label: 'Skin Care' },
];

/** Visitors choose the offer family first, then their location. These legacy destinations stay intact for campaigns and ads. */
export const offersMenu = (): NavMenu => ({
  title: 'Offers',
  items: [
    ...OFFER_LINKS.map((offer) => ({
      label: offer.label,
      href: salonOfferPages['hsr-layout'][offer.id],
      links: locations.map((salon) => ({
        label: `Xing ${salon.name}`,
        href: salon.id === 'brookfield' ? 'https://xingsalon.com/' : salonOfferPages[salon.id as BranchId][offer.id],
      })),
    })),
    ...GIFT_ITEMS,
  ],
});

export const salonsMenu: NavMenu = {
  title: 'Salons',
  items: locations.map((salon) => ({ label: `Xing ${salon.name}`, note: salon.area, href: salon.path })),
  viewAll: { label: 'Compare all salons', href: salonsPath },
};
