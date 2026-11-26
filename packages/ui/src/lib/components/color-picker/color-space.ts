/** The channels a picker edits. */
export type ScColorSpace = 'hsv' | 'hsl' | 'srgb' | 'oklch';

/** One channel, in its own units (see `SC_COLOR_CHANNELS`). */
export type ScColorChannel =
  | 'hue'
  | 'saturation'
  | 'brightness'
  | 'lightness'
  | 'chroma'
  | 'red'
  | 'green'
  | 'blue'
  | 'alpha';

/** How a value is written. */
export type ScColorFormat = 'hex' | 'rgb' | 'hsl' | 'oklch';

/** Where colours may go: sRGB (the default), Display P3, or anywhere. */
export type ScColorGamut = 'srgb' | 'p3' | false;

/** A colour: its space's channels and alpha, in their units. */
export type ScColorValues = Readonly<Partial<Record<ScColorChannel, number>>>;

/** A channel's range: what the keys and the inputs step through. */
export interface ScColorChannelInfo {
  readonly min: number;
  readonly max: number;
  /** One key press. */
  readonly step: number;
  /** Written as a percent, an angle, or a number. */
  readonly unit: 'percent' | 'degree' | 'number';
}

export const SC_COLOR_CHANNELS: Readonly<
  Record<ScColorChannel, ScColorChannelInfo>
> = {
  hue: { min: 0, max: 360, step: 1, unit: 'degree' },
  saturation: { min: 0, max: 100, step: 1, unit: 'percent' },
  brightness: { min: 0, max: 100, step: 1, unit: 'percent' },
  lightness: { min: 0, max: 100, step: 1, unit: 'percent' },
  chroma: { min: 0, max: 0.4, step: 0.004, unit: 'number' },
  red: { min: 0, max: 255, step: 1, unit: 'number' },
  green: { min: 0, max: 255, step: 1, unit: 'number' },
  blue: { min: 0, max: 255, step: 1, unit: 'number' },
  alpha: { min: 0, max: 100, step: 1, unit: 'percent' },
};

/** A space's channels (alpha is in every one). */
export const SC_COLOR_SPACE_CHANNELS: Readonly<
  Record<ScColorSpace, readonly ScColorChannel[]>
> = {
  hsv: ['hue', 'saturation', 'brightness', 'alpha'],
  hsl: ['hue', 'saturation', 'lightness', 'alpha'],
  srgb: ['red', 'green', 'blue', 'alpha'],
  oklch: ['lightness', 'chroma', 'hue', 'alpha'],
};

/** How each space writes its value, unless `format` says. */
export const SC_COLOR_SPACE_FORMAT: Readonly<
  Record<ScColorSpace, ScColorFormat>
> = { hsv: 'hex', hsl: 'hsl', srgb: 'rgb', oklch: 'oklch' };

