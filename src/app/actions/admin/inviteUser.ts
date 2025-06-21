"use server";
import { createAdminClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

//eslint-disable-next-line
export async function inviteUserAction(prevState: any, formData: FormData) {
  const supabase = await createAdminClient();

  const cookieStore = await cookies();
  const token = cookieStore.get("sb-access-token")?.value;
  if (!token) return { success: false, message: "Unauthorized" };

  //eslint-disable-next-line
  let payload: any;

  try {
    payload = jwt.verify(token, process.env.SUPABASE_JWT_SECRET!);
  } catch{
    return { success: false, message: "Unauthorized" }
  }

  if(payload.user_role !== "admin"){
    return { success: false, message: "Unauthorized"}
  }

  const email = formData.get("email")?.toString();

  console.log("Email:", email);

  if (!email)
    return { success: false, message: "Please provide email address first" };

  //eslint-disable-next-line
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email!, {
    redirectTo: "https://admin.dashcruise.com/en/auth/supabase/callback", //Redirects to a set password page
  });

  if (error) {
    return {
      success: false,
      message: `There was an error while inviting user: ${error.message}`,
    };
  }

  return { success: true, message: "User successfuly invited" };
}
