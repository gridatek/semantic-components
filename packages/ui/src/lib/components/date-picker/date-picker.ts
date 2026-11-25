import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  LOCALE_ID,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  forwardRef,
  inject,
  input,
  linkedSignal,
  model,
  output,
  untracked,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from 'cn';
import type { ScCalendarMode, ScCalendarValue } from '../calendar';
import {
  SC_DATE_INPUT_HOST,
  type ScDateInputHost,
} from '../date-input/date-input-host';
import { ScPopoverProvider } from '../popover';
import { ScDatePickerTrigger } from './date-picker-trigger';

/**
 * A date — or several — picked in a calendar in a popover, or typed
 * (`scDateInput`), or a preset (`scDatePickerPreset`). A range is the Date
 * Range Picker's. Its value is the calendar's; `text()` is it
 * as written in the app's language. A `[formField]`. It closes on a pick (on
 * a whole range), focus back on its trigger — or, `confirm`, picks are a
 * draft until `scDatePickerApply`.
 */
@Directive({
  selector: 'div[scDatePicker]',
  exportAs: 'scDatePicker',
  // Its date input (scDateInput) writes its value.
  providers: [{ provide: SC_DATE_INPUT_HOST, useExisting: ScDatePicker }],
  host: {
    'data-slot': 'date-picker',
    '[attr.data-disabled]': 'disabled() || null',
    '[class]': 'class()',
  },
})
export class ScDatePicker
  implements FormValueControl<ScCalendarValue>, ScDateInputHost
{
  readonly classInput = input<string>('', { alias: 'class' });

  readonly value = model<ScCalendarValue>(null);
  /** A day, or several days (a range: the Date Range Picker). */
  readonly mode = input<Exclude<ScCalendarMode, 'range'>>('single');
  /** How a day is written; `dateStyle: 'medium'` by default. */
  readonly format = input<Intl.DateTimeFormatOptions>({ dateStyle: 'medium' });
  /** The locale: `LOCALE_ID` — the app's, or one provided for this section. */
  private readonly locale = inject(LOCALE_ID);
  // TODO(angular): minDate / maxDate go once Signal Forms' min() / max()
  // take Temporal dates — the bounds then from the schema with a form, and
  // [min] / [max] without one, as every control's ("Bounds Come From the
  // Form", docs/principles/component-design-principles.md; docs/todo.md, "Date bounds
  // from the form"). Angular: https://github.com/angular/angular/issues/67643
  /** The first day that can be picked — give it to the calendar too. */
  readonly minDate = input<Temporal.PlainDate | undefined>(undefined);
  /** The last day that can be picked — give it to the calendar too. */
  readonly maxDate = input<Temporal.PlainDate | undefined>(undefined);
  /** Days that cannot be picked — give it to the calendar too. */
  readonly unavailable = input<(date: Temporal.PlainDate) => boolean>(
    () => false,
  );
  /** A pick that makes the value whole closes the popover; false: it stays open until Enter, Escape or a click outside. */
  readonly closeOnPick = input(true, { transform: booleanAttribute });
  /** Picks are a draft, kept by `scDatePickerApply` — dropped on close. */
  readonly confirm = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** Left: the calendar closed, or a typed date read (Signal Forms marks it touched). */
  readonly touch = output<void>();

  private readonly popover = contentChild(ScPopoverProvider, {
    descendants: true,
  });
  /** The trigger, focused again when the calendar closes. */
  private readonly trigger = contentChild(
    forwardRef(() => ScDatePickerTrigger),
    { descendants: true, read: ElementRef<HTMLElement> },
  );

  /** Invalid, once touched. */
  readonly showInvalid = computed(() => this.invalid() && this.touched());

  /** What the calendar shows (`[value]="dp.draft()"`): the value — or, `confirm`, the picks not yet applied. */
  readonly draft = linkedSignal(() => this.value());
  /** The draft can be applied: a day, or days. */
  readonly canApply = computed(() => this.isDone(this.draft(), true));

  private readonly formatter = computed(
    () => new Intl.DateTimeFormat(this.locale, this.format()),
  );

  /** The value, as written: a day, or a list of days — or empty. */
  readonly text = computed(() => {
    const value = this.value();
    const formatter = this.formatter();
    if (!value) return '';
    if (value instanceof Temporal.PlainDate) return formatter.format(value);
    if (Array.isArray(value)) {
      const days = [...(value as readonly Temporal.PlainDate[])].sort(
        Temporal.PlainDate.compare,
      );
      return new Intl.ListFormat(this.locale, {
        type: 'conjunction',
      }).format(days.map((day) => formatter.format(day)));
    }
    return '';
  });

  readonly hasValue = computed(() => this.text() !== '');

  private readonly class = computed(() =>
    cn('flex w-full items-center gap-2', this.classInput()),
  );

  constructor() {
    // The calendar closed: the draft dropped, touched — and focus back on the
    // trigger if it was in the panel, which leaves after its animation (Safari
    // does not focus a clicked button: there is nothing for the panel to
    // restore).
    const document = inject(DOCUMENT);
    let wasOpen = false;
    effect(() => {
      const open = this.popover()?.open() ?? false;
      untracked(() => {
        if (wasOpen && !open) {
          this.draft.set(this.value());
          this.touch.emit();
          const active = document.activeElement;
          if (
            !active ||
            active === document.body ||
            active.closest('.cdk-overlay-container')
          )
            this.trigger()?.nativeElement.focus();
        }
        wasOpen = open;
      });
    });
  }

  /**
   * The calendar's pick (`(valueChange)`) or a preset's: kept — and, done,
   * closed. `confirm`: the draft, until applied.
   */
  pick(value: ScCalendarValue): void {
    if (this.confirm()) {
      this.draft.set(value);
      return;
    }
    this.value.set(value);
    if (this.closeOnPick() && this.isDone(value)) this.close();
  }

  /** The draft, kept — and closed. */
  apply(): void {
    if (!this.canApply()) return;
    this.value.set(this.draft());
    this.close();
  }

  /** Closed, the draft dropped. */
  cancel(): void {
    this.close();
  }

  /** A day that can be picked: within min and max, not unavailable. */
  canPick(date: Temporal.PlainDate): boolean {
    const min = this.minDate();
    const max = this.maxDate();
    return (
      (!min || Temporal.PlainDate.compare(date, min) >= 0) &&
      (!max || Temporal.PlainDate.compare(date, max) <= 0) &&
      !this.unavailable()(date)
    );
  }

  private close(): void {
    this.popover()?.open.set(false);
  }

  /** A day — or, `days`, at least one of several days. */
  private isDone(value: ScCalendarValue, days = false): boolean {
    if (this.mode() === 'single') return !!value;
    return days && !!(value as readonly Temporal.PlainDate[] | null)?.length;
  }
}
