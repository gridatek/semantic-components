import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { generateQRCode } from './qr-generator';

export type QRErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

@Directive({
  selector: 'svg[scQrCode]',
  exportAs: 'scQrCode',
  host: {
    'data-slot': 'qr-code',
    '[class]': 'class()',
    role: 'img',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.viewBox]': 'viewBox()',
    '[attr.width]': 'size()',
    '[attr.height]': 'size()',
  },
})
export class ScQrCode {
  private readonly elementRef = inject(ElementRef<SVGElement>);

  get svgElement(): SVGElement {
    return this.elementRef.nativeElement;
  }

  readonly value = input.required<string>();
  readonly size = input<number>(200);
  readonly errorCorrectionLevel = input<QRErrorCorrectionLevel>('M');
  readonly foregroundColor = input<string>('#000000');
  readonly backgroundColor = input<string>('#ffffff');
  readonly quietZone = input<number>(2);
  readonly logo = input<string>('');
  readonly logoSize = input<number>(0.2);
  readonly ariaLabel = input<string>('QR Code');
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('block', this.classInput()));

  readonly qrMatrix = computed(() => {
    const value = this.value();
    if (!value) return [];
    return generateQRCode(value, this.errorCorrectionLevel());
  });

  readonly moduleCount = computed(() => {
    const matrix = this.qrMatrix();
    return matrix.length || 21;
  });

  protected readonly viewBox = computed(() => {
    const count = this.moduleCount();
    const zone = this.quietZone();
    const totalSize = count + zone * 2;
    return `0 0 ${totalSize} ${totalSize}`;
  });

  readonly logoPosition = computed(() => {
    const count = this.moduleCount();
    const zone = this.quietZone();
    const logoSizePercent = this.logoSize();
    const logoModules = Math.floor(count * logoSizePercent);
    const padding = 0.5;

    return {
      x: zone + (count - logoModules) / 2,
      y: zone + (count - logoModules) / 2,
      size: logoModules,
      padding,
    };
  });

  constructor() {
    effect(() => {
      const matrix = this.qrMatrix();
      const zone = this.quietZone();
      const count = this.moduleCount();
      const fg = this.foregroundColor();
      const bg = this.backgroundColor();
      const logo = this.logo();
      const logoPos = this.logoPosition();

      const svg = this.elementRef.nativeElement;

      // Clear previous content
      svg.innerHTML = '';

      const ns = 'http://www.w3.org/2000/svg';

      // Background
      const bgRect = document.createElementNS(ns, 'rect');
      bgRect.setAttribute('x', '0');
      bgRect.setAttribute('y', '0');
      bgRect.setAttribute('width', String(count + zone * 2));
      bgRect.setAttribute('height', String(count + zone * 2));
      bgRect.setAttribute('fill', bg);
      svg.appendChild(bgRect);

      // QR modules
      for (let rowIdx = 0; rowIdx < matrix.length; rowIdx++) {
        for (let colIdx = 0; colIdx < matrix[rowIdx].length; colIdx++) {
          if (matrix[rowIdx][colIdx]) {
            const rect = document.createElementNS(ns, 'rect');
            rect.setAttribute('x', String(colIdx + zone));
            rect.setAttribute('y', String(rowIdx + zone));
            rect.setAttribute('width', '1');
            rect.setAttribute('height', '1');
            rect.setAttribute('fill', fg);
            svg.appendChild(rect);
          }
        }
      }

      // Logo overlay
      if (logo) {
        const logoBgRect = document.createElementNS(ns, 'rect');
        logoBgRect.setAttribute('x', String(logoPos.x - logoPos.padding));
        logoBgRect.setAttribute('y', String(logoPos.y - logoPos.padding));
        logoBgRect.setAttribute(
          'width',
          String(logoPos.size + logoPos.padding * 2),
        );
        logoBgRect.setAttribute(
          'height',
          String(logoPos.size + logoPos.padding * 2),
        );
        logoBgRect.setAttribute('fill', bg);
        logoBgRect.setAttribute('rx', String(logoPos.padding));
        svg.appendChild(logoBgRect);

        const image = document.createElementNS(ns, 'image');
        image.setAttribute('href', logo);
        image.setAttribute('x', String(logoPos.x));
        image.setAttribute('y', String(logoPos.y));
        image.setAttribute('width', String(logoPos.size));
        image.setAttribute('height', String(logoPos.size));
        image.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        svg.appendChild(image);
      }
    });
  }
}
