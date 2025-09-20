import Link from "next/link";
import footer_links from "./footer_links.json";
import SocialLinks from "./SocialLinks";

import Image from "next/image";
import saranda_logo from "@/public/images/saranda_logo.png";
import iitm_logo from "@/public/images/iitm_logo.png";

export default function Footer() {
  const icons_size = 26
  const logo_size = 64

  return <>
    <footer
      className="
        py-[2.25rem] px-[2rem] bg-neutral-dark text-neutral-light
      "
    >
      <div className="
        flex max-w-[120ch] m-auto justify-between flex-wrap [&_a]:block
        [&_h3]:sm:mb-[1rem] [&_ul]:mb-[2rem] gap-[2rem]
      ">
        <div>
          <h3>Contacts</h3>
          <ul> {footer_links["Contacts"].map(
            e => <li key={e["url"]}><Link href={e["url"]}>
              {e["text"]}
            </Link></li>
          )} </ul>
          <SocialLinks icons_size={icons_size}/>
          <TheLogos logo_size={logo_size}/>
        </div>
        <div>
          <h3>Quick Links</h3>
          <ul> {footer_links["Quick Links"].map(
            e => <li key={e["url"]}><Link href={e["url"]}>
              {e["text"]}
            </Link></li>
          )} </ul>
        </div>
        <div>
          <h3>Other Useful Links</h3>
          <ul> {footer_links["Other Useful Links"].map(
            e => <li key={e["url"]}><Link href={e["url"]}>
              {e["text"]}
            </Link></li>
          )} </ul>
        </div>
      </div>
    </footer>
  </>
}

function TheLogos({
  logo_size = 48
}) {
  return <div className="flex flex-row flex-wrap gap-[1ch] mb-[2rem]">
    <Link href="#">
      <Image src={saranda_logo} alt="Saranda Logo" width={logo_size}/>
    </Link>
    <Link href="https://study.iitm.ac.in/" target="blank">
      <Image src={iitm_logo} alt="IITM Logo" width={logo_size}/>
    </Link>
  </div>
}
