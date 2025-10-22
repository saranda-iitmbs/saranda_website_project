import ArtGalleryPhotos from "@/components/ui/art_gallery/ArtGalleryPhotos";
import { getGalleryPictures } from "@/lib/cmsdata";
import ArtGalleryClient from "@/components/ui/art_gallery/ArtGalleryClient";

export default async function ArtGallery() {
  const pictures = await getGalleryPictures();
  
  return (
    <main
      className="
    pt-[5rem] pb-[5rem] relative min-h-[100vh] bg-[#dbdbdb]
  "
    >
      <h2 className="text-center text-primary mb-[1rem]">Art Gallery</h2>
      <ArtGalleryClient />
      {pictures.length == 0 ? (
        <p className="text-center my-[2rem] font-medium">No Art for now :(</p>
      ) : (
        <ArtGalleryPhotos pictures={pictures} />
      )}
    </main>
  );
}