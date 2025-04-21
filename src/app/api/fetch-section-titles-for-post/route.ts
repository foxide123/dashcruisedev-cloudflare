import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("PostSections")
      .select(`
        section_slug,
        section_title,
        order,
        PostTranslation(
            id,
            Post
            (
            id
            )
        )
        `)
      .eq("PostTranslation.Post.id", id);

    if (error) {
      return NextResponse.json(
        { error: "Error fetching post" },
        { status: 500 }
      );
    }

    return Response.json({ data: JSON.parse(JSON.stringify(data)) }, { status: 200 });
    //eslint-disable-next-line
  } catch (error:any) {
    return NextResponse.json(
      { error: "Internal Server Error While Retrieving Post",
        details: error instanceof Error ? error.message : String(Error)
       },
      { status: 500 }
    );
  }
}
