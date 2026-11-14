import { Component, ViewEncapsulation } from '@angular/core';
import { ScField, ScLabel, ScSwitch } from '@semantic-components/ui';

/** Disabled: dimmed, out of the Tab order. */
@Component({
  selector: 'app-disabled-switch-demo',
  imports: [ScLabel, ScSwitch, ScField],
  template: `
    <div scField orientation="horizontal" class="w-fit">
      <input scSwitch disabled />
      <label scLabel>Disabled</label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSwitchDemo {}
