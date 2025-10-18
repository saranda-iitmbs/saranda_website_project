"use client"

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP,ScrollTrigger);

export default function HeroAnimation({
  hero_section_id = "hero",
  lush_forest_back_id = "lush_forest_back_id",
  lush_forest_front_id = "lush_forest_front_id",
  the_saranda_text_id = "the_sranda_text_id",
}) {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#" + hero_section_id,
        scrub: .2,
        start: "bottom 100%",
      }
    });

    tl.to("#" + the_saranda_text_id, {
      yPercent: 30,
    }, 0);

    tl.to("#" + lush_forest_front_id, {
      yPercent: -15,
    }, 0);
  })

  return null
}