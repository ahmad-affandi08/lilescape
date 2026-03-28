import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MenuSection from "./components/MenuSection";
import WhyChooseUs from "./components/WhyChooseUs";
import GallerySection from "./components/GallerySection";
import TestimonialSection from "./components/TestimonialSection";
import LocationSection from "./components/LocationSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <WhyChooseUs />
        <GallerySection />
        <TestimonialSection />
        <LocationSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
