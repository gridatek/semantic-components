import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScSegmentedControl,
  ScSegmentedControlIndicator,
  ScSegmentedControlItem,
} from '@semantic-components/ui';

/** The whole control disabled, or one item — skipped by the arrows, not focused, not checked. */
@Component({
  selector: 'app-disabled-segmented-control-demo',
  imports: [
    ScField,
    ScLabel,
    ScSegmentedControl,
    ScSegmentedControlIndicator,
    ScSegmentedControlItem,
  ],
  template: `
    <div class="grid gap-6">
      <div scField class="items-center">
        <label scLabel>Theme</label>
        <div scSegmentedControl disabled [(value)]="theme">
          <div scSegmentedControlIndicator></div>
          @for (item of themes; track item.value) {
            <button scSegmentedControlItem [value]="item.value">
              {{ item.label }}
            </button>
          }
        </div>
      </div>
      <div scField class="items-center">
        <label scLabel>Billing period</label>
        <div scSegmentedControl [(value)]="period">
          <div scSegmentedControlIndicator></div>
          @for (item of periods; track item.value) {
            <button
              scSegmentedControlItem
              [value]="item.value"
              [disabled]="item.value === 'lifetime'"
            >
              {{ item.label }}
            </button>
          }
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSegmentedControlDemo {
  private readonly theme = signal<string | null>('system');
  private readonly period = signal<string | null>('monthly');
  private readonly themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];
  private readonly periods = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
    { value: 'lifetime', label: 'Lifetime' },
  ];
}
