import UHC from "@/components/ui/know_us/UHC";
import mist_forest_img from "@/public/images/mist_forest1.png"
import Image from "next/image";
import Team from "@/components/ui/know_us/Team";
import { getNonUHCTeams } from "@/lib/cmsdata";


export default async function KnowUs() {
  const nonUHCTeams = await getNonUHCTeams();

  return <main className="relative pb-[2rem] min-h-[100vh]">
    <div className="absolute inset-0 -z-1">
      <Image
        src={mist_forest_img}
        alt=""
        sizes="100vw"
        placeholder="blur"
        className="object-cover sticky w-screen h-screen top-0"
      />
    </div>
    <UHC/>
    {nonUHCTeams.map(team => <Team team={team} key={team._id}/>)}
  </main>
}
