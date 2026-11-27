import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
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
import type { ScCalendarRange, ScCalendarValue } from '../calendar';
import {
  SC_DATE_INPUT_HOST,
  type ScDateInputHost,
} from '../date-input/date-input-host';
import { ScPopoverProvider } from '../popover';
import { ScDateRangePickerTrigger } from './date-range-picker-trigger';

/**
 * A range of days — picked in a calendar in a popover (two clicks: the
 * start, then the end), or typed in your `scDateRangeInput`, or a preset.
 * Its value is `{ from, to }`; your trigger writes it (`injectFormatDate()`:
 * one span, "Oct 12 – 18, 2026" — or your own format). A `[formField]`. It closes once whole, focus
 * back on its trigger — or, `confirm`, picks are a draft until
 * `scDateRangePickerApply`.
 */
@Directive({
  selector: 'div[scDateRangePicker]',
  exportAs: 'scDateRangePicker',
  // Its typed field (scDateRangeInput) writes its value, within its limits.
  providers: [{ provide: SC_DATE_INPUT_HOST, useExisting: ScDateRangePicker }],
  host: {
    'data-slot': 'date-range-picker',
    '[attr.data-disabled]': 'disabled() || null',
    '[class]': 'class()',
  },
})
export class ScDateRangePicker
  implements FormValueControl<ScCalendarRange | null>, ScDateInputHost
{
  readonly classInput = input<string>('', { alias: 'class' });
  /** The range: `[formField]` or `[(value)]` — `{ from, to }`, or `null`. */
  readonly value = model<ScCalendarRange | null>(null);
  // TODO(angular): the bounds go once Signal Forms' min() / max() take
  // Temporal dates (docs/todo.md, "Date bounds from the form").
  /** The first day that can be picked — give `minDate()` to the calendar. */
  readonly minDate = input<Temporal.PlainDate | undefined>(undefined);
  /** The last day that can be picked — give `maxDate()` to the calendar. */
  readonly maxDate = input<Temporal.PlainDate | undefined>(undefined);
  /** Days that can't be picked — give `unavailable()` to the calendar. */
  readonly unavailable = input<(date: Temporal.PlainDate) => boolean>(
    () => false,
  );
  /** A pick that makes the value whole closes the popover; false: it stays open until Enter, Escape or a click outside. */
  readonly closeOnPick = input(true, { transform: booleanAttribute });
  /** Picks are a draft, kept by `scDateRangePickerApply` — dropped on close. */
  readonly confirm = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** Left: the calendar closed, or the typed field left (Signal Forms marks it touched). */
  readonly touch = output<void>();

  private readonly popover = contentChild(ScPopoverProvider, {
    descendants: true,
  });
  private readonly trigger = contentChild(
    forwardRef(() => ScDateRangePickerTrigger),
    { descendants: true, read: ElementRef<HTMLElement> },
  );

  /** Invalid, once touched. */
  readonly showInvalid = computed(() => this.invalid() && this.touched());

  /** What the calendar shows (`[value]="dp.draft()"`): the value — or, `confirm`, the picks not yet applied. */
  readonly draft = linkedSignal<ScCalendarRange | null>(() => this.value());
  /** The draft can be applied: both ends. */
  readonly canApply = computed(
    () => !!this.draft()?.from && !!this.draft()?.to,
  );

  /** A start picked — your trigger's text from the value: `injectFormatDate()` ("Oct 12 – 18, 2026"), or your own. */
  readonly hasValue = computed(() => !!this.value()?.from);

  /** The draft's days, both ends counted (a weekend: 2); 0 until both are there. */
  readonly days = computed(() => {
    const range = this.draft();
    if (!range?.from || !range.to) return 0;
    return Math.abs(range.from.until(range.to).days) + 1;
  });
  /** The draft's nights (a weekend: 1) — for a stay's text, written by you. */
  readonly nights = computed(() => Math.max(0, this.days() - 1));

  private readonly class = computed(() =>
    cn('flex w-full items-center gap-2', this.classInput()),
  );

  constructor() {
    // The calendar closed: the draft dropped, touched — and focus back on the
    // trigger if it was in the panel (Safari does not focus a clicked button).
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
   * The calendar's pick (`(valueChange)`) or a preset's: kept — and, whole,
   * closed. `confirm`: the draft, until applied.
   */
  pick(value: ScCalendarValue): void {
    const range = (value as ScCalendarRange | null) ?? null;
    if (this.confirm()) {
      this.draft.set(range);
      return;
    }
    this.value.set(range);
    if (this.closeOnPick() && range?.to) this.close();
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
}
