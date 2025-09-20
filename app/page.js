import LandingPageSections from "@/components/ui/LandingPageSections";

export default function Home() {
  return <>
    <div className="h-dvh" id="hero"></div>
    <LandingPageSections>
      <div className="about-section"></div>
      <div className="featured-section"></div>
      <div className="communities-section"></div>
    </LandingPageSections>
    <div className="h-dvh" id="someplaceholderfortesting"></div>
  </>
}
