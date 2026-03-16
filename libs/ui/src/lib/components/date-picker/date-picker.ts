import { Temporal } from '@js-temporal/polyfill';
import { Directive, computed, contentChild, input, model } from '@angular/core';
import { cn } from '../../utils';
import { ScCalendarMode, ScCalendarValue, ScDateRange } from '../calendar';
import { ScPopoverProvider } from '../popover';

@Directive({
  selector: 'div[scDatePicker]',
  exportAs: 'scDatePicker',
  host: {
    'data-slot': 'date-picker',
    '[class]': 'class()',
  },
})
export class ScDatePicker {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly mode = input<ScCalendarMode>('single');
  readonly placeholder = input<string>('Pick a date');

  readonly value = model<ScCalendarValue>(undefined);

  private readonly popoverProvider = contentChild(ScPopoverProvider, {
    descendants: true,
  });

  protected readonly class = computed(() => cn('block', this.classInput()));

  readonly displayText = computed(() => {
    const mode = this.mode();
    const val = this.value();

    if (mode === 'single') {
      const date = val as Temporal.PlainDate | undefined;
      return date ? this.formatDate(date) : '';
    }

    if (mode === 'multiple') {
      const dates = (val as Temporal.PlainDate[] | undefined) ?? [];
      if (dates.length === 0) return '';
      if (dates.length === 1) return this.formatDate(dates[0]);
      return `${dates.length} dates selected`;
    }

    if (mode === 'range') {
      const range = (val as ScDateRange | undefined) ?? {
        from: undefined,
        to: undefined,
      };
      if (!range.from) return '';
      if (!range.to) return this.formatDate(range.from);
      return `${this.formatDate(range.from)} - ${this.formatDate(range.to)}`;
    }

    return '';
  });

  private formatDate(date: Temporal.PlainDate): string {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  onValueChange(newValue: ScCalendarValue): void {
    this.value.set(newValue);

    const mode = this.mode();

    if (mode === 'single' && newValue) {
      this.popoverProvider()?.open.set(false);
    }

    if (mode === 'range') {
      const range = newValue as ScDateRange | undefined;
      if (range?.from && range?.to) {
        this.popoverProvider()?.open.set(false);
      }
    }
  }
}
