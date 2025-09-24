import Link from "next/link";
import social_links from "./social_links.json";

import { FaInstagramSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function SocialLinks({
  icons_size = 26,
  className = "",
  ...props
}) {
  return <div {...props} className={className + " " +
    "flex gap-[1ch]"
  }>
    <Link href={social_links["instagram"]} target="blank">
      <FaInstagramSquare size={icons_size}/>
    </Link>
    <Link href={social_links["whatsapp"]} target="blank">
      <FaWhatsappSquare size={icons_size}/>
    </Link>
    <Link href={social_links["linkedin"]} target="blank">
      <FaLinkedin size={icons_size}/>
    </Link>
    <Link href={social_links["youtube"]} target="blank">
      <FaYoutube size={icons_size}/>
    </Link>
  </div>
}