import Image from "next/image";
import mist_forest_img from "@/public/images/mist_forest1.png";
import ArtGalleryPhotos from "@/components/ui/ArtGalleryPhotos";
import { getGalleryPictures } from "@/lib/cmsdata";


export default async function ArtGallery() {
  const pictures = await getGalleryPictures();

  return <main className="pt-[5rem] pb-[5rem] relative min-h-[100vh]">
    <Image
      src={mist_forest_img}
      alt=""
      fill
      sizes="100vw"
      className="object-cover -z-1"
    />
    <h2 className="text-center text-primary mb-[1rem]">
      Art Gallery
    </h2>
    {
      pictures.length == 0
      ? <p className="text-center my-[2rem] font-medium">
          No Art for now :(
        </p>
      : <ArtGalleryPhotos pictures={pictures}/>
    }
  </main>;
}