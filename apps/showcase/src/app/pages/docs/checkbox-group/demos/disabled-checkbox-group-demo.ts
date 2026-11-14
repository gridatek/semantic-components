import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScCheckbox, ScCheckboxGroup, ScField } from '@semantic-components/ui';

/** A disabled group: every checkbox in it dimmed, out of the Tab order. */
@Component({
  selector: 'app-disabled-checkbox-group-demo',
  imports: [ScCheckbox, ScCheckboxGroup, ScField],
  template: `
    <div scCheckboxGroup aria-label="Apples" disabled [(value)]="apples">
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledCheckboxGroupDemo {
  protected readonly apples = signal(['gala-apple']);
}
