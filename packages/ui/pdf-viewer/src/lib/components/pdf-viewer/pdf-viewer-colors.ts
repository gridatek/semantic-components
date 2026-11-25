import type { ScPdfPageColors } from './pdf-viewer-types';

/**
 * The viewer's colours are CSS variables, in your theme as every colour of
 * it: their value on `:root`, their dark one under `.dark` — pdf.js's five
 * highlight colours (`--sc-pdf-viewer-highlight-1` to `-5`) and the colours
 * for text and drawings (`--sc-pdf-viewer-ink-1` to `-4`). These are their
 * values when the theme doesn't define them: pdf.js's highlight colours, and
 * black, red, blue, green.
 *
 * Unlike the editor's highlights, these colours are written into the PDF
 * file — and the file mustn't depend on the mode it was annotated in. So a
 * colour has two sides:
 *
 * - **saved**: its `:root` value, always — read from the stylesheets, whatever
 *   the app's mode (in dark mode, the variable reads its `.dark` value);
 * - **shown**: its value now (the `.dark` one in dark mode) — on dark pages
 *   only (reading colours, `pageColors`, in dark mode): pdf.js's on-screen
 *   variants of its highlight colours (its `_HCM` colours), which it maps
 *   back to the saved ones when it saves. On white pages — the document's
 *   own, in dark mode too — the saved colours show.
 *
 * Text and drawings have no on-screen variant in pdf.js: they're drawn in the
 * colour saved. Their `.dark` values only colour your swatches.
 */
const DEFAULT_COLORS: Record<string, string> = {
  '--sc-pdf-viewer-highlight-1': 'oklch(0.978 0.125 108.512)',
  '--sc-pdf-viewer-highlight-2': 'oklch(0.896 0.169 162.965)',
  '--sc-pdf-viewer-highlight-3': 'oklch(0.8831 0.1026 211.128)',
  '--sc-pdf-viewer-highlight-4': 'oklch(0.895 0.068 345.997)',
  '--sc-pdf-viewer-highlight-5': 'oklch(0.678 0.211 19.899)',
  '--sc-pdf-viewer-ink-1': 'oklch(0 0 0)',
  '--sc-pdf-viewer-ink-2': 'oklch(0.586 0.222 17.585)',
  '--sc-pdf-viewer-ink-3': 'oklch(0.546 0.215 262.881)',
  '--sc-pdf-viewer-ink-4': 'oklch(0.627 0.17 149.214)',
};

/** The highlight colours, as pdf.js names them (its colour picker's names). */
const HIGHLIGHT_NAMES = ['yellow', 'green', 'blue', 'pink', 'red'];

/** The highlight colours' variables. */
export const HIGHLIGHT_COLORS = HIGHLIGHT_NAMES.map(
  (_, i) => `var(--sc-pdf-viewer-highlight-${i + 1})`,
);
/** The colours of text and drawings. */
export const INK_COLORS = [1, 2, 3, 4].map(
  (i) => `var(--sc-pdf-viewer-ink-${i})`,
);

/** A colour's side: the one saved into the file, or the one shown now. */
export type ScPdfColorSide = 'saved' | 'shown';

/** The `:root` values found in the stylesheets, until they change. */
let rootValues: { sheets: number; values: Map<string, string> } | null = null;

/**
 * A variable's value on `:root` in the page's stylesheets (the last one, as
 * the cascade), or ''. Rules in `@layer`, `@media` and `@supports` count;
 * stylesheets the page can't read (another origin) don't.
 */
function rootValue(document: Document, name: string): string {
  const sheets = Array.from(document.styleSheets);
  if (!rootValues || rootValues.sheets !== sheets.length) {
    rootValues = { sheets: sheets.length, values: new Map() };
  }
  const cached = rootValues.values.get(name);
  if (cached !== undefined) return cached;
  let value = '';
  const visit = (rules: CSSRuleList): void => {
    for (const rule of Array.from(rules)) {
      if ('selectorText' in rule && 'style' in rule) {
        const selectors = String(rule.selectorText)
          .split(',')
          .map((selector) => selector.trim());
        if (selectors.includes(':root') || selectors.includes('html')) {
          const found = (rule.style as CSSStyleDeclaration)
            .getPropertyValue(name)
            .trim();
          if (found) value = found;
        }
      }
      if ('cssRules' in rule && rule.cssRules) {
        visit(rule.cssRules as CSSRuleList);
      }
    }
  };
  for (const sheet of sheets) {
    try {
      visit(sheet.cssRules);
    } catch {
      // Another origin's stylesheet: not readable.
    }
  }
  rootValues.values.set(name, value);
  return value;
}

