import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScSpinner } from '@semantic-components/ui-lab';
import { SiLoader2Icon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-loading-button-demo',
  imports: [ScButton, ScSpinner, SiLoader2Icon],
  template: `
    <button sc-button disabled>
      <svg sc-spinner si-loader-2-icon></svg>
      Please wait
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingButtonDemo {}
