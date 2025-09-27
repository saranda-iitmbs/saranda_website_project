import Image from "next/image";
import mist_forest_img from "@/public/images/mist_forest2.png";
import { client } from "@/sanity/lib/client";
import EventPost from "@/components/ui/EventPost";
import CTAButton from "@/components/ui/CTAButton";

const CURRENT_EVENTS_QUERY = `
*[_type == "event" && enddate > now()] | order(enddate desc) {
  _id,
  eventname,
  description,
  "links": links[]{text,url,_key},
  "poster_url": poster.asset->url,
}`

const PAST_EVENTS_QUERY = `
*[_type == "event" && enddate <= now()] | order(enddate desc){
  _id,
  eventname,
  description,
  "links": links[]{text,url,_key},
  "poster_url": poster.asset->url,
  enddate
}`

export default async function EventsPage({searchParams}) {
  const isPast = ((await searchParams).past == "true") || false

  const events = await client.fetch(
    isPast ? PAST_EVENTS_QUERY : CURRENT_EVENTS_QUERY,
    {},
    { next: { revalidate: 60 } }
  ) || []

  return <main className="pt-[5rem] pb-[5rem] relative min-h-[100vh]">
    <Image
      src={mist_forest_img}
      alt=""
      fill
      className="object-cover -z-1"
    />
    <h2 className="text-center text-primary mb-[1rem]">
      {isPast ? "Past Events" : "Current Events"}
    </h2>
    {isPast && <div className="
      w-9/10 max-w-[120ch] mx-auto mb-[2rem] mt-[-1rem]
    ">
      <CTAButton href="/events">&lt; Back</CTAButton>
    </div>}
    {events.map(e => <EventPost event={e} key={e._id}/>)}
    {!isPast && <div className="w-9/10 max-w-[120ch] mx-auto mb-[2rem]">
      <CTAButton href="/events?past=true">Past Events &gt;</CTAButton>
    </div>}
  </main>;
}