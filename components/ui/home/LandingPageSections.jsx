import Image from "next/image";
import mist_forest_img from "@/public/images/mist_forest2.png";
import lone_tree_img from "@/public/images/lone_tree.png";
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
        "relative",
        className
      )}
      id={landing_page_sections_id}
      {...props}
    >
      <div
        className="absolute inset-0"
        id={landing_page_bg_container_id}
      >
        <Image
          id={mist_forest_img_id}
          src={mist_forest_img}
          alt=""
          sizes="100vw"
          placeholder="blur"
          className="object-cover w-screen h-screen sticky top-0"
        ></Image>
      </div>
      <div
        className="absolute inset-0 portrait:hidden"
      >
        <Image
          src={lone_tree_img}
          alt="Lone Tree"
          sizes="100vw"
          className="
            object-fill w-screen h-screen sticky top-0
          "
          id={lone_tree_img_id}
        ></Image>
      </div>
      {children}
    </main>
  </>
}
