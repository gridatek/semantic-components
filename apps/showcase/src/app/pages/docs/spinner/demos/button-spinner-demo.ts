import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScSpinner } from '@semantic-components/ui';
import { SiLoader2Icon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-spinner-demo',
  imports: [ScButton, ScSpinner, SiLoader2Icon],
  template: `
    <button sc-button disabled>
      <svg sc-spinner si-loader-2-icon></svg>
      Loading...
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSpinnerDemo {}
