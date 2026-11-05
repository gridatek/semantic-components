import { Component, ViewEncapsulation } from '@angular/core';
import { ScSpinner } from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

/** Its size is a size-* class. */
@Component({
  selector: 'app-size-spinner-demo',
  imports: [ScSpinner, SiLoaderCircleIcon],
  template: `
    <div class="flex items-center gap-6">
      <svg
        scSpinner
        siLoaderCircleIcon
        aria-label="Loading"
        class="size-3"
      ></svg>
      <svg
        scSpinner
        siLoaderCircleIcon
        aria-label="Loading"
        class="size-4"
      ></svg>
      <svg
        scSpinner
        siLoaderCircleIcon
        aria-label="Loading"
        class="size-6"
      ></svg>
      <svg
        scSpinner
        siLoaderCircleIcon
        aria-label="Loading"
        class="size-8"
      ></svg>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizeSpinnerDemo {}
