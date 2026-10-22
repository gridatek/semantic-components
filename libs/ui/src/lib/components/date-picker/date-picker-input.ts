import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { cn } from '../../utils';
import type { ScCalendarRange } from '../calendar';
import { SC_FIELD } from '../field';
import { inputStyles } from '../input/input';
import { ScDatePicker } from './date-picker';

/**
 * A day, typed — in the locale's numeric order (14/10/2026, 10/14/2026,
 * 14.10.2026…) or ISO (2026-10-14); read on Enter or leaving. Single mode, or
 * a range's end: `part="start"` / `part="end"` (an end before the start is
 * not one). Text that is not a day that can be picked stays, marked, to be
 * fixed. Shows the value in the same numeric form.
 */
@Directive({
  selector: 'input[scDatePickerInput]',
  host: {
    'data-slot': 'control',
    type: 'text',
    autocomplete: 'off',
    '[attr.id]': 'id()',
    '[attr.data-part]': 'part()',
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.aria-invalid]': '(rejected() || picker.showInvalid()) || null',
    '[disabled]': 'picker.disabled()',
    '[class]': 'class()',
    '(input)': 'rejected.set(false)',
    '(keydown.enter)': 'read()',
    '(blur)': 'read(); picker.touch.emit()',
  },
})
export class ScDatePickerInput {
  protected readonly picker = inject(ScDatePicker);
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  private readonly fallbackId = inject(_IdGenerator).getId(
    'sc-date-picker-input-',
  );

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });
  /** In range mode: the end it is. */
  readonly part = input<'start' | 'end' | undefined>(undefined);

  /** The typed text could not be read as a day, until it is edited. */
  protected readonly rejected = signal(false);

  protected readonly id = computed(
    () =>
      this.idInput() ||
      (this.part() === 'end' ? '' : this.field?.id()) ||
      this.fallbackId,
  );
  protected readonly describedBy = computed(
    () => this.field?.descriptionIds().join(' ') || null,
  );

  /** The locale's numeric day: 2 digits, 2 digits, 4 digits — in its order. */
  private readonly numeric = computed(
    () =>
      new Intl.DateTimeFormat(this.picker.locale(), {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
  );

  /** The order of day, month and year in the locale's numeric day. */
  private readonly order = computed(() =>
    this.numeric()
      .formatToParts(Temporal.PlainDate.from('2026-10-14'))
      .map((part) => part.type)
      .filter(
        (type): type is 'day' | 'month' | 'year' =>
          type === 'day' || type === 'month' || type === 'year',
      ),
  );

  /** Its day in the value: the value, or the range's end. */
  private readonly day = computed(() => {
    const value = this.picker.value();
    const part = this.part();
    if (!part) return value instanceof Temporal.PlainDate ? value : undefined;
    const range = value as ScCalendarRange | null;
    return part === 'start' ? range?.from : range?.to;
  });

  protected readonly class = computed(() => cn(inputStyles, this.classInput()));

  constructor() {
    // The value, shown — unless it is being typed.
    effect(() => {
      const day = this.day();
      const numeric = this.numeric();
      untracked(() => {
        if (this.element.ownerDocument.activeElement === this.element) return;
        this.rejected.set(false);
        this.element.value = day ? numeric.format(day) : '';
      });
    });
  }

  /** The typed text, read: a day that can be picked, or marked. */
  read(): void {
    const text = this.element.value.trim();
    const date = text ? this.parse(text) : null;
    if (text && (!date || !this.picker.canPick(date) || !this.fits(date))) {
      this.rejected.set(true);
      return;
    }
    this.rejected.set(false);
    this.picker.value.set(this.next(date ?? undefined));
    this.element.value = date ? this.numeric().format(date) : '';
  }

  /** A range's end, typed: not before the start, not after the end. */
  private fits(date: Temporal.PlainDate): boolean {
    const part = this.part();
    const range = this.picker.value() as ScCalendarRange | null;
    if (part === 'start' && range?.to)
      return Temporal.PlainDate.compare(date, range.to) <= 0;
    if (part === 'end') {
      if (!range?.from) return false;
      return Temporal.PlainDate.compare(date, range.from) >= 0;
    }
    return true;
  }

  /** The value with this day — none: no start, no range. */
  private next(date: Temporal.PlainDate | undefined) {
    const part = this.part();
    if (!part) return date ?? null;
    const range = this.picker.value() as ScCalendarRange | null;
    if (part === 'start') return date ? { from: date, to: range?.to } : null;
    return range?.from ? { from: range.from, to: date } : null;
  }

  private parse(text: string): Temporal.PlainDate | null {
    const numbers = text.match(/\d+/g)?.map(Number) ?? [];
    if (numbers.length !== 3) return null;
    // ISO: the year first, four digits.
    const iso = /^\d{4}\D/.test(text);
    const order = iso ? (['year', 'month', 'day'] as const) : this.order();
    const fields = Object.fromEntries(
      order.map((type, i) => [type, numbers[i]]),
    ) as { day: number; month: number; year: number };
    if (fields.year < 100) fields.year += 2000;
    try {
      return Temporal.PlainDate.from(fields, { overflow: 'reject' });
    } catch {
      return null;
    }
  }
}
