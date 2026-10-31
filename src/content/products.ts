import { NAME } from "./site";

/**
 * The /products page: things I make and sell myself, apart from the client
 * work on the home page. Add a product by appending an object to `products`;
 * it renders as its own band, with the anchor `/products#<id>`, and needs no
 * component change.
 *
 * Facts and wording come from the product's own site (getsoffio.app, English
 * copy). Nothing here is invented: if the product site changes, change this.
 * No price is shown on purpose: the product site is the one place that states
 * it, and a second copy here would drift.
 */

export interface ProductLink {
  label: string;
  href: string;
}

export interface Product {
  /** Anchor id, lower case. */
  id: string;
  name: string;
  /** Mono eyebrow. Sentence case here, shouted by CSS. */
  label: string;
  description: string;
  /** Mono line next to the icon: who made it. */
  byline: string;
  /** Three or four short facts, each a bold lead and a plain line. */
  facts: { title: string; detail: string }[];
  /** Square image under /public, and its alt text. */
  icon: { src: string; alt: string };
  site: ProductLink;
  supportEmail: string;
}

export const productsPage = {
  heading: "Products",
  description: `Apps I make and sell myself. Soffio is dictation for Mac, by ${NAME}.`,
  lead: `Software I make and sell myself, as ${NAME}. The client work is on the home page.`,
} as const;

export const products: Product[] = [
  {
    id: "soffio",
    name: "Soffio",
    label: "Mac app",
    description: "Dictation for Mac that is fast, private and yours.",
    byline: `By ${NAME}`,
    facts: [
      {
        title: "Dictation for Mac",
        detail: "Press a key, speak, and the words land where you are typing.",
      },
      {
        title: "Private",
        detail: "Your speech is transcribed on your Mac.",
      },
      {
        title: "Works in any app",
        detail: "Mail, Slack, your code editor, a form in the browser.",
      },
      {
        title: "Pay once",
        detail: "One-time purchase, no subscription. Free trial, no card.",
      },
    ],
    icon: { src: "/soffio-icon.png", alt: "The Soffio app icon" },
    site: { label: "getsoffio.app", href: "https://getsoffio.app" },
    supportEmail: "support@getsoffio.app",
  },
];
