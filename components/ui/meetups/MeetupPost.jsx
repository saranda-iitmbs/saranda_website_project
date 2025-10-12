"use client";

import { useState } from "react";
import PhotoOverlay from "@/components/ui/PhotoOverlay";
import { twJoin } from "tailwind-merge";
import Image from "next/image";


export default function({meetup, className="", children, ...props}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return <>
    <div
      className={twJoin(
        `w-9/10 max-w-[120ch] mx-auto p-[1rem] green-glass-container mb-[2rem]
        pb-[4rem]`, 
        className
      )}
      {...props}
    >
      <h3 className="mb-[-0.2rem]">{meetup.meetupname}</h3>
      <p className="font-bold mb-[0.8rem]">Date: {meetup.date}</p>
      <p className="mb-[1.5rem] leading-5">{meetup.description}</p>
      {children}
      <div className="lg:columns-4 md:columns-3 columns-2 gap-[0.5rem]">
        {meetup.img && meetup.img.map((img,index) => (
          <Image
            onClick={e => setSelectedIndex(index)}
            {...img}
            alt=""
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 30vw, 20vw"
            key={index}
            className={twJoin(
              "album-photo mb-[0.5rem] w-full",
              (meetup.img.length === 5 && (index === 2 || index == 3))
                && "lg:mb-[2rem]",
              (meetup.img.length === 4 && index == 2) && "md:max-lg:mb-[2rem]"
            )}
          />)
        )}
      </div>
    </div>

    <PhotoOverlay
      pictures={meetup.img}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
    />
  </>
}