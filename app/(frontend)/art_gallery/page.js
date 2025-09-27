import Image from "next/image";
import mist_forest_img from "@/public/images/mist_forest1.png";
import { client } from "@/sanity/lib/client";
import ArtGalleryPhotos from "@/components/ui/ArtGalleryPhotos";

const GALLERY_QUERY = `
*[_type == "photoset" && setname == "art_gallery"][0]{
  "image_urls": images[].asset->url
}["image_urls"]`

export default async function ArtGallery() {
  const pictures = await client.fetch(
    GALLERY_QUERY,
    {},
    { next: {revalidate: 60} }
  ) || []

  return <main className="pt-[5rem] pb-[5rem] relative min-h-[100vh]">
    <Image
      src={mist_forest_img}
      alt=""
      fill
      className="object-cover -z-1"
    />
    <h2 className="text-center text-primary mb-[1rem]">
      Art Gallery
    </h2>
    <ArtGalleryPhotos pictures={pictures}/>
  </main>;
}