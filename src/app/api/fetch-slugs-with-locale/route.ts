import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("PostTranslation").select(`PostTranslation.locale, PostTranslation.slug, Locale.locale,
      Locale!PostTranslation_lokale_fkey(
      locale
      )
    `);

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
