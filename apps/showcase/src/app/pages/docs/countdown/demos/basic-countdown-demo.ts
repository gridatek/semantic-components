import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCountdown } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-countdown-demo',
  imports: [ScCountdown],
  template: `
    <div class="inline-block rounded-lg border p-6">
      <div
        scCountdown
        #cd="scCountdown"
        [targetDate]="futureDate"
        class="gap-4"
      >
        @if (cd.time().days > 0) {
          <div class="flex flex-col items-center">
            <span class="font-mono text-4xl font-bold tabular-nums">
              {{ cd.padNumber(cd.time().days) }}
            </span>
            <span class="text-muted-foreground text-sm">Days</span>
          </div>
          <span class="text-muted-foreground -mt-5 text-4xl font-bold">:</span>
        }
        <div class="flex flex-col items-center">
          <span class="font-mono text-4xl font-bold tabular-nums">
            {{ cd.padNumber(cd.time().hours) }}
          </span>
          <span class="text-muted-foreground text-sm">Hours</span>
        </div>
        <span class="text-muted-foreground -mt-5 text-4xl font-bold">:</span>
        <div class="flex flex-col items-center">
          <span class="font-mono text-4xl font-bold tabular-nums">
            {{ cd.padNumber(cd.time().minutes) }}
          </span>
          <span class="text-muted-foreground text-sm">Minutes</span>
        </div>
        <span class="text-muted-foreground -mt-5 text-4xl font-bold">:</span>
        <div class="flex flex-col items-center">
          <span class="font-mono text-4xl font-bold tabular-nums">
            {{ cd.padNumber(cd.time().seconds) }}
          </span>
          <span class="text-muted-foreground text-sm">Seconds</span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCountdownDemo {
  readonly futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}
