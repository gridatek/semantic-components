import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScItem,
  ScItemBody,
  ScItemMedia,
  ScItemTitle,
  ScSpinner,
} from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-spinner-usage-demo',
  imports: [
    ScItem,
    ScItemBody,
    ScItemMedia,
    ScItemTitle,
    ScSpinner,
    SiLoaderCircleIcon,
  ],
  template: `
    <div class="flex w-full max-w-xs flex-col gap-4">
      <div scItem variant="muted">
        <div scItemMedia>
          <svg scSpinner siLoaderCircleIcon aria-label="Processing"></svg>
        </div>
        <div scItemBody>
          <div scItemTitle class="line-clamp-1">Processing payment...</div>
        </div>
        <div scItemBody class="flex-none justify-end">
          <span class="text-sm tabular-nums">$100.00</span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SpinnerUsageDemo {}
