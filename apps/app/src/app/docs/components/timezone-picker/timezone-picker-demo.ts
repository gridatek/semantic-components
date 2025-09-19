import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScTimezonePicker } from '@semantic-components/timezone';

@Component({
  selector: 'app-timezone-picker-demo',
  imports: [ScTimezonePicker],
  template: `
    <sc-timezone-picker placeholder="Choisissez un fuseau horaire"></sc-timezone-picker>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimezonePickerDemo {}
