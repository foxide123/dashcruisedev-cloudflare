import { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { Resend } from "resend";
//import { EmailTemplate } from "@/components/EmailTemplate";
import { SubmitFormApiRequest } from "@/types/api_types";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
     const { email, name, message } = (await req.json()) as SubmitFormApiRequest;

    const { env } = getRequestContext();
    const resendApi = env.RESEND_API_KEY;

    const resend = new Resend(resendApi);
    const { data, error } = await resend.emails.send({
     // from: `Acme <${email}>`,
     from: "Acme <contact@dashcruisedev.com>",
      to: ["contact@dashcruisedev.com"],
      replyTo: `${email}`,
      subject: "Name: Jakub, Message: Hello",
      //subject: `Name: ${name}, Message: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
      //react: <EmailTemplate name={name} message={message} />
    });

    if (error) {
      console.error("Error while sending an email:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : error }, { status: 500 });
  }
}
