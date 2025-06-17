// pages/auth/callback.tsx or app/auth/callback/page.tsx if using app router

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function handleOAuthRedirect() {
      const { error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error retrieving session:", error.message);
      } else {
        // Optionally: fetch user data or redirect somewhere
        router.push("/admin"); // or wherever you want
      }
    }

    handleOAuthRedirect();
  }, [router]);

  return <p>Signing in...</p>;
}
