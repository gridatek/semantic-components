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
    <div class="inline-block rounded-lg border p-4">
      <div
        scCountdown
        #cd="scCountdown"
        [targetDate]="futureDate"
        class="gap-1"
      >
        @if (cd.time().days > 0) {
          <div class="flex flex-col items-center">
            <span class="font-mono text-2xl font-bold tabular-nums">
              {{ cd.padNumber(cd.time().days) }}
            </span>
            <span class="text-muted-foreground text-xs">Days</span>
          </div>
          <span class="text-muted-foreground -mt-3 text-2xl font-bold">:</span>
        }
        <div class="flex flex-col items-center">
          <span class="font-mono text-2xl font-bold tabular-nums">
            {{ cd.padNumber(cd.time().hours) }}
          </span>
          <span class="text-muted-foreground text-xs">Hours</span>
        </div>
        <span class="text-muted-foreground -mt-3 text-2xl font-bold">:</span>
        <div class="flex flex-col items-center">
          <span class="font-mono text-2xl font-bold tabular-nums">
            {{ cd.padNumber(cd.time().minutes) }}
          </span>
          <span class="text-muted-foreground text-xs">Minutes</span>
        </div>
        <span class="text-muted-foreground -mt-3 text-2xl font-bold">:</span>
        <div class="flex flex-col items-center">
          <span class="font-mono text-2xl font-bold tabular-nums">
            {{ cd.padNumber(cd.time().seconds) }}
          </span>
          <span class="text-muted-foreground text-xs">Seconds</span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompactCountdownDemo {
  readonly futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}
