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
  readonly code = `import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ScButton, ScNumberTicker } from '@semantic-components/ui';

/** Five minutes: Start, Pause, Reset; "Time's up" announced at the end. */
@Component({
  selector: 'app-timer-countdown-demo',
  imports: [ScButton, ScNumberTicker],
  template: \`
    <div class="flex flex-col items-center gap-4">
      <div
        role="timer"
        aria-label="Timer"
        class="flex items-baseline text-5xl font-semibold tabular-nums"
      >
        <span
          scNumberTicker
          effect="roll"
          [value]="minutes()"
          [format]="{ minimumIntegerDigits: 2 }"
          [duration]="300"
        ></span>
        <span aria-hidden="true">:</span>
        <span
          scNumberTicker
          effect="roll"
          [value]="seconds()"
          [format]="{ minimumIntegerDigits: 2 }"
          [duration]="300"
        ></span>
      </div>
      <div class="flex gap-2">
        <button
          scButton
          [disabled]="left() === 0"
          (click)="running() ? pause() : start()"
        >
          {{ running() ? 'Pause' : 'Start' }}
        </button>
        <button scButton variant="outline" (click)="reset()">Reset</button>
      </div>
      <p role="status" class="text-muted-foreground min-h-5 text-sm">
        @if (left() === 0) {
          Time&apos;s up.
        }
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TimerCountdownDemo {
  private static readonly LENGTH = 5 * 60;

  /** Seconds left. */
  private readonly left = signal(TimerCountdownDemo.LENGTH);
  private readonly running = signal(false);
  private readonly minutes = computed(() => Math.floor(this.left() / 60));
  private readonly seconds = computed(() => this.left() % 60);

  private timer: ReturnType<typeof setInterval> | null = null;
  /** When it ends, while running: the time left counted from the clock. */
  private end: Temporal.Instant | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  private start(): void {
    this.end = Temporal.Now.instant().add({ seconds: this.left() });
    this.running.set(true);
    this.timer = setInterval(() => this.tick(), 250);
  }

  private pause(): void {
    this.tick();
    this.stop();
  }

  private reset(): void {
    this.stop();
    this.left.set(TimerCountdownDemo.LENGTH);
  }

  private tick(): void {
    if (!this.end) return;
    const ms =
      this.end.epochMilliseconds - Temporal.Now.instant().epochMilliseconds;
    this.left.set(Math.max(0, Math.ceil(ms / 1000)));
    if (this.left() === 0) this.stop();
  }

  private stop(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.end = null;
    this.running.set(false);
  }
}`;
}
