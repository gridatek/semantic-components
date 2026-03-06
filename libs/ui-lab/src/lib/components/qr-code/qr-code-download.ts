import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SiDownloadIcon } from '@semantic-icons/lucide-icons';
import { QRErrorCorrectionLevel, ScQrCode } from './qr-code';

@Component({
  selector: 'sc-qr-code-download',
  imports: [ScQrCode, SiDownloadIcon],
  template: `
    <div [class]="containerClass()">
      <sc-qr-code
        [value]="value()"
        [size]="size()"
        [errorCorrectionLevel]="errorCorrectionLevel()"
        [foregroundColor]="foregroundColor()"
        [backgroundColor]="backgroundColor()"
        [quietZone]="quietZone()"
        [logo]="logo()"
        [logoSize]="logoSize()"
      />
      @if (showDownload()) {
        <button type="button" (click)="download()" [class]="buttonClass()">
          <svg siDownloadIcon class="size-4"></svg>
          {{ downloadLabel() }}
        </button>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScQrCodeDownload {
  readonly value = input.required<string>();
  readonly size = input<number>(200);
  readonly errorCorrectionLevel = input<QRErrorCorrectionLevel>('M');
  readonly foregroundColor = input<string>('#000000');
  readonly backgroundColor = input<string>('#ffffff');
  readonly quietZone = input<number>(2);
  readonly logo = input<string>('');
  readonly logoSize = input<number>(0.2);
  readonly showDownload = input<boolean>(true);
  readonly downloadLabel = input<string>('Download');
  readonly filename = input<string>('qrcode');
  readonly class = input<string>('');

  protected readonly containerClass = computed(() =>
    cn('inline-flex flex-col items-center gap-3', this.class()),
  );

  protected readonly buttonClass = computed(() =>
    cn(
      'inline-flex items-center gap-2 px-4 py-2 text-sm',
      'border rounded-md hover:bg-accent transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-ring',
    ),
  );

  download(): void {
    const svg = document.querySelector('sc-qr-code svg');
    if (!svg) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = this.size();
    canvas.width = size;
    canvas.height = size;

    const svgData = new XMLSerializer().serializeToString(svg);
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
