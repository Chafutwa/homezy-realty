import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/sections/Hero";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import HowItWorks from "@/components/sections/HowItWorks";
import CTA from "@/components/sections/CTA";
import HomePopup from "@/components/HomePopup";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <HomePopup />
      <Navigation />
      <Hero />
      <FeaturedProperties />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}