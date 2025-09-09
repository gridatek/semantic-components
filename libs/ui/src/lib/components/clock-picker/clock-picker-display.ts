import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'div[sc-clock-picker-display]',
  imports: [],
  template: `
    <ng-content />
  `,
  styles: `
    .sc-clock-picker-display {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,
  host: {
    '[class.sc-clock-picker-display]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScClockPickerDisplay {}
