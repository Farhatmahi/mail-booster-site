# Mail Booster (mail-booster.io): Design Brief

Put this file in the repo root next to the copy doc. It tells Claude Code how the site should look and move. The copy lives in the "Mail Booster: Website Copy" doc; use it word for word.

References studied (Nov 2026): accessgrid.com, mindcloud.co, inboxlift.io.

---

## 1. What makes the references feel premium

All three are built with plain CSS keyframes, triggered when sections scroll into view. None of them use GSAP, Framer Motion, Lenis or Three.js. The premium feel comes from these choices, not from a library:

1. **The product is the hero.** AccessGrid shows a phone where a wallet pass animates. MindCloud shows a chat prompt box. InboxLift shows a Gmail inbox. The visitor sees the product working before reading a word.
2. **Restraint.** White and near-white surfaces, one saturated blue, and one dark section for contrast. Almost no decoration.
3. **Medium-weight type with tight tracking.** AccessGrid's 64px headline is weight 500 at -2.24px letter-spacing (-0.035em). Big and calm, not heavy and shouting.
4. **Two-tone sentences.** A dark first half and a gray second half ("Leaders trust us. Operators depend on us."), or white and light blue on dark ("Connect to anything. / Automate everything.").
5. **Hairline structure.** Dashed vertical guide lines run down the page at the container edges. Logo grids are cells separated by hairlines. The page feels engineered, like a blueprint.
6. **A floating pill nav.** A centered, rounded nav that sits off the top edge, with a blurred background.
7. **Living data.** MindCloud's activity feed shows one focused card with faded, blurred neighbors and updates live. Big numbers roll like an odometer. InboxLift's revenue line draws itself on scroll.
8. **One orchestrated moment per section.** Hero copy fades in with a slight blur and stagger. The main CTA has a glow that orbits its border. A dark section has tabs that switch a product demo. Motion always shows the product, not decoration.

What to beat InboxLift on: their cream-and-emerald look, heavy Archivo 800 caps, and gradient text are the 2025 SaaS template. Their page is also JavaScript-rendered, so non-JS fetchers get no body text. Mail Booster should be calmer, more engineered, and fully readable as static HTML.

---

## 2. Design tokens

### Color

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | Page background |
| `--surface` | `#F7F7F8` | Alternate sections, cards |
| `--ink` | `#0A0C14` | Headlines, primary text |
| `--ink-2` | `#4F5262` | Body text |
| `--ink-3` | `#8A8D9C` | Muted text, second tone in two-tone headlines |
| `--line` | `#E6E7EC` | Hairlines, card borders |
| `--blue` | `#2B59FF` | The one accent: buttons, Primary tab, links |
| `--blue-deep` | `#1238D9` | Button hover |
| `--blue-soft` | `#E8EEFF` | Tints, badges |
| `--navy` | `#050A24` | Top of the hero sky, dark section |
| `--dark` | `#111218` | Dark showcase section (pricing) |
| `--promo` | `#C9A15A` | Only for the Promotions tab marker. Never a button. |

Hero sky gradient (MindCloud-style, in our blue), top to bottom:
`linear-gradient(180deg, #050A24 0%, #0C1D7A 30%, #2B59FF 58%, #BFD0FF 82%, #FFFFFF 100%)`

### Type

- **One family: Geist** (Google Fonts), weights 400, 500, 600. It is the closest free match to AccessGrid's ABC Diatype.
- Headlines: weight 500, letter-spacing -0.035em, line-height 1.02.
  - H1: `clamp(44px, 6vw, 76px)`
  - H2: `clamp(32px, 4vw, 52px)`
  - H3: 22px, weight 600, -0.015em
- Body: 17px, weight 400, line-height 1.6, color `--ink-2`. Max line length 62ch.
- Small labels: 14px, weight 500, sentence case. No ALL CAPS eyebrow labels.
- Numbers: `font-variant-numeric: tabular-nums` so rolling numbers do not jitter.

