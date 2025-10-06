import Image from "next/image";
import mist_forest_img from "@/public/images/mist_forest2.png";
import lone_tree_img from "@/public/images/lone_tree.png";
import { LandingPageSectionsBgAnimation } from "@/components/gsapanimations/LandingPageBgAnimations";
import { twJoin } from "tailwind-merge";

export default function LandingPageSections({
  className = "",
  children,
  ...props
}) {
  const landing_page_sections_id = "landing_page_sections_id"
  const landing_page_bg_container_id = "landing_page_bg_container_id"
  const lone_tree_img_id = "lone_tree_img_id"
  const mist_forest_img_id = "mist_forest_img_id"

  return <>
    <main
      className={twJoin(
        "min-h-[100vh] relative overflow-hidden *:h-[100vh]",
        className
      )}
      id={landing_page_sections_id}
      {...props}
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
          sizes="100vw"
          placeholder="blur"
          className="object-cover h-[100vh] w-screen scale-125"
        ></Image>
        <Image
          src={lone_tree_img}
          alt="Lone Tree"
          sizes="100vw"
          className="
            object-fill h-[100vh] max-w-none w-screen
          "
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
