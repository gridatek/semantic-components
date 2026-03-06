import { Temporal } from '@js-temporal/polyfill';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScDatePicker } from '@semantic-components/ui';

@Component({
  selector: 'app-placeholder-date-picker-demo',
  imports: [ScDatePicker],
  template: `
    <sc-date-picker
      [(value)]="selectedDate"
      placeholder="Select your birthday"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderDatePickerDemo {
  readonly selectedDate = signal<Temporal.PlainDate | undefined>(undefined);
}
