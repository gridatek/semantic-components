import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCountdown } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-nodays-countdown-demo',
  imports: [ScCountdown],
  template: `
    <div class="p-4 rounded-lg border inline-block">
      <sc-countdown
        [targetDate]="shortFuture"
        [showDays]="false"
        variant="compact"
      />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodaysCountdownDemo {
  readonly shortFuture = new Date(Date.now() + 2 * 60 * 60 * 1000);
}
