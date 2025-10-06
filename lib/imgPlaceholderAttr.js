import { getPlaiceholder } from "plaiceholder";
import fallback_placeholder from "@/public/images/fallback_placeholder.jpg";

export default async function imgPlaceholderAttr(
  src,
  { dimensions=true, w=800 }
) {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  ).catch(async (error) => await fetch(fallback_placeholder.src).then(
    async (res) => Buffer.from(await res.arrayBuffer()))
  );

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  if(dimensions) {
    return {
      width: w,
      height: height * w / width,
      placeholder: "blur",
      blurDataURL: plaiceholder.base64,
    }
  }
  return {
    placeholder: "blur",
    blurDataURL: plaiceholder.base64,
  }
};