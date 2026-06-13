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

  const html = `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F4F1EA;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F1EA;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-top:3px solid #E63946;">
        <tr><td style="padding:40px 48px 32px;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;color:#888;text-transform:uppercase;">Tokyo Decoded</p>
          <h1 style="margin:0 0 24px;font-size:22px;font-weight:700;color:#0F1115;line-height:1.3;">Editor's Tools<br>ダウンロードリンク</h1>
          <p style="margin:0 0 32px;font-size:15px;color:#333;line-height:1.7;">登録ありがとうございます。<br>3つのツールのダウンロードリンクをお送りします。</p>

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:16px 0;border-top:1px solid #eee;">
              <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#0F1115;">Digital Kakebo — お金の流れを可視化する</p>
              <p style="margin:0 0 8px;font-size:13px;color:#555;line-height:1.6;">月次レビューシート。Loud Budgeting・Soft Saving の考え方を組み込んだ家計簿テンプレートです。</p>
              <a href="https://pinnate-gum-0b7.notion.site/Digital-Kakebo-37ed3574d1a981b59eefe2334cfa0d9a?source=copy_link" style="display:inline-block;padding:8px 20px;background:#0F1115;color:#fff;font-size:13px;text-decoration:none;font-weight:600;">Notionで開く →</a>
            </td></tr>
            <tr><td style="padding:16px 0;border-top:1px solid #eee;">
              <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#0F1115;">Research Brief — 世界のデータを整理する</p>
              <p style="margin:0 0 8px;font-size:13px;color:#555;line-height:1.6;">編集部が実際に使っているトレンド調査フレームワーク。海外の兆候を4軸で整理し、動くべきかを素早く判断できます。</p>
              <a href="https://pinnate-gum-0b7.notion.site/Research-Brief-37ed3574d1a9811b8619eb851c874e0a?source=copy_link" style="display:inline-block;padding:8px 20px;background:#0F1115;color:#fff;font-size:13px;text-decoration:none;font-weight:600;">Notionで開く →</a>
            </td></tr>
            <tr><td style="padding:16px 0;border-top:1px solid #eee;border-bottom:1px solid #eee;">
              <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#0F1115;">Trend Worksheet — トレンドを日常に落とし込む</p>
              <p style="margin:0 0 8px;font-size:13px;color:#555;line-height:1.6;">情報収集で終わらせないための5ステップ。キャッチから試す・発信まで一枚で完結します。</p>
              <a href="https://pinnate-gum-0b7.notion.site/Trend-Worksheet-37ed3574d1a981f9a6e1c2c2cffc4841?source=copy_link" style="display:inline-block;padding:8px 20px;background:#0F1115;color:#fff;font-size:13px;text-decoration:none;font-weight:600;">Notionで開く →</a>
            </td></tr>
          </table>

          <p style="margin:32px 0 0;font-size:12px;color:#888;line-height:1.7;">世界のトレンドを、東京から翻訳。<br>— Tokyo Decoded 編集部</p>
        </td></tr>
      </table>
      <p style="margin:16px 0 0;font-size:11px;color:#aaa;">このメールは Editor's Tools のダウンロードリクエストにより送信されました。</p>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    "Tokyo Decoded Editor's Tools — ダウンロードリンク",
    "",
    "登録ありがとうございます。3つのツールのリンクをお送りします。",
    "",
    "▼ Digital Kakebo — お金の流れを可視化する",
    "https://pinnate-gum-0b7.notion.site/Digital-Kakebo-37ed3574d1a981b59eefe2334cfa0d9a?source=copy_link",
    "",
    "▼ Research Brief — 世界のデータを整理する",
    "https://pinnate-gum-0b7.notion.site/Research-Brief-37ed3574d1a9811b8619eb851c874e0a?source=copy_link",
    "",
    "▼ Trend Worksheet — トレンドを日常に落とし込む",
    "https://pinnate-gum-0b7.notion.site/Trend-Worksheet-37ed3574d1a981f9a6e1c2c2cffc4841?source=copy_link",
    "",
    "世界のトレンドを、東京から翻訳。",
    "— Tokyo Decoded 編集部",
  ].join("\n");

  const { error } = await client.emails.send({
    from,
    to: email,
    subject: "【Tokyo Decoded】Editor's Tools ダウンロードリンク",
    html,
    text,
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
