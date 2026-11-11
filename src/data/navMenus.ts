// The Offers, Gifts and Salons menus, for the desktop header and the mobile drawer.
import { locations, salonsPath } from './branches';
import type { Img } from './content';
import { individualOfferPath, individualOffers } from './individualOffers';


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

/** The menu is derived from the same catalogue as every offer card, so it cannot become stale. */
export const offersMenu = (): NavMenu => ({
  title: 'Offers',
  items: [...new Set(individualOffers.map((offer) => offer.category))].map((category, index) => {
    const offers = individualOffers.filter((offer) => offer.category === category);
    return { label: category, href: individualOfferPath(offers[0].id), divider: index > 0, links: offers.map((offer) => ({ label: offer.title, href: individualOfferPath(offer.id) })) };
  }),
  viewAll: { label: 'View all offers', href: '/offers' },
});

export const salonsMenu: NavMenu = {
  title: 'Salons',
  items: locations.map((salon) => ({ label: `Xing ${salon.name}`, note: salon.area, href: salon.path })),
  viewAll: { label: 'Compare all salons', href: salonsPath },
};
