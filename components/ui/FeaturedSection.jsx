import Image from "next/image";
import CTAButton from "./CTAButton";
import { twJoin } from "tailwind-merge";
import { getFeaturedPhotos } from "@/lib/cmsdata";


export default async function FeaturedSection({
  className = "",
  innerClassName = "",
  innerProps = {},
  ...props
}) {
  const img_urls = await getFeaturedPhotos();

  return <>
    <div
      id="featured_section_id"
      className={twJoin(
        `featured-section flex justify-center items-center relative`,
        className
      )}
      {...props}
    >
      <PhotoGrid
        img_urls={img_urls || []}
        className={innerClassName}
        {...innerProps}
      />
      <CTAContainer/>
    </div>
  </>
}


function PhotoGrid({img_urls, className="", ...props}) {
  let index = 0;
  img_urls.length = 7;

  // FIX THIS MESS
  // IMAGE OPTIMIZATION MISSING

  return <>
    <div
      className={twJoin(
        `h-full md:h-8/10 w-full md:w-8/10 xl:w-6/10 grid grid-cols-5
        grid-rows-4 gap-1 *:border-4 *:border-neutral-light *:hover:z-2
        [&_img]:object-cover *:z-1 md:*:hover:[scale:120%] *:duration-200
        **:rounded-xl mx-2`,
        className
      )}
      {...props}
    >
      <div className="
        landscape:[grid-area:1/1/3/3] landscape:hover:-translate-x-1/10
        landscape:hover:-translate-y-1/10 [grid-area:1/1/2/3] relative
      ">
        <Image src={img_urls[index++] || "https://placehold.co/10/gray/gray/png"} alt="Photo" fill/>
      </div>
      <div className="
        landscape:[grid-area:1/3/3/6] landscape:hover:translate-x-1/10
        landscape:hover:-translate-y-1/10 [grid-area:1/3/2/6] relative
      ">
        <Image src={img_urls[index++] || "https://placehold.co/10/gray/gray/png"} alt="Photo" fill/>
      </div>
      <div className="
        [grid-area:2/1/3/4] landscape:hidden relative
      ">
        <Image src={img_urls[index++] || "https://placehold.co/10/gray/gray/png"} alt="Photo" fill/>
      </div>
      <div className="
        [grid-area:2/4/3/6] landscape:hidden relative
      ">
        <Image src={img_urls[index++] || "https://placehold.co/10/gray/gray/png"} alt="Photo" fill/>
      </div>
      <div className="
        [grid-area:3/1/4/4] landscape:hover:translate-x-1/10
        landscape:hover:translate-y-1/10 landscape:hidden relative
      ">
        <Image src={img_urls[index++] || "https://placehold.co/10/gray/gray/png"} alt="Photo" fill/>
      </div>
      <div className="
        landscape:[grid-area:3/1/5/4] landscape:hover:-translate-x-1/10
        landscape:hover:translate-y-1/10 [grid-area:4/1/5/4] relative
      ">
        <Image src={img_urls[index++] || "https://placehold.co/10/gray/gray/png"} alt="Photo" fill/>
      </div>
      <div className="
        [grid-area:3/4/5/6] landscape:hover:translate-x-1/10
        landscape:hover:translate-y-1/10 relative
      ">
        <Image src={img_urls[index++] || "https://placehold.co/10/gray/gray/png"} alt="Photo" fill/>
      </div>
    </div>
  </>
}


function CTAContainer({className="", ...props}) {
  return <>
    <div
      className={twJoin(
        `absolute top-0 bottom-0 left-0 right-0 flex justify-center
        items-center`,
        className
      )}
      {...props}
    >
      <div className="
        h-50 w-50 xl:w-60 xl:h-60 green-glass-container rotate-45
        flex justify-center items-center z-10 lg:scale-110
      ">
        <div className="
          -rotate-45 w-9/10 h-1/2 text-center
          text-neutral-light flex flex-col justify-center items-center
        ">
          <p>Check out our</p>
          <div className="flex gap-[1ch] items-center text-nowrap">
            <CTAButton href="/events">Events</CTAButton>
            &
            <CTAButton href="/meetups">Meet Ups</CTAButton>
          </div>
        </div>
      </div>
    </div>
  </>
}