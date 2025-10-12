import "./globals.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

import { RiHome9Fill } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdEmojiPeople } from "react-icons/md";
import { FaPaintBrush } from "react-icons/fa";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoMdMicrophone } from "react-icons/io";
import { getAllCommunities } from "@/lib/cmsdata";


export default async function RootLayout({ children }) {
  const communities = await getAllCommunities({});

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
      pseudoHref: "/community",
      icon: <SiHomeassistantcommunitystore/>,
      text: "Communities",
      dropdown: communities.map(c => ({
        href: `/community/${c.slug}`,
        text: c.slug,
      }))
    }
  ]

  return (
    <body className="bg-neutral-light">
      <Header navbarOptions={navbarOptions}/>
      {children}
      <Footer communities={communities}/>
    </body>
  );
}