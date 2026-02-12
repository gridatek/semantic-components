import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'sc-countdown-simple',
  exportAs: 'scCountdownSimple',
  template: `
    <span [class]="class()" role="timer">
      {{ formattedTime() }}
    </span>
  `,
  host: {
    'data-slot': 'countdown-simple',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCountdownSimple {
  private readonly destroyRef = inject(DestroyRef);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly targetDate = input.required<Date>();
  readonly format = input<'hh:mm:ss' | 'mm:ss' | 'full'>('hh:mm:ss');
  readonly autoStart = input<boolean>(true);

  readonly tick = output<number>();
  readonly complete = output<void>();

  private readonly remaining = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private isComplete = false;

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

  protected readonly class = computed(() =>
    cn('font-mono tabular-nums', this.classInput()),
  );

  protected readonly formattedTime = computed(() => {
    const total = this.remaining();
    const format = this.format();

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    const pad = (n: number) => n.toString().padStart(2, '0');

    if (format === 'mm:ss') {
      const totalMinutes = Math.floor(total / 1000 / 60);
      return `${pad(totalMinutes)}:${pad(seconds)}`;
    }

    if (format === 'full') {
      if (days > 0) {
        return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
      }
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  });

  private updateTime(): void {
    const now = Date.now();
    const target = this.targetDate().getTime();
    const total = Math.max(0, target - now);

    this.remaining.set(total);
    this.tick.emit(total);

    if (total <= 0 && !this.isComplete) {
      this.isComplete = true;
      this.complete.emit();
      this.stop();
    }
  }

  start(): void {
    this.stop();
    this.isComplete = false;
    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getRemaining(): number {
    return this.remaining();
  }
}
