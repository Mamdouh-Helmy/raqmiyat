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
