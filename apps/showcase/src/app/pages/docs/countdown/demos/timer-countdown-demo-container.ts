import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TimerCountdownDemo } from './timer-countdown-demo';

@Component({
  selector: 'app-timer-countdown-demo-container',
  imports: [DemoContainer, TimerCountdownDemo],
  template: `
    <app-demo-container
      title="Timer"
      [code]="code"
      demoUrl="/demos/countdown/timer-countdown-demo"
    >
      <app-timer-countdown-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TimerCountdownDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCountdown,
  ScCountdownReset,
  ScCountdownRing,
  ScCountdownText,
  ScCountdownToggle,
  ScCountdownUnit,
} from '@semantic-components/ui-lab';
import {
  SiPauseIcon,
  SiPlayIcon,
  SiRotateCcwIcon,
} from '@semantic-icons/lucide-icons';

/** A duration: it starts, pauses and resets; the ring empties as it runs. */
@Component({
  selector: 'app-timer-countdown-demo',
  imports: [
    ScCountdown,
    ScCountdownUnit,
    ScCountdownText,
    ScCountdownRing,
    ScCountdownToggle,
    ScCountdownReset,
    SiPlayIcon,
    SiPauseIcon,
    SiRotateCcwIcon,
  ],
  template: \`
    <div
      scCountdown
      #timer="scCountdown"
      [duration]="fiveMinutes"
      [(paused)]="paused"
      aria-label="Tea timer"
      class="flex-col gap-4"
    >
      <div scCountdownRing>
        <span class="text-3xl font-semibold">
          <span scCountdownUnit="minutes"></span>:<span
            scCountdownUnit="seconds"
          ></span>
        </span>
      </div>
      <span scCountdownText></span>
      <div class="flex gap-2">
        <button scCountdownToggle class="w-28">
          @if (timer.paused() || timer.done()) {
            <svg siPlayIcon></svg>
            Start
          } @else {
            <svg siPauseIcon></svg>
            Pause
          }
        </button>
        <button scCountdownReset>
          <svg siRotateCcwIcon></svg>
          Reset
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TimerCountdownDemo {
  readonly fiveMinutes = Temporal.Duration.from({ minutes: 5 });
  readonly paused = signal(true);
}`;
}
