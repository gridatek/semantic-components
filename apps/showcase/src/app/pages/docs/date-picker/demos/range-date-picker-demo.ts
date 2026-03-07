import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScDatePicker, ScDateRange } from '@semantic-components/ui';

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
      <p class="text-muted-foreground mt-4 text-sm">
        @if (selectedRange().to) {
          {{ selectedRange().from?.toLocaleString() }} -
          {{ selectedRange().to?.toLocaleString() }}
        } @else {
          {{ selectedRange().from?.toLocaleString() }} - ...
        }
      </p>
    }
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeDatePickerDemo {
  readonly selectedRange = signal<ScDateRange>({
    from: undefined,
    to: undefined,
  });
}
