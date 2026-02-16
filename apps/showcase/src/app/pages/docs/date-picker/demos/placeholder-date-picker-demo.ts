import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScDatePicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-placeholder-date-picker-demo',
  imports: [ScDatePicker],
  template: `
    <sc-date-picker
      [(selected)]="selectedDate"
      placeholder="Select your birthday"
    />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderDatePickerDemo {
  readonly selectedDate = signal<Date | undefined>(undefined);
}
