import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFieldGroup,
  ScLabel,
  ScSwitchNext,
  ScSwitchNextField,
} from '@semantic-components/ui';

/** size: default, or sm. */
@Component({
  selector: 'app-sizes-switch-next-demo',
  imports: [ScFieldGroup, ScLabel, ScSwitchNext, ScSwitchNextField],
  template: `
    <div scFieldGroup class="w-full max-w-40">
      <div scSwitchNextField>
        <input type="checkbox" scSwitchNext size="sm" />
        <label scLabel>Small</label>
      </div>
      <div scSwitchNextField>
        <input type="checkbox" scSwitchNext size="default" />
        <label scLabel>Default</label>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesSwitchNextDemo {}
