"use server";
import { createAdminClient } from "@/utils/supabase/server";

//eslint-disable-next-line
export async function inviteUserAction(prevState: any, formData: FormData) {
  const supabase = await createAdminClient();
  const email = formData.get("email")?.toString();

  console.log("Email:", email);

  if(!email) return { success:false, message: "Please provide email address first"}

  //eslint-disable-next-line
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(
    email!,
    {
      redirectTo: 'https://admin.dashcruise.com/en/auth/supabase/callback', //Redirects to a set password page
    }
  );

  if(error){
    return { success: false, message: `There was an error while inviting user: ${error.message}`}
  }

  return { success: true, message: "User successfuly invited" };
}
