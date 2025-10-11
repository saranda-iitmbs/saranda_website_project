"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";


export default function Nav({
  className,
  navbarOptions = [],
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