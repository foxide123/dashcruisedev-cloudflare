"use server";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";

const schema = z.object({
  email: z.string({
    invalid_type_error: "Invalid Email",
  }),
});

export async function newsletterSignup({
  formData,
  invalidEmailErrorText,
  emailExistsErrorText,
  unknownErrorText
}: {
  formData: FormData;
  invalidEmailErrorText: string;
  emailExistsErrorText: string;
  unknownErrorText: string
}) {
  const email = formData.get("email") as string;

  const validated = schema.safeParse({ email });
  if (!validated.success) {
    return { success: false, error: `${invalidEmailErrorText}`};
  }
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("Newsletter").insert({ email });

    if (error) {
      if (error.code === "23505") {
        // 23505 = unique_violation in PostgreSQL
        return { success: false, error: `${emailExistsErrorText}` };
      }
      return { success: false, error: error.message || `${unknownErrorText}` };
    }

    return { success: true };
  } catch (err) {
    return { error: err };
  }
}
