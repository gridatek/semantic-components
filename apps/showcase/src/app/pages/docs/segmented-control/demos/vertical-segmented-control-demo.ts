import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScSegmentedControl,
  ScSegmentedControlIndicator,
  ScSegmentedControlItem,
} from '@semantic-components/ui';

/** orientation="vertical": stacked; the arrows still move both ways. */
@Component({
  selector: 'app-vertical-segmented-control-demo',
  imports: [
    ScField,
    ScLabel,
    ScSegmentedControl,
    ScSegmentedControlIndicator,
    ScSegmentedControlItem,
  ],
  template: `
    <div scField class="w-40">
      <label scLabel>Vertical alignment</label>
      <div scSegmentedControl orientation="vertical" [(value)]="position">
        <div scSegmentedControlIndicator></div>
        @for (item of positions; track item.value) {
          <button scSegmentedControlItem [value]="item.value">
            {{ item.label }}
          </button>
        }
      </div>
      <p class="text-muted-foreground text-sm" data-testid="picked">
        {{ position() ?? 'None' }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalSegmentedControlDemo {
  private readonly position = signal<string | null>('middle');
  private readonly positions = [
    { value: 'top', label: 'Top' },
    { value: 'middle', label: 'Middle' },
    { value: 'bottom', label: 'Bottom' },
  ];
}
