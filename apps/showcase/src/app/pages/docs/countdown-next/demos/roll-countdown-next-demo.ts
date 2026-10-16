import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCountdownNext,
  ScCountdownNextText,
  ScCountdownNextUnit,
} from '@semantic-components/ui-lab';

/** Each digit slides to the next — still, for anyone who asks for less motion. */
@Component({
  selector: 'app-roll-countdown-next-demo',
  imports: [ScCountdownNext, ScCountdownNextUnit, ScCountdownNextText],
  template: `
    <div
      scCountdownNext
      [until]="end"
      aria-label="Ends in"
      class="gap-1 text-5xl font-semibold"
    >
      <span scCountdownNextUnit="hours" roll></span>
      <span class="text-muted-foreground">:</span>
      <span scCountdownNextUnit="minutes" roll></span>
      <span class="text-muted-foreground">:</span>
      <span scCountdownNextUnit="seconds" roll></span>
      <span scCountdownNextText></span>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RollCountdownNextDemo {
  readonly end = Temporal.Now.instant().add({ hours: 5, minutes: 30 });
}
