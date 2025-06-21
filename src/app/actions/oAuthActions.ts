"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const urlCallback =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/auth/callback"
    : "https://admin.dashcruise.com/api/auth/callback";

export async function signInWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: urlCallback,
      //redirectTo: `https://admin.dashcruise.com/en/auth/callback`,
    },
  });
  if (error) {
    console.error("OAuth error:", error.message);
    throw new Error(error.message);
  }
  return redirect(data.url);
}
