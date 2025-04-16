import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  try {
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("PostTranslation")
      .select("*")
      .eq("slug", slug);

    if (error) {
      return NextResponse.json(
        { error: "Error fetching post" },
        { status: 500 }
      );
    }

    return Response.json({ data: data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({error:err});
  }
}
