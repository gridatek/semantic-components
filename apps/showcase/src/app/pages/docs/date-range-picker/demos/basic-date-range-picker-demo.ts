import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScDateRangePicker, DateRange } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-date-range-picker-demo',
  imports: [ScDateRangePicker],
  template: `
    <sc-date-range-picker
      [(value)]="range"
      placeholder="Select date range"
      (apply)="onRangeApply($event)"
    />
    <p class="text-sm text-muted-foreground mt-4">
      @if (range().from && range().to) {
        Selected: {{ range().from?.toLocaleDateString() }} -
        {{ range().to?.toLocaleDateString() }}
      } @else {
        No range selected
      }
    </p>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicDateRangePickerDemo {
  readonly range = signal<DateRange>({ from: undefined, to: undefined });

  onRangeApply(range: DateRange): void {
    console.log('Range applied:', range);
  }
}
