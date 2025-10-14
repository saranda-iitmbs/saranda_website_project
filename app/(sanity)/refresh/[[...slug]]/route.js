import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { getAllTagsAndRoutes } from "@/lib/sanityqueries";


export async function GET(req, { params }) {
  const { slug } = await params;
  const path = "/" + (slug?.join("/") ?? "");

  return redirect(`/refresh/dashboard?next=${path}`);
}


export async function POST(req, { params }) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const body = await req.json();

  if (secret !== process.env.REVALIDATION_KEY) {
    return new Response("Unauthorized", { status: 401 });
  }

  const {alltags, allroutes} = getAllTagsAndRoutes(body._type);
  alltags.forEach(tag => revalidateTag(tag));
  allroutes.forEach(route => revalidatePath(route));

  console.info("Revalidated Tags: ", alltags);
  console.info("Revalidated Paths: ", allroutes);

  return new Response("Success", { status: 200 });
}