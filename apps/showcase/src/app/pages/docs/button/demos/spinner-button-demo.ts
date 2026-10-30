import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScSpinner } from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-spinner-button-demo',
  imports: [ScButton, ScSpinner, SiLoaderCircleIcon],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <button scButton variant="outline" disabled>
        <svg
          scSpinner
          siLoaderCircleIcon
          data-icon="inline-start"
          aria-label="Loading"
        ></svg>
        Generating
      </button>
      <button scButton variant="secondary" disabled>
        Downloading
        <svg
          scSpinner
          siLoaderCircleIcon
          data-icon="inline-end"
          aria-label="Loading"
        ></svg>
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SpinnerButtonDemo {}
