import { useCallback, useEffect, useState } from 'react';
import { Menu, Phone } from 'lucide-react';
import { bookingHref, bookingPath } from '../data/bookingLinks';
import { locations, salonsPath } from '../data/branches';
import { faqPath, nav, site } from '../data/content';
import { offersPath } from '../data/offers';
import { offersMenu, salonsMenu } from '../data/navMenus';
import { faqGroups } from '../data/faqPage';
import { servicesHubPath } from '../data/services';
import { useHistoryClose } from '../hooks/useHistoryClose';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { cn } from '../lib/cn';
import { blogRoute, currentPage, currentSalon, hasBlog, homeHref, isAbout, isCelebrationOffers, isFaq, isHome, isMembership, isOffers, isSalons, isStaticPage } from '../lib/route';
import { bookingWhatsappHref, PICK_CALL, whatsappLink } from '../lib/whatsapp';
import { Button } from './ui/Button';

/** The nav item that stays highlighted on the offers page. */
const OFFERS_ID = 'offers';

// A page about one place (the tattoo studio, or a salon) puts that place's phone and WhatsApp in the header.
const pageContact = () =>
  currentPage?.contact ??
  (currentSalon && {
    phone: currentSalon.phone,
    phoneHref: currentSalon.phoneHref,
    whatsappHref: whatsappLink(`Hi Xing ${currentSalon.name}! I’d like to book an appointment. Preferred day/time: `, currentSalon.whatsappHref),
  });
import { MobileMenu } from './nav/MobileMenu';
import { ServicesMegaMenu } from './nav/ServicesMegaMenu';
import { SectionMegaMenu, type MegaPanel } from './nav/SectionMegaMenu';
import { Logo, WhatsAppIcon } from './ui/Decor';
import { UtilityBar } from './UtilityBar';
import { Modal } from './ui/Modal';
import { categories as blogCategories, posts as blogPosts } from 'virtual:blog-index';

const NAV_IDS = nav.map((item) => item.id);
const GUIDES_ID = 'guides';
/** The "Blogs" item opens the blog once a post is live; before that it scrolls to the landing guides. */
const ABOUT_ID = 'about';
/** The "Salons" item: spied as the salons section on the home page, and a page of its own (/salons) as a link. */
const SALONS_ID = 'branches';
const FAQ_ID = 'faq';
// "Home" is the home page itself (/), never /#home: a hash link would land below the header.
const navHref = (id: string) =>
  id === 'home'
    ? '/'
    : id === ABOUT_ID
    ? '/about'
    : id === FAQ_ID
      ? faqPath
      : id === OFFERS_ID
        ? offersPath
      : id === GUIDES_ID && hasBlog
        ? '/blog'
        : id === SALONS_ID
          ? salonsPath
          : id === SERVICES_ID
            ? servicesHubPath
            : homeHref(`#${id}`);
const SHRINK_AFTER_PX = 24;
const HIDE_AFTER_PX = 200;
const SCROLL_JITTER_PX = 6;
const SERVICES_ID = 'services';

const NAV_LINK = 'relative whitespace-nowrap py-2 text-sm transition-colors hover:text-berry';
const UNDERLINE = <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-berry" />;

