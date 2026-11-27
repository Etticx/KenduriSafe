// Dot-art shapes for the About and For caterers pages. Each returns a darkness 0..1, or -1 for empty.
const segDist = (x, y, ax, ay, bx, by) => { const dx = bx - ax, dy = by - ay, t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy))); return Math.hypot(x - ax - t * dx, y - ay - t * dy); };
// darkness 0..1 at (x, y) in 0..1 units; -1 = empty
function shield(x, y) {
  const halo = Math.hypot(x - .5, y - .5);
  // shield outline: flat top with shoulders, sides curving to a point at the bottom
  const top = .12, mid = .52, bot = .9, w = .34;
  let half = -1;
  if (y >= top && y <= mid) half = w;
  else if (y > mid && y <= bot) half = w * Math.sqrt(1 - ((y - mid) / (bot - mid)) ** 2);
  const inside = half > 0 && Math.abs(x - .5) <= half - (y < top + .05 ? .05 - (y - top) : 0) * .6;
  if (!inside) return halo < .48 ? .08 * (1 - halo / .48) : -1; // faint halo of dots
  if (segDist(x, y, .36, .5, .46, .6) < .035 || segDist(x, y, .46, .6, .66, .38) < .035) return 0; // check mark cut out
  return Math.min(1, .3 + 1.1 * ((x - .16) * .5 + (y - .12)));             // lighter top-left, deep blue bottom-right
}
// phone for "Why we exist": dark dotted frame, faint wallpaper dots on the screen, a notch. f works in CSS pixels.
const rrect = (x, y, w, h, rad) => { const qx = Math.abs(x - w / 2) - w / 2 + rad, qy = Math.abs(y - h / 2) - h / 2 + rad; return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - rad; };
function phone(x, y, w, h) {
  const d = rrect(x, y, w, h, 38);
  if (d > 0) return -1;
  const notch = Math.abs(x - w / 2) < 34 && y > 16 && y < 30;
  if (d > -11 || notch) return Math.min(1, .55 + .45 * (x / w * .4 + y / h * .6)); // frame: lighter top-left, deep blue bottom-right
  return .045 + .03 * (y / h);                                                    // screen: sparse wallpaper dots
}

// darkness 0..1 at (x, y) in 0..1 units; -1 = empty. t (seconds) is for the steam.
function kawah(x, y, t) {
  const rimY = .56;
  if (Math.abs(x - .5) < .43 && Math.abs(y - rimY) < .018) return 1;                        // rim
  if (y > rimY && ((x - .5) / .4) ** 2 + ((y - rimY) / .24) ** 2 <= 1)                      // bowl: lit top-left, deep blue bottom-right
    return Math.min(1, .5 + .55 * (y - rimY) / .24 + .25 * (x - .3));
  for (const hx of [.075, .925]) { const d = Math.hypot(x - hx, y - .6); if (d > .025 && d < .045) return .9; } // handles
  if (y < rimY && ((x - .5) / .34) ** 2 + ((y - rimY) / .09) ** 2 <= 1) return .42 - .18 * (rimY - y) / .09; // heaped rice, lighter at the top
  if (segDist(x, y, .32, .78, .26, .93) < .014 || segDist(x, y, .68, .78, .74, .93) < .014) return .8;  // stand legs
  if (((x - .5) / .38) ** 2 + ((y - .94) / .025) ** 2 <= 1) return .12;                     // shadow
  return steam(x, y, t);
}
// three wisps rising from the rice, wobbling and thinning as they go up
function steam(x, y, t) {
  if (y > .47 || y < .06) return -1;
  let v = -1;
  for (let i = 0; i < 3; i++) {
    const up = (.47 - y) / .41, x0 = .38 + i * .12 + .035 * Math.sin(y * 16 - t * 1.6 + i * 2.1) * (.4 + up);
    const w = .022 * (1 - .4 * up);
    if (Math.abs(x - x0) < w) v = Math.max(v, .32 * (1 - up) + .06);
  }
  return v;
}

// "Makanan Diterima" celebration: a dotted firework that opens, hollows out and fades every 1.8s
// (t = 0, the reduced-motion still frame, shows it half open)
function burst(x, y, t) {
  const p = t ? (t / 1.8) % 1 : .45, dx = x - .5, dy = y - .5, d = Math.hypot(dx, dy), R = .46 * (1 - (1 - p) ** 3);
  if (d > R || d < R * Math.max(.1, p * .8)) return -1;
  const k = ((Math.atan2(dy, dx) / (2 * Math.PI) * 18) % 1 + 1) % 1;
  return k < .22 ? (1 - p * .7) * (d > R * .8 ? 1 : .6) : -1;
}

// eKYC live face check: a dotted head inside camera corner brackets; turn = -1 left, 0 straight, 1 right.
// A soft band of darker dots sweeps down the face like a scan line.
function face(x, y, t, turn = 0) {
  const cx = .5 + turn * .05, ex = turn * .09;
  const scan = t ? (t * .6) % 1.3 - .15 : -1, band = Math.abs(y - (.12 + scan * .8)) < .03 ? .22 : 0; // scan line sweeping down
  const r = Math.hypot((x - cx) / .21, (y - .42) / .28);
  if (r > .92 && r <= 1) return .85;                                                         // head outline
  if (r <= .92) {
    for (const sx of [-.075, .075]) if (Math.abs(x - (cx + sx + ex)) < .03 && Math.abs(y - .4) < .008) return .9; // eyes as short strokes
    if (segDist(x, y, cx + ex * 1.3, .43, cx + ex * 1.3, .5) < .008) return .6;              // nose
    if (Math.abs(x - (cx + ex)) < .045 && Math.abs(y - .56) < .007) return .7;               // neutral mouth
    return .06 + band;
  }
  const sh = Math.hypot((x - .5) / .36, (y - 1.02) / .3);                                    // shoulders, cut off by the frame
  if (y > .72 && y < .9 && sh <= 1) return sh > .93 ? .85 : .06 + band;
  const gx = Math.abs(x - .5), gy = Math.abs(y - .5);
  if ((gx > .39 && gx < .405 && gy > .3 && gy < .44) || (gy > .425 && gy < .44 && gx > .25 && gx < .405)) return .6; // corner brackets
  return -1;
}

// by name, all in canvas pixels (x, y, w, h) plus time t for anything animated
export const ARTS = {
  shield: (x, y, w, h) => shield(x / w, y / h),
  phone,
  kawah: (x, y, w, h, t) => kawah(x / w, y / h, t),
  burst: (x, y, w, h, t) => burst(x / w, y / h, t),
  face: (x, y, w, h, t, turn) => face(x / w, y / h, t, turn),
};
