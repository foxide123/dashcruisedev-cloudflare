import { NextRequest, NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";
import { createClient } from "@/utils/supabase/server";


export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get("title");
  const content = searchParams.get("content");
  const image_url = searchParams.get("image_url");
  const clean = sanitizeHtml(content!);

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, content: clean, image_url }])
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data![0]);
}