/** sRGB, 0–1 per channel (outside it for a colour sRGB can't show). */
export interface ScRgb {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const gamma = (c: number) =>
  Math.sign(c) *
  (Math.abs(c) <= 0.0031308
    ? Math.abs(c) * 12.92
    : 1.055 * Math.abs(c) ** (1 / 2.4) - 0.055);
const linear = (c: number) =>
  Math.sign(c) *
  (Math.abs(c) <= 0.04045
    ? Math.abs(c) / 12.92
    : ((Math.abs(c) + 0.055) / 1.055) ** 2.4);

/** OKLCH (lightness 0–100, chroma, hue) → linear sRGB. */
function oklchToLinear(
  l: number,
  c: number,
  h: number,
): [number, number, number] {
  const L = l / 100;
  const rad = (h * Math.PI) / 180;
  const a = c * Math.cos(rad);
  const b = c * Math.sin(rad);
  const l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
}

/** Linear sRGB → OKLCH (lightness 0–100). */
function linearToOklch(r: number, g: number, b: number) {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return {
    lightness: L * 100,
    chroma: Math.hypot(A, B),
    hue: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360,
  };
}

/** The colour in sRGB, 0–1 (outside it when sRGB can't show it). */
export function scColorToRgb(space: ScColorSpace, v: ScColorValues): ScRgb {
  const ch = (name: ScColorChannel) => v[name] ?? 0;
  switch (space) {
    case 'hsv': {
      const s = ch('saturation') / 100;
      const val = ch('brightness') / 100;
      const k = (n: number) => (n + ch('hue') / 60) % 6;
      const f = (n: number) =>
        val - val * s * Math.max(0, Math.min(k(n), 4 - k(n), 1));
      return { r: f(5), g: f(3), b: f(1) };
    }
    case 'hsl': {
      const s = ch('saturation') / 100;
      const l = ch('lightness') / 100;
      const a = s * Math.min(l, 1 - l);
      const k = (n: number) => (n + ch('hue') / 30) % 12;
      const f = (n: number) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
      return { r: f(0), g: f(8), b: f(4) };
    }
    case 'srgb':
      return { r: ch('red') / 255, g: ch('green') / 255, b: ch('blue') / 255 };
    case 'oklch': {
      const [r, g, b] = oklchToLinear(ch('lightness'), ch('chroma'), ch('hue'));
      return { r: gamma(r), g: gamma(g), b: gamma(b) };
    }
  }
}

/**
 * The space's channels for an sRGB colour (0–1); where the colour has no hue
 * (a grey) — or no saturation (black) — the ones it had are kept.
 */
export function scColorFromRgb(
  space: ScColorSpace,
  { r, g, b }: ScRgb,
  alpha: number,
  keep: ScColorValues,
): ScColorValues {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let hue = keep.hue ?? 0;
  if (d > 1e-6) {
    hue =
      max === r
        ? ((g - b) / d + 6) % 6
        : max === g
          ? (b - r) / d + 2
          : (r - g) / d + 4;
    hue *= 60;
  }
  switch (space) {
    case 'hsv':
      return {
        hue,
        saturation: max === 0 ? (keep.saturation ?? 0) : (d / max) * 100,
        brightness: max * 100,
        alpha,
      };
    case 'hsl': {
      const l = (max + min) / 2;
      const s =
        d === 0 ? (keep.saturation ?? 0) : d / (1 - Math.abs(2 * l - 1));
      return { hue, saturation: s * 100, lightness: l * 100, alpha };
    }
    case 'srgb':
      return { red: r * 255, green: g * 255, blue: b * 255, alpha };
    case 'oklch': {
      const lch = linearToOklch(linear(r), linear(g), linear(b));
      return {
        lightness: lch.lightness,
        chroma: lch.chroma,
        hue: lch.chroma < 0.0005 ? (keep.hue ?? 0) : lch.hue,
        alpha,
      };
    }
  }
}

/** Linear sRGB → linear Display P3. */
const toP3 = ([r, g, b]: [number, number, number]): [
  number,
  number,
  number,
] => [
  0.8224621 * r + 0.177538 * g,
  0.0331941 * r + 0.9668058 * g,
  0.0170827 * r + 0.0723974 * g + 0.9105199 * b,
];

const EPSILON = 1e-4;
const within = (c: [number, number, number]) =>
  c.every((x) => x >= -EPSILON && x <= 1 + EPSILON);

/** The colour can be shown in the gamut (only OKLCH can leave sRGB). */
export function scColorInGamut(
  space: ScColorSpace,
  v: ScColorValues,
  gamut: ScColorGamut,
): boolean {
  if (gamut === false || space !== 'oklch') return true;
  const lin = oklchToLinear(v.lightness ?? 0, v.chroma ?? 0, v.hue ?? 0);
  return within(gamut === 'p3' ? toP3(lin) : lin);
}

/** The nearest colour the gamut holds: its chroma lowered, its lightness and hue kept. */
export function scColorIntoGamut(
  space: ScColorSpace,
  v: ScColorValues,
  gamut: ScColorGamut,
): ScColorValues {
  if (scColorInGamut(space, v, gamut)) return v;
  let low = 0;
  let high = v.chroma ?? 0;
  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2;
    if (scColorInGamut(space, { ...v, chroma: mid }, gamut)) low = mid;
    else high = mid;
  }
  return { ...v, chroma: low };
}

const round = (n: number, digits = 0) => {
  const p = 10 ** digits;
  return Math.round(n * p) / p;
};
const hex2 = (n: number) =>
  Math.round(clamp01(n) * 255)
    .toString(16)
    .padStart(2, '0');

