import { EMAIL } from "./site";

/**
 * The privacy policy at /privacy. It covers two things: this website, and Robi
 * Second Brain, the private tool whose Google Cloud OAuth consent screen lists
 * this page as its privacy policy. Google will not let that app into
 * production without one, and it requires the page to say how the app
 * accesses, uses, stores and shares Google user data.
 *
 * The website half describes what the code actually does. If analytics,
 * hosting, a form or a third-party script changes, this file changes in the
 * same commit, or the page quietly becomes false. See docs/gotchas.md.
 */

/** A run of plain text, or a link inside a paragraph. */
export type Inline = string | { text: string; href: string };

/**
 * A paragraph with no links is a plain string. One with links is a list of
 * runs, so the words stay here and the component only decides how a link
 * renders (off-site opens in a new tab; mailto is set in mono).
 */
export type Paragraph = string | readonly Inline[];

export interface PrivacyTopic {
  /** An h3. Leave it off the first topic to make that a section's lead-in. */
  heading?: string;
  paragraphs: Paragraph[];
}

export interface PrivacySection {
  /** Anchor id. `#second-brain` is the direct link to the Google data part. */
  id: string;
  /** Mono eyebrow. Sentence case here, shouted by CSS. */
  label: string;
  heading: string;
  topics: PrivacyTopic[];
}

export const privacy = {
  heading: "Privacy policy",
  description:
    "How robertocinetto.com and Robi Second Brain collect, use, store and share data, including Google user data.",
  /* ISO so it can feed <time dateTime>; the page formats it for display. Change
     it whenever the policy changes, since the changes section promises that. */
  effectiveDate: "2026-09-18",
  effectiveLabel: "Effective",
  intro: [
    "This policy covers my website, ",
    { text: "robertocinetto.com", href: "/" },
    ", and Robi Second Brain, a private tool I use to organize my own work. It says what each one collects, what happens to it, and how to reach me about it.",
  ],
} as const;

export const privacySections: PrivacySection[] = [
  {
    id: "website",
    label: "Website",
    heading: "What this site collects",
    topics: [
      {
        paragraphs: [
          "The site has no forms, no accounts and no ads. Apart from Google Analytics, nothing on it is loaded from a third party: the fonts and images are served from this site.",
        ],
      },
      {
        heading: "Analytics",
        paragraphs: [
          "I use Google Analytics 4 to see how people find and use the site. It records the pages you view, the site or search that sent you, your approximate location (worked out by Google from your IP address), and your device and browser. It also records clicks on the booking button, the email links and the LinkedIn link, noting which link it was and where it sat on the page. Google’s enhanced measurement is on as well, which adds events such as scrolling and clicks on links to other sites.",
          [
            "I read this only as reports inside Google Analytics, to see what’s working on the site. Google handles it under ",
            {
              text: "Google’s privacy policy",
              href: "https://policies.google.com/privacy",
            },
            ".",
          ],
        ],
      },
      {
        heading: "Cookies and consent",
        paragraphs: [
          [
            "The site sets no cookies of its own. Google Analytics sets cookies in your browser so it can tell a return visit from a new one. There is no cookie banner: the analytics script loads on every visit without asking first. If you’d rather not be counted, a content blocker or Google’s ",
            {
              text: "opt-out browser add-on",
              href: "https://tools.google.com/dlpage/gaoptout",
            },
            " will stop it, and the site works the same without it.",
          ],
        ],
      },
      {
        heading: "Hosting",
        paragraphs: [
          [
            "The site is hosted on Vercel. Like any web host, Vercel receives the technical details of each request, such as your IP address and browser, in order to serve the page. It handles them under ",
            {
              text: "Vercel’s privacy notice",
              href: "https://vercel.com/legal/privacy-notice",
            },
            ".",
          ],
        ],
      },
      {
        heading: "Links and email",
        paragraphs: [
          [
            "The booking button opens Cal.com and the LinkedIn link opens LinkedIn. Once you’re on those sites, their own privacy policies apply. If you email me, I keep your message and your address so I can reply and keep track of our conversation. Mail sent to my address is forwarded to my personal Gmail, so ",
            { text: "Robi Second Brain", href: "#second-brain" },
            " can read it too.",
          ],
        ],
      },
    ],
  },
  {
    id: "second-brain",
    label: "Google user data",
    heading: "Robi Second Brain",
    topics: [
      {
        paragraphs: [
          "Robi Second Brain is a private tool, not a product. I built it for my own work and I’m its only user: it connects to my own Google account and nobody else’s. It isn’t offered to anyone else, and no one else can sign in to it.",
        ],
      },
      {
        heading: "What it accesses",
        paragraphs: [
          "It has read access to my Gmail (messages and labels), my Google Calendar (events) and my Google Drive (file listings and file contents). When I ask it to, it can also create email drafts, calendar events and Google Docs in my account. It never sends email.",
        ],
      },
      {
        heading: "How it uses that data",
        paragraphs: [
          [
            "Only to help me organize my own work and notes. The content it reads is passed to the AI assistant I use (Claude, made by Anthropic) to carry out my requests, and Anthropic handles it under ",
            {
              text: "Anthropic’s privacy policy",
              href: "https://www.anthropic.com/legal/privacy",
            },
            ". Summaries I choose to keep are saved in my private notes.",
          ],
        ],
      },
      {
        heading: "Storage and sharing",
        paragraphs: [
          "The sign-in tokens that connect it to my Google account are stored on my own computer. The summaries I keep stay in my private notes until I delete them. Google data is not sold, not used for advertising, and not shared with anyone apart from the assistant described above.",
        ],
      },
      {
        heading: "Limited Use",
        paragraphs: [
          /* Google's required wording, word for word. Do not edit it for voice. */
          [
            "Robi Second Brain’s use and transfer to any other app of information received from Google APIs will adhere to the ",
            {
              text: "Google API Services User Data Policy",
              href: "https://developers.google.com/terms/api-services-user-data-policy",
            },
            ", including the Limited Use requirements.",
          ],
        ],
      },
      {
        heading: "Removing access",
        paragraphs: [
          [
            "Its access can be removed at any time in ",
            {
              text: "Google Account > Security > Third-party connections",
              href: "https://myaccount.google.com/connections",
            },
            ".",
          ],
        ],
      },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    heading: "Questions and changes",
    topics: [
      {
        paragraphs: [
          [
            "If you have a question about this policy, or about any data I might hold about you, email me at ",
            { text: EMAIL, href: `mailto:${EMAIL}` },
            ".",
          ],
          "If this policy changes, I’ll post the new version on this page with a new effective date.",
        ],
      },
    ],
  },
];
