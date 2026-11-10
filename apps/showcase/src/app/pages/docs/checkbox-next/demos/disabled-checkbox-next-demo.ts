import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCheckboxNext,
  ScCheckboxNextField,
  ScFieldGroup,
  ScLabel,
} from '@semantic-components/ui';

/** Disabled, unchecked and checked: dimmed, out of the Tab order. */
@Component({
  selector: 'app-disabled-checkbox-next-demo',
  imports: [ScCheckboxNext, ScCheckboxNextField, ScFieldGroup, ScLabel],
  template: `
    <div scFieldGroup class="w-56">
      <div scCheckboxNextField>
        <input type="checkbox" scCheckboxNext disabled />
        <label scLabel>Enable notifications</label>
      </div>
      <div scCheckboxNextField>
        <input type="checkbox" scCheckboxNext [checked]="true" disabled />
        <label scLabel>Sync settings</label>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledCheckboxNextDemo {}
