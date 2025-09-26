"use client";

import { useState } from "react";
import PhotoOverlay from "./PhotoOverlay";

export default function({meetup}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return <>
    <div className="
      w-9/10 max-w-[120ch] mx-auto bg-neutral-dark-glass rounded-xl p-[1rem]
      text-neutral-light mb-[2rem] pb-[4rem]
    ">
      <h3 className="mb-[-0.2rem]">{meetup.meetupname}</h3>
      <p className="font-bold mb-[0.8rem]">Date: {meetup.date}</p>
      <p className="mb-[1.5rem] leading-5">{meetup.description}</p>
      <div className="lg:columns-4 md:columns-3 columns-2 gap-[0.5rem]">
        {
          meetup.image_urls &&
          meetup.image_urls.map((u,index) => <img
            onClick={e => setSelectedIndex(index)}
            src={u}
            alt=""
            key={u}
            className="
              my-[0.5rem] border-2 border-neutral-light hover:scale-110
              hover:z-2 duration-200 hover:shadow-lg shadow-black
              cursor-pointer
            "
          />)
        }
      </div>
    </div>

    <PhotoOverlay
      pictures={meetup.image_urls}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
    />
  </>
}