import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSwitch, ScSwitchField } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-switch-demo',
  imports: [ScSwitch, ScSwitchField],
  template: `
    <label scSwitchField>
      <input type="checkbox" scSwitch />
      Airplane Mode
    </label>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSwitchDemo {}
