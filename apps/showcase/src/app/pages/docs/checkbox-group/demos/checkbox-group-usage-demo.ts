import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCheckbox,
  ScCheckboxField,
  ScCheckboxGroup,
} from '@semantic-components/ui';

/** Checkboxes sharing one value: the ticked ones, as an array. */
@Component({
  selector: 'app-checkbox-group-usage-demo',
  imports: [ScCheckbox, ScCheckboxField, ScCheckboxGroup],
  template: `
    <div class="flex flex-col gap-3">
      <p id="apples-label" class="text-sm font-medium">Apples</p>
      <div scCheckboxGroup aria-labelledby="apples-label" [(value)]="apples">
        <label scCheckboxField>
          <input scCheckbox value="fuji-apple" />
          Fuji
        </label>
        <label scCheckboxField>
          <input scCheckbox value="gala-apple" />
          Gala
        </label>
        <label scCheckboxField>
          <input scCheckbox value="granny-smith-apple" />
          Granny Smith
        </label>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxGroupUsageDemo {
  protected readonly apples = signal(['fuji-apple']);
}
