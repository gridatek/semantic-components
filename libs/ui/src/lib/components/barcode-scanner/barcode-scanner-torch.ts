import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { type ScButtonVariants } from '../button/button';
import { ScBarcodeScanner } from './barcode-scanner';

/** The camera's light, on and off; pressed while on — disabled where it has none. Write its icon and name it ("Light"). */
@Directive({
  selector: 'button[scBarcodeScannerTorch]',
  host: {
    type: 'button',
    'data-slot': 'barcode-scanner-torch',
    '[attr.aria-pressed]': 'scanner.torch()',
    '[disabled]': '!scanner.hasTorch()',
    '[class]': 'class()',
    '(click)': 'scanner.torch.set(!scanner.torch())',
  },
})
export class ScBarcodeScannerTorch {
  private readonly buttonStyles = injectStyle().button;

  private readonly scanner = inject(ScBarcodeScanner);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'aria-pressed:bg-accent aria-pressed:text-accent-foreground',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scBarcodeScannerTorch');
  }
}
