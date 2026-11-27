// Shared dot-art palette and ordered dither (same look as the landing-page hero).
// ivory -> grey-blue haze -> saturated royal blue, the ramp the dither picks between
export const PAL = ['#FEFEFD', '#EEF1F5', '#DDE3EA', '#C9D2DD', '#B3C0D2', '#8EA9DE', '#6B95EE', '#4A80F2', '#2F6BF0', '#1F5BE0', '#154ECD'];
export const BAYER = [0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5].map(v => (v + .5) / 16);
export const cell = 3;

// draws f (darkness 0..1, or -1 for empty) onto a canvas with the ordered dither
export function dither(cv, f) {
  const ctx = cv.getContext('2d'), dpr = window.devicePixelRatio || 1, w = cv.clientWidth, h = cv.clientHeight;
  if (!w || !h) return;
  cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const paths = PAL.map(() => new Path2D());
  for (let r = 0; r * cell < h; r++) for (let c = 0; c * cell < w; c++) {
    const v = f((c + .5) * cell, (r + .5) * cell, w, h);
    if (v < 0) continue;
    const lvl = v * (PAL.length - 1), lo = Math.floor(lvl);
    const k = Math.min(PAL.length - 1, lo + ((lvl - lo) > BAYER[(r & 3) * 4 + (c & 3)] ? 1 : 0));
    if (k) paths[k].rect(c * cell, r * cell, cell - 1, cell - 1);
  }
  ctx.clearRect(0, 0, w, h);
  paths.forEach((p, k) => { if (k) { ctx.fillStyle = PAL[k]; ctx.fill(p); } });
}
