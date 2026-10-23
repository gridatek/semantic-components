import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCountdown,
  ScCountdownText,
  ScCountdownUnit,
} from '@semantic-components/ui';

/** To a moment: the days, hours, minutes and seconds left — each a unit, your labels. Screen readers hear it in words, in the app's language. */
@Component({
  selector: 'app-event-countdown-demo',
  imports: [ScCountdown, ScCountdownUnit, ScCountdownText],
  template: `
    <div scCountdown [until]="launch" aria-label="Launch in" class="gap-3">
      <div
        class="bg-card flex w-20 flex-col items-center rounded-lg border p-3 shadow-xs"
      >
        <span scCountdownUnit="days" class="text-3xl font-semibold"></span>
        <span class="text-muted-foreground text-xs">Days</span>
      </div>
      <div
        class="bg-card flex w-20 flex-col items-center rounded-lg border p-3 shadow-xs"
      >
        <span scCountdownUnit="hours" class="text-3xl font-semibold"></span>
        <span class="text-muted-foreground text-xs">Hours</span>
      </div>
      <div
        class="bg-card flex w-20 flex-col items-center rounded-lg border p-3 shadow-xs"
      >
        <span scCountdownUnit="minutes" class="text-3xl font-semibold"></span>
        <span class="text-muted-foreground text-xs">Minutes</span>
      </div>
      <div
        class="bg-card flex w-20 flex-col items-center rounded-lg border p-3 shadow-xs"
      >
        <span scCountdownUnit="seconds" class="text-3xl font-semibold"></span>
        <span class="text-muted-foreground text-xs">Seconds</span>
      </div>
      <span scCountdownText></span>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class EventCountdownDemo {
  /** In 2 days, 3 hours, 4 minutes and 5 seconds from now. */
  readonly launch = Temporal.Now.instant().add({
    hours: 51,
    minutes: 4,
    seconds: 5,
  });
}
