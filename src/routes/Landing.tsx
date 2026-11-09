import { BranchesSection } from '../components/BranchesSection';
import { FromOurBlog } from '../components/blog/FromOurBlog';
import { CtaBand } from '../components/Footer';
import { Hero } from '../components/Hero';
import { HomepageOffers } from '../components/HomepageOffers';
import { MembershipBanner } from '../components/MembershipBanner';
import { Reels } from '../components/Reels';
import { Reviews } from '../components/Reviews';
import { Services } from '../components/Services';
import { SignatureColor } from '../components/SignatureColor';

/** The landing page's sections. Loaded only on the home page, so other pages don't download them. */
export default function Landing() {
  return (
    <>
      <Hero />
      <Services />
      <BranchesSection id="branches" tone="blush" />
      <HomepageOffers />
      <Reels />
      <SignatureColor />
      <Reviews />
      <FromOurBlog />
      <MembershipBanner />
      <CtaBand />
    </>
  );
}
