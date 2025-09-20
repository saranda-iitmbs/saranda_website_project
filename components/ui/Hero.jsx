import Image from "next/image";
import lush_forest_back_img from "@/public/images/lush-forest-back.png";
import lush_forest_front_img from "@/public/images/lush-forest-front.png";
import HeroAnimation from "../gsapanimations/HeroAnimation";

export default function Hero() {
  const hero_section_id = "hero"
  const lush_forest_back_id = "lush_forest_back_id"
  const the_saranda_text_id = "the_sranda_text_id"

  return <>
    <div className="h-dvh overflow-y-hidden" id={hero_section_id}>
      <Image
        id={lush_forest_back_id}
        src={lush_forest_back_img}
        alt="Landing Page Background"
        fill
        className="-z-1 object-cover"
      />
      <div
        id={the_saranda_text_id}
        className="
          text-center h-full flex flex-col justify-center translate-y-[-15%]
          text-primary
        "
      >
        <h1 className="mb-[-0.4ch]">Saranda</h1>
        <p className="text-base lg:text-xl">
          THE HOUSE OF EXCELLENCE AND INNOVATION
        </p>
      </div>
      <Image
        src={lush_forest_front_img}
        alt="Landing Page Foreground"
        fill
        priority
        className="object-cover"
      />
    </div>

    <HeroAnimation
      hero_section_id = {hero_section_id}
      lush_forest_back_id = {lush_forest_back_id}
      the_saranda_text_id = {the_saranda_text_id}
    />
  </>
}