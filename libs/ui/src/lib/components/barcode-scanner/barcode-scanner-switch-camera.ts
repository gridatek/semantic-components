import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
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
  private readonly buttonStyles = injectPreset().button;

  protected readonly scanner = inject(ScBarcodeScanner);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scBarcodeScannerSwitchCamera');
  }
}
