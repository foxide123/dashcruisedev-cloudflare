'use client'
import { createUserPasswordAction } from "@/app/actions/udateUser";
import { supabase } from "@/lib/supabaseClient";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

const initialState = { success: false, message: undefined}

function SubmitButton(){
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending} className="border-1 border-black rounded-sm p-4 mt-4 w-fit mx-auto shadow-md cursor-pointer">
      Set Password
    </button>
  )
}

export default function SupabaseCallback() {
  const searchParams = useSearchParams();

  const [state, formAction] = useFormState(createUserPasswordAction, initialState)

  useEffect(() => {
    const refreshSession = async () => {
      const refreshToken = searchParams?.get("refresh_token");
      if (!refreshToken) return;
      if(refreshToken){
        await supabase.auth.refreshSession({ refresh_token: refreshToken })
      }
    };
    refreshSession();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center border-2 border-red-500 absolute inset-0">
      <div className="w-[500px] max-w-full">
        <h2>Hello 👋</h2>
        <p className="mt-4">Finish your set up by creating a password.</p>
        <form action={formAction} className="flex flex-col gap-4 mt-4">
          <input type="password" placeholder="Create Password" name="password" className="mt-4 border-1 border-black rounded-sm p-4"/>
          <input type="password" placeholder="Confirm Password" name="confirmPassword" className="border-1 border-black rounded-sm p-4"/>
          <SubmitButton/>
        </form>

            {state.message && (
          <p
            className={`mt-10 text-sm ${
              state.success ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {state.message}
          </p>
        )}

      </div>
    </div>
  );
}
