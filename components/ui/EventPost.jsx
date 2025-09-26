"use client";

import { useState } from "react";
import PhotoOverlay from "./PhotoOverlay";
import Image from "next/image"
import CTAButton from "./CTAButton"
import { PortableText } from "next-sanity"

export default function({event}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return <>
    <div className="
      w-9/10 max-w-[120ch] mx-auto bg-neutral-dark-glass rounded-xl p-[1rem]
      text-neutral-light mb-[2rem] pb-[4rem] grid gap-[1rem]
      md:grid-cols-[18rem_1fr] grid-cols-1
    ">
      <div className="
        relative h-[24rem] hover:mx-[-3rem] duration-200 hover:shadow-lg
        shadow-black
      ">
        <Image
          src={event.poster_url || "https://placehold.co/400/gray/gray/png"}
          alt=""
          fill
          className="object-cover rounded-xl cursor-pointer"
          onClick={e => setSelectedIndex(0)}
        />
      </div>
      <div>
        <h3 className="mb-[0.5rem]">{event.eventname}</h3>
        <div className="mb-[1rem] *:min-h-[1rem]">
          <PortableText value={event.description}/>
        </div>
        {event.links && event.links.map(
          l => <CTAButton href={l.url} key={l._key} target="blank">
            {l.text}
          </CTAButton>
        )}
      </div>
    </div>

    <PhotoOverlay
      pictures={[event.poster_url]}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
    />
  </>
}