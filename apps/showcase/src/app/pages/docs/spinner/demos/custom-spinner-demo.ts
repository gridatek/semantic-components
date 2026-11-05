import { Component, ViewEncapsulation } from '@angular/core';
import { ScSpinner } from '@semantic-components/ui';
import {
  SiLoaderCircleIcon,
  SiLoaderIcon,
  SiRefreshCwIcon,
} from '@semantic-icons/lucide-icons';

/** The icon is yours — another one, another colour. */
@Component({
  selector: 'app-custom-spinner-demo',
  imports: [ScSpinner, SiLoaderIcon, SiRefreshCwIcon, SiLoaderCircleIcon],
  template: `
    <div class="flex items-center gap-4">
      <svg scSpinner siLoaderIcon aria-label="Loading"></svg>
      <svg
        scSpinner
        siRefreshCwIcon
        aria-label="Loading"
        class="text-primary"
      ></svg>
      <svg
        scSpinner
        siLoaderCircleIcon
        aria-label="Loading"
        class="text-muted-foreground"
      ></svg>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomSpinnerDemo {}
