import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 60;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const postId = searchParams.get("postId");

    const supabase = await createClient();

    let query = supabase.from("article_translation").select(`
      slug,
      locale:Locale (
        locale
      )
    `);

    if (postId) {
      query = query.eq("post_id", postId);
    }

    const {data,error} = await query;

    if (error) {
      console.error("Fetch error:", error);
      return NextResponse.json(
        { error: error.message || error },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: JSON.parse(JSON.stringify(data)) });
  } catch (error) {
    return NextResponse.json({
      error: `Caught error in fetch slugs with locale: ${error}`,
    });
  }
}
