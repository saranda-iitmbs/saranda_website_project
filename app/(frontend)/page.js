import LandingPageSections from "@/components/ui/home/LandingPageSections";
import AboutSection from "@/components/ui/home/AboutSection";
import Hero from "@/components/ui/home/Hero";
import FeaturedSection from "@/components/ui/home/FeaturedSection";
import CommunitiesSection from "@/components/ui/home/CommunitiesSection";

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
