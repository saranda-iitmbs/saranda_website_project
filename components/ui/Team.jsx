import Image from "next/image"
import { twJoin } from "tailwind-merge"


export default function Team({team, className="", ...props}) {
  return <div
  className={twJoin(
      `w-9/10 max-w-[120ch] mx-auto green-glass-container p-[1rem] *:px-[1rem]
      mb-[2rem] overflow-clip grid lg:grid-cols-[40ch_1fr]
      max-lg:grid-flow-row`,
      className
    )}
    {...props}
  >
    <h3 className="
      sticky h-fit lg:top-[1rem] top-0 max-lg:m-[-1rem] max-lg:mb-0
      max-lg:pt-[1rem] max-lg:bg-neutral-dark/60 z-2
    ">{team.name}</h3>
    <div className="
      max-lg:border-t-2 lg:border-l-1 border-neutral-light grid gap-[1rem]
      max-lg:py-[1rem] grid-cols-[repeat(auto-fill,minmax(10rem,1fr))]
    ">
      {team.members?.map(mem => <Member member={mem} key={mem._key}/>)}
    </div>
  </div>
}


async function Member({member, className="", ...props}) {
  return <div
    className={twJoin(
      `grid grid-rows-[12rem_auto] rounded-lg overflow-clip text-center
      text-primary p-[0.5rem] bg-[oklch(0.9831_0.0172_99.59)] border-y-2
      border-t-[oklch(0.9911_0_99.59)]
      border-b-[oklch(0.5356_0.0172_99.59)]`,
      className
    )}
    {...props}
  >
    <div className="relative">
      <Image
        {...member.img}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 30vw, 20vw"
        className="object-cover rounded-lg"
      />
    </div>
    <div>
      <p className="font-bold mb-[-0.5ch]">{member.fullname}</p>
      <p>[{member.position || ""}]</p>
    </div>
  </div>
}