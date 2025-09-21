import LandingPageSections from "@/components/ui/LandingPageSections";
import AboutSection from "@/components/ui/AboutSection";
import Hero from "@/components/ui/Hero";
import FeaturedSection from "@/components/ui/FeaturedSection";

export default function Home() {
  return <>
    <Hero />
    <LandingPageSections>
      <AboutSection />
      <FeaturedSection/>
      <div className="communities-section"></div>
    </LandingPageSections>
  </>
}
