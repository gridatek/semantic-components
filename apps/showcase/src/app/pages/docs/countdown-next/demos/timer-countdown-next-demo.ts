import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCountdownNext,
  ScCountdownNextReset,
  ScCountdownNextRing,
  ScCountdownNextText,
  ScCountdownNextToggle,
  ScCountdownNextUnit,
} from '@semantic-components/ui-lab';
import {
  SiPauseIcon,
  SiPlayIcon,
  SiRotateCcwIcon,
} from '@semantic-icons/lucide-icons';

/** A duration: it starts, pauses and resets; the ring empties as it runs. */
@Component({
  selector: 'app-timer-countdown-next-demo',
  imports: [
    ScCountdownNext,
    ScCountdownNextUnit,
    ScCountdownNextText,
    ScCountdownNextRing,
    ScCountdownNextToggle,
    ScCountdownNextReset,
    SiPlayIcon,
    SiPauseIcon,
    SiRotateCcwIcon,
  ],
  template: `
    <div
      scCountdownNext
      #timer="scCountdownNext"
      [duration]="fiveMinutes"
      [(paused)]="paused"
      aria-label="Tea timer"
      class="flex-col gap-4"
    >
      <div scCountdownNextRing>
        <span class="text-3xl font-semibold">
          <span scCountdownNextUnit="minutes"></span>:<span
            scCountdownNextUnit="seconds"
          ></span>
        </span>
      </div>
      <span scCountdownNextText></span>
      <div class="flex gap-2">
        <button scCountdownNextToggle class="w-28">
          @if (timer.paused() || timer.done()) {
            <svg siPlayIcon></svg>
            Start
          } @else {
            <svg siPauseIcon></svg>
            Pause
          }
        </button>
        <button scCountdownNextReset>
          <svg siRotateCcwIcon></svg>
          Reset
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TimerCountdownNextDemo {
  readonly fiveMinutes = Temporal.Duration.from({ minutes: 5 });
  readonly paused = signal(true);
}
