# Mail Booster: mail-booster.io

Marketing site for Mail Booster. Plain HTML, CSS and JavaScript, with no framework and no build step. Cloudflare Pages serves the `site/` folder as is.

## Preview locally

```sh
npx serve site
```

Then open http://localhost:3000. `serve` handles clean URLs (`/free-trial`) and the 404 page the same way Cloudflare Pages does. Opening the HTML files directly (`file://`) won't work, because links and assets use root paths (`/assets/...`).

## What's where

```
site/                  deployed to Cloudflare Pages (build output directory)
  index.html           home
  free-trial.html      /free-trial: trial-call booking embed
  partners.html        /partners: agency partners, with a booking embed at #apply
  privacy.html         /privacy (draft, noindex until legal review)
  terms.html           /terms   (draft, noindex until legal review)
  404.html             not-found page
  robots.txt, sitemap.xml, _headers
  assets/
    config.js          prices, setup time, booking links, analytics token
    styles.css, main.js
    fonts/geist-latin.woff2
    img/favicon.svg, img/og.png (1200x630 social image)
partials/              shared nav and footer (not deployed)
tools/                 maintenance scripts (not deployed)
DESIGN.md, COPY.md     design brief and copy snapshot (not deployed)
```

## Changing things

| To change | Edit | Then run |
|---|---|---|
| Prices, revenue ranges, setup time | `site/assets/config.js` | `node tools/sync-config.mjs` |
| Booking provider and links | `site/assets/config.js` (`booking`) | nothing, read at runtime |
| Analytics token | `site/assets/config.js` (`analytics`) | nothing, read at runtime |
| Nav or footer | `partials/nav.html`, `partials/footer.html` | `node tools/sync-partials.mjs` |
| Any other copy | the page's HTML in `site/` | nothing |

Both sync scripts edit the HTML in place, so every word stays in the HTML that search engines read. Commit the result. Running them again when nothing has changed does nothing.

**Nav settings per page.** Each page has `<!-- partial:nav theme=dark|light active=ID -->`. `theme=dark` is for pages that start on the dark sky (home, partners). `active` marks the current item: `free-trial`, `partners`, `how`, `pricing` or `faq`.

**Booking.** Set `booking.provider` to `'calcom'` or `'calendly'`, `booking.url` to the trial-call link, and `booking.partnerUrl` to the partner-call link. While a link is empty, or if the calendar fails to load, visitors see an "email us" fallback and the browser console shows a reminder. Set up the qualifying questions inside the booking tool:
- store URL
- monthly Shopify revenue: Up to $50K, $50K to $150K, $150K to $400K, $400K to $1M, Over $1M
- campaigns per week: 1 or fewer, 2 to 3, 4 or more
- notes (optional)

Preview the confirmation state at `/free-trial#booked`.

**Social image.** `site/assets/img/og.png` is a screenshot of `tools/og-image.html` at 1200x630. To regenerate it, run `npx serve .` from the repo root, open `http://localhost:3000/tools/og-image` in Chrome, and capture the page at 1200x630 (DevTools → device toolbar → 1200 × 630 → Capture screenshot). Or ask Claude Code to re-render it.

## Open items before launch

- Final prices and setup time: draft values in `config.js`.
- Booking provider and both booking links: placeholders in `config.js`.
- Cloudflare Web Analytics token: placeholder in `config.js` (or use automatic setup, see the checklist).
- Privacy policy and terms: fill the `[brackets]`, get legal review, then remove the `noindex` meta tag from both pages. They can be added to `sitemap.xml` after that.
- Partner pricing model: a third benefit card ("Recurring commission" or reseller pricing) is waiting in `site/partners.html`. Until it's decided, the partners page makes no commission or revenue-share claims.
- Results section on the home page: stays out until there are real, publishable A/B results.

## Deploy checklist: Cloudflare Pages + mail-booster.io

1. Push this repo to GitHub or GitLab.
2. In Cloudflare, go to **Workers & Pages → Create → Pages → Connect to Git** and pick the repo.
3. Build settings: **Framework preset: None**, **Build command: empty**, **Build output directory: `site`**. Save and deploy.
4. Open the `*.pages.dev` preview URL and check:
   - `/`, `/free-trial`, `/partners`, `/privacy` and `/terms` load.
   - `/free-trial.html` redirects to `/free-trial`.
   - A made-up path shows the 404 page.
   - `/DESIGN.md` and `/COPY.md` return 404.
5. **Custom domain.** In the Pages project, go to **Custom domains → Set up a domain** and add `mail-booster.io`, then `www.mail-booster.io`. If the domain's DNS is on Cloudflare, the records are created for you. Otherwise, add the CNAME records it shows at your DNS host. Wait for both to show **Active**, with SSL issued.
6. **One canonical host.** Redirect `www` to the bare domain with a **Redirect Rule** (Rules → Redirect Rules): when the hostname equals `www.mail-booster.io`, send a 301 to `https://mail-booster.io` with the same path, keeping the query string. Also redirect the `*.pages.dev` hostname, or leave it alone: every page already declares `https://mail-booster.io/...` as its canonical URL.
7. **HTTPS.** SSL/TLS → Edge Certificates: turn on **Always Use HTTPS**. Turn on HSTS only once you're sure every subdomain is HTTPS.
8. **Analytics, one way only.** Either:
   - turn on **Web Analytics** in the Pages project (Metrics), which injects the beacon automatically, and leave `analytics.cloudflareToken` empty; or
   - create a Web Analytics site for `mail-booster.io`, paste its token into `config.js`, and redeploy.

   Doing both counts every visit twice.
9. **Booking links.** Set `booking.provider`, `booking.url` and `booking.partnerUrl` in `config.js`, push, and make a test booking on both pages. The trial page should switch to "You're booked."
10. **Search.** Add `mail-booster.io` to Google Search Console (DNS verification), and submit `https://mail-booster.io/sitemap.xml`.
11. **Social preview.** Paste `https://mail-booster.io` into a link-preview checker, such as the LinkedIn Post Inspector or opengraph.xyz, to confirm the title, description and `og.png`.
12. **Final check on the live domain.** Run Lighthouse (mobile) on `/`, `/free-trial` and `/partners`. Tab through each page with the keyboard. Load the home page with reduced motion turned on.
