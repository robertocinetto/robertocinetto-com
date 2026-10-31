# Soffio on robertocinetto.com (2026-10-31)

Branch `soffio-product`, not pushed, not merged.

## What changed
- New route `/products` (`src/app/products/page.tsx`), copy in `src/content/products.ts`. Built from the privacy page's pieces (Shell, Section, SiteFooter), so it follows the Night Shift rules: radius 0, no shadows, no icons in content, sentence case, haze body copy.
- One band per product, anchor `/products#soffio`. More products: append an object to `products`, no component change.
- Soffio entry: name, "Dictation for Mac that is fast, private and yours." (the Soffio site's tagline), four facts (Dictation for Mac; Private, transcribed on your Mac; Works in any app; Pay once, free trial no card), link to https://getsoffio.app, support@getsoffio.app, app icon (`public/soffio-icon.png`, copied from the Soffio site's `icon-144.png`).
- Navigation: the site has no header, so a "Products" link was added to the footer next to Privacy (`SiteFooter.tsx`, `PRODUCTS_PATH`/`PRODUCTS_LABEL` in `site.ts`). The home page was not touched.
- `/products` added to the sitemap. Docs updated (`architecture.md`, `content-and-voice.md`).
- English only: the site is not multilingual.

## Checks
`pnpm lint`, `npx tsc --noEmit`, `pnpm build` all clean. Looked at the page with headless chrome-devtools at 1440 wide and 375 mobile (full-page screenshots): layout correct, four facts in a row on desktop and stacked on mobile, footer wraps cleanly.

## To decide
1. Price omitted on purpose: the Soffio site has US$29 but also a launch price (US$14.50 for 60 days, start date still TODO), so a copy here would drift. Add it if wanted.
2. Facts copy is a short paraphrase of the Soffio site's English copy ("Offline", "No account", "125 ms" were not used). Check the wording.
3. The page is indexable and linked from the footer of every page, so it goes live as soon as this branch is merged and deployed, while getsoffio.app is not public yet. Merge only at launch, or add `robots: { index: false }` and drop the sitemap entry until then.
4. Click tracking: the new links are untracked (GA events and the privacy policy's wording on tracked clicks would need updating). Left as is.
5. The icon image has its own rounded corners (baked in); the "radius 0" rule is about CSS, but say if you want it squared or removed.

## Home page products section
- New band on the home page (`src/components/home/Products.tsx`), placed right after Background and sharing its night band (`flush`, like services and work). Any other slot would break the night/panel alternation (the page comment in `page.tsx` says so). Heading column left ("Apps I build and sell myself", two plain sentences, link "All products" to /products), cards right.
- Copy in `src/content/products.ts` (`homeProducts`, `productsPage.intro`); cards come from the same `products` array, so a new product appears on both pages. No invented facts.
- `ProductCard.tsx` (new, shared): flat panel card like the work cards (no radius/shadow), icon, name, "Mac app" chip, description, site link. `detailed` adds the four facts and support email, used on /products, which now has an intro paragraph and one night band with the card (was one band per product).
- External links: `ExternalLink` now always sets `target="_blank" rel="noopener noreferrer"` (a caller's `rel`, e.g. "me", is appended) and has the visually hidden "(opens in a new tab)". Applies to getsoffio.app on home and /products. mailto and /products links are unchanged.
- Checks: `pnpm lint`, `tsc --noEmit`, `pnpm build` clean (dev server unaffected). Looked at home and /products at 1440 and 375: no horizontal overflow, layout fine.
- Open: the home band has no wording on pricing or launch status; the /products page is still indexable before getsoffio.app is public (decision 3 above).