export function Header() {
  const contact = pageContact();
  const spied = useScrollSpy(NAV_IDS);
  // Service pages have no landing sections to spy on: they sit under Services.
  const active = isHome
    ? spied
    : blogRoute
      ? GUIDES_ID
      : isAbout
        ? ABOUT_ID
        : isFaq
          ? FAQ_ID
        : isOffers || isMembership || isCelebrationOffers || isStaticPage
          ? OFFERS_ID
            : isSalons || currentSalon
              ? SALONS_ID
              : SERVICES_ID;
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Where the visitor is in the drawer: [] the main list, ['services'], then ['services', <category>].
  const [menuPath, setMenuPath] = useState<string[]>([]);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  // Back goes up a level, then closes the drawer. A link tap closes it without stepping back, so the link isn't undone.
  const menuHistory = useHistoryClose(menuOpen, closeMenu, () => setMenuPath((path) => path.slice(0, -1)));
  const navigate = useCallback(() => {
    menuHistory.leaving();
    setMenuOpen(false);
  }, [menuHistory]);
  const openMenu = () => {
    setMenuPath([]);
    setMenuOpen(true);
  };

  const offerPanels: MegaPanel[] = offersMenu().items.map((group) => ({
    id: group.label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    label: group.label,
    title: group.label,
    description: 'Choose an offer, then select your preferred Xing salon when you book.',
    links: group.links ?? [{ label: group.label, href: group.href }],
  }));
  const salonPanels: MegaPanel[] = locations.map((salon) => ({
    id: salon.id,
    label: salon.name,
    title: `Xing ${salon.name}`,
    description: `${salon.area}. Explore services, directions, timings and local salon information.`,
    links: [
      { label: `Explore Xing ${salon.name}`, href: salon.path, note: salon.area },
      { label: 'Book an appointment', href: bookingHref('', salon.id), note: 'Choose your services and a time' },
    ],
  }));
  const blogPanels: MegaPanel[] = blogCategories.map((category) => ({
    id: category.slug,
    label: category.name,
    title: category.name,
    description: `${category.count} ${category.count === 1 ? 'article' : 'articles'} from the Xing team.`,
    links: blogPosts.filter((post) => post.categorySlug === category.slug).slice(0, 6).map((post) => ({ label: post.title, href: `/blog/${post.slug}`, note: `${post.readTime} min read` })),
  }));
  const faqPanels: MegaPanel[] = faqGroups().map((group) => ({
    id: group.id,
    label: group.label,
    title: group.title,
    description: 'Quick answers from Xing, with the full details available on the FAQ page.',
    links: group.blocks.flatMap((block) => block.items).slice(0, 6).map((item) => ({ label: item.q, href: item.href })),
  }));

  // Only one bar at the foot of the screen: the quick-actions bar steps aside while the drawer is open.
  useEffect(() => {
    if (!menuOpen) return;
    document.documentElement.dataset.sheetOpen = '';
    return () => {
      delete document.documentElement.dataset.sheetOpen;
    };
  }, [menuOpen]);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > SHRINK_AFTER_PX);
      // Small screens: slide away while reading down the page, come back on the first scroll up.
      if (Math.abs(y - lastY) > SCROLL_JITTER_PX) {
        setHidden(y > lastY && y > HIDE_AFTER_PX);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sticky rows (the service tabs) read this to move up into the space the header leaves.
  useEffect(() => {
    document.documentElement.classList.toggle('header-hidden', hidden);
  }, [hidden]);

  return (
    <>
      <UtilityBar hidden={scrolled} />
      <header
        className={cn(
          'safe-top fixed inset-x-0 top-0 z-40 transition-all duration-300 motion-reduce:transition-none',
          scrolled ? 'bg-cream/80 shadow-soft backdrop-blur-md' : 'bg-cream lg:top-8',
          hidden && !menuOpen && 'max-lg:-translate-y-full',
        )}
      >
        <div
          className={cn(
            'container-site flex h-header-sm items-center justify-between gap-4 transition-all duration-300',
            !scrolled && 'lg:h-header',
          )}
        >
          <Logo priority className={cn('origin-left transition-transform duration-300', scrolled && 'lg:scale-90')} />

          <nav aria-label="Primary" className="hidden h-full lg:block">
            <ul className="flex h-full items-center gap-6 xl:gap-8">
              {nav.map((item) => {
                const isActive = active === item.id;
                if (item.id === SERVICES_ID) return <ServicesMegaMenu key={item.id} label={item.label} isActive={isActive} underline={UNDERLINE} />;
                if (item.id === OFFERS_ID) return <SectionMegaMenu key={item.id} id="offers" label={item.label} isActive={isActive} underline={UNDERLINE} panels={offerPanels} viewAll={{ label: 'View All Offers', href: offersPath }} />;
                if (item.id === SALONS_ID) return <SectionMegaMenu key={item.id} id="salons" label={item.label} isActive={isActive} underline={UNDERLINE} panels={salonPanels} viewAll={{ label: 'Explore All Salons', href: salonsPath }} />;
                if (item.id === GUIDES_ID && hasBlog) return <SectionMegaMenu key={item.id} id="blogs" label={item.label} isActive={isActive} underline={UNDERLINE} panels={blogPanels} viewAll={{ label: 'Explore All Blogs', href: '/blog' }} />;
                if (item.id === FAQ_ID) return <SectionMegaMenu key={item.id} id="faq" label={item.label} isActive={isActive} underline={UNDERLINE} panels={faqPanels} viewAll={{ label: 'Explore All FAQs', href: faqPath }} />;
                return (
                  <li key={item.id}>
                    <a
                      href={navHref(item.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(NAV_LINK, isActive ? 'font-medium text-berry' : 'text-ink')}
                    >
                      {item.label}
                      {isActive && UNDERLINE}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1 md:gap-5">
            <a
              href={contact?.phoneHref ?? PICK_CALL}
              className="hidden min-h-11 items-center gap-2 text-sm font-medium text-ink hover:text-berry md:inline-flex lg:hidden xl:inline-flex"
            >
              <Phone aria-hidden className="size-4 text-berry" />
              {contact?.phone ?? 'Call Salon'}
            </a>
            <Button size="sm" href={bookingPath} className="hidden min-h-11 md:inline-flex">
              Book Appointment
            </Button>
            <a
              href={contact?.whatsappHref ?? bookingWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat with ${site.name} on WhatsApp`}
              className="grid size-11 place-items-center rounded-full text-berry hover:bg-blush md:hidden"
            >
              <WhatsAppIcon className="size-6" />
            </a>
            <button
              type="button"
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              onClick={openMenu}
              className="-mr-2 grid size-11 place-items-center rounded-md text-ink hover:text-berry lg:hidden"
            >
              <Menu aria-hidden className="size-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Outside <header>: its backdrop-filter would otherwise trap the fixed drawer. */}
      <Modal open={menuOpen} onClose={closeMenu} label="Site menu" layout="drawer">
        <MobileMenu
          items={nav.map((item) => ({ id: item.id, label: item.label, href: navHref(item.id), current: active === item.id }))}
          servicesId={SERVICES_ID}
          menus={{ [OFFERS_ID]: offersMenu(), [SALONS_ID]: salonsMenu }}
          path={menuPath}
          onEnter={(level) => {
            menuHistory.push();
            setMenuPath((path) => [...path, level]);
          }}
          onUp={menuHistory.back}
          onClose={closeMenu}
          onNavigate={navigate}
          whatsappHref={contact?.whatsappHref ?? bookingWhatsappHref}
          phoneHref={contact?.phoneHref ?? PICK_CALL}
        />
      </Modal>
    </>
  );
}
