import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ScFrame, ScNumberTicker } from '@semantic-components/ui';

/**
 * To an event: days, hours, minutes and seconds rolling down — a Number
 * Ticker each, the time left from Temporal, once a second.
 */
@Component({
  selector: 'app-countdown-usage-demo',
  imports: [ScFrame, ScNumberTicker],
  template: `
    <div
      role="timer"
      aria-label="Time left until the launch"
      class="flex flex-wrap justify-center gap-3"
    >
      @for (unit of units(); track unit.name) {
        <div scFrame class="flex w-20 flex-col items-center gap-1 py-3">
          <span
            scNumberTicker
            effect="roll"
            class="text-3xl font-semibold tabular-nums"
            [value]="unit.value"
            [format]="{ minimumIntegerDigits: 2 }"
            [duration]="400"
          ></span>
          <span class="text-muted-foreground text-xs">{{ unit.name }}</span>
        </div>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CountdownUsageDemo {
  private readonly now = signal(Temporal.Now.instant());
  /** The launch: 12 days, 5 hours and 30 minutes from when the page opened. */
  private readonly target = this.now().add({ hours: 12 * 24 + 5, minutes: 30 });

  private readonly units = computed(() => {
    const left = Math.max(
      0,
      Math.floor(
        (this.target.epochMilliseconds - this.now().epochMilliseconds) / 1000,
      ),
    );
    return [
      { name: 'Days', value: Math.floor(left / 86_400) },
      { name: 'Hours', value: Math.floor((left % 86_400) / 3_600) },
      { name: 'Minutes', value: Math.floor((left % 3_600) / 60) },
      { name: 'Seconds', value: left % 60 },
    ];
  });

  constructor() {
    // Once a second, in the browser only.
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const timer = setInterval(
        () => this.now.set(Temporal.Now.instant()),
        1000,
      );
      destroyRef.onDestroy(() => clearInterval(timer));
    });
  }
}
