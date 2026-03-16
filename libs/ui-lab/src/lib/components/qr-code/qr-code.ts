import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { encode } from 'uqr';

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
  readonly border = input<number>(2);
  readonly logo = input<string>('');
  readonly logoSize = input<number>(0.2);
  readonly ariaLabel = input<string>('QR Code');
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('block', this.classInput()));

  protected readonly qrResult = computed(() => {
    const value = this.value();
    if (!value) return null;
    return encode(value, {
      ecc: this.errorCorrectionLevel(),
      border: this.border(),
    });
  });

  protected readonly viewBox = computed(() => {
    const result = this.qrResult();
    if (!result) return '0 0 0 0';
    return `0 0 ${result.size} ${result.size}`;
  });

  protected readonly logoPosition = computed(() => {
    const result = this.qrResult();
    if (!result) return { x: 0, y: 0, size: 0, padding: 0 };

    const border = this.border();
    const moduleCount = result.size - border * 2;
    const logoSizePercent = this.logoSize();
    const logoModules = Math.floor(moduleCount * logoSizePercent);
    const padding = 0.5;

    return {
      x: border + (moduleCount - logoModules) / 2,
      y: border + (moduleCount - logoModules) / 2,
      size: logoModules,
      padding,
    };
  });

  constructor() {
    effect(() => {
      const result = this.qrResult();
      const fg = this.foregroundColor();
      const bg = this.backgroundColor();
      const logo = this.logo();
      const logoPos = this.logoPosition();

      const svg = this.elementRef.nativeElement;
      svg.innerHTML = '';

      if (!result) return;

      const ns = 'http://www.w3.org/2000/svg';

      // Background
      const bgRect = document.createElementNS(ns, 'rect');
      bgRect.setAttribute('x', '0');
      bgRect.setAttribute('y', '0');
      bgRect.setAttribute('width', String(result.size));
      bgRect.setAttribute('height', String(result.size));
      bgRect.setAttribute('fill', bg);
      svg.appendChild(bgRect);

      // QR modules as a single path
      let pathData = '';
      for (let y = 0; y < result.size; y++) {
        for (let x = 0; x < result.size; x++) {
          if (result.data[y][x]) {
            pathData += `M${x},${y}h1v1h-1z`;
          }
        }
      }

      if (pathData) {
        const path = document.createElementNS(ns, 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', fg);
        svg.appendChild(path);
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
