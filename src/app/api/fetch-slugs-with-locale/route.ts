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
      return NextResponse.json({
        error: `Fetch slugs with locale error: ${error}`,
      });
    }

    return NextResponse.json({ success: data });
  } catch (error) {
    return NextResponse.json({
      error: `Caught error in fetch slugs with locale: ${error}`,
    });
  }
}
