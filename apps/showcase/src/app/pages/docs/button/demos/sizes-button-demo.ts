import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-sizes-button-demo',
  imports: [ScButton],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <button sc-button size="lg">Large</button>
      <button sc-button size="default">Default</button>
      <button sc-button size="sm">Small</button>
      <button sc-button size="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesButtonDemo {}
