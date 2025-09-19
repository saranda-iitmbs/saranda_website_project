"use client"

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const twn = useRef(null)

  const handleClick = e => {
    const elem = e.target
    const index = Array.from(elem.parentNode.children).indexOf(elem)

    twn.current && twn.current.kill()
    twn.current = gsap.fromTo(".subjects", {
      scale: 1,
    }, {
      scale: 0,
      duration: 0.5,
      yoyo: true,
      repeat: 1,
      stagger: {
        amount: 0.8,
        from: index,
        grid: "auto",
      },
    })
  }

  const divlist = []
  for(let i=0; i<100; i++) {
    divlist.push(
      <div key={i}
        className="inline w-full h-full bg-green-300 subjects"
        onClick={handleClick}
      ></div>
    )
  }

  return <main
    className="grid grid-cols-10 h-[100dvh] w-[100dvw]"
  >
    {divlist}
  </main>
}
