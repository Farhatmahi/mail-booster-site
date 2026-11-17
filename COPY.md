# Mail Booster: Website Copy (mail-booster.io)

> Snapshot of the Claude Doc "Mail Booster: Website Copy (mail-booster.io)", revision 35, saved 2026-11-18.
> The doc is the live source: https://claude.ai/artifact/DgC7XbSZ2KFDPDRcQqg7oP
>
> **Site decisions made on top of this copy (confirmed by Omar):**
> - Hero headline and eyebrow are set in sentence case (same words): "Stop sending to Promotions. Start landing in Primary." / "For Shopify brands on Klaviyo". Section labels are sentence case too (DESIGN.md: no ALL CAPS eyebrows).
> - Trust strip line 3 is shortened to "Flat price, no cut of sales" so all four cells sit on one line.
> - Draft prices ($99 / $199 / $349 / $599) and the setup time (24 hours) live in `site/assets/config.js`, along with the booking provider and link. Run `node tools/sync-config.mjs` after editing it.
> - Confirmed fills for brackets: "Slack or email", "campaign", "campaigns", the flows FAQ answer ("Today Mail Booster works on your Klaviyo campaigns."), hello@mail-booster.io.
> - Footer bottom line is "© 2026 Mail Booster." only. "A product of InboxImplementor." and the small-print trademark line were removed (2026-11-18); a marked placeholder in `partials/footer.html` holds the spot for text to come.
> - /free-trial uses an embedded Cal.com or Calendly calendar instead of an HTML form; the qualifying questions live in the booking tool.

## Read this first

This is the full site copy, in the order a visitor sees it: the home page top to bottom, then the /free-trial and /partners pages. Text in [brackets] is for you to fill: prices, numbers, names and terms.

- **New in this version:** a problem section after the hero, a comparison against the alternatives, a day-by-day trial section, and full copy for the booking and partner pages.
- **One goal:** every button leads to the /free-trial booking page.
- **Honest by default:** the page never names a competitor and never shows a number you haven't measured.
- **Still open:** whether 7 days gives enough campaign sends for a clear A/B result, whether the trial needs a card, and whether to keep a money-back guarantee on top of the free trial.

## Home 1: Navigation bar

- **Logo:** Mail Booster
- **Links:** How it works · Pricing · FAQ · Partners
- **Button:** Start free trial
- **On mobile:** links go in a menu, the button stays visible

## Home 2: Hero

**Eyebrow:** FOR SHOPIFY BRANDS ON KLAVIYO

**Headline:** STOP SENDING TO PROMOTIONS. START LANDING IN PRIMARY.

**Subhead:** Mail Booster gets more of your Klaviyo campaigns out of the Promotions tab and into Primary, where customers actually read. No rewriting, no redesign, nothing to install. Plans from $[99] a month, priced by your store's revenue.

**Primary button:** Start your 7-day free trial

**Secondary button:** See pricing

**Under the buttons:** Free for 7 days · Set up for you · Cancel anytime

**Hero visual:** a Gmail inbox with two tabs. In Primary, your email sits at the top, bold and unread. In Promotions, the same email is buried under a stack of sale emails. Two small labels:

- Primary: "Where they read."
- Promotions: "Where they scroll past."

**Strip under the hero:** Works inside your Klaviyo · No changes to your emails · One flat price, never a cut of sales · Live in [24 hours]

**Other headlines to test:**

- Same emails. Primary inbox.
- Get your Klaviyo campaigns out of Promotions.
- Stop sending your best emails to the tab nobody opens.
- Your emails are good. Gmail is hiding them. (short version, works well for ads)

## Home 3: The problem

**Label:** THE PROBLEM

**Headline:** Delivered isn't the same as seen.

**Body:** Gmail sorts most brand emails into the Promotions tab. Your subscriber signed up, your email arrived, and Klaviyo counts it as delivered. Then it waits in a tab many people rarely open, under every other sale that week.

**Three cards:**

