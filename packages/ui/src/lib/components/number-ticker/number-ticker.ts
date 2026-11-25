import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
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
import { cn } from 'cn';
import { type ScEasing, scEasing } from '../../utils/easing';

/** How a change is shown: the number counting, or each digit rolling. */
export type ScNumberTickerEffect = 'count' | 'roll';

/**
 * A number that moves to its new value — counting there (`count`), or each
 * digit rolling (`roll`). Written by `Intl.NumberFormat` in the app's
 * language. On any element, an SVG `<text>` too (a chart's center): counting
 * there. Screen readers get the value, never the numbers on the way; reduced
 * motion gets it at once. No library: frame by frame, with CSS's easing.
 */
@Component({
  selector: '[scNumberTicker]',
  exportAs: 'scNumberTicker',
  template: `
    @if (svg) {
      {{ shownText() }}
    } @else {
      <span class="sr-only">{{ text() }}</span>
      <!-- Not a flex row: the text around the number (a currency, a sign) is
        placed by the page's direction, as the same text unrolled would be. -->
      <span
        aria-hidden="true"
        data-slot="number-ticker-visual"
        class="whitespace-nowrap"
      >
        @if (effect() === 'roll') {
          @for (segment of segments(); track segments().length - $index) {
            @if (segment.number) {
              <!-- The number itself: left to right, in any page. -->
              <span dir="ltr" class="inline-flex">
                @for (part of segment.parts; track part.key) {
                  @if (part.digit === null) {
                    <span>{{ part.char }}</span>
                  } @else {
                    <span
                      class="inline-block h-[1em] overflow-hidden leading-none"
                    >
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
              </span>
            } @else {
              <span>{{ segment.text }}</span>
            }
          }
        } @else {
          {{ shownText() }}
        }
      </span>
    }
  `,
  host: {
    'data-slot': 'number-ticker',
    '[attr.data-effect]': 'effect()',
    // In SVG (no spans there): named by its value, the numbers on the way unread.
    '[attr.role]': "svg ? 'img' : null",
    '[attr.aria-label]': 'svg ? text() : null',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScNumberTicker {
  private readonly host = inject<ElementRef<Element>>(ElementRef).nativeElement;
  private readonly document = inject(DOCUMENT);
  /** On an SVG element (a chart's `<text>`): its text only, counting. */
  private readonly svg =
    this.host.namespaceURI === 'http://www.w3.org/2000/svg';

  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = input.required<number>();
  /** How it is written: currency, percent, compact, a unit, decimals… */
  readonly format = input<Intl.NumberFormatOptions>({});
  /** The locale: `LOCALE_ID` — the app's, or one provided for this section. */
  private readonly locale = inject(LOCALE_ID);
  readonly effect = input<ScNumberTickerEffect>('count');
  /** How long a change takes, in milliseconds. */
  readonly duration = input(1000);
  /** The wait before it moves, in milliseconds (a chart's: its series'). */
  readonly delay = input(0);
  /** How it moves: CSS's timing names. */
  readonly easing = input<ScEasing>('ease-out');
  /** Where the first move starts from. */
  readonly from = input(0);
  /** When the first move starts: at once, or when it is first seen. */
  readonly start = input<'now' | 'visible'>('now');

  /** The number shown, on its way to `value`. */
  private readonly shown = signal<number | null>(null);
  /** Moving yet: started, and in the browser. */
  private readonly started = signal(false);
  private frame = 0;

  private readonly formatter = computed(
    () => new Intl.NumberFormat(this.locale, this.format()),
  );

  /** The value, as written — what screen readers get. */
  private readonly text = computed(() => this.formatter().format(this.value()));

  /** The number on its way, with the value's decimals. */
  private readonly shownValue = computed(() => {
    const shown = this.shown() ?? this.from();
    const places = Math.max(decimals(this.value()), decimals(this.from()));
    return round(shown, places);
  });

  /** The number on its way, as written. */
  private readonly shownText = computed(() =>
    this.formatter().format(this.shownValue()),
  );

  /** The digits 0–9, in the app's language. */
  private readonly glyphs = computed(() => {
    const format = new Intl.NumberFormat(this.locale);
    return Array.from({ length: 10 }, (_, digit) => format.format(digit));
  });

  /**
   * Rolling: the written value in runs — the number (its digits, each with
   * its place 0–9, and separators) and the text around it (a currency, a
   * sign, a unit).
   */
  private readonly segments = computed(() => {
    const glyphs = this.glyphs();
    const segments: ScNumberTickerSegment[] = [];
    for (const { type, value } of this.formatter().formatToParts(
      this.shownValue(),
    )) {
      const number = NUMBER_PARTS.has(type);
      const last = segments[segments.length - 1];
      if (last && last.number === number) last.text += value;
      else segments.push({ number, text: value, parts: [] });
    }
    // Keyed from the end: a digit keeps its column (its roll) as the number
    // grows a digit at its start.
    segments.forEach((segment, i) => {
      const chars = [...segment.text];
      segment.parts = chars.map((char, j) => {
        const digit = glyphs.indexOf(char);
        return {
          char,
          digit: digit < 0 ? null : digit,
          key: `${segments.length - i}-${chars.length - j}`,
        };
      });
    });
    return segments;
  });

  private readonly class = computed(() =>
    cn(this.svg ? '' : 'inline-flex tabular-nums', this.classInput()),
  );

  constructor() {
    const destroyRef = inject(DestroyRef);
    const app = inject(ApplicationRef);
    // A new value: moved to, once started.
    effect(() => {
      const value = this.value();
      if (!this.started()) return;
      untracked(() => this.moveTo(value));
    });
    // In the browser only (the server's window has no animation frames):
    // its frames stopped with it.
    // Started once the app is stable: hydration waits for it, and counting
    // changes the view every frame — many at once kept it from ever being
    // stable on a slow machine (NG0506).
    afterNextRender(() => {
      let destroyed = false;
      destroyRef.onDestroy(() => {
        destroyed = true;
        this.document.defaultView?.cancelAnimationFrame?.(this.frame);
      });
      void app.whenStable().then(() => {
        if (destroyed) return;
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
    });
  }

  private moveTo(value: number): void {
    const view = this.document.defaultView;
    view?.cancelAnimationFrame?.(this.frame);
    const from = this.shown() ?? this.from();
    const still = view?.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    )?.matches;
    // Rolling, the digits move by themselves (CSS); still, at once.
    if (
      !view?.requestAnimationFrame ||
      this.effect() === 'roll' ||
      still ||
      from === value
    ) {
      this.shown.set(value);
      return;
    }
    const ease = scEasing(this.easing());
    const duration = Math.max(0, this.duration());
    const start = view.performance.now() + Math.max(0, this.delay());
    const step = (now: number) => {
      const time = duration ? (now - start) / duration : 1;
      const progress = ease(Math.min(1, Math.max(0, time)));
      this.shown.set(from + (value - from) * progress);
      if (time < 1) this.frame = view.requestAnimationFrame(step);
    };
    this.frame = view.requestAnimationFrame(step);
  }
}

/** The parts of a written number that are the number itself. */
const NUMBER_PARTS = new Set<string>([
  'integer',
  'group',
  'decimal',
  'fraction',
]);

/** A run of the written value: the number, or the text beside it. */
interface ScNumberTickerSegment {
  number: boolean;
  text: string;
  /** Its characters, a digit with its place 0–9; keyed from the end. */
  parts: { char: string; digit: number | null; key: string }[];
}

/** How many decimals a number has. */
function decimals(value: number): number {
  return (String(value).split('.')[1] ?? '').length;
}

function round(value: number, places: number): number {
  const scale = 10 ** places;
  return Math.round(value * scale) / scale;
}
