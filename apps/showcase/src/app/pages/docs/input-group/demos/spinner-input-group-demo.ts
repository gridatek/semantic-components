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

@Component({
  selector: 'app-spinner-input-group-demo',
  imports: [ScInputGroup, ScInputGroupAddon, ScInputGroupInput, ScSpinner],
  template: `
    <div sc-input-group>
      <div sc-input-group-addon>
        <svg sc-spinner class="size-4"></svg>
      </div>
      <input sc-input-group-input placeholder="Loading..." disabled />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerInputGroupDemo {}
