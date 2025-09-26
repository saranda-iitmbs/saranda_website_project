import Link from "next/link"

export default function CTAButton({children, ...props}) {
  return <Link {...props} className="
    bg-neutral-light text-primary rounded-lg px-[0.5rem] py-[0.4rem]
    hover:bg-secondary active:bg-secondary border-1 border-primary
    mr-[1ch]
  ">
    <button>{children}</button>
  </Link>
}