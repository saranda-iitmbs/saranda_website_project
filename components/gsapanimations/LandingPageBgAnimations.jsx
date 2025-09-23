"use client"

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP,ScrollTrigger);

export function LandingPageSectionsBgAnimation({
  landing_page_sections_id = "landing_page_sections_id",
  landing_page_bg_container_id = "landing_page_bg_container_id",
  lone_tree_img_id = "lone_tree_img_id",
  mist_forest_img_id = "mist_forest_img_id",
}) {
  useGSAP(() => {
    const sections_ref = document.getElementById(landing_page_sections_id)
    const childCount = Math.max(sections_ref.children.length - 1, 1)

    ScrollTrigger.create({
      trigger: sections_ref,
      scrub: true,
      pin: "#" + landing_page_bg_container_id,
      end: `${100*(1-1/childCount).toFixed(4)}% 0%`,
    })

    gsap.timeline({
      scrollTrigger: {
        trigger: sections_ref,
        scrub: 1,
        start: `${100*(1/childCount).toFixed(4)}% 100%`,
        end: `${100*(1-1/childCount).toFixed(4)}% 0%`,
      }
    })
    .to("#" + lone_tree_img_id, {
      xPercent: -80,
    })
    .to("#" + lone_tree_img_id, {
      xPercent: -40,
    })

    gsap.timeline({
      scrollTrigger: {
        trigger: sections_ref,
        scrub: 1,
        start: `${100*(1/childCount).toFixed(4)}% 100%`,
        end: `${100*(1-1/childCount).toFixed(4)}% 0%`,
      }
    })
    .to("#" + mist_forest_img_id, {
      xPercent: -12,
    })
    .to("#" + mist_forest_img_id, {
      xPercent: -6,
    })
  })

  return null
}