import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { DateTimeValue, ScDateTimePicker } from '@semantic-components/ui';

@Component({
  selector: 'app-date-time-picker-demo',
  imports: [ScDateTimePicker],
  template: `
    <sc-date-time-picker
      [value]="selectedDateTime"
      (valueChange)="onDateTimeChange($event)"
    ></sc-date-time-picker>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimePickerDemo {
  selectedDateTime: DateTimeValue | null = null;

  onDateTimeChange(value: DateTimeValue) {
    this.selectedDateTime = value;
    console.log('Selected:', value);
  }
}
