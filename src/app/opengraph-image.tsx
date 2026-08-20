import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { NAME, SITE_URL } from "@/content/site";

export const alt =
  "Roberto Cinetto — senior full-stack developer. WordPress block architecture, WooCommerce and Next.js builds. North Vancouver, BC.";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

const INK = "#0a0f1c";
const PAPER = "#f2f4f8";
const HAZE = "#8c97ad";
const BRAND = "#facc15";
const EMBER = "#f5a524";

/* Rubik, subset to the glyphs this card can contain — ~16 KB per weight, well
   inside the 500 KB ImageResponse budget. Regenerate with the curl recipe in
   the README if the copy ever needs a glyph outside basic Latin. */
const readFont = async (file: string) => {
  const buffer = await readFile(join(process.cwd(), "src/assets", file));
  return Uint8Array.from(buffer).buffer;
};

const OpengraphImage = async () => {
  const [medium, bold] = await Promise.all([
    readFont("rubik-500.woff"),
    readFont("rubik-700.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: INK,
          fontFamily: "Rubik",
        }}
      >
        <div
          style={{
            height: 10,
            width: "100%",
            backgroundImage: `linear-gradient(90deg, ${BRAND} 0%, ${EMBER} 50%, ${BRAND} 100%)`,
          }}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "76px 80px 68px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 82,
                fontWeight: 700,
                color: PAPER,
                letterSpacing: -2,
              }}
            >
              {NAME}
            </div>
            <div
              style={{
                width: 64,
                height: 4,
                backgroundColor: BRAND,
                marginTop: 32,
                marginBottom: 32,
              }}
            />
            <div
              style={{
                fontSize: 34,
                fontWeight: 500,
                color: HAZE,
                lineHeight: 1.35,
                maxWidth: 920,
              }}
            >
              WordPress block architecture, WooCommerce, and Next.js builds for
              agencies and founders.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 24,
              fontWeight: 500,
              color: HAZE,
            }}
          >
            <div>North Vancouver, BC · Pacific time</div>
            <div style={{ color: BRAND }}>
              {SITE_URL.replace(/^https?:\/\//, "")}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Rubik", data: medium, weight: 500, style: "normal" },
        { name: "Rubik", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
};

export default OpengraphImage;
