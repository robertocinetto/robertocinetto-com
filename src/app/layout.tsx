import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";

import Analytics from "@/components/Analytics";
import { NAME, SITE_URL } from "@/content/site";

import "./globals.css";

/* Two families, both variable: one file each covers every weight the page uses,
   which is smaller than shipping static instances separately. next/font
   self-hosts them, so there is no request to Google at runtime.

   Instrument Sans carries every word set in prose. JetBrains Mono carries the
   labels, captions, result lines, the email address and — the point of the
   whole direction — the proof figures, so a number reads as a measurement
   rather than a marketing claim. */
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const title =
  "Roberto Cinetto — Senior WordPress & Next.js Developer | North Vancouver";

const description =
  "Senior full-stack developer with 15 years’ experience. Custom WordPress block architecture, WooCommerce, and Next.js builds for agencies and founders. Based in North Vancouver, BC.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s | ${NAME}` },
  description,
  alternates: { canonical: "/" },
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: NAME,
    locale: "en_CA",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html
    lang="en"
    className={`${instrumentSans.variable} ${jetBrainsMono.variable}`}
  >
    <body className="antialiased">
      {children}
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
