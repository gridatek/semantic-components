import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScBarcodeScannerNext } from './barcode-scanner-next';

/** The camera's light, on and off; pressed while on — disabled where it has none. Write its icon and name it ("Light"). */
@Directive({
  selector: 'button[scBarcodeScannerNextTorch]',
  host: {
    type: 'button',
    'data-slot': 'barcode-scanner-torch',
    '[attr.aria-pressed]': 'scanner.torch()',
    '[disabled]': '!scanner.hasTorch()',
    '[class]': 'class()',
    '(click)': 'scanner.torch.set(!scanner.torch())',
  },
})
export class ScBarcodeScannerNextTorch {
  protected readonly scanner = inject(ScBarcodeScannerNext);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'aria-pressed:bg-accent aria-pressed:text-accent-foreground',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scBarcodeScannerNextTorch');
  }
}