**Klaviyo can't see the tab.** Your dashboard reports delivery, not where the email landed. A healthy delivery rate can hide a big share of your list that never saw the email.

**Every send costs the same.** You pay Klaviyo for every profile you email. An email that sits unread in Promotions costs exactly as much as one that gets opened.

**The usual fixes cost you sales.** Plain-text emails, fewer images, asking subscribers to drag you to Primary. Some of it helps, but it means giving up the emails that sell.

**Line under the cards:** Mail Booster fixes where your emails land without touching what you send.

## Home 4: How it works

**Label:** HOW IT WORKS

**Headline:** Live in a day. Nothing for you to do.

**Subhead:** We set everything up inside your Klaviyo account. You keep sending the way you always have.

1. **Book your trial call.** In 20 minutes we look at your account together, check where your emails land today, and confirm your plan.
2. **We set it up.** Mail Booster goes live on your campaigns within [24 hours]. Your copy, design, offers and schedule stay exactly as they are.
3. **Check your own numbers.** Your next campaign goes out as a Klaviyo A/B test: your usual version against the Mail Booster version, sent to a split of the same list. Opens, clicks and revenue show up side by side in your own dashboard.

**Button:** Start your 7-day free trial

## Home 5: Results

This section has two versions. Use the launch version until you have real A/B results you're allowed to publish.

**Launch version (no results yet)**

**Label:** PROOF, NOT PROMISES

**Headline:** Don't take our word for it. Take your Klaviyo's.

**Body:** We don't show you someone else's numbers. In your trial you run a real Klaviyo A/B test on your own list: the same campaign, sent with and without Mail Booster. If it doesn't move your numbers, you walk away.

**Visual:** one annotated screenshot of a Klaviyo A/B test setup, with Version A (your email) and Version B (with Mail Booster) side by side. Caption: "This is the exact test you'll run in your trial." [Use a real screenshot with brand details blurred.]

**Results version (once you have data)**

**Headline:** Same emails. Different inbox. Measured in Klaviyo.

**Stat blocks** (each with the test period and number of sends under it):

- [X]% change in open rate
- [X]% change in click rate
- [X]% change in revenue per recipient
- [N] campaigns tested across [N] brands

**Case study card** (one brand, with permission):

- [Brand], [niche], [monthly Shopify revenue range]
- What we tested: [campaign type, list size, dates]
- What happened: [one plain sentence]
- Quote: [their exact words, name and role]

**Logo strip:** Brands using Mail Booster [logos, with permission only]

**Footnote:** Results vary by brand, list and sending volume. That's why every trial starts with a test on your own account.

## Home 6: Why Mail Booster

**Label:** WHY MAIL BOOSTER

**Headline:** Fix the inbox, not your emails.

**Subhead:** You have three options for the Promotions tab. Here is how they compare.

**Comparison table:**

|  | Do nothing | Rewrite your emails | Mail Booster |
| --- | --- | --- | --- |
| Your emails stay as they are | Yes | No | Yes |
| Work on your side | None | Every campaign | None, we set it up |
| Measured in your own Klaviyo | No | Rarely | Yes, with an A/B test |
| Cost | Free | Your team's time | From $[99] a month |

**Four reasons below the table:**

**Your price is on the page.** No sales call to find out what it costs. Your plan follows your Shopify revenue, so a $40K store doesn't pay what a $1M store pays.

**Flat, never a cut of your sales.** No percentage of revenue, no setup fee. A record Black Friday doesn't raise your bill.

**Proof before you pay.** Your first 7 days are free, with an A/B test in your own account. You see the result before you spend anything.

**A person, not a portal.** You get a named contact on [Slack / email] who answers the same day.

## Home 7: Pricing

**Label:** PRICING

**Headline:** Priced by the size of your store. Shown right here.

**Subhead:** Find your monthly Shopify revenue and that's your plan. One flat price, no setup fee, no percentage of sales, cancel anytime.

