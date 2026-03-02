import { Temporal } from '@js-temporal/polyfill';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScDatePicker } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-date-picker-demo',
  imports: [ScDatePicker],
  template: `
    <sc-date-picker [(value)]="selectedDate" />
    @if (selectedDate()) {
      <p class="text-muted-foreground mt-4 text-sm">
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