/** The colour, written as CSS in `format`. */
export function scColorFormat(
  space: ScColorSpace,
  v: ScColorValues,
  format: ScColorFormat,
): string {
  const alpha = (v.alpha ?? 100) / 100;
  const slash = alpha < 1 ? ` / ${round(alpha, 2)}` : '';
  if (format === 'oklch') {
    const lch =
      space === 'oklch'
        ? {
            lightness: v.lightness ?? 0,
            chroma: v.chroma ?? 0,
            hue: v.hue ?? 0,
          }
        : scColorFromRgb('oklch', scColorToRgb(space, v), 100, v);
    return `oklch(${round((lch.lightness ?? 0) / 100, 4)} ${round(lch.chroma ?? 0, 4)} ${round(lch.hue ?? 0, 2)}${slash})`;
  }
  const rgb = scColorToRgb(space, v);
  const r = clamp01(rgb.r);
  const g = clamp01(rgb.g);
  const b = clamp01(rgb.b);
  if (format === 'rgb')
    return `rgb(${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)}${slash})`;
  if (format === 'hsl') {
    const hsl =
      space === 'hsl' ? v : scColorFromRgb('hsl', { r, g, b }, 100, v);
    return `hsl(${round(hsl.hue ?? 0, 2)} ${round(hsl.saturation ?? 0, 2)}% ${round(hsl.lightness ?? 0, 2)}%${slash})`;
  }
  return `#${hex2(r)}${hex2(g)}${hex2(b)}${alpha < 1 ? hex2(alpha) : ''}`;
}

/** The colour as CSS for the screen: OKLCH as itself (wide colours shown), others as rgb(). */
export function scColorCss(space: ScColorSpace, v: ScColorValues): string {
  return scColorFormat(space, v, space === 'oklch' ? 'oklch' : 'rgb');
}

const OKLCH =
  /^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)(%?)\s+([\d.]+)(?:deg)?\s*(?:\/\s*([\d.]+)(%?))?\s*\)$/i;

/** An `oklch()` colour read as itself (its wide colours kept); null otherwise. */
export function scParseOklch(text: string): ScColorValues | null {
  const match = OKLCH.exec(text.trim());
  if (!match) return null;
  const [, l, lPercent, c, cPercent, h, a, aPercent] = match;
  const alpha = a === undefined ? 1 : aPercent ? +a / 100 : +a;
  return {
    lightness: lPercent ? +l : +l * 100,
    chroma: cPercent ? (+c / 100) * 0.4 : +c,
    hue: +h % 360,
    alpha: Math.min(1, Math.max(0, alpha)) * 100,
  };
}

const HSL =
  /^hsla?\(\s*([\d.]+)(?:deg)?\s*(?:,\s*|\s+)([\d.]+)%?\s*(?:,\s*|\s+)([\d.]+)%?\s*(?:[,/]\s*([\d.]+)(%?))?\s*\)$/i;

/**
 * An `hsl()` colour read as itself — modern or comma syntax, `hsla()` too —
 * not through the browser's 8-bit sRGB, which each one rounds its own way;
 * null otherwise.
 */
export function scParseHsl(text: string): ScColorValues | null {
  const match = HSL.exec(text.trim());
  if (!match) return null;
  const [, h, s, l, a, aPercent] = match;
  const alpha = a === undefined ? 1 : aPercent ? +a / 100 : +a;
  const clamp = (n: number) => Math.min(100, Math.max(0, n));
  return {
    hue: +h % 360,
    saturation: clamp(+s),
    lightness: clamp(+l),
    alpha: Math.min(1, Math.max(0, alpha)) * 100,
  };
}

/** A channel's value, written in a language: "76 %", "120°", "0.148", "59". */
export function scFormatChannel(
  name: ScColorChannel,
  value: number,
  locale: string,
): string {
  const { unit } = SC_COLOR_CHANNELS[name];
  if (unit === 'percent')
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      maximumFractionDigits: 0,
    }).format(value / 100);
  if (unit === 'degree')
    return new Intl.NumberFormat(locale, {
      style: 'unit',
      unit: 'degree',
      unitDisplay: 'narrow',
      maximumFractionDigits: 0,
    }).format(value);
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: name === 'chroma' ? 3 : 0,
  }).format(value);
}

/** The area's channels by default: hsv saturation × brightness, hsl saturation × lightness, srgb red × green, oklch chroma × lightness. */
export const SC_COLOR_AREA_CHANNELS: Readonly<
  Record<ScColorSpace, readonly [ScColorChannel, ScColorChannel]>
> = {
  hsv: ['saturation', 'brightness'],
  hsl: ['saturation', 'lightness'],
  srgb: ['red', 'green'],
  oklch: ['chroma', 'lightness'],
};
