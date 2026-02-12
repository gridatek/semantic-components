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

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

@Component({
  selector: 'sc-countdown',
  exportAs: 'scCountdown',
  template: `
    <div
      [class]="containerClass()"
      role="timer"
      [attr.aria-label]="ariaLabel()"
    >
      @if (showDays() && (time().days > 0 || alwaysShowDays())) {
        <div [class]="unitClass()">
          <span [class]="valueClass()">{{ padNumber(time().days) }}</span>
          <span [class]="labelClass()">{{ daysLabel() }}</span>
        </div>
        @if (showSeparator()) {
          <span [class]="separatorClass()">{{ separator() }}</span>
        }
      }

      @if (showHours()) {
        <div [class]="unitClass()">
          <span [class]="valueClass()">{{ padNumber(time().hours) }}</span>
          <span [class]="labelClass()">{{ hoursLabel() }}</span>
        </div>
        @if (showSeparator() && showMinutes()) {
          <span [class]="separatorClass()">{{ separator() }}</span>
        }
      }

      @if (showMinutes()) {
        <div [class]="unitClass()">
          <span [class]="valueClass()">{{ padNumber(time().minutes) }}</span>
          <span [class]="labelClass()">{{ minutesLabel() }}</span>
        </div>
        @if (showSeparator() && showSeconds()) {
          <span [class]="separatorClass()">{{ separator() }}</span>
        }
      }

      @if (showSeconds()) {
        <div [class]="unitClass()">
          <span [class]="valueClass()">{{ padNumber(time().seconds) }}</span>
          <span [class]="labelClass()">{{ secondsLabel() }}</span>
        </div>
      }
    </div>
  `,
  host: {
    'data-slot': 'countdown',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCountdown {
  private readonly destroyRef = inject(DestroyRef);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly targetDate = input.required<Date>();
  readonly autoStart = input<boolean>(true);
  readonly showDays = input<boolean>(true);
  readonly showHours = input<boolean>(true);
  readonly showMinutes = input<boolean>(true);
  readonly showSeconds = input<boolean>(true);
  readonly alwaysShowDays = input<boolean>(false);
  readonly showSeparator = input<boolean>(true);
  readonly separator = input<string>(':');
  readonly daysLabel = input<string>('Days');
  readonly hoursLabel = input<string>('Hours');
  readonly minutesLabel = input<string>('Minutes');
  readonly secondsLabel = input<string>('Seconds');
  readonly variant = input<'default' | 'compact' | 'cards'>('default');

  readonly tick = output<CountdownTime>();
  readonly complete = output<void>();

  protected readonly time = signal<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });

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

  protected readonly ariaLabel = computed(() => {
    const t = this.time();
    const parts: string[] = [];
    if (t.days > 0) parts.push(`${t.days} days`);
    if (t.hours > 0) parts.push(`${t.hours} hours`);
    if (t.minutes > 0) parts.push(`${t.minutes} minutes`);
    parts.push(`${t.seconds} seconds`);
    return `Time remaining: ${parts.join(', ')}`;
  });

  protected readonly containerClass = computed(() => {
    const variant = this.variant();
    return cn(
      'inline-flex items-center',
      variant === 'default' && 'gap-4',
      variant === 'compact' && 'gap-1',
      variant === 'cards' && 'gap-3',
      this.classInput(),
    );
  });

  protected readonly unitClass = computed(() => {
    const variant = this.variant();
    return cn(
      'flex flex-col items-center',
      variant === 'cards' && 'bg-muted rounded-lg p-3 min-w-[70px]',
    );
  });

  protected readonly valueClass = computed(() => {
    const variant = this.variant();
    return cn(
      'font-mono font-bold tabular-nums',
      variant === 'default' && 'text-4xl',
      variant === 'compact' && 'text-2xl',
      variant === 'cards' && 'text-3xl',
    );
  });

  protected readonly labelClass = computed(() => {
    const variant = this.variant();
    return cn(
      'text-muted-foreground',
      variant === 'default' && 'text-sm',
      variant === 'compact' && 'text-xs',
      variant === 'cards' && 'text-xs uppercase tracking-wider',
    );
  });

  protected readonly separatorClass = computed(() => {
    const variant = this.variant();
    return cn(
      'font-bold text-muted-foreground',
      variant === 'default' && 'text-4xl -mt-5',
      variant === 'compact' && 'text-2xl -mt-3',
      variant === 'cards' && 'text-3xl -mt-5',
    );
  });

  padNumber(n: number): string {
    return n.toString().padStart(2, '0');
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

    if (newTime.total <= 0 && !this.isComplete) {
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

  reset(): void {
    this.isComplete = false;
    this.updateTime();
  }

  getTime(): CountdownTime {
    return this.time();
  }

  isRunning(): boolean {
    return this.intervalId !== null;
  }
}
