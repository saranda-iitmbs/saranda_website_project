import UHC from "@/components/ui/UHC";
import mist_forest_img from "@/public/images/mist_forest1.png"
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import Team from "@/components/ui/Team";

const TEAM_QUERY = `
*[_type == "team" && teamname != "uhc"]{
  _id,
  "name": longname,
  "members": members[]{
    _key,
    fullname,
    email,
    position,
    "image_url": image.asset->url,
  }
}`


export default async function KnowUs() {
  const teams = await client.fetch(TEAM_QUERY, {}) || []

  return <main className="relative pb-[2rem]">
    <Image
      src={mist_forest_img}
      alt=""
      fill
      className="object-cover -z-1"
    />
    <UHC/>
    {teams.map(team => <Team team={team} key={team._id}/>)}
  </main>
}
