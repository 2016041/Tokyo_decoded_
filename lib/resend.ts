import { Resend } from "resend";
import type { ContactFormInput } from "@/lib/types";

const missingResendEnv = !process.env.RESEND_API_KEY || !process.env.RESEND_FROM;

if (missingResendEnv) {
  console.warn("RESEND_API_KEY or RESEND_FROM is not configured.");
}

function getResendClient() {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM) {
    throw new Error("Resend is not configured.");
  }

  return {
    client: new Resend(process.env.RESEND_API_KEY),
    from: process.env.RESEND_FROM,
  };
}

export async function sendDownloadLinkEmail(email: string): Promise<void> {
  const { client, from } = getResendClient();
  const { error } = await client.emails.send({
    from,
    to: email,
    subject: "Tokyo Decoded Editor's Tools",
    text: [
      "Thank you for requesting Tokyo Decoded Editor's Tools.",
      "Download link: https://tokyo-decoded.com/tools",
    ].join("\n\n"),
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function sendContactEmails(input: ContactFormInput): Promise<void> {
  const contactTo = process.env.CONTACT_TO;
  if (!contactTo) {
    console.warn("CONTACT_TO is not configured.");
    throw new Error("Contact recipient is not configured.");
  }

  const { client, from } = getResendClient();
  const message = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Subject: ${input.subject}`,
    "",
    input.message,
  ].join("\n");

  const toEditorial = await client.emails.send({
    from,
    to: contactTo,
    replyTo: input.email,
    subject: `[Tokyo Decoded] ${input.subject}`,
    text: message,
  });

  if (toEditorial.error) {
    throw new Error(toEditorial.error.message);
  }

  const autoReply = await client.emails.send({
    from,
    to: input.email,
    subject: "Tokyo Decoded received your message",
    text: [
      `${input.name} 様`,
      "お問い合わせありがとうございます。Tokyo Decoded編集部が内容を確認し、通常3営業日以内に返信します。",
      "",
      "Thank you for contacting Tokyo Decoded. We will review your message and reply within 3 business days.",
    ].join("\n"),
  });

  if (autoReply.error) {
    throw new Error(autoReply.error.message);
  }
}
