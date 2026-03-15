import {
  DestroyRef,
  Directive,
  InjectionToken,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export const SC_COUNTDOWN = new InjectionToken<ScCountdown>('SC_COUNTDOWN');

@Directive({
  selector: '[scCountdown]',
  exportAs: 'scCountdown',
  providers: [{ provide: SC_COUNTDOWN, useExisting: ScCountdown }],
  host: {
    'data-slot': 'countdown',
    '[class]': 'class()',
    role: 'timer',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class ScCountdown {
  private readonly destroyRef = inject(DestroyRef);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('inline-flex items-center', this.classInput()),
  );

  readonly targetDate = input.required<Date>();
  readonly autoStart = input<boolean>(true);

  readonly tick = output<CountdownTime>();
  readonly complete = output<void>();

  readonly time = signal<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });

  private intervalId: ReturnType<typeof setInterval> | null = null;
  private isCompleteState = false;

  constructor() {
    effect(() => {
      if (this.autoStart()) {
        this.start();
      }
    });

    this.destroyRef.onDestroy(() => {
      this.stop();
    });
  }

  readonly ariaLabel = computed(() => {
    const t = this.time();
    const parts: string[] = [];
    if (t.days > 0) parts.push(`${t.days} days`);
    if (t.hours > 0) parts.push(`${t.hours} hours`);
    if (t.minutes > 0) parts.push(`${t.minutes} minutes`);
    parts.push(`${t.seconds} seconds`);
    return `Time remaining: ${parts.join(', ')}`;
  });

  padNumber(n: number): string {
    return n.toString().padStart(2, '0');
  }

  start(): void {
    this.stop();
    this.isCompleteState = false;
    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset(): void {
    this.isCompleteState = false;
    this.updateTime();
  }

  getTime(): CountdownTime {
    return this.time();
  }

  isRunning(): boolean {
    return this.intervalId !== null;
  }

  private calculateTime(): CountdownTime {
    const now = Date.now();
    const target = this.targetDate().getTime();
    const total = Math.max(0, target - now);

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds, total };
  }

  private updateTime(): void {
    const newTime = this.calculateTime();
    this.time.set(newTime);
    this.tick.emit(newTime);

    if (newTime.total <= 0 && !this.isCompleteState) {
      this.isCompleteState = true;
      this.complete.emit();
      this.stop();
    }
  }
}
