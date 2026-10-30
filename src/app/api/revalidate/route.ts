import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { PROJECTS_TAG } from "@/sanity/projects";

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json({ message: "Revalidation is not configured" }, { status: 500 });
  }

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret);

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    // Delete events may arrive without a _type, so only skip a known different type
    if (body?._type && body._type !== PROJECTS_TAG) {
      return NextResponse.json({ message: "Ignored" }, { status: 200 });
    }

    revalidateTag(PROJECTS_TAG);
    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
