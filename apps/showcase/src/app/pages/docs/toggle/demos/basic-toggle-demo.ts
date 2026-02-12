import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScToggle } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-toggle-demo',
  imports: [ScToggle],
  template: `
    <button sc-toggle [(pressed)]="bold" aria-label="Toggle bold">
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
        class="size-4"
      >
        <path d="M14 12a4 4 0 0 0 0-8H6v8" />
        <path d="M15 20a4 4 0 0 0 0-8H6v8" />
      </svg>
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicToggleDemo {
  readonly bold = signal(false);
}
