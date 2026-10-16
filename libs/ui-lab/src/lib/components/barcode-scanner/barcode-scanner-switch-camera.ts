import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScBarcodeScanner } from './barcode-scanner';

/** The other camera (front, back) — disabled with only one. Write its icon and name it ("Switch camera"). */
@Directive({
  selector: 'button[scBarcodeScannerSwitchCamera]',
  host: {
    type: 'button',
    'data-slot': 'barcode-scanner-switch-camera',
    '[disabled]': '!scanner.canSwitchCamera()',
    '[class]': 'class()',
    '(click)': 'scanner.switchCamera()',
  },
})
export class ScBarcodeScannerSwitchCamera {
  protected readonly scanner = inject(ScBarcodeScanner);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scBarcodeScannerSwitchCamera');
  }
}
