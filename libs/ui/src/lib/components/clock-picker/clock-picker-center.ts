import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'div[sc-clock-picker-center]',
  imports: [],
  template: `
    <ng-content />
  `,
  styles: `
    .sc-clock-picker-center {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 8px;
      background: var(--primary);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      z-index: 25;
    }
  `,
  host: {
    'aria-hidden': 'true',
    '[class.sc-clock-picker-center]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScClockPickerCenter {}
