import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScSpinner } from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-loading-button-demo',
  imports: [ScButton, ScSpinner, SiLoaderCircleIcon],
  template: `
    <button scButton disabled>
      <svg scSpinner siLoaderCircleIcon></svg>
      Please wait
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingButtonDemo {}
