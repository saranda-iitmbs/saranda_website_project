import Image from "next/image";
import Link from "next/link";
import { twJoin } from "tailwind-merge";
import { getUHCTeam } from "@/lib/cmsdata";


export default async function UHC({
  className = "",
  ...props
}) {
  const team = await getUHCTeam();

  return <main
    className={twJoin(
      `flex flex-col justify-center items-center h-[150dvh] md:h-dvh`,
      className
    )}
    {...props}
  >
    <h2 className="text-primary mb-[2rem]">{team.name}</h2>
    <div className="
      h-4/5 md:h-3/5 w-4/5 max-w-[120ch] flex text-neutral-light flex-col
      md:flex-row
    ">
      {team?.members?.map(d => <Member member={d} key={d._key}/>)}
    </div>
  </main>
}


async function Member({ member, className="", ...props }) {
  return <div
    className={twJoin(
      `relative flex-1 hover:flex-2 duration-200 -skew-x-6 *:skew-x-6
      max-md:skew-0 max-md:*:skew-0 max-md:odd:translate-x-5
      max-md:even:-translate-x-5 overflow-clip flex flex-col justify-end
      items-center hover:[&_.theemail]:h-[2rem]`
    )}
    {...props}
  >
    <Image
      {...member.img}
      alt="member photo"
      fill
      sizes="(max-width: 768px) 100vw, 34vw"
      className="object-cover -z-1 scale-120"
    />
    <div className="
      absolute top-1/2 -left-1/5 -right-1/5 bottom-0 bg-linear-to-b
      from-black/0 to-black/80
    "></div>
    <h3>{member.fullname}</h3>
    <h3>{member.position}</h3>
    {
      member.email &&
      <p className="h-0 theemail duration-200">
        <Link href={`mailto:${member.email}`} target="blank">
          {member.email}
        </Link>
      </p>
    }
  </div>
}