import { z } from "zod";
import { SubmitFormApiResponse } from "@/types/api_types";

const schema = z.object({
  email: z.string({
    invalid_type_error: "Invalid Email",
  }),
});

export const runtime = "edge";

export async function handleFormSubmition(formData: FormData) {
  const name = formData.get("name");
  const message = formData.get("message");

  const validatedFields = schema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    console.error("Validation error", validatedFields.error.flatten().fieldErrors);
    return;
  }
  console.log("Email before validation:", formData.get("email"));
  console.log("validated email:", validatedFields.data.email);
  console.log("name:", name);
  console.log("message:", message);

  try {
    const response = await fetch("/api/submitForm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: validatedFields.data.email, name: name, message:message }),
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
