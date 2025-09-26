"use client";

import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";

export default function ArtGalleryPhotos({ pictures }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const nextImage = (n=1) => {
    const s = (selectedIndex+n) % pictures.length
    setSelectedIndex(s >= 0 ? s : pictures.length + s)
  }

  return <>
    <div className="
      w-full md:w-9/10 max-w-[120ch] mx-auto p-[1rem] text-neutral-light
      mb-[2rem] pb-[4rem] lg:columns-4 md:columns-3 columns-2 gap-[0.5rem]
    ">
      {pictures.map((p, index) => (
        <img src={p}
          key={p}
          alt="photo"
          onClick={() => setSelectedIndex(index)}
          className="
            mb-[0.5rem] border-2 border-neutral-dark cursor-pointer
            hover:scale-110 hover:z-2 duration-200 hover:shadow-lg
            shadow-black
          "
        />
      ))}
    </div>

    {
      selectedIndex >= 0 &&
      <div
        onClick={() => setSelectedIndex(-1)}
        className="
          fixed inset-0 bg-black/80 flex items-center justify-center z-50
          text-neutral-light gap-[1rem] px-[1rem] flex-col select-none
        "
      >
        <img
          src={pictures[selectedIndex]}
          alt="enlarged photo"
          className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-xl"
          onClick={(e) => e.stopPropagation()}
        />
        <div className="flex gap-[1rem] absolute bottom-4">
          <FaChevronCircleLeft
            onClick={e => {nextImage(-1); e.stopPropagation()}}
            className="cursor-pointer hover:text-secondary"
            size={48}
          />
          <FaChevronCircleRight
            onClick={e => {nextImage(1); e.stopPropagation()}}
            className="cursor-pointer hover:text-secondary"
            size={48}
          />
        </div>
        <RxCross2
          onClick={() => setSelectedIndex(-1)}
          className="
            absolute top-4 right-4 cursor-pointer hover:text-secondary
          "
          size={48}
        />
      </div>
    }
  </>
}
