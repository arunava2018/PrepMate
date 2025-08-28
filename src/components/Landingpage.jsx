import FAQ from "./FAQ";
import Features from "./Feature";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <Features/>
      <FAQ/>
      {/* Later you can add Features section here */}
    </div>
  );
}
