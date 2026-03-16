import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { renderSVG } from 'uqr';

export type QRErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

@Directive({
  selector: '[scQrCode]',
  exportAs: 'scQrCode',
  host: {
    'data-slot': 'qr-code',
    '[class]': 'class()',
    role: 'img',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class ScQrCode {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  get svgElement(): SVGSVGElement | null {
    return this.elementRef.nativeElement.querySelector('svg');
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

  protected readonly class = computed(() =>
    cn('inline-block', this.classInput()),
  );

  private readonly svgContent = computed(() => {
    const value = this.value();
    if (!value) return '';

    let svg = renderSVG(value, {
      ecc: this.errorCorrectionLevel(),
      border: this.border(),
      pixelSize: 0,
      whiteColor: this.backgroundColor(),
      blackColor: this.foregroundColor(),
    });

    const logo = this.logo();
    if (logo) {
      const sizeMatch = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
      if (sizeMatch) {
        const totalSize = Number(sizeMatch[1]);
        const border = this.border();
        const moduleCount = totalSize - border * 2;
        const logoModules = Math.floor(moduleCount * this.logoSize());
        const pad = 0.5;
        const lx = border + (moduleCount - logoModules) / 2;
        const ly = border + (moduleCount - logoModules) / 2;

        const bg = this.backgroundColor();
        const logoSvg =
          `<rect x="${lx - pad}" y="${ly - pad}" width="${logoModules + pad * 2}" height="${logoModules + pad * 2}" fill="${bg}" rx="${pad}"/>` +
          `<image href="${logo}" x="${lx}" y="${ly}" width="${logoModules}" height="${logoModules}" preserveAspectRatio="xMidYMid slice"/>`;

        svg = svg.replace('</svg>', `${logoSvg}</svg>`);
      }
    }

    // Set width/height
    svg = svg.replace(
      '<svg ',
      `<svg width="${this.size()}" height="${this.size()}" `,
    );

    return svg;
  });

  constructor() {
    effect(() => {
      this.elementRef.nativeElement.innerHTML = this.svgContent();
    });
  }
}
