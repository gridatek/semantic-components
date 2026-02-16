import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTimezoneSelect } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-abbr-timezone-demo',
  imports: [ScTimezoneSelect],
  template: `
    <div class="max-w-xs">
      <scTimezoneSelect [showAbbr]="false"></sc-timezone-select>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoAbbrTimezoneDemo {}
