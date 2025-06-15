"use client";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const passwordValidation = z
  .string()
  .min(8, { message: "Password should have minimum length of 8" })
  .max(15, { message: "Password is too long" })
  .regex(/^(?=.*[A-z]).{8,}$/, {
    message:
      "Password Should Contain at least one uppercase letter and have a minimum length of 8 characters.",
  });

const passwordSchema = z.object({
  password: passwordValidation,
});

export default function SupabaseCallback() {
  const router = useRouter();

  const [error, setError] = useState("");

  const handleSetPassword = async (formData: FormData) => {
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const validatedPassword = passwordSchema.safeParse({ password });

    if (!validatedPassword.success) {
      const passwordError =
        validatedPassword.error.format().password?._errors || [];
      setError(
        passwordError.length > 0 ? passwordError[0] : "Invalid password"
      );
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      router.push("/admin");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await handleSetPassword(formData);
  };

  useEffect(() => {
    const hash = window.location.hash;
    console.log("FULL HASH:", window.location.hash);

    const params = new URLSearchParams(hash.substring(1));
    const refreshToken = params.get("refresh_token");
  

    if (refreshToken) {
      supabase.auth
        .refreshSession({
          refresh_token: refreshToken,
        })
        .then(({ error }) => {
          if (error) {
            console.error("Error refreshing session:", error.message);
            setError("Unable to restore session. Please try again.");
          }
        });
    } else {
      console.warn("Missing refresh_token in URL");
    }
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center border-2 border-red-500 absolute inset-0">
      <div className="w-[500px] max-w-full">
        <h2>Hello 👋</h2>
        <p className="mt-4">Finish your set up by creating a password.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input
            type="password"
            placeholder="Create Password"
            name="password"
            className="mt-4 border-1 border-black rounded-sm p-4"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className="border-1 border-black rounded-sm p-4"
            required
          />
          <button type="submit">Set Password</button>
        </form>

        {error && (
          <p
            className={`mt-10 text-sm text-red-600"
            }`}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
