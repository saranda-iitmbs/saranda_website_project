import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

const UHC_QUERY = `
*[_type == "team" && teamname == "uhc"][0]{
  "name": longname,
  "members": members[]{
    _key,
    fullname,
    email,
    position,
    "image_url": image.asset->url,
  }
}`

export default async function UHC() {
  const team = await client.fetch(UHC_QUERY, {}) || []

  return <main className="
    flex flex-col justify-center items-center h-[150dvh] md:h-dvh
  ">
    <h2 className="text-primary mb-[2rem]">{team.name}</h2>
    <div className="
      h-4/5 md:h-3/5 w-4/5 max-w-[120ch] flex text-neutral-light flex-col
      md:flex-row
    ">
      {team?.members?.map(d => <Member member={d} key={d._key}/>)}
    </div>
  </main>
}

function Member({ member, ...props }) {
  return <div className="
    relative flex-1 hover:flex-2 duration-200 -skew-x-6 *:skew-x-6
    overflow-clip flex flex-col justify-end items-center
    hover:[&_.theemail]:h-[2rem]
  ">
    <Image
      src={member.image_url || "https:/placehold.co/400x400/gray/gray/png"}
      alt="member photo"
      fill
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