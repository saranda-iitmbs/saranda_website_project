import { revalidatePath, revalidateTag } from "next/cache";
import { tags as taggroups } from "./cmsdata";

const tagkeys = Object.keys(taggroups);
const tags = Object.values(taggroups).flat();

export default function revalidate(entity = null, type=null) {
  if (!entity) {
      tags.forEach(tag => revalidateTag(tag));
      tagkeys.forEach(key => revalidatePath(taggroups[key][0]));
      return 0;
  }

  const revalidateSingle = e => {
    if (type !== "group" && (type === "tag" || tags.indexOf(e) !== -1)) {
      revalidateTag(e);
      for (const group in taggroups) {
        if (taggroups[group].indexOf(e) === -1) continue;
        revalidatePath(taggroups[group][0]);
      }
    }
    else if (type === "group" || tagkeys.indexOf(e) !== -1) 
      taggroups[e].forEach(tag => revalidateTag(tag));
  }

  if (typeof entity === "string")
    revalidateSingle(entity);
  else if (Array.isArray(entity))
    entity.forEach(e => revalidateSingle(e));
}