import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScDateRange, ScDatePicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-range-date-picker-demo',
  imports: [ScDatePicker],
  template: `
    <sc-date-picker
      mode="range"
      [(value)]="selectedRange"
      placeholder="Pick a date range"
    />
    @if (selectedRange().from) {
      <p class="text-sm text-muted-foreground mt-4">
        @if (selectedRange().to) {
          {{ selectedRange().from?.toLocaleDateString() }} -
          {{ selectedRange().to?.toLocaleDateString() }}
        } @else {
          {{ selectedRange().from?.toLocaleDateString() }} - ...
        }
      </p>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeDatePickerDemo {
  readonly selectedRange = signal<ScDateRange>({
    from: undefined,
    to: undefined,
  });
}
