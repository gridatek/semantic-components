import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTimezoneSelect } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-offset-timezone-demo',
  imports: [ScTimezoneSelect],
  template: `
    <div class="max-w-xs">
      <sc-timezone-select [showOffset]="false"></sc-timezone-select>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoOffsetTimezoneDemo {}
