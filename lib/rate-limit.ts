import type { NextRequest } from "next/server";

type Bucket = {
  count: number;
  resetAt: number;
};

type LimitKind = "subscribe" | "contact";
type LimitResult = { limited: false } | { limited: true; retryAfter: number };

const limits: Record<LimitKind, number> = {
  subscribe: 5,
  contact: 3,
};

const windowMs = 60 * 60 * 1000;
const buckets = new Map<string, Bucket>();

export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

export function checkRateLimit(kind: LimitKind, request: NextRequest): LimitResult {
  const now = Date.now();
  const key = `${kind}:${getClientIp(request)}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { limited: false };
  }

  if (current.count >= limits[kind]) {
    return {
      limited: true,
      retryAfter: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;
  buckets.set(key, current);
  return { limited: false };
}