**Headline case:** the copy doc has the hero in caps ("STOP SENDING TO PROMOTIONS. START LANDING IN PRIMARY."). Weight 500 Geist reads best in sentence case, like all three references. Recommended: "Stop sending to Promotions." in `--ink-3` (or 60% white on the sky) and "Start landing in Primary." in full white. Omar's call.

### Shape and depth

- Radius: 999px buttons and pills, 12px small cards, 20px large cards, 32px dark section and hero inbox.
- Borders: 1px `--line`. On dark: `rgba(255,255,255,.08)`.
- Shadow, one style only: `0 1px 2px rgba(10,12,20,.04), 0 24px 48px -24px rgba(10,12,20,.18)`.
- Page guides: 1px dashed vertical lines in `--line` at the left and right edge of the 1200px container, running the full page height (AccessGrid and MindCloud both do this).

### Layout

- Container 1200px, 24px side padding. Section padding 128px top and bottom on desktop, 80px on mobile.
- Hero centered. Most other sections left-aligned with a 2-column split (copy left, product UI right), alternating where it helps.

---

## 3. Motion system

Rules:
- Easing everywhere: `cubic-bezier(.16, 1, .3, 1)` (fast out, soft landing). Durations 500 to 900ms.
- Trigger with IntersectionObserver: add `.is-in` when a section is 25% visible, once. Pause looping animations when off-screen.
- Animate only `transform`, `opacity` and `filter`.
- Respect `prefers-reduced-motion`: show the final state, no loops.
- One orchestrated moment per section. No fade-up on every single element.

### Core animations (copy these)

```css
/* Hero copy in: fade, rise, unblur, staggered (MindCloud "hero-copy-in") */
@keyframes copy-in {
  from { opacity: 0; transform: translateY(14px); filter: blur(8px); }
  to   { opacity: 1; transform: none; filter: blur(0); }
}
.hero [data-stagger] { opacity: 0; animation: copy-in .9s cubic-bezier(.16,1,.3,1) forwards; }
.hero [data-stagger="1"] { animation-delay: .05s; }
.hero [data-stagger="2"] { animation-delay: .15s; }
.hero [data-stagger="3"] { animation-delay: .25s; }
.hero [data-stagger="4"] { animation-delay: .35s; }

/* CTA with a light orbiting its border (MindCloud "hero-cta-orbit") */
@property --angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
.btn-orbit { position: relative; isolation: isolate; }
.btn-orbit::before {
  content: ""; position: absolute; inset: -1.5px; border-radius: inherit; z-index: -1;
  background: conic-gradient(from var(--angle), transparent 0 70%, #BFD0FF 80%, #fff 85%, transparent 92%);
  animation: orbit 3.2s linear infinite;
}
@keyframes orbit { to { --angle: 360deg; } }

/* Ping: Primary tab dot, timeline dots, "test running" (all three refs use "ping") */
@keyframes ping { 75%, 100% { transform: scale(2.2); opacity: 0; } }

/* Section reveal (use on the section's main visual only) */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
.is-in .reveal { opacity: 1; transform: none; }

/* Line draw on scroll (InboxLift revenue curve, our trial timeline) */
.draw path { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1); }
.is-in .draw path { stroke-dashoffset: 0; } /* set pathLength="1" on the path */
```

Odometer numbers (MindCloud stats, our pricing): each digit is a vertical strip 0 to 9 inside an `overflow: hidden` box one digit tall; set `transform: translateY(-N * 1em)` with a 700ms transition. Use it for the plan price when the revenue slider moves.

---

## 4. Section by section

Copy for every section is in the copy doc. This is how each one should look and move.

### Nav: floating pill
Centered pill, 56px tall, white at 80% with `backdrop-filter: blur(16px)`, 1px `--line` border, sitting 16px from the top. Logo left, links center (How it works, Pricing, FAQ, Partners), "Start free trial" blue button right. On the dark hero sky the pill is `rgba(255,255,255,.08)` with white text. Once the visitor scrolls past the hero it becomes the white version (transition 300ms). On mobile it's a full-width pill with a menu button.

