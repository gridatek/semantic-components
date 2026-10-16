import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScBarcodeScannerNext } from './barcode-scanner-next';

/** Turns the camera on and off; pressed while on. Write its icon and name it ("Camera"). */
@Directive({
  selector: 'button[scBarcodeScannerNextToggle]',
  host: {
    type: 'button',
    'data-slot': 'barcode-scanner-toggle',
    '[attr.aria-pressed]': 'scanner.active()',
    '[disabled]': 'scanner.state() === "unsupported"',
    '[class]': 'class()',
    '(click)': 'scanner.active.set(!scanner.active())',
  },
})
export class ScBarcodeScannerNextToggle {
  protected readonly scanner = inject(ScBarcodeScannerNext);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scBarcodeScannerNextToggle');
  }
}
