import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import revalidate from "@/lib/revalidate";

export async function GET(req, { params }) {
  const cookieStore = await cookies();
  const revalidation_key = cookieStore.get("REVALIDATION_KEY")?.value;

  const { slug=[""] } = await params;
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.size > 0 ? "?" + searchParams : ""
  const path = "/" + slug.join("/")

  if (revalidation_key !== process.env.REVALIDATION_KEY) {
    return redirect("/refresh/dashboard?" + new URLSearchParams({
      onlyaskpassword: "yes",
      next: "/refresh" + path + search,
    }));
  }

  revalidatePath(path);
  revalidateTag(path);

  return redirect(path + search);
}

export async function POST(req) {
  const { revalidation_key } = await req.json();
  if (revalidation_key !== process.env.REVALIDATION_KEY)
    return 400;

  // TODO: Add custom logic for only updating what's changed
  revalidate();

  return 200;
}