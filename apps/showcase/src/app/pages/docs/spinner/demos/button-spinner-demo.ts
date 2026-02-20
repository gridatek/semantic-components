import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScSpinner } from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-spinner-demo',
  imports: [ScButton, ScSpinner, SiLoaderCircleIcon],
  template: `
    <button scButton disabled>
      <svg scSpinner siLoaderCircleIcon></svg>
      Loading...
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSpinnerDemo {}
