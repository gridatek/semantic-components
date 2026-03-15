import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCountdown } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-simple-countdown-demo',
  imports: [ScCountdown],
  template: `
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <span class="text-muted-foreground">Time remaining:</span>
        <span
          scCountdown
          #cd1="scCountdown"
          [targetDate]="futureDate"
          class="font-mono text-lg font-semibold tabular-nums"
        >
          @if (cd1.time().days > 0) {
            {{ cd1.time().days }}d
          }
          {{ cd1.padNumber(cd1.time().hours) }}:{{
            cd1.padNumber(cd1.time().minutes)
          }}:{{ cd1.padNumber(cd1.time().seconds) }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-muted-foreground">HH:MM:SS:</span>
        <span
          scCountdown
          #cd2="scCountdown"
          [targetDate]="shortFuture"
          class="font-mono text-lg tabular-nums"
        >
          {{ cd2.padNumber(cd2.time().hours) }}:{{
            cd2.padNumber(cd2.time().minutes)
          }}:{{ cd2.padNumber(cd2.time().seconds) }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-muted-foreground">MM:SS:</span>
        <span
          scCountdown
          #cd3="scCountdown"
          [targetDate]="veryShortFuture"
          class="font-mono text-lg tabular-nums"
        >
          {{ cd3.padNumber(cd3.time().minutes) }}:{{
            cd3.padNumber(cd3.time().seconds)
          }}
        </span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleCountdownDemo {
  readonly futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  readonly shortFuture = new Date(Date.now() + 2 * 60 * 60 * 1000);
  readonly veryShortFuture = new Date(Date.now() + 5 * 60 * 1000);
}
