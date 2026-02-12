import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScButtonGroup,
  ScButtonGroupSeparator,
  ScButtonGroupText,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-button-group-demo',
  imports: [ScButton, ScButtonGroup, ScButtonGroupSeparator, ScButtonGroupText],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="flex flex-col gap-4">
      <div sc-button-group>
        <button sc-button variant="outline">First</button>
        <button sc-button variant="outline">Second</button>
        <button sc-button variant="outline">Third</button>
      </div>

      <div sc-button-group>
        <div sc-button-group-text>Label</div>
        <button sc-button variant="outline">Action</button>
      </div>

      <div sc-button-group>
        <button sc-button variant="outline">Left</button>
        <div sc-button-group-separator></div>
        <button sc-button variant="outline">Right</button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupDemo {}
