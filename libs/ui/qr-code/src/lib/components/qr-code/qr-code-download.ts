import { DOCUMENT, Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
} from '@semantic-components/ui';
import { ScQrCode } from './qr-code';

export type ScQrCodeDownloadFormat = 'png' | 'svg';

/** A computed color that paints nothing (no background set). */
const isTransparent = (color: string): boolean =>
  color === 'transparent' || /^rgba\(.*,\s*0\)$/.test(color);

/**
 * Downloads a `scQrCode` as PNG or SVG, drawn from its modules — sharp at any
 * size, in the colors it shows on screen (white behind it if it has no
 * background). Disabled while there's no code.
 */
@Directive({
  selector: 'button[scQrCodeDownload]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!for().valid()',
    '(click)': 'download()',
  },
})
export class ScQrCodeDownload {
  private readonly buttonStyles = injectPreset().button;

  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('default');
  /** The QR code to download (`#qr="scQrCode"`). */
  readonly for = input.required<ScQrCode>();
  /** File name, without extension. */
  readonly filename = input('qrcode');
  readonly format = input<ScQrCodeDownloadFormat>('png');
  /** Image width in pixels, rounded down to whole pixels per module. */
  readonly imageSize = input(1024);

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected download(): void {
    const qr = this.for();
    const modules = qr.modules();
    if (!modules.length) return;

    const scale = Math.max(1, Math.floor(this.imageSize() / modules.length));
    const width = modules.length * scale;
    const { color, background } = this.colors(qr.nativeElement);

    if (this.format() === 'svg') {
      const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${width}" viewBox="0 0 ${modules.length} ${modules.length}">` +
        `<rect width="100%" height="100%" fill="${background}"/>` +
        `<path d="${qr.path()}" fill="${color}" shape-rendering="crispEdges"/>` +
        `</svg>`;
      this.save(new Blob([svg], { type: 'image/svg+xml' }), 'svg');
      return;
    }

    const canvas = this.document.createElement('canvas');
    canvas.width = width;
    canvas.height = width;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.fillStyle = background;
    context.fillRect(0, 0, width, width);
    context.fillStyle = color;
    modules.forEach((row, y) =>
      row.forEach((dark, x) => {
        if (dark) context.fillRect(x * scale, y * scale, scale, scale);
      }),
    );
    canvas.toBlob((blob) => {
      if (blob) this.save(blob, 'png');
    }, 'image/png');
  }

  private colors(element: Element): { color: string; background: string } {
    const style = this.document.defaultView?.getComputedStyle(element);
    const color = style?.color || '#000000';
    const background = style?.backgroundColor ?? '';
    return {
      color,
      background:
        isTransparent(background) || !background ? '#ffffff' : background,
    };
  }

  private save(blob: Blob, extension: string): void {
    const url = URL.createObjectURL(blob);
    const link = this.document.createElement('a');
    link.href = url;
    link.download = `${this.filename()}.${extension}`;
    link.click();
    // Give the browser time to start the download before releasing the file.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
