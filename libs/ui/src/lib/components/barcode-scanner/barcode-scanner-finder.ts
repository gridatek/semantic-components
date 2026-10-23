import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/** The viewfinder: four corners, where to hold the code. Decorative; size and place it with classes. */
@Component({
  selector: 'div[scBarcodeScannerFinder]',
  template: `
    <span
      class="absolute start-0 top-0 size-6 rounded-ss-md border-s-4 border-t-4"
    ></span>
    <span
      class="absolute end-0 top-0 size-6 rounded-se-md border-e-4 border-t-4"
    ></span>
    <span
      class="absolute start-0 bottom-0 size-6 rounded-es-md border-s-4 border-b-4"
    ></span>
    <span
      class="absolute end-0 bottom-0 size-6 rounded-ee-md border-e-4 border-b-4"
    ></span>
  `,
  host: {
    'data-slot': 'barcode-scanner-finder',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScBarcodeScannerFinder {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute inset-[15%] text-white/90',
      this.classInput(),
    ),
  );
}
