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

  private readonly svgContent = computed(() => {
    const result = this.qrResult();
    if (!result) return '';

    const { size, data } = result;
    const fg = this.foregroundColor();
    const bg = this.backgroundColor();

    let svg = `<rect width="${size}" height="${size}" fill="${bg}"/>`;

    let d = '';
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (data[y][x]) {
          d += `M${x},${y}h1v1h-1z`;
        }
      }
    }
    if (d) {
      svg += `<path d="${d}" fill="${fg}"/>`;
    }

    const logo = this.logo();
    if (logo) {
      const border = this.border();
      const moduleCount = size - border * 2;
      const logoModules = Math.floor(moduleCount * this.logoSize());
      const pad = 0.5;
      const lx = border + (moduleCount - logoModules) / 2;
      const ly = border + (moduleCount - logoModules) / 2;

      svg += `<rect x="${lx - pad}" y="${ly - pad}" width="${logoModules + pad * 2}" height="${logoModules + pad * 2}" fill="${bg}" rx="${pad}"/>`;
      svg += `<image href="${logo}" x="${lx}" y="${ly}" width="${logoModules}" height="${logoModules}" preserveAspectRatio="xMidYMid slice"/>`;
    }

    return svg;
  });

  constructor() {
    effect(() => {
      this.elementRef.nativeElement.innerHTML = this.svgContent();
    });
  }
}
