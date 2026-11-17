/* Mail Booster site config: the ONE place to change prices and the setup time.
 *
 * After editing, run from the repo root:   node tools/sync-config.mjs
 * That writes these values into every HTML page (so search engines and no-JS
 * visitors see them). The pricing slider also reads this file directly.
 *
 * Every element marked data-cfg="..." in the HTML gets its text from here.
 */
window.MB_CONFIG = {
  /* "Live in 24 hours", "within 24 hours", ... */
  setupTime: '24 hours',

  /* Plans, smallest first. maxRevenueK = top of the range in $K of monthly
     Shopify revenue (Infinity for the last plan). price = null means "Custom". */
  plans: [
    { id: 'starter',    name: 'Starter',    price: 99,   maxRevenueK: 50,       range: 'Up to $50K' },
    { id: 'growth',     name: 'Growth',     price: 199,  maxRevenueK: 150,      range: '$50K to $150K' },
    { id: 'scale',      name: 'Scale',      price: 349,  maxRevenueK: 400,      range: '$150K to $400K' },
    { id: 'pro',        name: 'Pro',        price: 599,  maxRevenueK: 999,      range: '$400K to $1M' },
    { id: 'enterprise', name: 'Enterprise', price: null, maxRevenueK: Infinity, range: 'Over $1M' }
  ],

  /* Stops on the pricing slider, in $K of monthly revenue. 1000 shows as "$1M+". */
  revenueStepsK: [10, 25, 40, 50, 75, 100, 150, 200, 300, 400, 600, 800, 1000],
  revenueStartK: 75,

  /* ================= BOOKING: PLACEHOLDERS, FILL THESE IN =================
     Both booking calendars are embedded inline, from the same provider.
     provider:   'calcom' or 'calendly'
     url:        the 20-minute trial call, shown on /free-trial, e.g.
                 'https://cal.com/your-team/trial-call'  or
                 'https://calendly.com/your-team/trial-call'
     partnerUrl: the partner application call, shown on /partners#apply
     While a link is empty (or the calendar fails to load), visitors see a
     short "email us" fallback instead.
     Set up the qualifying questions (store URL, monthly Shopify revenue,
     campaigns per week, notes) as booking questions inside the tool. */
  booking: {
    provider: 'calcom',  // PLACEHOLDER: 'calcom' or 'calendly'
    url: '',             // PLACEHOLDER: trial call booking link
    partnerUrl: ''       // PLACEHOLDER: partner application booking link
  },

  /* ================= ANALYTICS: PLACEHOLDER =================
     Cloudflare Web Analytics (cookieless, no banner needed).
     Paste the token from Cloudflare > Web Analytics > your site > "Manage site".
     Leave empty to load nothing. If you turn on automatic Web Analytics for
     the Pages project instead, leave this empty so visits aren't counted twice. */
  analytics: {
    cloudflareToken: ''  // PLACEHOLDER: Cloudflare Web Analytics token
  }
};

/* Resolves a data-cfg key to its text. Shared by the browser and tools/sync-config.mjs. */
window.MB_CONFIG.text = function (key) {
  var c = window.MB_CONFIG;
  var money = function (p) { return p === null ? 'Custom' : '$' + p; };
  var plan = function (id) {
    for (var i = 0; i < c.plans.length; i++) if (c.plans[i].id === id) return c.plans[i];
    throw new Error('Unknown plan: ' + id);
  };
  var parts = key.split('.');
  if (key === 'setup') return c.setupTime;
  if (key === 'from') return money(c.plans[0].price);          /* lowest plan price */
  if (parts[0] === 'price') return money(plan(parts[1]).price);  /* price.growth -> $199 */
  if (parts[0] === 'range') return plan(parts[1]).range;         /* range.growth -> $50K to $150K */
  if (parts[0] === 'name') return plan(parts[1]).name;
  throw new Error('Unknown config key: ' + key);
};
