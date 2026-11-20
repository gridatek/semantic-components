import { encode } from 'uqr';

/** How much of the code can be damaged and still read: 7, 15, 25 or 30 %. */
export type ScQrCodeErrorCorrection = 'L' | 'M' | 'Q' | 'H';

/** How a value is encoded. */
export interface ScQrCodeOptions {
  /** `'M'` by default. */
  readonly errorCorrection?: ScQrCodeErrorCorrection;
  /** The quiet zone round the code, in modules: 4 by default, as the QR spec asks. */
  readonly margin?: number;
}

/** How an exported code looks. */
export interface ScQrCodeExportOptions extends ScQrCodeOptions {
  /** The dark modules' colour: black by default. */
  readonly color?: string;
  /** The light modules' and margin's colour: white by default. */
  readonly background?: string;
  /** Its width in pixels (1024), rounded down to whole pixels a module. */
  readonly size?: number;
}

/** What `qrCodeToBlob` makes. */
export interface ScQrCodeBlobOptions extends ScQrCodeExportOptions {
  /** `image/png` by default. */
  readonly type?: string;
  /** For JPEG and WebP: 0 to 1. */
  readonly quality?: number;
}

/** The modules (`true`: dark), margin included. Throws when the value can't be encoded. */
export function qrModules(
  value: string,
  { errorCorrection = 'M', margin = 4 }: ScQrCodeOptions = {},
): boolean[][] {
  return encode(value, { ecc: errorCorrection, border: margin }).data;
}

/**
 * The dark modules as one SVG path: each run of dark modules in a row one
 * rectangle — one element at any size, no seams between modules.
 */
export function qrPath(modules: readonly (readonly boolean[])[]): string {
  let path = '';
  modules.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      if (!row[x]) {
        x++;
        continue;
      }
      const start = x;
      while (x < row.length && row[x]) x++;
      path += `M${start} ${y}h${x - start}v1h${start - x}z`;
    }
  });
  return path;
}

const escape = (text: string) =>
  text.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

/** A width of whole pixels a module, `size` at most (a module at least). */
const fit = (modules: number, size: number) =>
  modules * Math.max(1, Math.floor(size / modules));

/**
 * A QR code as an SVG document, black on white by default — for a file, an
 * email, a printed page. Throws when the value can't be encoded.
 */
export function qrCodeToSvg(
  value: string,
  {
    color = '#000000',
    background = '#ffffff',
    size = 1024,
    ...options
  }: ScQrCodeExportOptions = {},
): string {
  const modules = qrModules(value, options);
  const n = modules.length;
  const width = fit(n, size);
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${width}" viewBox="0 0 ${n} ${n}">` +
    `<rect width="${n}" height="${n}" fill="${escape(background)}"/>` +
    `<path d="${qrPath(modules)}" fill="${escape(color)}" shape-rendering="crispEdges"/>` +
    `</svg>`
  );
}

/**
 * A QR code as an image, PNG by default, black on white — sharp: whole
 * pixels a module. Throws when the value can't be encoded. In the browser only.
 */
export async function qrCodeToBlob(
  value: string,
  {
    color = '#000000',
    background = '#ffffff',
    size = 1024,
    type = 'image/png',
    quality,
    ...options
  }: ScQrCodeBlobOptions = {},
): Promise<Blob> {
  const modules = qrModules(value, options);
  const n = modules.length;
  const width = fit(n, size);
  const scale = width / n;
  const offscreen = typeof OffscreenCanvas !== 'undefined';
  const canvas = offscreen
    ? new OffscreenCanvas(width, width)
    : Object.assign(document.createElement('canvas'), {
        width,
        height: width,
      });
  const context = canvas.getContext('2d') as
    CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;
  if (!context) throw new Error('qrCodeToBlob: no 2D canvas.');
  context.fillStyle = background;
  context.fillRect(0, 0, width, width);
  context.fillStyle = color;
  modules.forEach((row, y) =>
    row.forEach((dark, x) => {
      if (dark) context.fillRect(x * scale, y * scale, scale, scale);
    }),
  );
  if (canvas instanceof HTMLCanvasElement) {
    return new Promise((resolve, reject) =>
      canvas.toBlob(
        (blob) =>
          blob ? resolve(blob) : reject(new Error('qrCodeToBlob: it failed.')),
        type,
        quality,
      ),
    );
  }
  return canvas.convertToBlob({ type, quality });
}
