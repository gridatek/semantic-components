import type { ScPdfPageColors } from './pdf-viewer-types';

/**
 * The viewer's colours are CSS variables (your theme defines them, as the
 * editor's highlight colours): pdf.js's five highlight colours, and the
 * colours for text and drawings. These are their values when the theme
 * doesn't define them — pdf.js's highlight colours, and black, red, blue,
 * green — in oklch, as the theme's.
 *
 * One set, light and dark mode alike: unlike the editor's, these colours
 * are written into the PDF file (pdf.js reads the variable when an
 * annotation is drawn — `resolveColor`). The pages stay white in dark mode,
 * so a dark-mode value would draw dark highlights over the text, or ink too
 * light to see on the page — and would be saved so, in the file and on
 * paper, the same document differing by the mode it was annotated in.
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

/**
 * A CSS colour — a var(--…) too — as the sRGB #RRGGBB pdf.js writes into the
 * PDF, read in `context` (where the theme's variables apply). Null when it
 * isn't a colour, or names a variable nobody defined.
 */
export function resolveColor(value: string, context: Element): string | null {
  const view = context.ownerDocument.defaultView;
  if (!view) return null;
  let color = value.trim();
  const variable = /^var\(\s*(--[\w-]+)\s*(?:,\s*(.+))?\)$/.exec(color);
  if (variable) {
    const [, name, fallback] = variable;
    color =
      view.getComputedStyle(context).getPropertyValue(name).trim() ||
      fallback?.trim() ||
      DEFAULT_COLORS[name] ||
      '';
  }
  if (!color || !view.CSS?.supports('color', color)) return null;
  // The browser's colour, as sRGB pixels (oklch and the others included).
  const canvas = context.ownerDocument.createElement('canvas');
  canvas.width = canvas.height = 1;
  const draw = canvas.getContext('2d', { willReadFrequently: true });
  if (!draw) return null;
  const probe = context.ownerDocument.createElement('span');
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

/** Page colours with both colours real, or null. */
export function resolvePageColors(
  colors: ScPdfPageColors | null,
  context: Element,
): ScPdfPageColors | null {
  if (!colors) return null;
  // The system's colours (forced colours) are real already.
  if (colors.foreground === 'CanvasText') return colors;
  const foreground = resolveColor(colors.foreground, context);
  const background = resolveColor(colors.background, context);
  return foreground && background ? { foreground, background } : null;
}

/** pdf.js's own highlight colours, in its option's hex. */
const PDFJS_HIGHLIGHT_COLORS = [
  '#FFFF98',
  '#53FFBC',
  '#80EBFF',
  '#FFCBE6',
  '#FF4F5F',
];

/** pdf.js's highlight colours option (yellow=#FFFF98,…), from the theme's. */
export function highlightColorsOption(context: Element): string {
  return HIGHLIGHT_NAMES.map((name, i) => {
    const color =
      resolveColor(HIGHLIGHT_COLORS[i], context) ?? PDFJS_HIGHLIGHT_COLORS[i];
    return `${name}=${color}`;
  }).join(',');
}

/**
 * The value a colour setting takes for a colour pdf.js reports (a selected
 * annotation's): the current one, or a palette colour, when it's the same
 * colour — so their swatch stays pressed — else the colour itself.
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
    if (resolveColor(candidate, context) === hex) return candidate;
  }
  return reported;
}
