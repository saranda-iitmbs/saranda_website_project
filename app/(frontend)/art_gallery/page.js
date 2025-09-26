/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import mist_forest_img from "@/public/images/mist_forest1.png";
import { client } from "@/sanity/lib/client";

const GALLERY_QUERY = `
*[_type == "photoset" && setname == "art_gallery"][0]{
  "image_urls": images[].asset->url
}["image_urls"]`

export default async function ArtGallery() {
  const pictures = await client.fetch(GALLERY_QUERY, {}) || []

  return <main className="pt-[5rem] pb-[5rem] relative">
    <Image
      src={mist_forest_img}
      alt=""
      fill
      className="object-cover -z-1"
    />
    <h2 className="text-center text-primary mb-[1rem]">
      Art Gallery
    </h2>
    <div className="
      w-full md:w-9/10 max-w-[120ch] mx-auto p-[1rem] text-neutral-light
      mb-[2rem] pb-[4rem] lg:columns-4 md:columns-3 columns-2 gap-[0.5rem]
    ">
      {pictures.map(p => <img
        src={p}
        key={p}
        alt="photo"
        className="mb-[0.5rem] border-2 border-neutral-dark"/>)}
    </div>
  </main>;
}