/* Mail Booster: progressive enhancement only. Every word is in the HTML. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var hasIO = 'IntersectionObserver' in window;
  var CFG = window.MB_CONFIG;
  var motionOn = function () { return root.classList.contains('motion'); };

  /* ---------- Config: keep visible values in step with assets/config.js ----------
     tools/sync-config.mjs already writes these into the HTML; this only matters
     if config.js was edited and the sync wasn't run yet. */
  if (CFG && CFG.text) {
    document.querySelectorAll('[data-cfg]').forEach(function (el) {
      try {
        var v = CFG.text(el.getAttribute('data-cfg'));
        if (el.textContent !== v) el.textContent = v;
      } catch (e) { /* unknown key: leave the HTML as written */ }
    });
  }

  /* ---------- Nav: dark glass on the sky, white once past it ---------- */
  var nav = document.getElementById('nav');
  var sentinel = document.getElementById('nav-sentinel');

  if (nav && sentinel && hasIO) {
    var navBottom = function () { return nav.getBoundingClientRect().bottom; };
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        nav.classList.toggle('is-light', e.boundingClientRect.top < navBottom());
      });
    }, { rootMargin: '-' + Math.round(navBottom()) + 'px 0px 0px 0px' }).observe(sentinel);
  } else if (nav) {
    nav.classList.add('is-light');
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = nav && nav.querySelector('.menu-btn');
  var menu = document.getElementById('nav-menu');

  if (menuBtn && menu) {
    var setOpen = function (open, returnFocus) {
      nav.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      if (open) {
        var first = menu.querySelector('a');
        if (first) first.focus();
      } else if (returnFocus) {
        menuBtn.focus();
      }
    };
    menuBtn.addEventListener('click', function () {
      setOpen(menuBtn.getAttribute('aria-expanded') !== 'true', false);
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false, false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false, true);
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !nav.contains(e.target)) setOpen(false, false);
    });
    nav.addEventListener('focusout', function (e) {
      if (nav.classList.contains('is-open') && e.relatedTarget && !nav.contains(e.relatedTarget)) setOpen(false, false);
    });
    window.matchMedia('(min-width: 861px)').addEventListener('change', function (q) {
      if (q.matches) setOpen(false, false);
    });
  }

  /* ---------- Pause looping animations when their section is off-screen ---------- */
  var loops = document.querySelectorAll('[data-loop]');
  if (loops.length && hasIO) {
    var loopIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.target.classList.toggle('is-paused', !e.isIntersecting); });
    });
    loops.forEach(function (el) { loopIO.observe(el); });
  }

  /* ---------- Section reveals: .is-in once a section is 25% visible ---------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length) {
    if (!hasIO || !motionOn()) {
      reveals.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.25 });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Hero inbox: Promotions -> Primary, every 7s while on screen ----------
     States live in CSS (.demo / .is-lifting / .is-primary). This only sequences classes. */
  var demo = document.getElementById('demo');

  if (demo && hasIO && motionOn()) {
    var TIMING = { lift: 1600, move: 2100, settle: 3100, out: 6300, reset: 6650, back: 6700, loop: 7000 };
    var timers = [];
    var running = false;
    var visible = false;
    var firstRun = true;

    var at = function (ms, fn) { timers.push(window.setTimeout(fn, ms)); };

    var jumpToPromotions = function () {
      demo.classList.add('no-anim');
      demo.classList.remove('is-primary', 'is-lifting');
      void demo.offsetWidth; // commit the jump before transitions return
      demo.classList.remove('no-anim');
    };

    var cycle = function () {
      at(TIMING.lift, function () { demo.classList.add('is-lifting'); });
      at(TIMING.move, function () { demo.classList.add('is-primary'); });
      at(TIMING.settle, function () { demo.classList.remove('is-lifting'); });
      at(TIMING.out, function () { demo.classList.add('is-out'); });
      at(TIMING.reset, jumpToPromotions);
      at(TIMING.back, function () { demo.classList.remove('is-out'); });
      at(TIMING.loop, cycle);
    };

    var start = function () {
      if (running) return;
      running = true;
      // First time, let the inbox finish rising in before the story starts.
      if (firstRun) { firstRun = false; at(900, cycle); } else { cycle(); }
    };

    var stop = function () {
      timers.forEach(window.clearTimeout);
      timers = [];
      running = false;
      demo.classList.remove('is-out');
      jumpToPromotions();
    };

    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        visible = e.isIntersecting;
        if (visible && !document.hidden) start(); else stop();
      });
    }, { threshold: 0.3 }).observe(demo);

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else if (visible) start();
    });

    reduceQuery.addEventListener('change', function (q) {
      if (!q.matches) return;
      stop();
      root.classList.remove('motion');
    });
  }

  /* ---------- Problem statement: the gray words darken as you scroll through ---------- */
  var rest = document.querySelector('.st-rest');
  if (rest && hasIO && motionOn()) {
    var words = [];
    rest.textContent.trim().split(/\s+/).forEach(function (w, i, all) {
      var span = document.createElement('span');
      span.className = 'w';
      span.textContent = w;
      words.push(span);
      rest.appendChild(span);
      if (i < all.length - 1) rest.appendChild(document.createTextNode(' '));
    });
    rest.removeChild(rest.firstChild); // the original text node
    rest.classList.add('is-split');

    var statement = rest.closest('.statement');
    var ticking = false;
    var paint = function () {
      ticking = false;
      var r = statement.getBoundingClientRect();
      var vh = window.innerHeight;
      // 0 when the statement's top is at 85% of the viewport, 1 when its bottom reaches 45%.
      var p = (vh * 0.85 - r.top) / (r.height + vh * 0.4);
      p = Math.max(0, Math.min(1, p));
      var n = words.length, soft = 4;
      for (var i = 0; i < n; i++) {
        var local = Math.max(0, Math.min(1, (p * (n + soft) - i) / soft));
        words[i].style.setProperty('--o', (0.5 + 0.5 * local).toFixed(3)); // 0.5 keeps 3:1 contrast
      }
    };
    var onScroll = function () { if (!ticking) { ticking = true; window.requestAnimationFrame(paint); } };
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { window.addEventListener('scroll', onScroll, { passive: true }); paint(); }
        else window.removeEventListener('scroll', onScroll);
      });
    }).observe(statement);
  }

  /* ---------- Pricing: revenue slider, odometer price, matching tier ---------- */
  var range = document.getElementById('rev');
  if (range && CFG) {
    var steps = CFG.revenueStepsK;
    var revOut = document.getElementById('rev-out');
    var planName = document.getElementById('plan-name');
    var planBadge = document.getElementById('plan-badge');
    var planPer = document.getElementById('plan-per');
    var planNote = document.getElementById('plan-note');
    var planCta = document.getElementById('plan-cta');
    var planLive = document.getElementById('plan-live');
    var odo = document.getElementById('plan-price');
    var tiers = document.querySelectorAll('.tier');

    var fmtRev = function (k) { return k >= 1000 ? '$1M+' : '$' + k + 'K'; };
    var planFor = function (k) {
      for (var i = 0; i < CFG.plans.length; i++) if (k <= CFG.plans[i].maxRevenueK) return CFG.plans[i];
      return CFG.plans[CFG.plans.length - 1];
    };
    var tierFor = function (id) { return document.querySelector('.tier[data-plan="' + id + '"]'); };

    /* Odometer: one 0-9 strip per digit, sized for the longest price in the config */
    var maxDigits = CFG.plans.reduce(function (m, p) { return p.price === null ? m : Math.max(m, String(p.price).length); }, 1);
    var strips = [];
    odo.removeAttribute('data-cfg'); // the odometer owns this element from here on
    odo.textContent = '';
    odo.setAttribute('aria-hidden', 'true');
    var num = document.createElement('span');
    num.className = 'odo-num';
    num.appendChild(document.createTextNode('$'));
    for (var d = 0; d < maxDigits; d++) {
      var col = document.createElement('span');
      col.className = 'odo-col';
      var strip = document.createElement('span');
      strip.className = 'odo-strip';
      for (var n = 0; n <= 9; n++) { var s = document.createElement('span'); s.textContent = n; strip.appendChild(s); }
      col.appendChild(strip);
      num.appendChild(col);
      strips.push(strip);
    }
    var custom = document.createElement('span');
    custom.className = 'odo-custom';
    custom.textContent = 'Custom';
    odo.appendChild(num);
    odo.appendChild(custom);

    var setPrice = function (price) {
      odo.classList.toggle('is-custom', price === null);
      planPer.classList.toggle('is-hidden', price === null);
      if (price === null) return;
      var digits = String(price);
      while (digits.length < maxDigits) digits = ' ' + digits;
      strips.forEach(function (st, i) {
        var ch = digits.charAt(i);
        st.parentNode.classList.toggle('is-blank', ch === ' ');
        if (ch !== ' ') st.style.transform = 'translateY(' + (-Number(ch)) + 'em)';
      });
    };

    var liveTimer;
    var update = function () {
      var k = steps[Number(range.value)];
      var plan = planFor(k);
      var tier = tierFor(plan.id);
      var badge = tier && tier.querySelector('.badge');
      var cta = tier && tier.querySelector('.btn-tier');
      var fit = tier && tier.querySelector('.tier-fit');
      var priceText = CFG.text('price.' + plan.id);

      revOut.textContent = fmtRev(k);
      planName.textContent = plan.name;
      planBadge.hidden = !badge;
      if (badge) planBadge.textContent = badge.textContent;
      if (fit) planNote.textContent = fit.textContent;
      if (cta) { planCta.textContent = cta.textContent; planCta.href = cta.getAttribute('href'); }
      setPrice(plan.price);

      tiers.forEach(function (t) { t.classList.toggle('is-match', t === tier); });
      range.style.setProperty('--fill', (Number(range.value) / Number(range.max) * 100) + '%');
      range.setAttribute('aria-valuetext', fmtRev(k) + ' a month, ' + plan.name + ' plan');

      window.clearTimeout(liveTimer);
      liveTimer = window.setTimeout(function () {
        planLive.textContent = plan.name + ' plan: ' + priceText + (plan.price === null ? '' : ' a month');
      }, 350);
    };

    range.max = String(steps.length - 1);
    var startIdx = steps.indexOf(CFG.revenueStartK);
    range.value = String(startIdx < 0 ? 0 : startIdx);
    odo.classList.add('no-anim');
    update();
    window.clearTimeout(liveTimer); // don't announce the starting plan on page load
    void odo.offsetWidth;
    odo.classList.remove('no-anim');
    range.addEventListener('input', update);
  }

  /* ---------- Booking embeds (Cal.com or Calendly) ----------
     Each [data-booking] block holds a visitor-facing fallback and an embed slot.
     data-booking="trial"   uses MB_CONFIG.booking.url        (/free-trial)
     data-booking="partner" uses MB_CONFIG.booking.partnerUrl (/partners#apply)
     data-booking-lazy      waits until the block is near the viewport.
     The fallback stays visible while the link is empty or if the embed fails. */
  var bk = (CFG && CFG.booking) || {};
  var provider = String(bk.provider || '').toLowerCase();

  var loadScript = function (src, onload, onerror) {
    var el = document.createElement('script');
    el.src = src; el.async = true;
    if (onload) el.onload = onload;
    if (onerror) el.onerror = onerror;
    document.head.appendChild(el);
    return el;
  };

  var mountBooking = function (block, link, onBooked) {
    var fallback = block.querySelector('[data-booking-fallback]');
    var embed = block.querySelector('[data-booking-embed]');
    var kind = block.getAttribute('data-booking');
    var parsed = null;
    try { parsed = link ? new URL(link) : null; } catch (e) { parsed = null; }

    if (!parsed || (provider !== 'calcom' && provider !== 'calendly')) {
      console.warn('[Mail Booster] Booking calendar for "' + kind + '" is not set up. Set booking.provider (\'calcom\' or \'calendly\') and booking.' +
        (kind === 'partner' ? 'partnerUrl' : 'url') + ' in site/assets/config.js.');
      return;
    }
    var showFallback = function () {
      embed.hidden = true;
      fallback.hidden = false;
      console.warn('[Mail Booster] The ' + provider + ' booking embed failed to load for "' + kind + '".');
    };
    fallback.hidden = true;
    embed.hidden = false;

    if (provider === 'calendly') {
      embed.classList.add('is-calendly');
      var go = function () { window.Calendly.initInlineWidget({ url: parsed.href, parentElement: embed }); };
      if (window.Calendly) go();
      else loadScript('https://assets.calendly.com/assets/external/widget.js', go, showFallback);
      if (onBooked) {
        window.addEventListener('message', function (e) {
          if (/^https:\/\/([a-z0-9-]+\.)*calendly\.com$/.test(e.origin) && e.data && e.data.event === 'calendly.event_scheduled') onBooked();
        });
      }
      return;
    }

    // Cal.com: cal.com and cal.eu links embed from their app domain; a self-hosted Cal uses its own origin.
    var host = parsed.hostname.replace(/^www\./, '');
    var calOrigin = host === 'cal.com' ? 'https://app.cal.com' : host === 'cal.eu' ? 'https://app.cal.eu' : parsed.origin;
    var calLink = parsed.pathname.replace(/^\/+|\/+$/g, '');
    var ns = 'mb' + kind;
    if (!window.Cal) {
      /* Cal.com's official embed loader (queues calls until embed.js loads) */
      (function (C, A, L) { var p = function (a, ar) { a.q.push(ar); }; var d = C.document; C.Cal = C.Cal || function () { var cal = C.Cal; var ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; var tag = d.head.appendChild(d.createElement('script')); tag.src = A; tag.onerror = showFallback; cal.loaded = true; } if (ar[0] === L) { var api = function () { p(api, arguments); }; var namespace = ar[1]; api.q = api.q || []; if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, calOrigin + '/embed/embed.js', 'init');
    }
    window.Cal('init', ns, { origin: calOrigin });
    window.Cal.ns[ns]('inline', { elementOrSelector: '#' + embed.id, calLink: calLink, config: { layout: 'month_view' } });
    window.Cal.ns[ns]('ui', { cssVarsPerTheme: { light: { 'cal-brand': '#2B59FF' } }, layout: 'month_view' });
    if (onBooked) {
      window.Cal.ns[ns]('on', { action: 'bookingSuccessful', callback: onBooked });
      window.Cal.ns[ns]('on', { action: 'bookingSuccessfulV2', callback: onBooked });
    }
  };

  document.querySelectorAll('[data-booking]').forEach(function (block) {
    var kind = block.getAttribute('data-booking');
    var link = String((kind === 'partner' ? bk.partnerUrl : bk.url) || '').trim();
    var onBooked = null;

    if (kind === 'trial') {
      var step = document.getElementById('booking-step');
      var booked = document.getElementById('booked');
      onBooked = function () {
        if (!booked || !booked.hidden) return;
        step.hidden = true;
        booked.hidden = false;
        booked.scrollIntoView({ block: 'start', behavior: motionOn() ? 'smooth' : 'auto' });
        booked.focus({ preventScroll: true });
      };
      if (window.location.hash === '#booked') { onBooked(); return; } // preview the confirmation
    }

    if (block.hasAttribute('data-booking-lazy') && hasIO) {
      var lazyIO = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { lazyIO.disconnect(); mountBooking(block, link, onBooked); }
      }, { rootMargin: '600px 0px' });
      lazyIO.observe(block);
    } else {
      mountBooking(block, link, onBooked);
    }
  });

  /* ---------- Cloudflare Web Analytics (cookieless), only when a token is set ---------- */
  var cfToken = CFG && CFG.analytics && String(CFG.analytics.cloudflareToken || '').trim();
  if (cfToken) {
    var beacon = document.createElement('script');
    beacon.defer = true;
    beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    beacon.setAttribute('data-cf-beacon', JSON.stringify({ token: cfToken }));
    document.head.appendChild(beacon);
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.qa-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      btn.closest('.qa').classList.toggle('is-open', open);
    });
  });
})();
