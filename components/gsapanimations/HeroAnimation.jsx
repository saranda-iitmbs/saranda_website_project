"use client"

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP,ScrollTrigger);

export default function HeroAnimation({
  hero_section_id = "hero",
  lush_forest_back_id = "lush_forest_back_id",
  the_saranda_text_id = "the_sranda_text_id",
}) {
  useGSAP(() => {
    gsap.from("#" + the_saranda_text_id, {
      y: "+=100%",
      duration: 1,
      delay: 0.2,
      scale: 0.6,
      ease: "expo",
    })

    const st_vars = {
      trigger: "#" + hero_section_id,
      scrub: true,
      start: "bottom 100%",
    }

    gsap.to("#" + lush_forest_back_id, {
      yPercent: 15,
      scrollTrigger: Object(st_vars),
    })

    gsap.to("#" + the_saranda_text_id, {
      yPercent: 30,
      scrollTrigger: Object(st_vars),
    })
  })

  return null
}