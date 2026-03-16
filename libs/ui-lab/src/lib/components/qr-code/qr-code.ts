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
  readonly errorCorrectionLevel = input<QRErrorCorrectionLevel>('M');
  readonly border = input<number>(2);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('inline-block size-52', this.classInput()),
  );

  private readonly svgContent = computed(() => {
    const value = this.value();
    if (!value) return '';

    return renderSVG(value, {
      ecc: this.errorCorrectionLevel(),
      border: this.border(),
      blackColor: 'currentColor',
      whiteColor: 'transparent',
    });
  });

  constructor() {
    effect(() => {
      this.elementRef.nativeElement.innerHTML = this.svgContent();
    });
  }
}
