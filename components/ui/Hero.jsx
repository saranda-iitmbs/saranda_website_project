import Image from "next/image";
import lush_forest_back_img from "@/public/images/lush-forest-back.png";
import lush_forest_front_img from "@/public/images/lush-forest-front.png";
import HeroAnimation from "../gsapanimations/HeroAnimation";
import { twJoin } from "tailwind-merge";


export default function Hero({className, ...props}) {
  const hero_section_id = "hero"
  const lush_forest_back_id = "lush_forest_back_id"
  const the_saranda_text_id = "the_sranda_text_id"

  return <>
    <main
      id={hero_section_id}
      className={twJoin(
        `h-[100vh] overflow-y-hidden relative`,
        className
      )}
      {...props}
    >
      <Image
        id={lush_forest_back_id}
        src={lush_forest_back_img}
        alt="Landing Page Background"
        fill
        sizes="100vw"
        placeholder="blur"
        className="-z-1 object-cover"
      />
      <div
        id={the_saranda_text_id}
        className="
          text-center h-full flex flex-col justify-center translate-y-[-15%]
          text-primary uppercase
        "
      >
        <h1 className="mb-[-0.4ch]">Saranda</h1>
        <p className="text-base lg:text-xl font-bold">
          THE HOUSE OF EXCELLENCE AND INNOVATION
        </p>
      </div>
      <Image
        src={lush_forest_front_img}
        alt="Landing Page Foreground"
        fill
        sizes="100vw"
        priority
        placeholder="blur"
        className="object-cover"
      />
    </main>

    <HeroAnimation
      hero_section_id = {hero_section_id}
      lush_forest_back_id = {lush_forest_back_id}
      the_saranda_text_id = {the_saranda_text_id}
    />
  </>
}