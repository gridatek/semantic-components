/** A colour, as the picker holds it: hue 0–360, saturation and value 0–100, alpha 0–1. */
export interface ScHsva {
  readonly h: number;
  readonly s: number;
  readonly v: number;
  readonly a: number;
}

/** Red, green, blue 0–255, alpha 0–1. */
export interface ScRgba {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;
}

/** How the picker writes its value. */
export type ScColorFormat = 'hex' | 'rgb' | 'hsl' | 'oklch';

export function hsvaToRgba({ h, s, v, a }: ScHsva): ScRgba {
  const sat = s / 100;
  const val = v / 100;
  const k = (n: number) => (n + h / 60) % 6;
  const f = (n: number) =>
    Math.round(
      (val - val * sat * Math.max(0, Math.min(k(n), 4 - k(n), 1))) * 255,
    );
  return { r: f(5), g: f(3), b: f(1), a };
}

/** HSV from RGB; `hue` (and `saturation`) kept where the colour has none. */
export function rgbaToHsva({ r, g, b, a }: ScRgba, keep: ScHsva): ScHsva {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const d = max - min;
  let h = keep.h;
  if (d > 0) {
    const [rr, gg, bb] = [r / 255, g / 255, b / 255];
    h =
      max === rr
        ? ((gg - bb) / d + 6) % 6
        : max === gg
          ? (bb - rr) / d + 2
          : (rr - gg) / d + 4;
    h *= 60;
  }
  const v = max * 100;
  // Black has no saturation either: keep it.
  const s = max === 0 ? keep.s : (d / max) * 100;
  return { h, s, v, a };
}

const hex2 = (n: number) => Math.round(n).toString(16).padStart(2, '0');
const round = (n: number, digits = 0) => {
  const p = 10 ** digits;
  return Math.round(n * p) / p;
};
const alpha = (a: number) => (a < 1 ? ` / ${round(a, 2)}` : '');

function rgbToHsl(r: number, g: number, b: number, hue: number) {
  const [rr, gg, bb] = [r / 255, g / 255, b / 255];
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  return { h: hue, s: s * 100, l: l * 100 };
}

const linear = (c: number) =>
  c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;

function rgbToOklch(r: number, g: number, b: number) {
  const [lr, lg, lb] = [r, g, b].map((c) => linear(c / 255));
  const l = Math.cbrt(
    0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb,
  );
  const m = Math.cbrt(
    0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb,
  );
  const s = Math.cbrt(
    0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb,
  );
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.hypot(A, B);
  const H = ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360;
  return { l: L, c: C, h: C < 0.0005 ? 0 : H };
}

/** The colour, written in `format` (CSS colour syntax). */
export function formatColor(hsva: ScHsva, format: ScColorFormat): string {
  const { r, g, b, a } = hsvaToRgba(hsva);
  switch (format) {
    case 'rgb':
      return `rgb(${r} ${g} ${b}${alpha(a)})`;
    case 'hsl': {
      const hsl = rgbToHsl(r, g, b, hsva.h);
      return `hsl(${round(hsl.h)} ${round(hsl.s)}% ${round(hsl.l)}%${alpha(a)})`;
    }
    case 'oklch': {
      const lch = rgbToOklch(r, g, b);
      return `oklch(${round(lch.l * 100, 1)}% ${round(lch.c, 3)} ${round(lch.h, 1)}${alpha(a)})`;
    }
    default:
      return `#${hex2(r)}${hex2(g)}${hex2(b)}${a < 1 ? hex2(a * 255) : ''}`;
  }
}

/** Two colours alike, to the 8-bit channel. */
export const sameRgba = (x: ScRgba | null, y: ScRgba | null) =>
  !!x &&
  !!y &&
  x.r === y.r &&
  x.g === y.g &&
  x.b === y.b &&
  Math.abs(x.a - y.a) < 0.01;
