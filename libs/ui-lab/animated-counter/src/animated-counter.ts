import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  LOCALE_ID,
  ViewEncapsulation,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { type AnimationPlaybackControls, animate } from 'motion';

/** How a change is shown: the number counting, or each digit rolling. */
export type ScAnimatedCounterEffect = 'count' | 'roll';

/**
 * A number that moves to its new value — counting there (`count`, by the
 * `motion` library), or each digit rolling (`roll`). Written by
 * `Intl.NumberFormat` in the app's language. Screen readers get the value,
 * never the numbers on the way; reduced motion gets it at once.
 */
@Component({
  selector: '[scAnimatedCounter]',
  exportAs: 'scAnimatedCounter',
  template: `
    <span class="sr-only">{{ text() }}</span>
    <span
      aria-hidden="true"
      data-slot="animated-counter-visual"
      class="inline-flex"
    >
      @if (effect() === 'roll') {
        @for (part of parts(); track parts().length - $index) {
          @if (part.digit === null) {
            <span>{{ part.char }}</span>
          } @else {
            <span class="inline-block h-[1em] overflow-hidden leading-none">
              <span
                class="flex flex-col transition-transform ease-out motion-reduce:transition-none"
                [style.transition-duration.ms]="duration()"
                [style.transform]="'translateY(-' + part.digit + 'em)'"
              >
                @for (glyph of glyphs(); track $index) {
                  <span class="h-[1em]">{{ glyph }}</span>
                }
              </span>
            </span>
          }
        }
      } @else {
        {{ shownText() }}
      }
    </span>
  `,
  host: {
    'data-slot': 'animated-counter',
    '[attr.data-effect]': 'effect()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScAnimatedCounter {
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = input.required<number>();
  /** How it is written: currency, percent, compact, a unit, decimals… */
  readonly format = input<Intl.NumberFormatOptions>({});
  /** The language it is written in; the app's by default. */
  readonly locale = input(inject(LOCALE_ID));
  readonly effect = input<ScAnimatedCounterEffect>('count');
  /** How long a change takes, in milliseconds. */
  readonly duration = input(1000);
  /** Where the first move starts from. */
  readonly from = input(0);
  /** When the first move starts: at once, or when it is first seen. */
  readonly start = input<'now' | 'visible'>('now');

  /** The number shown, on its way to `value`. */
  private readonly shown = signal<number | null>(null);
  /** Moving yet: started, and in the browser. */
  private readonly started = signal(false);
  private controls: AnimationPlaybackControls | null = null;

  private readonly formatter = computed(
    () => new Intl.NumberFormat(this.locale(), this.format()),
  );

  /** The value, as written — what screen readers get. */
  protected readonly text = computed(() =>
    this.formatter().format(this.value()),
  );

  /** The number on its way, as written: with the value's decimals. */
  protected readonly shownText = computed(() => {
    const shown = this.shown() ?? this.from();
    const places = Math.max(decimals(this.value()), decimals(this.from()));
    return this.formatter().format(round(shown, places));
  });

  /** The digits 0–9, in the app's language. */
  protected readonly glyphs = computed(() => {
    const format = new Intl.NumberFormat(this.locale());
    return Array.from({ length: 10 }, (_, digit) => format.format(digit));
  });

  /** Rolling: the written value, each digit with its place 0–9. */
  protected readonly parts = computed(() => {
    const glyphs = this.glyphs();
    return [...this.shownText()].map((char) => {
      const digit = glyphs.indexOf(char);
      return { char, digit: digit < 0 ? null : digit };
    });
  });

  protected readonly class = computed(() =>
    cn('inline-flex tabular-nums', this.classInput()),
  );

  constructor() {
    const destroyRef = inject(DestroyRef);
    // A new value: moved to, once started.
    effect(() => {
      const value = this.value();
      if (!this.started()) return;
      untracked(() => this.moveTo(value));
    });
    afterNextRender(() => {
      if (this.start() === 'now') {
        this.started.set(true);
        return;
      }
      // Started when first seen.
      const seen = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        seen.disconnect();
        this.started.set(true);
      });
      seen.observe(this.host);
      destroyRef.onDestroy(() => seen.disconnect());
    });
    destroyRef.onDestroy(() => this.controls?.stop());
  }

  private moveTo(value: number): void {
    this.controls?.stop();
    const from = this.shown() ?? this.from();
    const still = this.document.defaultView?.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    // Rolling, the digits move by themselves (CSS); still, at once.
    if (this.effect() === 'roll' || still || from === value) {
      this.shown.set(value);
      return;
    }
    this.controls = animate(from, value, {
      duration: this.duration() / 1000,
      ease: 'easeOut',
      onUpdate: (shown) => this.shown.set(shown),
    });
  }
}

/** How many decimals a number has. */
function decimals(value: number): number {
  return (String(value).split('.')[1] ?? '').length;
}

function round(value: number, places: number): number {
  const scale = 10 ** places;
  return Math.round(value * scale) / scale;
}
