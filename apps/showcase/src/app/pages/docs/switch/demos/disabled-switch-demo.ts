import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSwitch, ScSwitchField } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-switch-demo',
  imports: [ScSwitch, ScSwitchField],
  template: `
    <div class="grid gap-3">
      <label scSwitchField>
        <input type="checkbox" scSwitch disabled />
        Disabled (Off)
      </label>
      <label scSwitchField>
        <input type="checkbox" scSwitch [checked]="true" disabled />
        Disabled (On)
      </label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledSwitchDemo {}
