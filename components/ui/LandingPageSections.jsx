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
        "min-h-[100vh] relative overflow-hidden *:h-[100vh]"
      }
      id={landing_page_sections_id}
    >
      <div
        className="h-[100vh] w-screen absolute -z-1"
        id={landing_page_bg_container_id}
      >
        <Image
          id={mist_forest_img_id}
          src={mist_forest_img}
          alt="Forest Background"
          fill
          className="object-cover h-[100vh] w-screen scale-125"
        ></Image>
        <Image
          src={lone_tree_img}
          alt="Lone Tree"
          className="object-fill h-[100vh] max-w-none w-screen translate-x-[40%]"
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
