import LandingPageSections from "@/components/ui/LandingPageSections";
import AboutSection from "@/components/ui/AboutSection";
import Hero from "@/components/ui/Hero";

export default function Home() {
  return <>
    <Hero />
    <LandingPageSections>
      <AboutSection />
      <div className="featured-section"></div>
      <div className="communities-section"></div>
    </LandingPageSections>
  </>
}