/**
 * A CSS colour — a var(--…) too — as sRGB #RRGGBB, as pdf.js takes it: the
 * variable's `saved` side (its `:root` value) or the one `shown` now (in
 * `context`, its `.dark` value in dark mode). Null when it isn't a colour, or
 * names a variable nobody defined.
 */
export function resolveColor(
  value: string,
  context: Element,
  side: ScPdfColorSide = 'saved',
): string | null {
  const document = context.ownerDocument;
  const view = document.defaultView;
  if (!view) return null;
  let color = value.trim();
  const variable = /^var\(\s*(--[\w-]+)\s*(?:,\s*(.+))?\)$/.exec(color);
  if (variable) {
    const [, name, fallback] = variable;
    const now = view.getComputedStyle(context).getPropertyValue(name).trim();
    color =
      (side === 'saved' ? rootValue(document, name) || now : now) ||
      fallback?.trim() ||
      DEFAULT_COLORS[name] ||
      '';
  }
  if (!color || !view.CSS?.supports('color', color)) return null;
  // The browser's colour, as sRGB pixels (oklch and the others included).
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const draw = canvas.getContext('2d', { willReadFrequently: true });
  if (!draw) return null;
  const probe = document.createElement('span');
  // The colour as written, not the system's (forced colours replace them).
  probe.style.forcedColorAdjust = 'none';
  probe.style.color = color;
  probe.hidden = true;
  context.append(probe);
  draw.fillStyle = view.getComputedStyle(probe).color;
  probe.remove();
  draw.fillRect(0, 0, 1, 1);
  const [r, g, b] = draw.getImageData(0, 0, 1, 1).data;
  const hex = [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('');
  return `#${hex}`.toUpperCase();
}

/** Page colours with both colours real (as shown now), or null. */
export function resolvePageColors(
  colors: ScPdfPageColors | null,
  context: Element,
): ScPdfPageColors | null {
  if (!colors) return null;
  // The system's colours (forced colours) are real already.
  if (colors.foreground === 'CanvasText') return colors;
  const foreground = resolveColor(colors.foreground, context, 'shown');
  const background = resolveColor(colors.background, context, 'shown');
  return foreground && background ? { foreground, background } : null;
}

/** A #RRGGBB colour is dark: pages drawn in it show the colours' dark side. */
export function isDarkColor(hex: string): boolean {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 128;
}

/** pdf.js's own highlight colours, in its option's hex. */
const PDFJS_HIGHLIGHT_COLORS = [
  '#FFFF98',
  '#53FFBC',
  '#80EBFF',
  '#FFCBE6',
  '#FF4F5F',
];

/**
 * pdf.js's highlight colours option, from the theme's: `yellow=…` (saved
 * into the file), and `yellow_HCM=…` — pdf.js's on-screen variant, used
 * while the pages are drawn in other colours: the colour shown now on dark
 * pages, else the saved one again.
 */
export function highlightColorsOption(
  context: Element,
  pagesDark: boolean,
): string {
  return HIGHLIGHT_NAMES.flatMap((name, i) => {
    const saved =
      resolveColor(HIGHLIGHT_COLORS[i], context, 'saved') ??
      PDFJS_HIGHLIGHT_COLORS[i];
    const shown = pagesDark
      ? (resolveColor(HIGHLIGHT_COLORS[i], context, 'shown') ?? saved)
      : saved;
    return [`${name}=${saved}`, `${name}_HCM=${shown}`];
  }).join(',');
}

/**
 * The value a colour setting takes for a colour pdf.js reports (a selected
 * annotation's): the current one, or a palette colour, when it's the same
 * colour — either side of it — so their swatch stays pressed; else the
 * colour itself.
 */
export function colorSetting(
  reported: string,
  current: string,
  palette: string[],
  context: Element,
): string {
  const hex = resolveColor(reported, context);
  if (!hex) return reported;
  for (const candidate of [current, ...palette]) {
    if (
      resolveColor(candidate, context, 'saved') === hex ||
      resolveColor(candidate, context, 'shown') === hex
    ) {
      return candidate;
    }
  }
  return reported;
}
