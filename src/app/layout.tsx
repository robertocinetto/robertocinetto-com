import type { Metadata } from "next";
import { Open_Sans, Rubik } from "next/font/google";

import { NAME, SITE_URL } from "@/content/site";

import "./globals.css";

/* Two families, both variable: one file each covers every weight the page uses,
   which is smaller than shipping static instances of 500 and 700 separately.
   next/font self-hosts them, so there is no request to Google at runtime. */
const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
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
  <html lang="en" className={`${rubik.variable} ${openSans.variable}`}>
    <body className="antialiased">{children}</body>
  </html>
);

export default RootLayout;
