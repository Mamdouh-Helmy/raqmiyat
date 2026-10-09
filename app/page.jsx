//app/page.js
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SecurityBanner from "@/components/SecurityBanner";
import InnovationCarousel from "@/components/InnovationCarousel";
import ServicesGrid from "@/components/ServicesGrid";
import StatsSection from "@/components/StatsSection";
import ProcessSteps from "@/components/ProcessSteps";
import TrustedBy from "@/components/TrustedBy";
import WhyDifferent from "@/components/WhyDifferent";
import Testimonial from "@/components/Testimonial";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function Home() {
  return (
    <main className="bg-paper">
      <Navbar />
      <Hero />
      <SecurityBanner />
      <InnovationCarousel />
      <ServicesGrid />
      <StatsSection />
      <ProcessSteps />
      <TrustedBy />
      <WhyDifferent />
      <Testimonial />
      <CTASection />
      <ContactSection />
      <Footer />
    </main>
  );
}
