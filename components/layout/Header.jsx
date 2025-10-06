"use client"

import saranda_logo from "@/public/images/saranda_logo.png";
import Image from "next/image";
import SocialLinks from "./SocialLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect } from "react";
import { twJoin } from "tailwind-merge";

import { RiHome9Fill } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdEmojiPeople } from "react-icons/md";
import { FaPaintBrush } from "react-icons/fa";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoMdMicrophone } from "react-icons/io";

const navbarOptions = [
  {
    href: "/",
    icon: <RiHome9Fill/>,
    text: "Home",
  },
  {
    href: "/know_us",
    icon: <FaPeopleGroup/>,
    text: "Know Us",
  },
  {
    href: "/events",
    icon: <IoMdMicrophone/>,
    text: "Events",
  },
  {
    href: "/meetups",
    icon: <MdEmojiPeople/>,
    text: "Meet Ups",
  },
  {
    href: "/art_gallery",
    icon: <FaPaintBrush/>,
    text: "Art Gallery",
  },
  {
    href: "/#communities_section_id",
    icon: <SiHomeassistantcommunitystore/>,
    text: "Communities",
    dropdown: [
      {href: "/community/culturals", text: "Culturals"},
      {href: "/community/esports", text: "eSports"},
    ]
  }
]


export default function Header({ className = "", navClassName = "" }) {
  const [sidebarOpend, setSidebarOpened] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return <>
    <header
      className={twJoin(
        `grid md:grid-cols-[1fr_7fr_1fr] grid-cols-[1fr_1fr] items-center
        px-[2rem] md:px-[1rem] py-[0.5rem] text-primary fixed
        z-500 w-full backdrop-blur-3xl bg-neutral-light/20 transition-transform
        duration-300`,
        showHeader ? "translate-y-0" : "-translate-y-full",
        className
      )}
    >
      <Link href="/" className="md:justify-self-end">
        <Image
          src={saranda_logo}
          alt="saranda"
          width={48}
          height={48}
          placeholder="blur"
          sizes="(max-width: 768px) 20vw, (max-width: 1024px) 10vw, 5vw"
          className="drop-shadow-sm drop-shadow-primary"
        />
      </Link>
      <Nav
        className="max-md:hidden"
        onClick={closeSidebar}
      />
      <SocialLinks className="max-md:hidden md:justify-self-start" />
      <GiHamburgerMenu
        size={24}
        className="justify-self-end md:hidden"
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
      duration-300 ease-in-out`,
      sidebarOpend ? "translate-x-0" : "translate-x-full"
    )}>
      <div className="flex justify-end">
        <RxCross2
          size={48}
          onClick={closeSidebar}
        />
      </div>
      <Nav onClick={closeSidebar} />
      <SocialLinks onClick={closeSidebar} />
    </header>
  </>;
}


function Nav({
  className,
  ...props
}) {
  return <nav
    className={twJoin(
      `text-center max-md:z-21`,
      className
    )}
    {...props}
  >
    {navbarOptions.map((o,i) => (
      !o.dropdown
      ?  <NavButton href={o.href} key={i} className="lg:mx-[1ch]">
            <span className="md:max-lg:hidden mr-[0.4ch]">{o.icon}</span>
            {o.text}
          </NavButton>
      : <DropDown
          href={o.href}
          subButtons={o.dropdown}
          key={i}
          className="lg:mx-[1ch]"
        >
          <span className="md:max-lg:hidden">{o.icon}</span>
          {o.text}
        </DropDown>
    ))}
  </nav>
}


function NavButton({
  children = "",
  href = "#",
  slidehorizontal = false,
  className = "",
  innerClassName = "",
  ...props
}) {
  const path = usePathname()

  return (
    <Link
      href={href}
      {...props}
      className={twJoin(
        `px-[0.5rem] py-[0.4rem] text-left md:text-center relative
        block md:inline md:mx-0 lg:mx-[0] border-primary`,
        `after:absolute after:left-0 after:bottom-0 after:bg-secondary
        after:-z-1 after:rounded-lg md:after:duration-200 active:after:top-0
        active:after:right-0 md:hover:after:top-0 md:hover:after:right-0
        hover:after:border-y-1 after:border-b-secondary-darker
        after:border-t-secondary-ligher`,
        (path == href) && "max-md:text-secondary",
        (path == href && !slidehorizontal) && "md:border-b-2",
        className,
        slidehorizontal
          ? "after:top-0 after:right-[100%]"
          : "after:top-[100%] after:right-0",
      )}
    >
      <button className={twJoin(
        `inline-flex gap-2 justify-stretch items-baseline md:gap-0`,
        innerClassName
      )}>
        {children}
      </button>
    </Link>
  )
}


function DropDown({
  children = "",
  href = "#",
  subButtons = [],
  className = "",
  innerClassName = "",
  ...props
}) {
  const path = usePathname()

  return (
    <div
      href={href}
      {...props}
      className={twJoin(
        `px-[0.5rem] py-[0.5rem] text-left md:text-center relative
        border-primary block md:inline hover:[&_.dropdown]:grid md:mx-0
        lg:mx-[0.4rem]`,
        className
      )}
    >
      <Link href={href}>
        <button className={twJoin(
          `inline-flex gap-2 justify-stretch items-baseline`,
          innerClassName
        )}>
          {children}
        </button>
      </Link>
      <nav className="
        md:absolute ml-[2rem] left-0 right-[-2rem] grid md:hidden grid-cols-1
        dropdown border-l-1 mb-[1rem] md:bg-neutral-light/60 z-1 rounded-r-lg
      ">
        {subButtons.map(d => (
          <NavButton
            slidehorizontal={true}
            href={d.href}
            key={d.href}
            className="text-left md:text-left"
          >
            {d.text}
          </NavButton>
        ))}
      </nav>
    </div>
  )
}