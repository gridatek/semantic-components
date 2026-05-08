import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { encode } from 'uqr';

export type ScQrCodeEcc = 'L' | 'M' | 'Q' | 'H';

@Component({
  selector: 'svg[scQrCode]',
  exportAs: 'scQrCode',
  template: `
    @for (row of qrData().data; track $index; let y = $index) {
      @for (cell of row; track $index; let x = $index) {
        @if (cell) {
          <svg:rect
            [attr.x]="x"
            [attr.y]="y"
            width="1"
            height="1"
            fill="currentColor"
          />
        }
      }
    }
  `,
  host: {
    '[class]': 'class()',
    role: 'img',
    xmlns: 'http://www.w3.org/2000/svg',
    '[attr.viewBox]': 'viewBox()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScQrCode {
  readonly nativeElement = inject(ElementRef<SVGSVGElement>).nativeElement;

  readonly value = input.required<string>();
  readonly ecc = input<ScQrCodeEcc>('M');
  readonly border = input<number>(2);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('inline-block size-52', this.classInput()),
  );

  protected readonly viewBox = computed(() => {
    const size = this.qrData().size;
    return `0 0 ${size} ${size}`;
  });

  protected readonly qrData = computed(() => {
    const value = this.value();
    if (!value) return { data: [] as boolean[][], size: 0 };

    return encode(value, {
      ecc: this.ecc(),
      border: this.border(),
    });
  });
}
