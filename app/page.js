import LandingPageSections from "@/components/ui/LandingPageSections";
import AboutSection from "@/components/ui/AboutSection";

export default function Home() {
  return <>
    <div className="h-dvh" id="hero"></div>
    <LandingPageSections>
      <AboutSection />
      <div className="featured-section"></div>
      <div className="communities-section"></div>
    </LandingPageSections>
    <div className="h-dvh" id="someplaceholderfortesting"></div>
  </>
}
