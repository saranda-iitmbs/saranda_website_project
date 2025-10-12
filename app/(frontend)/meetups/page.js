import Image from "next/image";
import mist_forest_img from "@/public/images/mist_forest1.png";
import MeetupPost from "@/components/ui/meetups/MeetupPost";
import { getMeetupPosts } from "@/lib/cmsdata";


export default async function Meetup() {
  const meetups = await getMeetupPosts();

  return <main className="pt-[5rem] pb-[5rem] relative min-h-[100vh]">
    <div className="absolute inset-0 -z-1">
      <Image
        src={mist_forest_img}
        alt=""
        sizes="100vw"
        placeholder="blur"
        className="object-cover w-screen h-screen sticky top-0"
      />
    </div>
    <h2 className="text-center text-primary mb-[1rem]">
      Our Past Meetups
    </h2>
    {meetups.map(m => <MeetupPost key={m._id} meetup={m}/>)}
    {(meetups.length == 0) && (
      <p className="text-center font-medium my-[2rem]">
        No meetups for now :(
      </p>
    )}
  </main>;
}
