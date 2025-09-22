import LandingPageSections from "@/components/ui/LandingPageSections";
import AboutSection from "@/components/ui/AboutSection";
import Hero from "@/components/ui/Hero";
import FeaturedSection from "@/components/ui/FeaturedSection";
import CommunitiesSection from "@/components/ui/CommunitiesSection";

export default function Home() {
  return <>
    <Hero />
    <LandingPageSections>
      <AboutSection />
      <FeaturedSection/>
      <CommunitiesSection/>
    </LandingPageSections>
  </>
}
