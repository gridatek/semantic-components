import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { type ScButtonVariants } from '../button';
import type { ScCalendarRange } from '../calendar';
import { ScDateRangePicker } from './date-range-picker';

/** A ready range — today, the last 7 days…: picked as the calendar's would be. Write its text; pressed while it is the value. */
@Directive({
  selector: 'button[scDateRangePickerPreset]',
  host: {
    'data-slot': 'date-range-picker-preset',
    type: 'button',
    '[attr.aria-pressed]': 'pressed()',
    '[class]': 'class()',
    '(click)': 'picker.pick(value())',
  },
})
export class ScDateRangePickerPreset {
  private readonly buttonStyles = injectStyle().button;

  private readonly picker = inject(ScDateRangePicker);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The range it picks: `scDateRangePresets()` gives the common ones. */
  readonly value = input.required<ScCalendarRange>();
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('sm');

  private readonly pressed = computed(() =>
    same(this.picker.draft(), this.value()),
  );

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'justify-start aria-pressed:bg-muted',
      this.classInput(),
    ),
  );
}

function same(a: ScCalendarRange | null, b: ScCalendarRange): boolean {
  const day = (x?: Temporal.PlainDate, y?: Temporal.PlainDate) =>
    x === y || (!!x && !!y && x.equals(y));
  return !!a && day(a.from, b.from) && day(a.to, b.to);
}
