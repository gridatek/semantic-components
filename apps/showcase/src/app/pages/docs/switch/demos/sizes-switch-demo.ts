import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldGroup,
  ScLabel,
  ScSwitch,
} from '@semantic-components/ui';

/** size: default, or sm. */
@Component({
  selector: 'app-sizes-switch-demo',
  imports: [ScFieldGroup, ScLabel, ScSwitch, ScField],
  template: `
    <div scFieldGroup class="w-full max-w-40">
      <div scField orientation="horizontal">
        <input scSwitch size="sm" />
        <label scLabel>Small</label>
      </div>
      <div scField orientation="horizontal">
        <input scSwitch size="default" />
        <label scLabel>Default</label>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesSwitchDemo {}
