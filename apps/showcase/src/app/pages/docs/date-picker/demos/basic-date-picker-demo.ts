import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Temporal } from '@js-temporal/polyfill';
import { ScDatePicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-date-picker-demo',
  imports: [ScDatePicker],
  template: `
    <sc-date-picker [(value)]="selectedDate" />
    @if (selectedDate()) {
      <p class="text-sm text-muted-foreground mt-4">
        Selected: {{ selectedDate()?.toLocaleString() }}
      </p>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicDatePickerDemo {
  readonly selectedDate = signal<Temporal.PlainDate | undefined>(undefined);
}
