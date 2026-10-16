import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TimerCountdownNextDemo } from './timer-countdown-next-demo';

@Component({
  selector: 'app-timer-countdown-next-demo-container',
  imports: [DemoContainer, TimerCountdownNextDemo],
  template: `
    <app-demo-container
      title="Timer"
      [code]="code"
      demoUrl="/demos/countdown-next/timer-countdown-next-demo"
    >
      <app-timer-countdown-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TimerCountdownNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScCountdownNext, ScCountdownNextUnit, ScCountdownNextText, ScCountdownNextRing, ScCountdownNextToggle, ScCountdownNextReset } from '@semantic-components/ui-lab';
import { SiPlayIcon, SiPauseIcon, SiRotateCcwIcon } from '@semantic-icons/lucide-icons';

/** A duration: it starts, pauses and resets; the ring empties as it runs. */
@Component({
  selector: 'app-timer-countdown-next-demo',
  imports: [ScCountdownNext, ScCountdownNextUnit, ScCountdownNextText, ScCountdownNextRing, ScCountdownNextToggle, ScCountdownNextReset, SiPlayIcon, SiPauseIcon, SiRotateCcwIcon],
  template: \`
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TimerCountdownNextDemo {
  readonly fiveMinutes = Temporal.Duration.from({ minutes: 5 });
  readonly paused = signal(true);
}`;
}
