"use client";

import { useState } from "react";
import PhotoOverlay from "./PhotoOverlay";

export default function ArtGalleryPhotos({ pictures }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return <>
    <div className="
      w-full md:w-9/10 max-w-[120ch] mx-auto p-[1rem] text-neutral-light
      mb-[2rem] pb-[4rem] lg:columns-4 md:columns-3 columns-2 gap-[0.5rem]
    ">
      {pictures.map((p, index) => (
        <img src={p}
          key={p}
          alt="photo"
          onClick={e => setSelectedIndex(index)}
          className="
            mb-[0.5rem] border-2 border-neutral-dark cursor-pointer
            hover:scale-110 hover:z-2 duration-200 hover:shadow-lg
            shadow-black
          "
        />
      ))}
    </div>

    <PhotoOverlay
      pictures={pictures}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
    />
  </>
}
