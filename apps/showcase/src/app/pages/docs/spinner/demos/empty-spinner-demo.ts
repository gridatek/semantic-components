import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScEmpty,
  ScEmptyBody,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
  ScSpinner,
} from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

/** As an empty state’s media, while the page waits. */
@Component({
  selector: 'app-empty-spinner-demo',
  imports: [
    ScButton,
    ScEmpty,
    ScEmptyBody,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
    ScSpinner,
    SiLoaderCircleIcon,
  ],
  template: `
    <div scEmpty class="w-full">
      <div scEmptyHeader>
        <div scEmptyMedia variant="icon">
          <svg scSpinner siLoaderCircleIcon aria-label="Processing"></svg>
        </div>
        <h2 scEmptyTitle>Processing your request</h2>
        <div scEmptyDescription>
          Please wait while we process your request. Do not refresh the page.
        </div>
      </div>
      <div scEmptyBody>
        <button scButton variant="outline" size="sm">Cancel</button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class EmptySpinnerDemo {}
