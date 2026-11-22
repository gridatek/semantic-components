import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScSegmentedControl,
  ScSegmentedControlIndicator,
  ScSegmentedControlItem,
} from '@semantic-components/ui';

/** One value from a short row: the indicator slides to the one checked. The arrows move and check; one Tab stop. */
@Component({
  selector: 'app-segmented-control-usage-demo',
  imports: [
    ScField,
    ScLabel,
    ScSegmentedControl,
    ScSegmentedControlIndicator,
    ScSegmentedControlItem,
  ],
  template: `
    <div scField class="items-center">
      <label scLabel>View</label>
      <div scSegmentedControl [(value)]="view">
        <div scSegmentedControlIndicator></div>
        @for (item of views; track item.value) {
          <button scSegmentedControlItem [value]="item.value">
            {{ item.label }}
          </button>
        }
      </div>
      <p class="text-muted-foreground text-sm" data-testid="picked">
        {{ view() ?? 'None' }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SegmentedControlUsageDemo {
  private readonly view = signal<string | null>('list');
  private readonly views = [
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
    { value: 'board', label: 'Board' },
  ];
}
