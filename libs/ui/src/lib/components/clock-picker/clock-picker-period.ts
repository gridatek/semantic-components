import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'div[sc-clock-picker-period]',
  imports: [],
  template: `
    <ng-content />
  `,
  styles: `
    .sc-clock-picker-period {
      display: flex;
      flex-direction: column;
      margin-left: 0.5rem;
      gap: 0.25rem;
    }
  `,
  host: {
    '[class.sc-clock-picker-period]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScClockPickerPeriod {}
