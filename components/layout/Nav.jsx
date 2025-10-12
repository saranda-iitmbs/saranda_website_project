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
          pseudoHref={o.pseudoHref}
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


const areSameBasePath = (path, href) => {
  let _path = path.replace(/\?.*/g);
  if (href === "/") return _path === "/";
  return _path.startsWith(href);
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
        `before:absolute before:left-0 before:bottom-0 before:bg-secondary
        before:-z-1 before:rounded-lg md:before:duration-200 active:before:top-0
        active:before:right-0 md:hover:before:top-0 md:hover:before:right-0
        hover:before:border-y-1 before:border-b-secondary-darker
        before:border-t-secondary-ligher`,
        (areSameBasePath(path, href)) && "max-md:text-secondary",
        (areSameBasePath(path, href) && !slidehorizontal) && "md:border-b-2",
        className,
        slidehorizontal
          ? "before:top-0 before:right-[100%]"
          : "before:top-[100%] before:right-0",
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
  pseudoHref = "#",
  slidehorizontal = false,
  subButtons = [],
  className = "",
  innerClassName = "",
  ...props
}) {
  const path = usePathname()

  return (
    <div
      {...props}
      className={twJoin(
        `md:py-[0.5rem] text-left md:text-center relative
        border-primary block md:inline hover:[&_.dropdown]:grid md:mx-0
        lg:mx-[0.4rem]`,
        className
      )}
    >
      <Link href={href}>
        <button className={twJoin(
          `px-[0.5rem] max-md:pt-[0.5rem] inline-flex gap-2 justify-stretch items-baseline relative`,
        `before:absolute before:left-0 before:bottom-0 before:bg-secondary
        before:-z-1 before:rounded-lg md:before:duration-200 active:before:top-0
        active:before:right-0 md:hover:before:top-0 md:hover:before:right-0
        hover:before:border-y-1 before:border-b-secondary-darker
        before:border-t-secondary-ligher`,
        (areSameBasePath(path, pseudoHref)) && "max-md:text-secondary",
        (areSameBasePath(path, pseudoHref) && !slidehorizontal)
          && "md:border-b-2",
        slidehorizontal
          ? "before:top-0 before:right-[100%]"
          : "before:top-[100%] before:right-0",
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