'use server'

import { createClient } from "@/utils/supabase/server";
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

export async function createUserPasswordAction(prevState: any, formData: FormData){
    const supabase = await createClient();

    const password = formData.get('password')?.toString();
    const confirmPassword = formData.get('confirmPassword')?.toString()

    if(!password || !confirmPassword){
        return { success:false, message: "Missing password or confirmation password" }
    }

    if(password !== confirmPassword){
        return { success:false, message: "Password does not match confirmation passowrd" }
    }

    const validatedPassword = passwordSchema.safeParse({password});

    if(!validatedPassword.success){
        const passwordError = validatedPassword.error.format().password?._errors || [];
        return {
            success: false,
            message: passwordError?.length > 0 ? passwordError[0] : "Invalid request",
        }
    }
    
    const { data: userData, error: userError } = await supabase.auth.updateUser({ password: password });

    if(userError){
        return { success: false, message: userError.message}
    }
    return {success: true}
  }