import FAQ from "./FAQ";
import Features from "./Feature";
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
