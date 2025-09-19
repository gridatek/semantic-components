import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { DateRange, ScDateRangePicker } from '@semantic-components/ui';

@Component({
  selector: 'app-date-range-picker-demo',
  imports: [ScDateRangePicker],
  template: `
    <sc-date-range-picker
      [value]="selectedDateRange"
      [minDate]="minDate"
      [maxDate]="maxDate"
      (valueChange)="onDateRangeChange($event)"
      placeholder="Select your date range"
    ></sc-date-range-picker>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerDemo {
  selectedDateRange: DateRange | null = null;
  minDate = new Date('2020-01-01');
  maxDate = new Date('2030-12-31');

  onDateRangeChange(range: DateRange) {
    this.selectedDateRange = range;
    console.log('Selected Range:', range);

    if (range.startDate && range.endDate) {
      console.log('From:', range.startDate.toLocaleDateString());
      console.log('To:', range.endDate.toLocaleDateString());
    }
  }
}
