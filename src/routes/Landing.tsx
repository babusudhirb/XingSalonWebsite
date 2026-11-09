import { BranchesSection } from '../components/BranchesSection';
import { FromOurBlog } from '../components/blog/FromOurBlog';
import { CtaBand } from '../components/Footer';
import { Hero } from '../components/Hero';
import { MembershipBanner } from '../components/MembershipBanner';
import { OfferPagesSection } from '../components/offers/OfferPageCards';
import { Reviews } from '../components/Reviews';
import { Services } from '../components/Services';
import { Transformations } from '../components/Transformations';

/** The landing page's sections. Loaded only on the home page, so other pages don't download them. */
export default function Landing() {
  return (
    <>
      <Hero />
      <Services />
      <BranchesSection id="branches" tone="blush" />
      <OfferPagesSection tone="white" />
      <Transformations />
      <Reviews />
      <FromOurBlog />
      <MembershipBanner />
      <CtaBand />
    </>
  );
}
