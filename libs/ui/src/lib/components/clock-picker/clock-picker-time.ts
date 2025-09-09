import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'div[sc-clock-picker-time]',
  imports: [],
  template: `
    <ng-content />
  `,
  styles: `
    .sc-clock-picker-time {
      display: flex;
      align-items: center;
      font-size: 2.25rem;
      line-height: 2.5rem;
      font-family:
        ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
      gap: 0.5rem;
    }
  `,
  host: {
    '[class.sc-clock-picker-time]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScClockPickerTime {}
