import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendDownloadLinkEmail } from "@/lib/resend";
import { appendSubscribeRow } from "@/lib/sheets";
import type { ApiResult } from "@/lib/types";

const schema = z.object({
  email: z.string().trim().email(),
});

function json<T>(body: ApiResult<T>, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return json({ success: false, error: "Invalid JSON." }, 400);
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return json({ success: false, error: "Invalid email address." }, 400);
  }

  const rateLimit = checkRateLimit("subscribe", request);
  if (rateLimit.limited) {
    return json(
      { success: false, error: "Too many requests." },
      429,
      { "Retry-After": String(rateLimit.retryAfter) },
    );
  }

  try {
    await sendDownloadLinkEmail(parsed.data.email);
    await appendSubscribeRow({ email: parsed.data.email, source: "tools" });
    return json({ success: true }, 200);
  } catch {
    return json({ success: false, error: "Subscription failed." }, 500);
  }
}
