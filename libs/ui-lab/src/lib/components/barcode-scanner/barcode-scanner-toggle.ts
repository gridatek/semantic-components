import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScBarcodeScanner } from './barcode-scanner';

/** Turns the camera on and off; pressed while on. Write its icon and name it ("Camera"). */
@Directive({
  selector: 'button[scBarcodeScannerToggle]',
  host: {
    type: 'button',
    'data-slot': 'barcode-scanner-toggle',
    '[attr.aria-pressed]': 'scanner.active()',
    '[disabled]': 'scanner.state() === "unsupported"',
    '[class]': 'class()',
    '(click)': 'scanner.active.set(!scanner.active())',
  },
})
export class ScBarcodeScannerToggle {
  private readonly buttonStyles = injectPreset().button;

  protected readonly scanner = inject(ScBarcodeScanner);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scBarcodeScannerToggle');
  }
}
