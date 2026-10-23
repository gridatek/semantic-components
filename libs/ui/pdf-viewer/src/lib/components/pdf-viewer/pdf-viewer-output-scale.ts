/**
 * How big a page's canvas is, as pdf.js's viewer sizes it: canvas pixels
 * line up with CSS pixels (the page's CSS size is rounded to a multiple
 * that makes the ratio exact, `--scale-round-x/y`), and the canvas is kept
 * within what browsers can draw.
 */

/**
 * Canvases bigger than this are drawn at a lower resolution: browsers refuse
 * (blank page) or run out of memory beyond it.
 */
export const MAX_CANVAS_PIXELS = 16_777_216;

/** Nor can a canvas be wider or taller than this. */
const MAX_CANVAS_DIM = 32_767;

/** `x` as a fraction `[numerator, denominator]` with small terms. */
export function approximateFraction(x: number): [number, number] {
  if (Math.floor(x) === x) return [x, 1];
  const xinv = 1 / x;
  const limit = 8;
  if (xinv > limit) return [1, limit];
  if (Math.floor(xinv) === xinv) return [1, xinv];

  const x_ = x > 1 ? xinv : x;
  // Farey sequence between a/b and c/d.
  let a = 0;
  let b = 1;
  let c = 1;
  let d = 1;
  for (;;) {
    const p = a + c;
    const q = b + d;
    if (q > limit) break;
    if (x_ <= p / q) {
      c = p;
      d = q;
    } else {
      a = p;
      b = q;
    }
  }
  if (x_ - a / b < c / d - x_) return x_ === x ? [a, b] : [b, a];
  return x_ === x ? [c, d] : [d, c];
}

function floorToDivide(x: number, div: number): number {
  return x - (x % div);
}

let calcRound: ((x: number) => number) | undefined;

/**
 * Rounds as the browser's CSS `round()` computes — in single precision in
 * some browsers — so sizes computed here match the layers' CSS sizes.
 */
function cssRound(x: number): number {
  if (!calcRound) {
    const probe = document.createElement('div');
    probe.style.width = 'round(down, calc(1.6666666666666665 * 792px), 1px)';
    calcRound = probe.style.width === 'calc(1320px)' ? Math.fround : (v) => v;
  }
  return calcRound(x);
}

/** A page's size on screen and its canvas's size. */
export interface ScPdfPageBox {
  /** CSS pixels, rounded down to a multiple of `roundX` / `roundY`. */
  width: number;
  height: number;
  roundX: number;
  roundY: number;
  canvasWidth: number;
  canvasHeight: number;
  /**
   * The canvas is drawn below the screen's density (it would be too big);
   * a detail canvas draws the visible part sharp.
   */
  restricted: boolean;
}

/** The box of a page `cssWidth` × `cssHeight` CSS pixels on screen. */
export function pageBox(
  cssWidth: number,
  cssHeight: number,
  dpr: number,
): ScPdfPageBox {
  let scale = dpr;
  let restricted = false;
  const pixels = cssWidth * cssHeight * dpr * dpr;
  const maxScale = Math.min(
    pixels > MAX_CANVAS_PIXELS
      ? Math.sqrt(MAX_CANVAS_PIXELS / (cssWidth * cssHeight))
      : dpr,
    MAX_CANVAS_DIM / cssWidth,
    MAX_CANVAS_DIM / cssHeight,
  );
  if (maxScale < dpr) {
    // Lower still: the detail canvas does the sharp drawing.
    scale = maxScale / 2;
    restricted = true;
  }
  const [numerator, denominator] = approximateFraction(scale);
  return {
    width: floorToDivide(cssRound(cssWidth), denominator),
    height: floorToDivide(cssRound(cssHeight), denominator),
    roundX: denominator,
    roundY: denominator,
    canvasWidth: floorToDivide(cssRound(cssWidth * scale), numerator),
    canvasHeight: floorToDivide(cssRound(cssHeight * scale), numerator),
    restricted,
  };
}
