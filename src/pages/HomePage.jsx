import "animate.css"; // Importing Animate.css
import HeroSection from "../components/HeroSection";
import FeaturedProductsCarousel from "../components/FeaturedProductsCarousel";
import SpecialOffers from "../components/SpecialOffers";
import TestimonialsSection from "../components/TestimonialsSection";
import NewsletterSignup from "../components/NewsletterSignup";
import TrustBadges from "../components/TrustBadges";

const Home = () => {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <FeaturedProductsCarousel />
      <SpecialOffers />
      <TestimonialsSection />
      <TrustBadges />
      <NewsletterSignup />
    </main>
  );
};

export default Home;
