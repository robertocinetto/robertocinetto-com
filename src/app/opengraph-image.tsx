import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { JOB_TITLE, NAME, SITE_URL } from "@/content/site";

export const alt =
  "Roberto Cinetto, senior full-stack developer. WordPress block architecture, WooCommerce and Next.js builds. North Vancouver, BC.";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

/* The palette is duplicated here because Satori resolves no CSS custom
   properties — these must be kept in step with the @theme block in globals.css. */
const NIGHT = "#0e1522";
const DAYLIGHT = "#f2f5f8";
const HAZE = "#9fb0c6";
const HAZE_DIM = "#7c8ca3";
const SIGNAL = "#facc15";

/* Instrument Sans and JetBrains Mono, subset to the glyphs this card can
   contain — ~13 KB per face, well inside the 500 KB ImageResponse budget.
   Regenerate with the curl recipe in the README if the copy ever needs a glyph
   outside basic Latin. */
const readFont = async (file: string) => {
  const buffer = await readFile(join(process.cwd(), "src/assets", file));
  return Uint8Array.from(buffer).buffer;
};

const OpengraphImage = async () => {
  const [sansRegular, sansSemibold, mono] = await Promise.all([
    readFont("instrument-sans-400.woff"),
    readFont("instrument-sans-600.woff"),
    readFont("jetbrains-mono-400.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: NIGHT,
          fontFamily: "Instrument Sans",
        }}
      >
        {/* The page's own top rule, at card scale. Solid — there are no
            gradients anywhere in this system. */}
        <div style={{ height: 10, width: "100%", backgroundColor: SIGNAL }} />
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
            {/* Mono eyebrow, the same opener every section on the page uses. */}
            <div
              style={{
                fontFamily: "JetBrains Mono",
                fontSize: 22,
                letterSpacing: 2.6,
                textTransform: "uppercase",
                color: HAZE_DIM,
                marginBottom: 28,
              }}
            >
              {JOB_TITLE}
            </div>
            <div
              style={{
                fontSize: 82,
                fontWeight: 600,
                color: DAYLIGHT,
                letterSpacing: -2,
                marginBottom: 32,
              }}
            >
              {NAME}
            </div>
            <div
              style={{
                fontSize: 34,
                fontWeight: 400,
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
              fontFamily: "JetBrains Mono",
              fontSize: 24,
              color: HAZE_DIM,
            }}
          >
            <div>North Vancouver, BC · Pacific time</div>
            <div style={{ color: SIGNAL }}>
              {SITE_URL.replace(/^https?:\/\//, "")}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Instrument Sans",
          data: sansRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Instrument Sans",
          data: sansSemibold,
          weight: 600,
          style: "normal",
        },
        { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
};

export default OpengraphImage;
