import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCheckbox,
  ScField,
  ScFieldGroup,
  ScLabel,
} from '@semantic-components/ui';

/** Disabled, unchecked and checked: dimmed, out of the Tab order. */
@Component({
  selector: 'app-disabled-checkbox-demo',
  imports: [ScCheckbox, ScFieldGroup, ScLabel, ScField],
  template: `
    <div scFieldGroup class="w-56">
      <div scField orientation="horizontal">
        <input scCheckbox disabled />
        <label scLabel>Enable notifications</label>
      </div>
      <div scField orientation="horizontal">
        <input scCheckbox [checked]="true" disabled />
        <label scLabel>Sync settings</label>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledCheckboxDemo {}
