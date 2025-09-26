import Image from "next/image";
import mist_forest_img from "@/public/images/mist_forest1.png";
import { client } from "@/sanity/lib/client";
import MeetupPost from "@/components/ui/MeetupPost";

const MEETUP_QUERY = `
*[_type == "meetup"] | order(date desc){
  _id,
  meetupname,
  description,
  date,
  "image_urls": photos[].asset->url,
}`

export default async function Meetup() {
  const meetups = await client.fetch(MEETUP_QUERY, {}) || []

  return <main className="pt-[5rem] pb-[5rem] relative min-h-[100vh]">
    <Image
      src={mist_forest_img}
      alt=""
      fill
      className="object-cover -z-1"
    />
    <h2 className="text-center text-primary mb-[1rem]">
      Our Past Meetups
    </h2>
    {meetups.map(m => <MeetupPost key={m._id} meetup={m}/>)}
  </main>;
}
