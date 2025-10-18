"use client"

import saranda_logo from "@/public/images/saranda_logo.png";
import Image from "next/image";
import SocialLinks from "./SocialLinks";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect } from "react";
import { twJoin } from "tailwind-merge";
import Nav from "./Nav";


export default function Header({
  navbarOptions={navbarOptions},
  className = "",
  navClassName = ""
}) {
  const [sidebarOpend, setSidebarOpened] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [positionType, setPositionType] = useState("absolute");
  const [lastScrollY, setLastScrollY] = useState(0);

  const closeSidebar = () => setSidebarOpened(false);
  const openSidebar = () => setSidebarOpened(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    setPositionType("fixed")

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setPositionType("absolute");
    }
  }, [lastScrollY]);

  return <>
    <header
      className={twJoin(
        `grid md:grid-cols-[1fr_8fr_1fr] grid-cols-[1fr_1fr] items-center
        px-[2rem] md:px-[1rem] py-[0.5rem] text-primary z-500 w-full
        backdrop-blur-3xl bg-neutral-light/20 transition-transform
        duration-300`,
        showHeader ? "translate-y-0" : "-translate-y-full",
        positionType,
        className
      )}
    >
      <Link href="/" className="md:justify-self-end">
        <Image
          src={saranda_logo}
          alt="saranda"
          width={48}
          height={48}
          sizes="(max-width: 768px) 20vw, (max-width: 1024px) 10vw, 5vw"
          className="drop-shadow-sm drop-shadow-primary"
        />
      </Link>
      <Nav
        className={twJoin("max-md:hidden", navClassName)}
        onClick={closeSidebar}
        navbarOptions={navbarOptions}
      />
      <SocialLinks className="max-md:hidden md:justify-self-start" />
      <GiHamburgerMenu
        size={24}
        className="justify-self-end md:hidden active:text-secondary"
        onClick={openSidebar}
      />
    </header>

    <div
      className={twJoin(
        `fixed inset-0 right-2/3 z-1000 transition-opacity duration-300
        md:hidden`,
        sidebarOpend
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
      onClick={closeSidebar}
    ></div>
    <header className={twJoin(
      `fixed inset-0 left-1/3 bg-neutral-dark-glass backdrop-blur-xl z-1000
      md:hidden px-[3rem] py-[3rem] text-neutral-light transition-transform
      duration-300 ease-in-out overflow-y-scroll`,
      sidebarOpend ? "translate-x-0" : "translate-x-full"
    )}>
      <div className="flex justify-end">
        <RxCross2
          size={48}
          onClick={closeSidebar}
          className="active:text-secondary"
        />
      </div>
      <Nav
        className={navClassName}
        onClick={closeSidebar}
        navbarOptions={navbarOptions}
      />
      <SocialLinks onClick={closeSidebar} />
    </header>
  </>;
}