import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScInputGroup,
  ScInputGroupAddon,
  ScInput,
  ScSpinner,
} from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-spinner-input-group-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
    ScInput,
    ScSpinner,
    SiLoaderCircleIcon,
  ],
  template: `
    <div scInputGroup>
      <div scInputGroupAddon>
        <svg scSpinner si-loader-circle-icon class="size-4"></svg>
      </div>
      <input scInput variant="group" placeholder="Loading..." disabled />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerInputGroupDemo {}
