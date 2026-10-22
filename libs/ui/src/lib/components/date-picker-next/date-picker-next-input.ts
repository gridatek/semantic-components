import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';
import { inputStyles } from '../input/input';
import { ScDatePickerNext } from './date-picker-next';

/**
 * A day, typed — single mode: in the locale's numeric order (14/10/2026,
 * 10/14/2026, 14.10.2026…) or ISO (2026-10-14); read on Enter or leaving.
 * Text that is not a day that can be picked stays, marked, to be fixed.
 * Shows the value in the same numeric form.
 */
@Directive({
  selector: 'input[scDatePickerNextInput]',
  host: {
    'data-slot': 'control',
    type: 'text',
    autocomplete: 'off',
    '[attr.id]': 'id()',
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.aria-invalid]': 'picker.showInvalid() || null',
    '[disabled]': 'picker.disabled()',
    '[class]': 'class()',
    '(input)': 'picker.rejected.set(false)',
    '(keydown.enter)': 'read()',
    '(blur)': 'read(); picker.touch.emit()',
  },
})
export class ScDatePickerNextInput {
  protected readonly picker = inject(ScDatePickerNext);
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  private readonly fallbackId = inject(_IdGenerator).getId(
    'sc-date-picker-input-',
  );

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });

  protected readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
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

  protected readonly class = computed(() => cn(inputStyles, this.classInput()));

  constructor() {
    // The value, shown — unless it is being typed.
    effect(() => {
      const value = this.picker.value();
      const numeric = this.numeric();
      untracked(() => {
        if (this.element.ownerDocument.activeElement === this.element) return;
        this.element.value =
          value instanceof Temporal.PlainDate ? numeric.format(value) : '';
      });
    });
  }

  /** The typed text, read: a day that can be picked, or marked. */
  read(): void {
    const text = this.element.value.trim();
    if (!text) {
      this.picker.value.set(null);
      this.picker.rejected.set(false);
      return;
    }
    const date = this.parse(text);
    if (!date || !this.picker.canPick(date)) {
      this.picker.rejected.set(true);
      return;
    }
    this.picker.rejected.set(false);
    this.picker.value.set(date);
    this.element.value = this.numeric().format(date);
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
