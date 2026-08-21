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
 * never blocks first paint or hydration. There is one route and no client-side
 * navigation, so nothing needs to re-fire a pageview on route change.
 */
const GA_MEASUREMENT_ID = "G-VC7X9406GZ";

const Analytics = () => (
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
gtag('config', '${GA_MEASUREMENT_ID}');`}
    </Script>
  </>
);

export default Analytics;
