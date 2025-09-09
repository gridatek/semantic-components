import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'span[sc-clock-picker-separator]',
  imports: [],
  template: `
    <ng-content />
  `,
  styles: `
    .sc-clock-picker-separator {
      color: var(--muted-foreground);
    }
  `,
  host: {
    '[class.sc-clock-picker-separator]': 'true',
    '[attr.aria-hidden]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScClockPickerSeparator {}
