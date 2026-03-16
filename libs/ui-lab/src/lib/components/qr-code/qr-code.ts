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
    '[attr.aria-label]': `'QR Code'`,
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
  readonly border = input<number>(2);
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
      blackColor: 'currentColor',
      whiteColor: 'transparent',
    });

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
