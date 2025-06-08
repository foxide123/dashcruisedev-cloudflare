import { Card } from "@/components/ui/card";
import { UserAuthForm } from "@/components/auth/user-auth-form";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export const dynamicParams = false;
export const dynamic='force-static'

export async function generateStaticParams(){
  return routing.locales.map((locale) => ({locale}))
}

export default async function SignIn({params}: {params: Promise<{locale: string}>}) {
  const awaitedParams = await params;
  const locale = awaitedParams.locale;
  //eslint-disable-next-line
  if(!locale || !routing.locales.includes(locale as any)){
    notFound()
  }
  setRequestLocale(locale);
  
  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-2 text-left">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password below <br />
          to log into your account
        </p>
      </div>
      <UserAuthForm />
      <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
        By clicking login, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </Card>
  );
}
