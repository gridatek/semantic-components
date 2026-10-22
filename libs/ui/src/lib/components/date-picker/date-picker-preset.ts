import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { type ScButtonVariants, buttonVariants } from '../button';
import type { ScCalendarRange, ScCalendarValue } from '../calendar';
import { ScDatePicker } from './date-picker';

/** A ready value — today, the last 7 days…: picked as the calendar's would be. Write its text; pressed while it is the value. */
@Directive({
  selector: 'button[scDatePickerPreset]',
  host: {
    'data-slot': 'date-picker-preset',
    type: 'button',
    '[attr.aria-pressed]': 'pressed()',
    '[class]': 'class()',
    '(click)': 'picker.pick(value())',
  },
})
export class ScDatePickerPreset {
  protected readonly picker = inject(ScDatePicker);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = input.required<ScCalendarValue>();
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly pressed = computed(() =>
    same(this.picker.draft(), this.value()),
  );

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'justify-start aria-pressed:bg-muted',
      this.classInput(),
    ),
  );
}

function same(a: ScCalendarValue, b: ScCalendarValue): boolean {
  const day = (x?: Temporal.PlainDate, y?: Temporal.PlainDate) =>
    x === y || (!!x && !!y && x.equals(y));
  if (!a || !b) return a === b;
  if (a instanceof Temporal.PlainDate || b instanceof Temporal.PlainDate)
    return (
      a instanceof Temporal.PlainDate &&
      b instanceof Temporal.PlainDate &&
      a.equals(b)
    );
  if (Array.isArray(a) || Array.isArray(b)) {
    const x = a as readonly Temporal.PlainDate[];
    const y = b as readonly Temporal.PlainDate[];
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      x.length === y.length &&
      x.every((d) => y.some((e) => d.equals(e)))
    );
  }
  const r = a as ScCalendarRange;
  const s = b as ScCalendarRange;
  return day(r.from, s.from) && day(r.to, s.to);
}
