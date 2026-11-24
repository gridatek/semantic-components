import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScPreferencesApply,
  ScSegmentedControl,
  ScSegmentedControlIndicator,
  ScSegmentedControlItem,
  definePreference,
  injectPreference,
} from '@semantic-components/ui';

/** List or grid, kept: choose Grid, then reload the page — data-view on the list's element, the CSS styles by it. */
const view = definePreference({
  attribute: 'data-view',
  values: ['list', 'grid'],
  defaultValue: 'list',
  storageKey: 'sc-demo-view',
});

@Component({
  selector: 'app-preferences-usage-demo',
  imports: [
    ScPreferencesApply,
    ScSegmentedControl,
    ScSegmentedControlIndicator,
    ScSegmentedControlItem,
  ],
  template: `
    <div class="grid w-full max-w-sm gap-4">
      <div
        scSegmentedControl
        aria-label="View"
        [value]="view.value()"
        (valueChange)="choose($event)"
      >
        <div scSegmentedControlIndicator></div>
        <button scSegmentedControlItem value="list">List</button>
        <button scSegmentedControlItem value="grid">Grid</button>
      </div>
      <div [scPreferences]="[definition]">
        <ul
          aria-label="Files"
          class="grid gap-2 in-data-[view=grid]:grid-cols-2"
        >
          @for (file of files; track file) {
            <li class="rounded-md border px-3 py-2 text-sm">{{ file }}</li>
          }
        </ul>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PreferencesUsageDemo {
  private readonly definition = view;
  private readonly view = injectPreference(view);
  private readonly files = [
    'report.pdf',
    'notes.md',
    'budget.xlsx',
    'photo.png',
  ];

  private choose(value: string | null): void {
    if (value === 'list' || value === 'grid') this.view.set(value);
  }
}
