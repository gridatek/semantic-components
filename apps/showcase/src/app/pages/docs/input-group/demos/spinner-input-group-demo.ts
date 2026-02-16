import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupInput,
  ScSpinner,
} from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-spinner-input-group-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupInput,
    ScSpinner,
    SiLoaderCircleIcon,
  ],
  template: `
    <div sc-input-group>
      <div sc-input-group-addon>
        <svg sc-spinner si-loader-circle-icon class="size-4"></svg>
      </div>
      <input sc-input-group-input placeholder="Loading..." disabled />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerInputGroupDemo {}
