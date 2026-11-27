// Landing-page hero art: orange fireworks bursting behind a dotted feast table, plus one hanging ketupat.
// Ported as-is from kendurisafe.html; startHeroScene(box) draws into #mtn and returns a cleanup function.
export function startHeroScene(box) {
  const hero = box.parentElement;
  // ivory -> grey-blue haze -> saturated royal blue, the ramp the dither picks between
  const PAL = ['#FEFEFD', '#EEF1F5', '#DDE3EA', '#C9D2DD', '#B3C0D2', '#8EA9DE', '#6B95EE', '#4A80F2', '#2F6BF0', '#1F5BE0', '#154ECD'];
  const BAYER = [0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5].map(v => (v + .5) / 16);

  // seeded value noise (1D for ridgelines, 2D for rock texture) so it looks the same every load
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const N = Array.from({ length: 512 }, rnd);
  const sm = f => f * f * (3 - 2 * f);
  const noise = x => { const i = Math.floor(x), t = sm(x - i); return N[i & 511] * (1 - t) + N[(i + 1) & 511] * t; };
  const h2 = (i, j) => N[(i + N[j & 511] * 512 | 0) & 511];
  const noise2 = (x, y) => {
    const i = Math.floor(x), j = Math.floor(y), tx = sm(x - i), ty = sm(y - j);
    const a = h2(i, j) * (1 - tx) + h2(i + 1, j) * tx, b = h2(i, j + 1) * (1 - tx) + h2(i + 1, j + 1) * tx;
    return a * (1 - ty) + b * ty;
  };
  // ridged noise (1-|n|) gives a jagged, rocky ridgeline
  const fbm = x => { let s = 0, a = .55, fr = 1; for (let o = 0; o < 5; o++) { s += a * (1 - Math.abs(2 * noise(x * fr + o * 31) - 1)); a *= .48; fr *= 2.2; } return s; };

  // Kenduri scene, back to front: fireworks (animated), the feast table; plus one hanging ketupat.
  // Units are canvas heights (Y 0 top .. 1 bottom); xR is the right edge, so the scene hugs the right and leaves the text side open.
  const cell = 3;
  const frac = x => x - Math.floor(x);
  const clamp = v => Math.max(0, Math.min(1, v));
  const hang = f => .45 + .55 * Math.sqrt(Math.max(0, 1 - (2 * f - 1) ** 2)); // one scallop of a cloth edge
  const inEll = (X, Y, cx, cy, rx, ry) => ((X - cx) / rx) ** 2 + ((Y - cy) / ry) ** 2 <= 1;
  const segDist = (X, Y, ax, ay, bx, by) => { const dx = bx - ax, dy = by - ay, t = clamp(((X - ax) * dx + (Y - ay) * dy) / (dx * dx + dy * dy)); return Math.hypot(X - ax - t * dx, Y - ay - t * dy); };
  const twinkle = (c, r, f) => { let h = Math.imul(c, 73856093) ^ Math.imul(r, 19349663) ^ Math.imul(f, 83492791); h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };

  // Fireworks are laid out per screen in layout(): spread along the whole table, and under the text column
  // they burst below the buttons. They use raw canvas units (X, Y), not the scaled scene.
  const SAG = .06; // how far a burst falls before it fades
  function fireworks(Xs, Ys, xR, t, c, r, X, Y) {
    const table = 1 - (1 - .72) * G.scale;
    for (const [x, apex, R, ph] of G.fw) {
      if (Math.abs(X - x) > R + .03) continue;
      const p = frac(t / 3.4 + ph);
      if (p < .28) { // rocket: shoots up from behind the table, slowing near the top, short fading trail
        const e = 1 - (1 - p / .28) ** 2, ry = table - (table - apex) * e;
        if (Math.abs(X - x) < .009 && Math.abs(Y - ry) < .01) return .95;
        if (Math.abs(X - x) < .005 && Y > ry && Y < ry + .09) return .2 + .6 * (1 - (Y - ry) / .09);
        continue;
      }
      // burst: strands race outward, then the centre empties, the whole burst sags with gravity and fades
      const q = (p - .28) / .72, grow = 1 - (1 - Math.min(1, q / .35)) ** 3, fade = q < .4 ? 1 : 1 - (q - .4) / .6;
      const Rg = R * grow, dx = X - x, dy = Y - apex - SAG * q * q, d = Math.hypot(dx, dy);
      if (d < Rg && d > Rg * Math.max(.08, (q - .1) * .9)) {
        const k = frac(Math.atan2(dy, dx) / (2 * Math.PI) * 22);
        if (k < .16) {
          const v = (d > Rg * .82 ? (twinkle(c, r, Math.floor(t * 10)) > .4 ? .95 : .5) : .55) * fade;
          if (v > .08) return v;
        }
      }
    }
    return -1;
  }

  function feast(X, Y, xR) {
    const top = .72;
    if (Y >= top) return Y < top + .045 * hang(frac(X * 8)) ? .95 : .13;                          // scalloped table cloth, edge to edge
    // simple place settings along the long left stretch, repeating bowl, glasses, plates, small tudung saji
    const L = xR - xR / G.scale, slot = .32, k = Math.floor((X - L) / slot), cx = L + (k + .5) * slot, dx = X - cx;
    if (k >= 0 && cx < xR - 2.5) {
      const type = k % 4;
      if (type === 0 && Y < top && Y > top - .08 && inEll(X, Y, cx, top - .08, .08, .08)) return Y < top - .065 ? .7 : .9;      // bowl
      if (type === 1 && Y < top && Y > top - .08 && (Math.abs(dx + .03) < .02 || Math.abs(dx - .03) < .02)) return Y < top - .066 ? .85 : .35; // glasses
      if (type === 2 && Y < top && Y > top - .08 && Math.abs(dx) < .07) return frac((top - Y) / .02) < .55 ? .9 : .3;          // plates
      if (type === 3) {
        if (inEll(X, Y, cx, top - .125, .02, .016)) return .95;                                                                  // knob
        if (Y < top && inEll(X, Y, cx, top, .1, .11)) { const w = (frac((dx + Y) * 13) < .5) !== (frac((dx - Y) * 13) < .5); return (w ? .5 : .78) - (dx < 0 ? .15 : 0); }
      }
    }
    // left end of the table: bunga telur, glasses, a small tudung saji
    const bt = xR - 2.2;
    if (inEll(X, Y, bt, top - .045, .045, .045)) return X < bt ? .55 : .85;                         // vase
    for (const [ox, oy] of [[-.11, .2], [-.055, .25], [0, .27], [.055, .25], [.11, .2]]) {
      const tx = bt + ox, ty = top - oy;
      if (segDist(X, Y, bt, top - .08, tx, ty) < .004) return .6;                                    // stick
      if (inEll(X, Y, tx, ty, .018, .024)) return X < tx ? .25 : .45;                                // egg
      const fd = Math.hypot(X - tx, Y - (ty - .035));
      if (fd > .01 && fd < .028 && frac(Math.atan2(Y - ty + .035, X - tx) / (2 * Math.PI) * 6) < .5) return .9; // paper flower
    }
    for (const gx of [xR - 1.93, xR - 1.84]) if (Math.abs(X - gx) < .025 && Y < top && Y > top - .09) return Y < top - .075 ? .85 : .35; // glasses
    const ts = xR - 1.6;
    if (inEll(X, Y, ts, top - .165, .025, .02)) return .95;                                         // tudung saji knob
    if (Y < top && inEll(X, Y, ts, top, .14, .15)) { const u = X - ts, w = (frac((u + Y) * 13) < .5) !== (frac((u - Y) * 13) < .5); return (w ? .5 : .78) - (u < 0 ? .15 : 0); }
    const rice = xR - 1.15, bowl = xR - .8, pot = xR - .53;
    if (Y >= top - .035 && Y < top && Math.abs(X - rice) < .24) return .8;                         // dulang
    if (Y < top - .035 && inEll(X, Y, rice, top - .035, .2, .18)) return .18 + .3 * clamp((X - rice + .2) / .4); // nasi minyak dome
    if (Y < top && Y > top - .12 && inEll(X, Y, bowl, top - .12, .12, .12)) return Y < top - .1 ? .7 : .9; // bowl of curry
    if (inEll(X, Y, pot, top - .1, .09, .1)) return X < pot ? .55 : .85;                            // teapot
    if (segDist(X, Y, pot + .08, top - .11, pot + .17, top - .19) < .014) return .85;                // spout
    if (inEll(X, Y, pot, top - .215, .025, .022)) return .9;                                        // lid knob
    const hd = Math.hypot(X - (pot - .1), Y - (top - .1));
    if (hd > .035 && hd < .05 && X < pot - .08) return .85;                                         // handle
    if (X > xR - .32 && X < xR - .16 && Y < top && Y > top - .12) return frac((top - Y) / .02) < .55 ? .9 : .3; // stacked plates
    if (X > xR - .11 && X < xR - .02 && Y < top && Y > top - .25) return Y > top - .15 ? .85 : .25;  // sirap jug
    return -1;
  }

  const SCENE = [fireworks, feast]; // back to front; parallax speeds follow this order
  // fireworks get their own warm ramp (orange is royal blue's complement); everything else uses PAL
  const FIRE = ['#FEFEFD', '#FDEBD8', '#FCD3A8', '#FAB36E', '#F8963F', '#F47B1C', '#E8650C', '#D45207'];
  const cvs = SCENE.map(() => box.appendChild(document.createElement('canvas')));
  let G = null; // sizes for the current layout

  function paint(i, t) {
    const { W, H, cols, rows, c0, vcols, xR, dpr } = G, ctx = cvs[i].getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const pal = SCENE[i] === fireworks ? FIRE : PAL;
    const paths = pal.map(() => new Path2D()); // batch dots by colour: one fill per colour instead of one per dot
    for (let c = 0; c < cols; c++) {
      const vc = c + c0, X = vc * cell / H, fadeIn = pal === FIRE ? 1 : Math.min(1.15, .7 + vc / vcols * .5); // greyer left, bluer right (not for fireworks)
      for (let r = 0; r < rows; r++) {
        // desktop: scene drawn at 80% size, anchored bottom-right so it stays clear of the headline; phones: full size
        let v = SCENE[i](xR - (xR - X) / G.scale, 1 - (1 - r * cell / H) / G.scale, xR, t, c, r, X, r * cell / H);
        if (v < 0) continue;
        const tex = .55 * noise2(vc / 20, r / 2.5) + .45 * noise2(vc / 4 + 50, r / 4) - .5; // grain speckle
        v = clamp((v + tex * .14) * fadeIn);
        const x = v * (pal.length - 1), lo = Math.floor(x);
        // half ordered, half random threshold: grainy halftone instead of a clean checker grid
        let h = Math.imul(c, 374761393) + Math.imul(r, 668265263) | 0;
        h = Math.imul(h ^ (h >>> 13), 1274126177);
        const thr = .5 * BAYER[(r & 3) * 4 + (c & 3)] + .5 * (((h ^ (h >>> 16)) >>> 0) / 4294967296);
        paths[Math.min(pal.length - 1, lo + ((x - lo) > thr ? 1 : 0))].rect(c * cell, r * cell, cell - 1, cell - 1);
      }
    }
    // ivory dots still get painted on front layers so they hide the layers behind them
    paths.forEach((path, k) => { if (k || i) { ctx.fillStyle = pal[k]; ctx.fill(path); } });
  }

  // One hanging ketupat on its own small canvas, so its string can start at the menu line above the scene.
  const ket = hero.appendChild(document.createElement('canvas'));
  ket.id = 'ket'; ket.setAttribute('aria-hidden', 'true');

  // Measure where the text sits so the ketupat and fireworks keep clear of it.
  function layout() {
    const { W, H, c0, xR } = G, hb = hero.getBoundingClientRect(), b = box.getBoundingClientRect();
    const h1 = hero.querySelector('h1').getBoundingClientRect(), nav = hero.querySelector('nav').getBoundingClientRect();
    const ctas = hero.querySelector('.ctas').getBoundingClientRect(), lede = hero.querySelector('.lede').getBoundingClientRect();
    const btns = hero.querySelector('.ctas').lastElementChild.getBoundingClientRect(); // .ctas itself is full-width
    const textL = h1.left - hb.left, textR = Math.max(btns.right, lede.right) - b.left;
    const below = (ctas.bottom - b.top) / H + .05;               // first canvas row clear of the buttons
    const table = 1 - (1 - .72) * G.scale;
    // ketupat: in the empty margin left of the headline when there is room, otherwise just under the buttons
    const wide = textL > 160, sz = 34, kw = 90;
    const kx = wide ? textL / 2 : textL + 70;
    const ktop = wide ? nav.bottom - hb.top : ctas.bottom - hb.top + 18;
    const len = wide ? h1.top - nav.bottom + h1.height * .35 : 30;
    drawKetupat(kx - kw / 2, ktop, kw, len, sz);
    // fireworks: one about every .42 heights along the visible table, deterministic per slot
    const x0 = c0 * cell / H, x1 = (c0 * cell + W) / H, n = Math.max(2, Math.round((x1 - x0) / .42));
    const kX = x0 + kx / H, kBottom = (ktop + len + 2 * sz + 30 - (b.top - hb.top)) / H;
    G.fw = [];
    for (let i = 0; i < n; i++) {
      const x = x0 + (i + .5) * (x1 - x0) / n + (N[i * 7 & 511] - .5) * .12;
      let R = .1 + .06 * N[i * 13 & 511], apex = .1 + .22 * N[i * 29 & 511];
      // ceiling: never over the headline, and under the text column never over the buttons
      let ceil = .03;
      if ((x - x0) * H < h1.right - b.left + R * H) ceil = Math.max(ceil, (h1.bottom - b.top) / H + .03);
      if ((x - x0) * H < textR + R * H) ceil = Math.max(ceil, below);
      // floor: the whole burst, including its fall (SAG), stays in the sky above the dishes at this spot
      const Xs = xR - (xR - x) / G.scale, dish = Xs > xR - 2.45 ? .3 : .13; // tall show-pieces on the right, low place settings on the left
      const floor = table - dish * G.scale - SAG - .02;
      R = Math.min(R, (floor - ceil) / 2);
      apex = Math.min(Math.max(apex, ceil + R), floor - R);
      if (Math.abs(x - kX) < R + .1 && apex - R < kBottom) continue; // keep clear of the ketupat
      if (R >= .045) G.fw.push([x, apex, R, N[i * 31 & 511]]);
    }
  }

  function drawKetupat(left, top, w, len, sz) {
    const dpr = G.dpr, h = len + 2 * sz + 34;
    Object.assign(ket.style, { left: left + 'px', top: top + 'px', width: w + 'px', height: h + 'px' });
    ket.width = w * dpr; ket.height = h * dpr;
    const ctx = ket.getContext('2d'), paths = PAL.map(() => new Path2D()), cx = w / 2, cy = len + sz;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    for (let y = 0; y < h; y += cell) for (let x = 0; x < w; x += cell) {
      const dx = x - cx, dy = y - cy, tail = y - cy - sz;
      let v = -1;
      if (Math.abs(dx) / sz + Math.abs(dy) / sz <= 1) v = ((Math.floor((dx + dy) / 6) + Math.floor((dx - dy) / 6)) & 1 ? .5 : .85) - (dx < 0 ? .15 : 0); // woven diamond
      else if (Math.abs(dx) < 2 && y < cy - sz) v = .6;                                     // string
      else if (tail > 0 && tail < 30 && (Math.abs(dx + tail * .35) < 2 || Math.abs(dx - tail * .35) < 2)) v = .75; // tails
      if (v < 0) continue;
      const lvl = v * (PAL.length - 1), lo = Math.floor(lvl), c = x / cell, r = y / cell;
      const k = Math.min(PAL.length - 1, lo + ((lvl - lo) > BAYER[(r & 3) * 4 + (c & 3)] ? 1 : 0));
      paths[k].rect(x, y, cell - 1, cell - 1);
    }
    ctx.clearRect(0, 0, w, h);
    paths.forEach((path, k) => { if (k) { ctx.fillStyle = PAL[k]; ctx.fill(path); } });
  }

  function draw() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const W = box.clientWidth, H = box.clientHeight;
    // Narrow screens see a crop of the desktop-shaped scene (like a cover photo) instead of a squeezed one.
    const phone = W < 760, VW = Math.max(W, H * 2);
    const offX = phone ? VW - W : Math.min(VW - W, Math.max(0, .68 * VW - W / 2)); // phones show the right end: sprays + table
    G = { scale: phone ? 1 : .8, W, H, dpr, cols: Math.ceil(W / cell), rows: Math.ceil(H / cell), vcols: Math.ceil(VW / cell), c0: Math.round(offX / cell), xR: VW / H };
    cvs.forEach(cv => { cv.width = W * dpr; cv.height = H * dpr; });
    layout();
    SCENE.forEach((_, i) => paint(i, 1.7)); // t = 1.7: several bursts open at once (also the still frame for reduced motion)
    parallax();
  }

  // fireworks: repaint only that layer, ~30 fps, only while the hero is on screen
  let last = 0, alive = true, tickId = 0;
  const t0 = performance.now();
  function tick(now) {
    if (!alive) return;
    tickId = requestAnimationFrame(tick);
    if (!G || still.matches || now - last < 33 || scrollY > hero.offsetHeight) return;
    last = now;
    paint(0, 1.7 + (now - t0) / 1000);
  }

  // parallax: far ranges lag behind the scroll, the front slope moves with the page
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  function parallax() {
    const y = Math.min(scrollY, hero.offsetHeight);
    cvs.forEach((cv, i) => {
      const k = still.matches ? 0 : .4 * (1 - i / (cvs.length - 1));
      cv.style.transform = `translateY(${Math.round(y * k / cell) * cell}px)`; // whole cells, so every layer's dot grid stays lined up
    });
  }
  let raf = 0;
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; parallax(); }); };
  addEventListener('scroll', onScroll, { passive: true });

  let t; const onResize = () => { clearTimeout(t); t = setTimeout(draw, 120); };
  addEventListener('resize', onResize);
  draw();
  tickId = requestAnimationFrame(tick);

  // undo everything when the page unmounts (client-side navigation, React strict mode in dev)
  return () => {
    alive = false;
    cancelAnimationFrame(tickId); cancelAnimationFrame(raf); clearTimeout(t);
    removeEventListener('scroll', onScroll); removeEventListener('resize', onResize);
    cvs.forEach(cv => cv.remove()); ket.remove();
  };
}
