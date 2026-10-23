import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCountdown,
  ScCountdownText,
  ScCountdownUnit,
} from '@semantic-components/ui';

/** Each digit slides to the next — still, for anyone who asks for less motion. */
@Component({
  selector: 'app-roll-countdown-demo',
  imports: [ScCountdown, ScCountdownUnit, ScCountdownText],
  template: `
    <div
      scCountdown
      [until]="end"
      aria-label="Ends in"
      class="gap-1 text-5xl font-semibold"
    >
      <span scCountdownUnit="hours" roll></span>
      <span class="text-muted-foreground">:</span>
      <span scCountdownUnit="minutes" roll></span>
      <span class="text-muted-foreground">:</span>
      <span scCountdownUnit="seconds" roll></span>
      <span scCountdownText></span>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RollCountdownDemo {
  readonly end = Temporal.Now.instant().add({ hours: 5, minutes: 30 });
}
