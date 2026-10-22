import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  computed,
  contentChild,
  effect,
  forwardRef,
  inject,
  input,
  untracked,
} from '@angular/core';
import { cn } from '../../utils';
import { ScPopoverProvider } from '../popover';
import { ScTimeInput } from '../time-input';
import { ScTimePickerNextTrigger } from './time-picker-next-trigger';

/**
 * A time — typed in its `scTimeInput`, or picked from a list of times
 * (`scTimePickerNextList`, every `interval` minutes, within the input's
 * `minTime` / `maxTime`) in a popover. The value, the locale and the limits
 * are the input's: put `[formField]` on it. A pick closes the list, focus back
 * on the trigger.
 */
@Directive({
  selector: 'div[scTimePickerNext]',
  exportAs: 'scTimePickerNext',
  host: {
    'data-slot': 'time-picker',
    '[class]': 'class()',
  },
})
export class ScTimePickerNext {
  readonly classInput = input<string>('', { alias: 'class' });
  /** Minutes between the times in the list. */
  readonly interval = input(30);

  /** The time input: the value, the locale, the limits. */
  readonly timeInput = contentChild.required(ScTimeInput, {
    descendants: true,
  });
  private readonly popover = contentChild(ScPopoverProvider, {
    descendants: true,
  });
  private readonly trigger = contentChild(
    forwardRef(() => ScTimePickerNextTrigger),
    { descendants: true, read: ElementRef<HTMLElement> },
  );

  /** The times in the list: every `interval` minutes, within the limits. */
  readonly times = computed(() => {
    const input = this.timeInput();
    const minutes = Math.max(1, this.interval());
    const last = input.maxTime() ?? Temporal.PlainTime.from('23:59:59');
    const times: Temporal.PlainTime[] = [];
    let time = input.minTime() ?? Temporal.PlainTime.from('00:00');
    while (Temporal.PlainTime.compare(time, last) <= 0) {
      times.push(time);
      const next = time.add({ minutes });
      if (Temporal.PlainTime.compare(next, time) <= 0) break; // past midnight
      time = next;
    }
    return times;
  });

  private readonly formatter = computed(() => {
    const input = this.timeInput();
    return new Intl.DateTimeFormat(input.locale(), {
      hour: 'numeric',
      minute: '2-digit',
      hourCycle: input.twelveHours() ? 'h12' : 'h23',
    });
  });

  /** A time as the input's locale writes it. */
  label(time: Temporal.PlainTime): string {
    return this.formatter().format(time);
  }

  /** Where the list opens: the value, or the time before it — or the next time from now. */
  readonly startIndex = computed(() => {
    const times = this.times();
    const value = this.timeInput().value();
    const at = (time: Temporal.PlainTime) =>
      times.findIndex((t) => Temporal.PlainTime.compare(t, time) > 0);
    if (value) {
      const after = at(value);
      return Math.max(0, (after < 0 ? times.length : after) - 1);
    }
    const now = Temporal.Now.plainTimeISO();
    const next = times.findIndex(
      (t) => Temporal.PlainTime.compare(t, now) >= 0,
    );
    return Math.max(0, next);
  });

  protected readonly class = computed(() => cn('block', this.classInput()));

  constructor() {
    // The list closed: touched — and focus back on the trigger if it was in
    // the panel, which leaves after its animation (Safari does not focus a
    // clicked button: there is nothing for the panel to restore).
    const document = inject(DOCUMENT);
    let wasOpen = false;
    effect(() => {
      const open = this.popover()?.open() ?? false;
      untracked(() => {
        if (wasOpen && !open) {
          this.timeInput().touch.emit();
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

  /** A time picked from the list: the value — and closed. */
  pick(time: Temporal.PlainTime): void {
    this.timeInput().value.set(time);
    this.popover()?.open.set(false);
  }
}
