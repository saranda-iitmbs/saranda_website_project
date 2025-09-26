import Link from "next/link";
import footer_links from "./footer_links.json";
import SocialLinks from "./SocialLinks";
import Image from "next/image";
import saranda_logo from "@/public/images/saranda_logo.png";
import iitm_logo from "@/public/images/iitm_logo.png";
import { client } from "@/sanity/lib/client";

const EXTRA_LINKS_QUERY = `
*[_type == "extra_footer_links" && link_group_name == $groupname]{
  "links": links[]{text,url}
}.links[]`

export default async function Footer() {
  const icons_size = 26
  const logo_size = 64

  const extra_contact_links = await client.fetch(EXTRA_LINKS_QUERY, {
    "groupname": "contacts",
  }) || []
  const extra_quick_links = await client.fetch(EXTRA_LINKS_QUERY, {
    "groupname": "quick_links",
  }) || []
  const extra_useful_links = await client.fetch(EXTRA_LINKS_QUERY, {
    "groupname": "other_useful_links",
  }) || []

  const all_contact_links =
    footer_links["Contacts"].concat(extra_contact_links)
  const all_quick_links =
    footer_links["Quick Links"].concat(extra_quick_links)
  const all_useful_links =
    footer_links["Other Useful Links"].concat(extra_useful_links)

  return <>
    <footer
      className="
        pt-[2.25rem] px-[2rem] bg-neutral-dark text-neutral-light
      "
    >
      <div className="
        flex max-w-[120ch] m-auto justify-between flex-wrap [&_a]:block
        [&_h3]:sm:mb-[1rem] [&_ul]:mb-[2rem] gap-[2rem]
      ">
        <div>
          <h3>Contacts</h3>
          <ul> {all_contact_links.map(
            (e,index) => <li key={index}><Link href={e["url"]} target="blank">
              {e["text"]}
            </Link></li>
          )} </ul>
          <SocialLinks
            icons_size={icons_size}
            className="flex-wrap mb-[1.5rem]"
          />
          <TheLogos logo_size={logo_size}/>
        </div>
        <div>
          <h3>Quick Links</h3>
          <ul> {all_quick_links.map(
            (e,index) => <li key={index}><Link href={e["url"]}>
              {e["text"]}
            </Link></li>
          )} </ul>
        </div>
        <div>
          <h3>Other Useful Links</h3>
          <ul> {all_useful_links.map(
            (e,index) => <li key={index}><Link href={e["url"]} target="blank">
              {e["text"]}
            </Link></li>
          )} </ul>
        </div>
      </div>
      <p className="text-center mt-[1rem] mx-[-1rem] text-sm">
        &copy; 2025 Saranda WebOps Team &middot; MIT Licensed
      </p>
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
