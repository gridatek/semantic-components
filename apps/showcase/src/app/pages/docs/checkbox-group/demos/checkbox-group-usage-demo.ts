import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScCheckbox, ScCheckboxGroup, ScField } from '@semantic-components/ui';

/** Checkboxes sharing one value: the ticked ones, as an array. */
@Component({
  selector: 'app-checkbox-group-usage-demo',
  imports: [ScCheckbox, ScCheckboxGroup, ScField],
  template: `
    <div class="flex flex-col gap-3">
      <p id="apples-label" class="text-sm font-medium">Apples</p>
      <div scCheckboxGroup aria-labelledby="apples-label" [(value)]="apples">
        <label scField orientation="horizontal">
          <input scCheckbox value="fuji-apple" />
          Fuji
        </label>
        <label scField orientation="horizontal">
          <input scCheckbox value="gala-apple" />
          Gala
        </label>
        <label scField orientation="horizontal">
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
