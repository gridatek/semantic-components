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
import { cn } from '../../utils';
import type {
  ScCalendarMode,
  ScCalendarRange,
  ScCalendarValue,
} from '../calendar';
import { ScPopoverProvider } from '../popover';
import { ScDatePickerTrigger } from './date-picker-trigger';

/**
 * A date, picked in a calendar in a popover — or typed
 * (`scDateInput`; a range's ends: `part="start"` / `"end"`), or a
 * preset (`scDatePickerPreset`). Its value is the calendar's; `text()` is it
 * as written in the app's language. A `[formField]`. It closes on a pick (on
 * a whole range), focus back on its trigger — or, `confirm`, picks are a
 * draft until `scDatePickerApply`.
 */
@Directive({
  selector: 'div[scDatePicker]',
  exportAs: 'scDatePicker',
  host: {
    'data-slot': 'date-picker',
    '[attr.data-disabled]': 'disabled() || null',
    '[class]': 'class()',
  },
})
export class ScDatePicker implements FormValueControl<ScCalendarValue> {
  readonly classInput = input<string>('', { alias: 'class' });

  readonly value = model<ScCalendarValue>(null);
  readonly mode = input<ScCalendarMode>('single');
  /** How a day is written; `dateStyle: 'medium'` by default. */
  readonly format = input<Intl.DateTimeFormatOptions>({ dateStyle: 'medium' });
  /** The language it is written in; the app's by default. */
  readonly locale = input(inject(LOCALE_ID));
  /** The first day that can be picked — give it to the calendar too. */
  readonly minDate = input<Temporal.PlainDate | undefined>(undefined);
  /** The last day that can be picked — give it to the calendar too. */
  readonly maxDate = input<Temporal.PlainDate | undefined>(undefined);
  /** Days that cannot be picked — give it to the calendar too. */
  readonly unavailable = input<(date: Temporal.PlainDate) => boolean>(
    () => false,
  );
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
  /** The draft can be applied: a day, a whole range, or days. */
  readonly canApply = computed(() => this.isDone(this.draft(), true));

  private readonly formatter = computed(
    () => new Intl.DateTimeFormat(this.locale(), this.format()),
  );

  /** The value, as written: a day, a range, or a list of days — or empty. */
  readonly text = computed(() => {
    const value = this.value();
    const formatter = this.formatter();
    if (!value) return '';
    if (value instanceof Temporal.PlainDate) return formatter.format(value);
    if (Array.isArray(value)) {
      const days = [...(value as readonly Temporal.PlainDate[])].sort(
        Temporal.PlainDate.compare,
      );
      return new Intl.ListFormat(this.locale(), {
        type: 'conjunction',
      }).format(days.map((day) => formatter.format(day)));
    }
    const { from, to } = value as ScCalendarRange;
    if (!from) return '';
    if (!to) return formatter.format(from);
    // Typed ends can be out of order (marked by the input): the earlier first.
    return Temporal.PlainDate.compare(from, to) <= 0
      ? formatter.formatRange(from, to)
      : formatter.formatRange(to, from);
  });

  readonly hasValue = computed(() => this.text() !== '');

  protected readonly class = computed(() =>
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
    if (this.isDone(value)) this.close();
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

  /** A day, a whole range — or, `days`, at least one of several days. */
  private isDone(value: ScCalendarValue, days = false): boolean {
    const mode = this.mode();
    if (mode === 'single') return !!value;
    if (mode === 'range') return !!(value as ScCalendarRange | null)?.to;
    return days && !!(value as readonly Temporal.PlainDate[] | null)?.length;
  }
}
