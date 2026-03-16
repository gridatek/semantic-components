import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScQrCode } from './qr-code';

@Directive({
  selector: 'button[scQrCodeDownload]',
  host: {
    'data-slot': 'qr-code-download',
    type: 'button',
    '[class]': 'class()',
    '(click)': 'download()',
  },
})
export class ScQrCodeDownload {
  readonly for = input.required<ScQrCode>();
  readonly filename = input<string>('qrcode');
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center gap-2 px-4 py-2 text-sm',
      'border rounded-md hover:bg-accent transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-ring',
      this.classInput(),
    ),
  );

  protected download(): void {
    const svgEl = this.for().svgElement;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = this.for().size();
    canvas.width = size;
    canvas.height = size;

    const svgData = new XMLSerializer().serializeToString(svgEl);
    const img = new Image();
    const svgBlob = new Blob([svgData], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);

      const link = document.createElement('a');
      link.download = `${this.filename()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    img.src = url;
  }
}