**Pricing cards** (prices are drafts, set them once you've confirmed what the alternative costs):

| Plan | Monthly Shopify revenue | Price | Card button |
| --- | --- | --- | --- |
| Starter | Up to $50K | $[99]/month | Start free trial |
| Growth (badge: Most popular) | $50K to $150K | $[199]/month | Start free trial |
| Scale | $150K to $400K | $[349]/month | Start free trial |
| Pro | $400K to $1M | $[599]/month | Start free trial |
| Enterprise | Over $1M | Custom | Talk to us |

**One line on each card:**

- Starter: For stores growing their list.
- Growth: For stores where email is a real revenue channel.
- Scale: For brands sending several campaigns a week.
- Pro: For brands where every send is worth thousands.
- Enterprise: Several stores, high volume, or custom needs.

**Included on every plan:**

- Setup inside your Klaviyo, done for you
- Mail Booster on your [campaigns]
- 7-day free trial with a Klaviyo A/B test
- A named contact on [Slack / email]
- A plain-English recap after every [campaign / month]
- Cancel anytime, no contract

**Under the cards:** Not sure which plan fits? Use your average monthly Shopify revenue over the last 3 months. If you move into another range, your price changes from your next billing date. [Confirm how you will check revenue.]

**Agency line:** Running Klaviyo for several clients? See partner pricing.

## Home 8: The free trial

**Label:** YOUR FREE TRIAL

**Headline:** 7 days. Your list. Your numbers.

**Subhead:** Here's exactly what happens after you book.

**Timeline (four steps across the page):**

1. **Day 0: Trial call.** 20 minutes on Google Meet. We look at your Klaviyo account and pick the campaigns to test.
2. **Day 1: Live.** We set up Mail Booster inside your Klaviyo. You don't install or change anything.
3. **Days 2 to 6: Test.** Your campaigns go out as Klaviyo A/B tests. You see opens, clicks and revenue for both versions as they come in.
4. **Day 7: Decide.** We send you a plain-English recap of what changed. Keep going on your plan, or walk away. [Confirm: card or no card, and what happens if they do nothing.]

**Button:** Book your trial call

## Home 9: Who is behind it

**Label:** WHO'S BEHIND MAIL BOOSTER

**Headline:** Built by people who work inside Klaviyo every day.

**Body:** Mail Booster comes from the team at InboxImplementor. We build and run Klaviyo flows, campaigns and templates for e-commerce brands and the agencies behind them. We know what a clean Klaviyo account looks like, so we change what needs changing and leave everything else alone.

**Origin line:** [One sentence, in your own words, on why you built Mail Booster.]

**Stat row** (only numbers you can back up today):

- [80+] Klaviyo accounts handled
- [N] years working in Klaviyo
- [N] agency partners

**Sub-section: How we work together**

**Headline:** Plain updates. No dashboard to babysit.

**Body:** After every [campaign / month] you get a short recap: where your emails landed, how they did against your usual version, and what we're testing next. If something looks off, you hear from us the same day, not at the end of the month.

**Support hours:** [Your real hours and response time.]

## Home 10: FAQ

**Label:** FAQ

**Headline:** Questions brands ask before they book.

**Subhead:** Not covered here? Ask us on your trial call.

**How does Mail Booster work?** Gmail decides which tab an email goes to by reading signals in the message. Mail Booster adds a placement layer to your campaigns that helps them read like mail people want in Primary. Your copy, design and Klaviyo setup stay the same. We keep the exact method private.

**Do I have to change my emails?** No. Keep your images, your offers and your design. You don't need to switch to plain text.

**Can you guarantee my emails land in Primary?** No, and nobody honestly can. Gmail makes the final call. What we can do is measure it, so your trial is a Klaviyo A/B test on your own list, in your own numbers.

**How does the free trial work?** Book a 20-minute call. We set up Mail Booster inside your Klaviyo, and for 7 days your campaigns run as A/B tests at no cost. At the end you get a recap and decide whether to keep going.

**Do I need a card to start?** [Your answer.]

**How long does setup take?** Most stores are live within [24 hours] of the trial call. There's nothing to install on your Shopify store.

**Does it work on flows or only campaigns?** [Today: campaigns. Say that plainly, and add flows here when they're supported.]

**Will it hurt my sender reputation?** [Your honest answer, once you've run it on enough accounts. Don't publish a blanket "it's safe" you can't back up.]

**What about Outlook, Apple Mail and Yahoo?** Mail Booster is built for Gmail's Primary and Promotions tabs. [Confirm what to say about other inboxes.]

**How is my price set?** By your average monthly Shopify revenue over the last 3 months. Find your range in the pricing table.

**What if my revenue changes?** Your plan moves with it from your next billing date, up or down.

**Is there a contract?** No. Month to month, cancel anytime.

**I run an agency. Can I use this for my clients?** Yes. See the partner page for agency pricing and commission.

## Home 11: Final call to action and footer

**Label:** TRY MAIL BOOSTER

**Headline:** Your next campaign could be the first one they actually see.

**Body:** Book a 20-minute call. We set everything up, you get 7 days free, and your own Klaviyo tells you if it's worth it.

**Button:** Start your 7-day free trial

**Under the button:** Free for 7 days · Live in [24 hours] · No changes to your emails · Cancel anytime

**Footer:**

- **Logo and line:** Mail Booster. Get your Klaviyo campaigns out of Promotions, without changing a single email.
- **Product:** How it works · Pricing · FAQ
- **Company:** Partners · Start free trial · [hello@mail-booster.io]
- **Legal:** Privacy policy · Terms
- **Bottom line:** © 2026 Mail Booster. [More text to come.]

## Page /free-trial: Booking page

**Headline:** Start your 7-day free trial.

**Subhead:** Book a 20-minute call. We set up Mail Booster in your Klaviyo with you, and your 7 days start the day it goes live.

**What we'll cover on the call:**

- Where your Klaviyo emails land today
- Which campaigns we'll A/B test during your trial
- Your plan and price, based on your Shopify revenue

**Form, before the calendar:**

- Name
- Work email
- Store URL
- Monthly Shopify revenue (dropdown: Up to $50K, $50K to $150K, $150K to $400K, $400K to $1M, Over $1M)
- Campaigns you send per week (dropdown: 1 or fewer, 2 to 3, 4 or more)
- Anything we should know? (optional)

The campaigns-per-week question tells you before the call whether 7 days is enough for a clear test.

**Form button:** Choose a time

**Next to the calendar:** 20 minutes · Google Meet · No prep needed

**Confirmation screen**

**Headline:** You're booked.

**Body:** Check your inbox for the invite. To get you live fast after the call, have this ready:

- Admin access to your Klaviyo account [confirm how access is given]
- The campaigns you plan to send in the next 7 days

**Line:** Questions before the call? Reply to the invite email and we'll answer.

## Page /partners: Agency partners

**Label:** FOR AGENCIES

**Headline:** Give every client a revenue lift you didn't have to build.

**Subhead:** Add Mail Booster to the Klaviyo accounts you already run. We do the setup, your clients see the result, and you earn on every account that stays.

**Three cards:**

**Recurring commission.** [X]% of every referred account's plan, every month they stay. [Or partner pricing you resell at your own margin. Pick one.]

**White-label reports.** Plain-English results you can drop straight into your client reports, with or without our name.

**We do the work.** We set up and run Mail Booster inside each client's Klaviyo. Your team doesn't learn a new tool.

**How it works:**

1. **Apply.** Two minutes. Tell us about your agency and your clients. We reply within [one business day].
2. **Run a trial on one client.** Pick an account, we set it up, and you see the A/B result before you offer it to anyone else.
3. **Roll it out.** Add more clients when you're ready. Pricing follows each store's Shopify revenue, same as on our site.

**Built for:** Klaviyo and retention agencies · Freelance email marketers · Fractional CMOs running e-commerce brands

**Button:** Apply to partner

**Under the button:** Already working with InboxImplementor? [Talk to your contact directly.]
