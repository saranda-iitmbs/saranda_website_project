"use client";

import { useState } from "react";
import PhotoOverlay from "../PhotoOverlay";
import { twJoin } from "tailwind-merge";
import Image from "next/image";


export default function ArtGalleryPhotos({
  pictures,
  className = "",
  children,
  ...props
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return <>
    {(pictures?.img?.length == 0) && (
      <p className="text-center my-[2rem] font-medium">
        No Art for now :(
      </p>
    )}

    <div
      className={twJoin(
        `w-full md:w-9/10 max-w-[80rem] mx-auto p-[1rem] text-neutral-light
        mb-[2rem] pb-[4rem] md:columns-3 columns-2 gap-[0.5rem] md:gap-[1rem]`,
        className
      )}
      {...props}
    >
      {children}
      {pictures.img.map((img, index) => (
        <div
          key={index}
          className="
            album-photo w-full mb-[0.5rem] md:border-[1rem] border-4
            [border-image:url(/images/photoframe.jpg)_64] md:mb-[1rem]
            shadow-[10px_5px_10px] shadow-black/40 relative
            after:absolute after:inset-0 after:inset-shadow-black/10
            after:inset-shadow-[8px_5px_10px] after:pointer-events-none
          "
        >
          <Image
            {...img}
            alt=""
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 30vw, 20vw"
            onClick={e => setSelectedIndex(index)}
            className=""
          />
        </div>
      ))}
    </div>

    <PhotoOverlay
      pictures={pictures.img}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
    />
  </>
}
