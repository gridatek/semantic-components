import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCountdown } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-compact-countdown-demo',
  imports: [ScCountdown],
  template: `
    <div class="p-4 rounded-lg border inline-block">
      <sc-countdown [targetDate]="futureDate" variant="compact" />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompactCountdownDemo {
  readonly futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}
