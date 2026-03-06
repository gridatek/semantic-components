import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCountdownSimple } from '@semantic-components/ui-lab';
import { SiClockIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-sale-countdown-demo',
  imports: [ScCountdownSimple, SiClockIcon],
  template: `
    <div
      class="bg-destructive/10 border-destructive/20 flex max-w-sm items-center gap-4 rounded-lg border p-4"
    >
      <div class="text-destructive">
        <svg siClockIcon class="size-8"></svg>
      </div>
      <div class="flex-1">
        <div class="text-destructive font-semibold">Flash Sale Ends In</div>
        <sc-countdown-simple
          [targetDate]="shortFuture"
          format="hh:mm:ss"
          class="text-destructive text-xl font-bold"
        />
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaleCountdownDemo {
  readonly shortFuture = new Date(Date.now() + 2 * 60 * 60 * 1000);
}
