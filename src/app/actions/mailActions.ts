import { z } from "zod";
import { SubmitFormApiResponse } from "@/types/api_types";

const schema = z.object({
  email: z.string({
    invalid_type_error: "Invalid Email",
  }),
});

export async function handleMailSubmition(formData: FormData) {
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;
  const email = formData.get("email") as string;

  const validated = schema.safeParse({ email });
  if (!validated.success) {
    return { success: false, error: "Invalid email" };
  }

  try {
    const response = await fetch("/api/submitForm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, message }),
    });

    const { id } = (await response.json()) as SubmitFormApiResponse;
    
    if (response.status !== 200 || !id) {
      console.error("Error creating session:", id);
      return;
    }

    return {success: true};
  } catch (error) {
    console.error("Submission error:", error);
    return {error: "Server error", details: error};
  }
}
