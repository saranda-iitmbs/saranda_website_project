import UHC from "@/components/ui/UHC";
import mist_forest_img from "@/public/images/mist_forest1.png"
import Image from "next/image";
import Team from "@/components/ui/Team";
import { getNonUHCTeams } from "@/lib/cmsdata";


export default async function KnowUs() {
  const nonUHCTeams = await getNonUHCTeams();

  return <main className="relative pb-[2rem] min-h-[100vh]">
    <Image
      src={mist_forest_img}
      alt=""
      fill
      sizes="100vw"
      className="object-cover -z-1"
    />
    <UHC/>
    {nonUHCTeams.map(team => <Team team={team} key={team._id}/>)}
  </main>
}
