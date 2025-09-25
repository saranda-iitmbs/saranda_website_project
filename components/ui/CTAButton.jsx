import Link from "next/link"

export default function CTAButton({href="#", children}) {
  return <Link href={href} className="
    bg-neutral-light text-primary rounded-lg px-[0.5rem] py-[0.4rem]
    hover:bg-secondary active:bg-secondary
  ">
    <button>{children}</button>
  </Link>
}