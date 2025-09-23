import Image from "next/image";
import mist_forest_img from "@/public/images/mist_forest2.png";
import lone_tree_img from "@/public/images/lone_tree.png";
import { LandingPageSectionsBgAnimation } from "@/components/gsapanimations/LandingPageBgAnimations";

export default function LandingPageSections({
  className = "",
  children
}) {
  const landing_page_sections_id = "landing_page_sections_id"
  const landing_page_bg_container_id = "landing_page_bg_container_id"
  const lone_tree_img_id = "lone_tree_img_id"
  const mist_forest_img_id = "mist_forest_img_id"

  return <>
    <main
      className={className + " " +
        "min-h-dvh relative overflow-hidden *:h-dvh"
      }
      id={landing_page_sections_id}
    >
      <div
        className="h-dvh w-screen absolute -z-1"
        id={landing_page_bg_container_id}
      >
        <Image
          id={mist_forest_img_id}
          src={mist_forest_img}
          alt="Forest Background"
          fill
          className="object-cover h-dvh w-screen scale-125"
        ></Image>
        <Image
          src={lone_tree_img}
          alt="Lone Tree"
          className="object-fill h-dvh max-w-none w-screen translate-x-[40%]"
          id={lone_tree_img_id}
        ></Image>
      </div>
      {children}
    </main>

    <LandingPageSectionsBgAnimation
      landing_page_sections_id = {landing_page_sections_id}
      landing_page_bg_container_id = {landing_page_bg_container_id}
      lone_tree_img_id = {lone_tree_img_id}
      mist_forest_img_id = {mist_forest_img_id}
    />
  </>
}
