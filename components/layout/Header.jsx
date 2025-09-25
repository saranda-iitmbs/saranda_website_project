"use client"

import saranda_logo from "@/public/images/saranda_logo.png";
import Image from "next/image";
import SocialLinks from "./SocialLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

import { RiHome9Fill } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdEmojiPeople } from "react-icons/md";
import { FaPaintBrush } from "react-icons/fa";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoMdMicrophone } from "react-icons/io";

export default function Header({className = ""}) {
  const [sidebarOpend, setSidebarOpened] = useState(false)

  const navbar = <nav className={`
    text-center max-md:z-21 md:[&_.icons]:hidden
    ${sidebarOpend ? "max-md:block": "max-md:hidden"}
  `} onClick={e => setSidebarOpened(false)}>
    <NavButton href="/">
      <RiHome9Fill className="icons"/> Home
    </NavButton>
    <NavButton href="/know_us">
      <FaPeopleGroup className="icons"/> Know Us
    </NavButton>
    <NavButton href="/events">
      <IoMdMicrophone className="icons"/> Events
    </NavButton>
    <NavButton href="/meetups">
      <MdEmojiPeople className="icons"/> Meet Ups
    </NavButton>
    <NavButton href="/art_gallery">
      <FaPaintBrush className="icons"/> Art Gallery
    </NavButton>
    <DropDown
      href="/#communities_section_id"
      subButtons={[
        {href: "/community/culturals", children: "Culturals"},
        {href: "/community/esports", children: "eSports"},
      ]}
    ><SiHomeassistantcommunitystore className="icons"/>Communities</DropDown>
  </nav>

  return <>
    <header className={className + `
      grid md:grid-cols-[1fr_7fr_1fr] grid-cols-[1fr_1fr]
      items-center px-[2rem] md:px-[1rem] py-[0.5rem] text-primary absolute
      z-10 w-full
    `}>
      <Link href="/" className="md:justify-self-end">
        <Image
          src={saranda_logo}
          alt="saranda"
          width={48}
          height={48}
        />
      </Link>
      {navbar}
      <SocialLinks className="max-md:hidden md:justify-self-start"/>
      <GiHamburgerMenu
        size={24}
        className="justify-self-end md:hidden"
        onClick={e => setSidebarOpened(true)}
      />
    </header>
    {
      sidebarOpend &&
      <header className={`
        fixed top-0 left-0 right-0 bottom-0 bg-neutral-dark z-20 md:hidden
        px-[3rem] py-[3rem] text-neutral-light
      `}>
        <div className="
          flex justify-end
        ">
          <RxCross2
            size={48}
            onClick={e => setSidebarOpened(false)}
          />
        </div>
        {navbar}
        <SocialLinks onClick={e => setSidebarOpened(false)}/>
      </header>
    }
  </>
}

function NavButton({
  children = "",
  href = "#",
  slidehorizontal = false,
  ...props
}) {
  const path = usePathname()

  return (
    <Link href={href} {...props} className={`
      px-[0.5rem] py-[0.4rem] text-left md:text-center relative
      md:hover:[&_.bghighlight]:top-0 md:hover:[&_.bghighlight]:right-0
      active:[&_.bghighlight]:top-0 active:[&_.bghighlight]:right-0
      block md:inline md:mx-0 lg:mx-[0.4rem] border-primary
    ` + ((path == href) ? " max-md:text-secondary" : "")
      + ((path == href && !slidehorizontal) ? " md:border-b-2" : "")}>
      <div className={`
        absolute left-0 bottom-0 bg-secondary -z-1
        rounded-lg bghighlight md:duration-200
      ` + (slidehorizontal ? "top-0 right-[100%]" : "top-[100%] right-0")
      }></div>
      <button className="inline-flex gap-2">{children}</button>
    </Link>
  )
}

function DropDown({
  children = "",
  href = "#",
  subButtons = [],
  ...props
}) {
  const path = usePathname()

  return (
    <div href={href} {...props} className={`
      px-[0.5rem] py-[0.5rem] text-left md:text-center relative
      border-primary block md:inline hover:[&_.dropdown]:grid md:mx-0
      lg:mx-[0.4rem]
    ` + (path == href ? " border-b-2" : "")}>
      <Link href={href}>
        <button className="inline-flex gap-2">{children}</button>
      </Link>
      <nav className="
        md:absolute ml-[2rem] left-0 right-[-2rem] grid md:hidden grid-cols-1
        dropdown border-l-1 mb-[1rem]
      ">
        {subButtons.map(d => <NavButton
          slidehorizontal={true}
          href={d.href}
          key={d.href}
          >
            {d.children}
          </NavButton>
        )}
      </nav>
    </div>
  )
}