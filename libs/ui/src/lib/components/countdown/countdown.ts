import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Directive,
  LOCALE_ID,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';

/** The time left, in whole units. */
export interface ScCountdownLeft {
  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
}

const SECOND = 1000;

/**
 * Counts down — to a moment (`until`), or a timer (`duration`, which pauses,
 * resumes and resets). A `timer`: name it ("Sale ends in"). Its time left,
 * in parts: `scCountdownUnit`; in words, for screen readers:
 * `scCountdownText`.
 */
@Directive({
  selector: '[scCountdown]',
  exportAs: 'scCountdown',
  host: {
    'data-slot': 'countdown',
    role: 'timer',
    '[attr.data-done]': 'done() || null',
    '[attr.data-paused]': 'paused() || null',
    '[class]': 'class()',
  },
})
export class ScCountdown {
  private readonly document = inject(DOCUMENT);
  readonly ɵlocale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });

  /** The moment it counts down to. */
  readonly until = input<Temporal.Instant>();
  /** Or: a timer, this long. */
  readonly duration = input<Temporal.Duration>();
  /** A timer, paused. */
  readonly paused = model(false);

  /** Reached zero (once a run). */
  readonly completed = output<void>();

  /** The clock, as last read. */
  private readonly now = signal(Temporal.Now.instant());
  /** A timer's time run before its last start, and that start. */
  private readonly ran = signal(0);
  private readonly startedAt = signal<Temporal.Instant | null>(null);

  /** What is left, in milliseconds. */
  readonly remaining = computed(() => {
    const until = this.until();
    const now = this.now();
    if (until)
      return Math.max(0, until.epochMilliseconds - now.epochMilliseconds);
    const total = this.total();
    const startedAt = this.startedAt();
    const running = startedAt
      ? now.epochMilliseconds - startedAt.epochMilliseconds
      : 0;
    return Math.max(0, total - this.ran() - running);
  });

  /** The time left, in units — whole seconds, rounded up (10 s left shows 10). */
  readonly left = computed<ScCountdownLeft>(() => {
    let seconds = Math.ceil(this.remaining() / SECOND);
    const days = Math.floor(seconds / 86400);
    seconds -= days * 86400;
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    return { days, hours, minutes, seconds: seconds - minutes * 60 };
  });

  readonly done = computed(() => this.remaining() <= 0);

  /** A timer's share left, 1 → 0; a countdown to a moment has none. */
  readonly progress = computed(() => {
    const total = this.total();
    return this.until() || !total ? null : this.remaining() / total;
  });

  protected readonly class = computed(() =>
    cn('inline-flex items-center', this.classInput()),
  );

  private readonly total = computed(
    () => this.duration()?.total({ unit: 'milliseconds' }) ?? 0,
  );

  private timeout: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    // A timer: started, paused.
    effect(() => {
      const paused = this.paused();
      this.duration();
      untracked(() => {
        const now = Temporal.Now.instant();
        const startedAt = this.startedAt();
        if (paused && startedAt) {
          this.ran.update(
            (ran) => ran + now.epochMilliseconds - startedAt.epochMilliseconds,
          );
          this.startedAt.set(null);
        } else if (!paused && !startedAt) {
          this.startedAt.set(now);
        }
        this.tick();
      });
    });
    // Reached zero: once a run.
    let armed = false;
    effect(() => {
      const done = this.done();
      if (!done) armed = true;
      else if (armed) {
        armed = false;
        untracked(() => this.completed.emit());
      }
    });
    // Back in view: right again at once.
    const onVisible = () => this.tick();
    this.document.addEventListener('visibilitychange', onVisible);
    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.timeout);
      this.document.removeEventListener('visibilitychange', onVisible);
    });
    effect(() => {
      this.until();
      untracked(() => this.tick());
    });
  }

  /** A timer, back to its full time (and running, unless paused). */
  reset(): void {
    this.ran.set(0);
    this.startedAt.set(this.paused() ? null : Temporal.Now.instant());
    this.tick();
  }

  /** Reads the clock; the next reading, on the next whole second left. */
  private tick(): void {
    clearTimeout(this.timeout);
    this.now.set(Temporal.Now.instant());
    const remaining = this.remaining();
    const counting = this.until() || this.startedAt();
    if (remaining <= 0 || !counting) return;
    this.timeout = setTimeout(() => this.tick(), remaining % SECOND || SECOND);
  }
}
