import Image from "next/image";
import saranda_logo_mark_img from "@/public/images/saranda_logo_mark.svg"
import AboutSEctionAnimation from "../gsapanimations/AboutSectionAnimation";
import { twJoin } from "tailwind-merge";

export default function AboutSection({
  className = "",
  innerClassName = "",
  innerProps = {},
  ...props
}) {
  const about_section_id = "about_section_id"
  const about_section_inner_id = "about_section_inner_id"
  const about_content_container_id = "about_content_container_id"

  return <>
    <div
      id={about_section_id}
      className={twJoin(
        "grid justify-center items-center p-1",
        className
      )}
      {...props}
    >
      <div
        id={about_section_inner_id}
        className={twJoin(
          `green-glass-container lg:px-[5rem] lg:py-[4rem] md:px-[3rem]
          md:py-[2rem] px-[1rem] py-[2rem] grid grid-cols-1
          md:grid-cols-2 gap-[1rem] lg:gap-[3rem] max-w-[120ch] relative
          max-md:h-full overflow-clip max-md:items-start`,
          innerClassName
        )}
        style={{"direction": "rtl"}}
        {...innerProps}
      >
        <div
          id={about_content_container_id}
          className="grid gap-y-[0.8rem] lg:gap-y-[1.5rem] items-center p-1"
        >
          <h2 className="text-center self-end">About Us</h2>
          <p className="text-left self-start">
            Saranda, The House of Excellence and Innovation, is one of the 12
            student houses in the IIT Madras BS degree program. We cultivate a
            vibrant community by organizing regular meetups, hands-on
            workshops, tech showcases, eSports tournaments, and cultural
            festivals. Saranda brings together passionate learners to connect,
            innovate, and grow beyond boundaries.
          </p>
        </div>
        <Image
          src={saranda_logo_mark_img}
          alt="Saranda Logo"
          className="
            max-md:absolute max-md:bottom-0 max-md:-z-1 max-md:scale-90
          "
        />
      </div>
    </div>

    <AboutSEctionAnimation
      about_section_id = {about_section_id}
      about_section_inner_id = {about_section_inner_id}
      about_content_container_id = {about_content_container_id}
    />
  </>
}