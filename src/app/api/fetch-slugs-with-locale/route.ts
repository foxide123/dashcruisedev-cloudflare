import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
    .from('PostTranslation')
    .select(`
      locale,
      slug,
      Locale (
        locale
      )
    `);

    if (error) {
      console.error("Fetch error in route:", error);
      return NextResponse.json({
        error: `Fetch slugs with locale error: ${error}`,
      });
    }

    return NextResponse.json({ success: data });
  } catch (error) {
    console.error("Fetch error in route:", error);
    return NextResponse.json({
      error: `Caught error in fetch slugs with locale: ${error}`,
    });
  }
}
