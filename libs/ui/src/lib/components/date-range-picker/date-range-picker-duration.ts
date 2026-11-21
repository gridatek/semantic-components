import { Directive, LOCALE_ID, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScDateRangePicker } from './date-range-picker';

/**
 * How long the range is — the draft's, as the calendar shows it — in days,
 * both ends counted, in the locale's words ("5 days", from `Intl`); said as
 * it changes, empty until both ends are there. For nights (a stay), `Intl`
 * has no word: write your own from the picker's `nights()`.
 */
@Directive({
  selector: '[scDateRangePickerDuration]',
  host: {
    'data-slot': 'date-range-picker-duration',
    'aria-live': 'polite',
    '[textContent]': 'text()',
    '[class]': 'class()',
  },
})
export class ScDateRangePickerDuration {
  private readonly picker = inject(ScDateRangePicker);
  private readonly locale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly text = computed(() => {
    const days = this.picker.days();
    return days
      ? new Intl.NumberFormat(this.locale, {
          style: 'unit',
          unit: 'day',
          unitDisplay: 'long',
        }).format(days)
      : '';
  });

  private readonly class = computed(() =>
    cn('text-muted-foreground text-sm tabular-nums', this.classInput()),
  );
}