### Hero: the sky and the inbox (the signature moment)
- Full-width sky gradient (section 2). Optional: two slow, very soft blurred blue blobs drifting (InboxLift's `aurora-1/2`), 20s loops, 30% opacity.
- Centered: small pill "For Shopify brands on Klaviyo" (glass style), the two-tone H1, the subhead in 80% white, two buttons (primary white button with orbiting light; secondary glass button "See pricing"), then three check items.
- Copy enters with `copy-in`, staggered.
- Below the copy, overlapping the point where the sky turns white: **the inbox**, 880px wide, 32px radius, big shadow. It's the hero's product demo.
- Inbox animation sequence (loops every 7s, starts once it's visible):
  1. Promotions tab active (sand underline). "Your Brand" email sits 4th, under three loud sale emails.
  2. At 1.6s the "Your Brand" row lifts: scale 1.02, shadow grows, a blue outline appears.
  3. At 2.1s the tab underline slides to Primary (500ms) and turns blue, the promo rows fade out, and personal emails fade in. The "Your Brand" row glides to the top (700ms) and a blue "New" pill pops in with a single ping.
  4. The caption under the inbox changes from "Without Mail Booster: buried in Promotions" to "With Mail Booster: top of Primary".
- The working version of this sequence is in `assets/main.js` of the first preview build. Reuse the logic and restyle it.

### Trust strip: hairline grid
A row of 4 cells separated by 1px hairlines (AccessGrid logo-grid style), each with an icon and one line: Works inside your Klaviyo, No changes to your emails, One flat price, Live in 24 hours. When real brand logos with permission exist, the same grid holds the logos in grayscale.

### Problem: the big statement
- AccessGrid-style centered statement in H2 size, two-tone: the first sentence in `--ink`, the rest in `--ink-3`. Suggested: "Klaviyo says delivered. Gmail says Promotions. Your customers never see it."
- Below: three columns separated by hairlines, each with a 24px line icon and the three points from the copy doc.
- Motion: the gray part of the statement darkens word by word as the visitor scrolls through it (scroll-linked opacity, 0.35 to 1). It's the one motion in this section.

### How it works: three steps with tiny live UIs
Three cards. Each has a small animated UI on top, then the step title and text:
1. Book your trial call: a mini calendar where one slot gets selected (blue fill, ping).
2. We set it up: a "Klaviyo connected" row whose status dot goes from gray to blue, then a check appears.
3. Check your own numbers: two thin bars labeled Version A and Version B that fill side by side. No numbers on them.
Each card animates once when it scrolls in, staggered 150ms.

### Proof (launch version): the A/B test card
- 2-column: copy left, a large A/B test card right that looks like a clean Klaviyo-style report: "Campaign A/B test", Version A (Your email, as usual) and Version B (Same email, with Mail Booster), rows for open rate, click rate and revenue per recipient showing "Your result".
- Motion: a "Test running" pill with a ping dot, and a thin progress line that fills across the card.
- **Never show invented numbers.** When real Ecovac results exist, swap "Your result" for real figures and roll them in with the odometer.

### Why Mail Booster: comparison
Clean table: Do nothing, Rewrite your emails, Mail Booster. The Mail Booster column is a raised white card with a 1px blue top border and a soft blue glow behind it. Checks in blue, crosses in `--ink-3`. Below, the four reasons in a 4-column row with hairline dividers. No motion except the column card rising in.

### Pricing: the dark showcase (second signature moment)
- A full-width dark section (`--dark`), 32px radius, inset 16px from the page edges (AccessGrid's dark block). A soft blue glow at the top center.
- Centered H2 in white two-tone: "Priced by the size of your store." white, "Shown right here." in 50% white.
- **Price finder:** one large glass panel. Left: "Your average monthly Shopify revenue", a huge revenue figure, and a custom slider (blue track fill, white thumb with blue ring). Right: a white card with the plan name, the price rolling via odometer, the note and the CTA.
- Under it, the five tier cards in a row. The tier matching the slider gets a blue border and a faint blue fill (200ms transition).
- "Included on every plan" list in two columns with blue checks.
- Prices come from one JS config object, so changing a price is a one-line edit.

### Free trial: the timeline
Four steps (Day 0, Day 1, Days 2 to 6, Day 7) on a horizontal line. On scroll the line draws left to right (`draw`), and each dot pings once as the line reaches it. On mobile it becomes vertical.

### Team: chat recap
2-column. Left: the H2, body text and stats (80+ Klaviyo accounts handled, 7 agency partners; confirm both). Right: a chat window (MindCloud's chat demo style) where the recap message types in line by line when it scrolls into view, with a blinking cursor, then a small "Sent to #your-brand" footer.

### FAQ
2-column: H2 left (sticky on desktop), accordion right. Smooth height animation (animate `grid-template-rows: 0fr` to `1fr`). The plus icon rotates 45deg into an x.

### Final CTA: the sky again
The hero gradient flipped (white at the top, navy at the bottom), 32px radius, inset 16px. Centered headline in white, the orbiting-light CTA, and check items. It closes the page by echoing the hero.

### Footer
Simple and light. Logo and tagline, three link columns, hairline, small legal line including the trademark note. The dashed page guides end here.

---

## 5. Pages beyond home

Same tokens and components:
- `/free-trial`: centered narrow column. What we'll cover (3 checks), the form (name, work email, store URL, monthly revenue dropdown, campaigns per week dropdown, notes), then the booking calendar embed (Cal.com or Calendly, to be decided). Confirmation state "You're booked." Copy is in the doc.
- `/partners`: hero in a smaller sky gradient, 3 benefit cards, 3 steps, "Built for" row, Apply button. Copy is in the doc.
- `/privacy`, `/terms`: plain readable text pages, 70ch column.

---

## 6. Build rules for Claude Code

- Plain HTML, CSS, JS. No framework, no build step. Deploys straight to Cloudflare Pages.
- Files: `index.html`, `free-trial.html`, `partners.html`, `privacy.html`, `terms.html`, `assets/styles.css`, `assets/main.js`, `assets/img/`.
- Every word of copy in the HTML (no client-side rendering), so search engines read it all.
- Semantic HTML, one H1 per page, title and meta description on every page, Open Graph tags.
- Performance: no JS library over 10KB unless needed. Lighthouse 95+ on mobile. Preload Geist.
- Accessibility: visible focus rings in `--blue`, keyboard-operable slider, menu and accordion; `aria-live` on the price result; the inbox animation gets an `aria-label` describing it; contrast AA.
- Responsive down to 360px. Test the inbox, price finder and timeline on mobile in particular.
- `prefers-reduced-motion`: all loops off, final states shown.

## 7. Don'ts

- No invented numbers, logos, testimonials or results. Placeholder sections stay hidden until real data exists.
- No cream background, emerald green, or gradient text (that's InboxLift).
- No ALL CAPS eyebrow labels above every heading.
- No fade-up on every element. One moment per section.
- No stock illustrations or 3D blobs. The product UI is the illustration.
- Don't name competitors on the page.

---

## Prompt to paste into Claude Code

> Build the Mail Booster marketing site (mail-booster.io) as a static site with plain HTML, CSS and JS, no framework. Follow DESIGN.md exactly for tokens, layout, components and motion. Use the copy from the "Mail Booster: Website Copy" doc word for word, in the section order DESIGN.md lists. Start with the home page only: build the nav, the hero with the animated inbox, and the trust strip first, then stop so I can review in the browser before you build the rest. Respect prefers-reduced-motion and keep every word in the HTML.
