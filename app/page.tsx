import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MenuSection from "./components/MenuSection";
import { getPublicMenuItems } from "./lib/menu";
import WhyChooseUs from "./components/WhyChooseUs";
import GallerySection from "./components/GallerySection";
import TestimonialSection from "./components/TestimonialSection";
import LocationSection from "./components/LocationSection";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default async function Home() {
  const menuItems = await getPublicMenuItems();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MenuSection items={menuItems} />
        <WhyChooseUs />
        <GallerySection />
        <TestimonialSection />
        <LocationSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
