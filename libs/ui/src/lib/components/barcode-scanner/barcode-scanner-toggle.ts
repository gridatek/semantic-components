import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { type ScButtonVariants } from '../button/button';
import { ScBarcodeScanner } from './barcode-scanner';

/**
 * Turns the camera on and off. Write its icon and its name from the state —
 * Scan, Stop (`active()`): the name says what a press does.
 */
@Directive({
  selector: 'button[scBarcodeScannerToggle]',
  host: {
    type: 'button',
    'data-slot': 'barcode-scanner-toggle',
    '[disabled]': 'scanner.state() === "unsupported"',
    '[class]': 'class()',
    '(click)': 'scanner.active.set(!scanner.active())',
  },
})
export class ScBarcodeScannerToggle {
  private readonly buttonStyles = injectStyle().button;

  private readonly scanner = inject(ScBarcodeScanner);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scBarcodeScannerToggle');
  }
}
