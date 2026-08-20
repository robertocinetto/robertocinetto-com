import {
  COUNTRY,
  EMAIL,
  GITHUB_URL,
  JOB_TITLE,
  LINKEDIN_URL,
  LOCALITY,
  NAME,
  REGION,
  SITE_URL,
} from "@/content/site";

const personId = `${SITE_URL}/#roberto-cinetto`;

const address = {
  "@type": "PostalAddress",
  addressLocality: LOCALITY,
  addressRegion: REGION,
  addressCountry: COUNTRY,
};

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: NAME,
      jobTitle: JOB_TITLE,
      url: SITE_URL,
      email: `mailto:${EMAIL}`,
      address,
      nationality: [
        { "@type": "Country", name: "Italy" },
        { "@type": "Country", name: "Canada" },
      ],
      knowsLanguage: ["en", "it"],
      knowsAbout: [
        "WordPress block architecture",
        "WooCommerce",
        "Next.js",
        "Headless WordPress migration",
        "AI integration for websites",
      ],
      sameAs: [GITHUB_URL, LINKEDIN_URL],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: `${NAME} — Web Development`,
      url: SITE_URL,
      provider: { "@id": personId },
      address,
      areaServed: [
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "United States" },
        { "@type": "Place", name: "Europe" },
      ],
      serviceType: [
        "Freelance WordPress development",
        "WooCommerce development",
        "Headless WordPress migration",
        "Next.js development",
        "AI integration for websites",
      ],
    },
  ],
};

/* Escaping `<` keeps the JSON from being able to close this script tag early. */
const json = JSON.stringify(graph).replace(/</g, "\\u003c");

const StructuredData = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: json }}
  />
);

export default StructuredData;
