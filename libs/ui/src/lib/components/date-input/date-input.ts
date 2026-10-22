import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  LOCALE_ID,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '../../utils';
import type { ScCalendarRange } from '../calendar';
import { ScDatePicker } from '../date-picker/date-picker';
import { SC_FIELD } from '../field';
import { inputStyles } from '../input/input';

/**
 * A date, typed — in the locale's numeric order (14/10/2026, 10/14/2026,
 * 14.10.2026…) or ISO (2026-10-14); read on Enter or leaving. Text that is
 * not a day that can be picked stays, marked, to be fixed — the value as it
 * was. Shows the value in the same numeric form. A `[formField]`. In a date
 * picker, it is the picker's value — a range's end with `part="start"` /
 * `"end"` — and takes its locale and limits.
 */
@Directive({
  selector: 'input[scDateInput]',
  exportAs: 'scDateInput',
  host: {
    'data-slot': 'control',
    type: 'text',
    autocomplete: 'off',
    '[attr.id]': 'id()',
    '[attr.data-part]': 'part()',
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.aria-invalid]': 'showInvalid() || null',
    '[disabled]': 'isDisabled()',
    '[class]': 'class()',
    '(input)': 'rejected.set(false)',
    '(keydown.enter)': 'read()',
    '(blur)': 'read(); left()',
  },
})
export class ScDateInput implements FormValueControl<Temporal.PlainDate | null> {
  private readonly picker = inject(ScDatePicker, { optional: true });
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  private readonly fallbackId = inject(_IdGenerator).getId('sc-date-input-');
  private readonly appLocale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });

  readonly value = model<Temporal.PlainDate | null>(null);
  /** In a date picker's range: the end it is. */
  readonly part = input<'start' | 'end' | undefined>(undefined);
  /** The language: the numeric order; the picker's, or the app's, by default. */
  readonly locale = input<string | undefined>(undefined);
  /** The first day; an earlier one is not read (in a picker: the picker's). */
  readonly minDate = input<Temporal.PlainDate | undefined>(undefined);
  /** The last day; a later one is not read (in a picker: the picker's). */
  readonly maxDate = input<Temporal.PlainDate | undefined>(undefined);
  /** Days that cannot be picked (in a picker: the picker's). */
  readonly unavailable = input<(date: Temporal.PlainDate) => boolean>(
    () => false,
  );
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** Left (Signal Forms marks it touched). */
  readonly touch = output<void>();

  /** The typed text could not be read as a day that can be picked, until it is edited. */
  protected readonly rejected = signal(false);

  protected readonly isDisabled = computed(
    () => this.disabled() || !!this.picker?.disabled(),
  );
  protected readonly showInvalid = computed(
    () =>
      this.rejected() ||
      (this.picker
        ? this.picker.showInvalid()
        : this.invalid() && this.touched()),
  );

  protected readonly id = computed(
    () =>
      this.idInput() ||
      (this.part() === 'end' ? '' : this.field?.id()) ||
      this.fallbackId,
  );
  protected readonly describedBy = computed(
    () => this.field?.descriptionIds().join(' ') || null,
  );

  private readonly language = computed(
    () => this.locale() ?? this.picker?.locale() ?? this.appLocale,
  );

  /** The locale's numeric day: 2 digits, 2 digits, 4 digits — in its order. */
  private readonly numeric = computed(
    () =>
      new Intl.DateTimeFormat(this.language(), {
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

  /** Its day: its value — or, in a date picker, the picker's (a range's end). */
  readonly date = computed<Temporal.PlainDate | null>(() => {
    if (!this.picker) return this.value();
    const value = this.picker.value();
    const part = this.part();
    if (!part) return value instanceof Temporal.PlainDate ? value : null;
    const range = value as ScCalendarRange | null;
    return (part === 'start' ? range?.from : range?.to) ?? null;
  });

  protected readonly class = computed(() => cn(inputStyles, this.classInput()));

  constructor() {
    // The day, shown — unless it is being typed.
    effect(() => {
      const date = this.date();
      const numeric = this.numeric();
      untracked(() => {
        if (this.element.ownerDocument.activeElement === this.element) return;
        this.rejected.set(false);
        this.element.value = date ? numeric.format(date) : '';
      });
    });
  }

  /** The typed text, read: a day that can be picked, or marked. */
  read(): void {
    const text = this.element.value.trim();
    const date = text ? this.parse(text) : null;
    if (text && (!date || !this.canPick(date) || !this.fits(date))) {
      this.rejected.set(true);
      return;
    }
    this.rejected.set(false);
    this.write(date);
    this.element.value = date ? this.numeric().format(date) : '';
  }

  protected left(): void {
    if (this.picker) this.picker.touch.emit();
    else this.touch.emit();
  }

  /** Within the limits, not unavailable — the picker's, in a picker. */
  private canPick(date: Temporal.PlainDate): boolean {
    if (this.picker) return this.picker.canPick(date);
    const min = this.minDate();
    const max = this.maxDate();
    return (
      (!min || Temporal.PlainDate.compare(date, min) >= 0) &&
      (!max || Temporal.PlainDate.compare(date, max) <= 0) &&
      !this.unavailable()(date)
    );
  }

  /** A range's end, typed: not before the start, not after the end. */
  private fits(date: Temporal.PlainDate): boolean {
    const part = this.part();
    if (!this.picker || !part) return true;
    const range = this.picker.value() as ScCalendarRange | null;
    if (part === 'start' && range?.to)
      return Temporal.PlainDate.compare(date, range.to) <= 0;
    if (part === 'end') {
      if (!range?.from) return false;
      return Temporal.PlainDate.compare(date, range.from) >= 0;
    }
    return true;
  }

  /** The day, written: its value — or the picker's (a range's end; no start, no range). */
  private write(date: Temporal.PlainDate | null): void {
    if (!this.picker) {
      this.value.set(date);
      return;
    }
    const part = this.part();
    if (!part) {
      this.picker.value.set(date);
      return;
    }
    const range = this.picker.value() as ScCalendarRange | null;
    if (part === 'start')
      this.picker.value.set(date ? { from: date, to: range?.to } : null);
    else
      this.picker.value.set(
        range?.from ? { from: range.from, to: date ?? undefined } : null,
      );
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
