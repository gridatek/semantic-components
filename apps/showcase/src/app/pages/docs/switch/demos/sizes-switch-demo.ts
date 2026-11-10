import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFieldGroup,
  ScLabel,
  ScSwitch,
  ScSwitchField,
} from '@semantic-components/ui';

/** size: default, or sm. */
@Component({
  selector: 'app-sizes-switch-demo',
  imports: [ScFieldGroup, ScLabel, ScSwitch, ScSwitchField],
  template: `
    <div scFieldGroup class="w-full max-w-40">
      <div scSwitchField>
        <input type="checkbox" scSwitch size="sm" />
        <label scLabel>Small</label>
      </div>
      <div scSwitchField>
        <input type="checkbox" scSwitch size="default" />
        <label scLabel>Default</label>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesSwitchDemo {}
