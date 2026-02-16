import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCountdownSimple } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-sale-countdown-demo',
  imports: [ScCountdownSimple],
  template: `
    <div
      class="max-w-sm rounded-lg bg-destructive/10 border border-destructive/20 p-4 flex items-center gap-4"
    >
      <div class="text-destructive">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="size-8"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>
      <div class="flex-1">
        <div class="font-semibold text-destructive">Flash Sale Ends In</div>
        <sc-countdown-simple
          [targetDate]="shortFuture"
          format="hh:mm:ss"
          class="text-xl font-bold text-destructive"
        />
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaleCountdownDemo {
  readonly shortFuture = new Date(Date.now() + 2 * 60 * 60 * 1000);
}
