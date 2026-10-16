import {
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScCountdownNext } from './countdown-next';

/**
 * One unit of the time left — `scCountdownNextUnit="hours"` — as digits in
 * the app's language (two at least). `roll`: each digit slides to the next
 * (still, for reduced motion). Visual only: `scCountdownNextText` says it.
 */
@Component({
  selector: '[scCountdownNextUnit]',
  template: `
    @if (roll()) {
      @for (digit of digits(); track $index) {
        <span class="inline-block h-[1em] overflow-hidden leading-none">
          <span
            class="flex flex-col transition-transform duration-500 ease-out motion-reduce:transition-none"
            [style.transform]="'translateY(-' + digit + 'em)'"
          >
            @for (glyph of glyphs(); track $index) {
              <span class="h-[1em]">{{ glyph }}</span>
            }
          </span>
        </span>
      }
    } @else {
      {{ text() }}
    }
  `,
  host: {
    'data-slot': 'countdown-unit',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScCountdownNextUnit {
  private readonly countdown = inject(ScCountdownNext);

  readonly unit = input.required<'days' | 'hours' | 'minutes' | 'seconds'>({
    alias: 'scCountdownNextUnit',
  });
  /** The least digits shown. */
  readonly minDigits = input(2);
  readonly roll = input(false, { transform: booleanAttribute });
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly format = computed(
    () =>
      new Intl.NumberFormat(this.countdown.ɵlocale, {
        minimumIntegerDigits: this.minDigits(),
        useGrouping: false,
      }),
  );

  protected readonly value = computed(() => this.countdown.left()[this.unit()]);

  protected readonly text = computed(() => this.format().format(this.value()));

  /** Rolling: each digit's place, 0–9. */
  protected readonly digits = computed(() =>
    String(this.value()).padStart(this.minDigits(), '0').split('').map(Number),
  );

  /** The digits 0–9, in the app's language. */
  protected readonly glyphs = computed(() => {
    const format = new Intl.NumberFormat(this.countdown.ɵlocale);
    return Array.from({ length: 10 }, (_, digit) => format.format(digit));
  });

  protected readonly class = computed(() =>
    cn('inline-flex tabular-nums', this.classInput()),
  );
}
