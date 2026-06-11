import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const size = {
  width: 1200,
  height: 630,
};

async function loadFont(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return undefined;
    }

    return response.arrayBuffer();
  } catch {
    return undefined;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const title = searchParams.get("title") || "Tokyo Decoded";
  const category = searchParams.get("category") || "Editorial";
  const [spaceGrotesk, notoSansJP, fallbackFont] = await Promise.all([
    loadFont(
      "https://fonts.gstatic.com/s/spacegrotesk/v22/V8mDoQDjQSkFtoMM3T6r8E7mPbF4Cw.woff2",
    ),
    loadFont(
      "https://fonts.gstatic.com/s/notosansjp/v55/-F6jfjtqLzI2JPCgQBnw7HFQoggM-FNthvIUQis.woff2",
    ),
    loadFont(`${origin}/fonts/Geist-Regular.ttf`),
  ]);
  const fonts = [
    spaceGrotesk
      ? { name: "Space Grotesk", data: spaceGrotesk, weight: 700 as const, style: "normal" as const }
      : undefined,
    notoSansJP
      ? { name: "Noto Sans JP", data: notoSansJP, weight: 900 as const, style: "normal" as const }
      : undefined,
    fallbackFont
      ? { name: "Geist", data: fallbackFont, weight: 400 as const, style: "normal" as const }
      : undefined,
  ].filter((font) => font !== undefined);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          color: "#0F1115",
          padding: "72px",
          border: "24px solid #F4F1EA",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              fontFamily: "Space Grotesk",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#E63946",
                color: "#FFFFFF",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              TD
            </div>
            <span>Tokyo Decoded</span>
          </div>
          <div
            style={{
              background: "#E63946",
              color: "#FFFFFF",
              fontFamily: "Space Grotesk",
              fontSize: 24,
              fontWeight: 700,
              padding: "10px 18px",
            }}
          >
            {category}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            maxWidth: "980px",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "8px",
              background: "#E63946",
            }}
          />
          <div
            style={{
              fontFamily: "Noto Sans JP",
              fontSize: title.length > 52 ? 56 : 68,
              fontWeight: 900,
              lineHeight: 1.18,
              letterSpacing: 0,
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            fontFamily: "Space Grotesk",
            fontSize: 28,
            fontWeight: 500,
            color: "#6B7280",
          }}
        >
          Decoding the world from Tokyo.
        </div>
      </div>
    ),
    {
      ...size,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
      fonts,
    },
  );
}
