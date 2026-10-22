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
  model,
  output,
  signal,
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
import { ScDatePickerNextTrigger } from './date-picker-next-trigger';

/**
 * A date, picked in a calendar in a popover — or typed
 * (`scDatePickerNextInput`). Its value is the calendar's; `text()` is it as
 * written in the app's language. A `[formField]`. It closes on a pick (on a
 * whole range), focus back on its trigger.
 */
@Directive({
  selector: 'div[scDatePickerNext]',
  exportAs: 'scDatePickerNext',
  host: {
    'data-slot': 'date-picker',
    '[attr.data-disabled]': 'disabled() || null',
    '[class]': 'class()',
  },
})
export class ScDatePickerNext implements FormValueControl<ScCalendarValue> {
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
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** Left: the calendar closed, or the typed date read (Signal Forms marks it touched). */
  readonly touch = output<void>();

  private readonly popover = contentChild(ScPopoverProvider, {
    descendants: true,
  });
  /** The trigger, focused again when the calendar closes. */
  private readonly trigger = contentChild(
    forwardRef(() => ScDatePickerNextTrigger),
    { descendants: true, read: ElementRef<HTMLElement> },
  );

  /** Typed text that could not be read as a day, until it is edited. */
  readonly rejected = signal(false);
  /** Invalid, once touched — or text that could not be read. */
  readonly showInvalid = computed(
    () => this.rejected() || (this.invalid() && this.touched()),
  );

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
    return to ? formatter.formatRange(from, to) : formatter.format(from);
  });

  readonly hasValue = computed(() => this.text() !== '');

  protected readonly class = computed(() =>
    cn('flex w-full items-center gap-2', this.classInput()),
  );

  constructor() {
    // The calendar closed: touched — and focus back on the trigger if it was
    // in the panel, which leaves after its animation (Safari does not focus a
    // clicked button: there is nothing for the panel to restore).
    const document = inject(DOCUMENT);
    let wasOpen = false;
    effect(() => {
      const open = this.popover()?.open() ?? false;
      untracked(() => {
        if (wasOpen && !open) {
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

  /** The calendar's pick (`(valueChange)`): kept — and, done, closed. */
  pick(value: ScCalendarValue): void {
    this.value.set(value);
    this.rejected.set(false);
    const mode = this.mode();
    const done =
      mode === 'single'
        ? !!value
        : mode === 'range'
          ? !!(value as ScCalendarRange | null)?.to
          : false;
    if (done) this.popover()?.open.set(false);
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
}
