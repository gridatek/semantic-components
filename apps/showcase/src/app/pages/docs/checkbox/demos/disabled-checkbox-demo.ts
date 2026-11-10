import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCheckbox,
  ScCheckboxField,
  ScFieldGroup,
  ScLabel,
} from '@semantic-components/ui';

/** Disabled, unchecked and checked: dimmed, out of the Tab order. */
@Component({
  selector: 'app-disabled-checkbox-demo',
  imports: [ScCheckbox, ScCheckboxField, ScFieldGroup, ScLabel],
  template: `
    <div scFieldGroup class="w-56">
      <div scCheckboxField>
        <input type="checkbox" scCheckbox disabled />
        <label scLabel>Enable notifications</label>
      </div>
      <div scCheckboxField>
        <input type="checkbox" scCheckbox [checked]="true" disabled />
        <label scLabel>Sync settings</label>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledCheckboxDemo {}
