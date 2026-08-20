import type { Metadata } from "next";
import { Open_Sans, Rubik } from "next/font/google";

import "./globals.css";

const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-rubik",
});

const title = "Roberto Cinetto - Software Developer";
const description =
  "Software developer in Vancouver (BC). I like stuff like NextJS and ReactJS. But you will find me working with WordPress, too!";

export const metadata: Metadata = {
  metadataBase: new URL("https://robertocinetto.com"),
  title: {
    default: title,
    template: "%s | Roberto Cinetto",
  },
  description,
  openGraph: {
    title,
    description,
    url: "https://robertocinetto.com",
    siteName: title,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html lang="en">
    <body
      className={`${openSans.className} ${rubik.variable} ${openSans.variable} antialiased`}
    >
      {children}
    </body>
  </html>
);

export default RootLayout;
