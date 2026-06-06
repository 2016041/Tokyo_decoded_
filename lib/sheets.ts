import { google } from "googleapis";

type SubscribeRow = {
  email: string;
  source: string;
};

const missingSheetsEnv =
  !process.env.GOOGLE_SHEETS_CLIENT_EMAIL ||
  !process.env.GOOGLE_SHEETS_PRIVATE_KEY ||
  !process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

if (missingSheetsEnv) {
  console.warn("Google Sheets environment variables are not fully configured.");
}

export async function appendSubscribeRow(row: SubscribeRow): Promise<void> {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error("Google Sheets is not configured.");
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Subscribers!A:C",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[new Date().toISOString(), row.email, row.source]],
    },
  });
}
