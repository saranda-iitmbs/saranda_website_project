import Image from "next/image"
import CTAButton from "./CTAButton"

export default function({event}) {
  return <div className="
    w-9/10 max-w-[120ch] mx-auto bg-neutral-dark-glass rounded-xl p-[1rem]
    text-neutral-light mb-[2rem] pb-[4rem] grid gap-[1rem]
    md:grid-cols-[18rem_1fr] grid-cols-1
  ">
    <div className="relative h-[24rem]">
      <Image
        src={event.poster_url || "https://placehold.co/400/gray/gray/png"}
        alt=""
        fill
        className="object-cover rounded-xl"
      />
    </div>
    <div>
      <h3 className="mb-[0.5rem]">{event.eventname}</h3>
      <p className="mb-[1rem]">{event.description}</p>
      {event.links && event.links.map(
        l => <CTAButton href={l.url} key={l._key}>{l.text}</CTAButton>
      )}
    </div>
  </div>
}