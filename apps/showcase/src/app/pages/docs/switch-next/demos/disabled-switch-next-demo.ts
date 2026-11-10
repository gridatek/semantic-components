import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScLabel,
  ScSwitchNext,
  ScSwitchNextField,
} from '@semantic-components/ui';

/** Disabled: dimmed, out of the Tab order. */
@Component({
  selector: 'app-disabled-switch-next-demo',
  imports: [ScLabel, ScSwitchNext, ScSwitchNextField],
  template: `
    <div scSwitchNextField class="w-fit">
      <input type="checkbox" scSwitchNext disabled />
      <label scLabel>Disabled</label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSwitchNextDemo {}
