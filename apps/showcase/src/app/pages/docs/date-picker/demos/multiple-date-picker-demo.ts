import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Temporal } from '@js-temporal/polyfill';
import { ScDatePicker } from '@semantic-components/ui';

@Component({
  selector: 'app-multiple-date-picker-demo',
  imports: [ScDatePicker],
  template: `
    <sc-date-picker
      mode="multiple"
      [(value)]="selectedDates"
      placeholder="Select dates"
    />
    @if (selectedDates().length > 0) {
      <p class="text-sm text-muted-foreground mt-4">
        {{ selectedDates().length }} date(s) selected
      </p>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleDatePickerDemo {
  readonly selectedDates = signal<Temporal.PlainDate[]>([]);
}
