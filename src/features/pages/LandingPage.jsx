import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import TrustStrip from "../components/landing/TrustStrip.jsx";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import ProductPreview from "../components/landing/ProductPreview";
import SecuritySection from "../components/landing/SecuritySection";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";

function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <TrustStrip />
      <Features />
      <HowItWorks />
      <ProductPreview />
      <SecuritySection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default LandingPage;
