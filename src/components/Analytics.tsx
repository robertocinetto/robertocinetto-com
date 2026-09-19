import Script from "next/script";

/**
 * Google Analytics 4.
 *
 * This is the only third-party script on the site and the only JavaScript that
 * does any work in the browser — everything else runs at build time. It stays a
 * server component: `next/script` needs no "use client" unless you attach
 * onLoad/onError handlers, and we don't.
 *
 * `afterInteractive` is next/script's default and the right strategy here. It
 * matches the `async` in Google's own snippet, so gtag.js is fetched early but
 * never blocks first paint or hydration. There is no client-side navigation
 * (the footer's link to /privacy is a plain anchor, so every route change is a
 * full page load), so nothing needs to re-fire a pageview on route change.
 */
const GA_MEASUREMENT_ID = "G-VC7X9406GZ";

/**
 * Click tracking, write half.
 *
 * Every event this site can send, and every band a link can sit in. The runtime
 * half — the listener that reads these back off the DOM — is the template
 * string further down, deliberately in this same file: the two have to agree on
 * the attribute names, so neither can be changed without seeing the other.
 *
 * `link_location` has to be registered as a custom dimension in GA4 (Admin →
 * Data display → Custom definitions) before it appears anywhere outside
 * Realtime and DebugView, and registering is not retroactive. See the README.
 */
export type GaEvent = "book_call_click" | "email_click" | "social_click";

export type GaLocation = "hero" | "contact" | "footer";

/** Spread onto any anchor: `<a {...gaAttrs("email_click", "footer")} …>`. */
export const gaAttrs = (event: GaEvent, location: GaLocation) => ({
  "data-ga-event": event,
  "data-ga-location": location,
});

/**
 * Click tracking, runtime half.
 *
 * One delegated listener rather than onClick handlers. A handler would make its
 * component the site's first client component and pull its subtree into the
 * browser bundle; delegation costs nothing, because this script is already on
 * the page and the markup it reads is plain server-rendered HTML.
 *
 * `closest()` is load-bearing, not defensive — ExternalLink puts an `sr-only`
 * span inside the anchor, so the click target is very often that span rather
 * than the link. `link_url` comes off the anchor's own href, which is what
 * tells GitHub from LinkedIn without a second attribute.
 *
 * Every tracked link is either target="_blank" or a mailto:, so the page is
 * never unloaded and the hit always has time to leave. Nothing here needs to
 * preventDefault or wait on an event_callback.
 */
const CLICK_TRACKING = `function trackClick(event) {
  /* auxclick is middle-click "open in new tab" — but also right-click. */
  if (event.type === 'auxclick' && event.button !== 1) return;
  var target = event.target;
  var link = target && target.closest && target.closest('[data-ga-event]');
  if (!link) return;
  gtag('event', link.dataset.gaEvent, {
    link_location: link.dataset.gaLocation,
    link_url: link.getAttribute('href') || undefined
  });
}
document.addEventListener('click', trackClick);
document.addEventListener('auxclick', trackClick);`;

const Analytics = () => {
  /* Vercel sets VERCEL_ENV itself, so preview deploys and `next dev` report
     nothing and the live property stays clean. NODE_ENV would be wrong here —
     it is "production" for a local `pnpm build && pnpm start` too. The data-ga-*
     attributes still render everywhere; only the script goes away, so the markup
     stays identical between environments and can be checked without sending a
     single hit. */
  if (process.env.VERCEL_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      {/* Inline scripts must carry an id or Next can't track and optimize them. */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
${CLICK_TRACKING}`}
      </Script>
    </>
  );
};

export default Analytics;
