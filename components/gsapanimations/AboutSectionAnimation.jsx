"use client"

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP,ScrollTrigger);

export default function AboutSEctionAnimation({
  about_section_id = "about_section_id",
  about_section_inner_id = "about_section_inner_id",
  about_content_container_id = "about_content_container_id",
}) {
  useGSAP(() => {
    const st_vars = {
      trigger: "#" + about_section_id,
      scrub: 1,
      start: `top ${document.innerWidth >= document.innerHeight ? 40 : 80}%`,
      end: "top 15%",
    }

    gsap.from("#" + about_section_inner_id, {
      gap: "+=7rem",
      maxWidth: "+=40ch",
      scrollTrigger: Object(st_vars),
    })

    gsap.from("#" + about_content_container_id, {
      gap: "10rem 0rem",
      scrollTrigger: Object(st_vars),
    })
  })

  return null
}