import FAQ from "./FAQ";
import Features from "./Feature";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import Testimonials from "./Testimonials";
export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <Features/>
      <Testimonials/>
      <FAQ/>
      {/* Later you can add Features section here */}
    </div>
  );
}
