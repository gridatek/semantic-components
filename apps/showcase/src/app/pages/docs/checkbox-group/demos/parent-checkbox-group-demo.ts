import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScCheckbox, ScCheckboxGroup, ScField } from '@semantic-components/ui';

/** A parent checkbox: ticks all of allValues or none, mixed when only some are. */
@Component({
  selector: 'app-parent-checkbox-group-demo',
  imports: [ScCheckbox, ScCheckboxGroup, ScField],
  template: `
    <div
      scCheckboxGroup
      aria-label="Apples"
      [allValues]="allApples"
      [(value)]="apples"
    >
      <label scField orientation="horizontal">
        <input scCheckbox parent />
        Apples
      </label>
      <div class="flex flex-col gap-3 ps-6">
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
export class ParentCheckboxGroupDemo {
  protected readonly allApples = [
    'fuji-apple',
    'gala-apple',
    'granny-smith-apple',
  ];
  protected readonly apples = signal<string[]>([]);
}
