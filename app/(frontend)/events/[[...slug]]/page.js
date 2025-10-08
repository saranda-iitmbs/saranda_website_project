import Image from "next/image";
import mist_forest_img from "@/public/images/mist_forest2.png";
import EventPost from "@/components/ui/EventPost";
import CTAButton from "@/components/ui/CTAButton";
import { getEventPosts } from "@/lib/cmsdata";
import { redirect } from "next/navigation";


export default async function EventsPage({ params }) {
  const { slug } = await params;
  const subpath = "/" + (slug?.join("/") ?? "");
  if(!( subpath === "/" || subpath === "/past" )) redirect("/events");

  const isPast = subpath === "/past";
  const events = await getEventPosts(isPast);

  return <main className="pt-[5rem] pb-[5rem] relative min-h-[100vh]">
    <Image
      src={mist_forest_img}
      alt=""
      fill
      sizes="100vw"
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
    {(events.length == 0) && (
      <p className="text-center my-[2rem] font-medium">
        No events for now :(
      </p>
    )}
    {!isPast && <div className="w-9/10 max-w-[120ch] mx-auto mb-[2rem]">
      <CTAButton href="/events?past=true">Past Events &gt;</CTAButton>
    </div>}
  </main>;
}