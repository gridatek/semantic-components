import { Temporal } from '@js-temporal/polyfill';
import {
  Directive,
  computed,
  contentChild,
  effect,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import {
  ScCalendarValue,
  ScDateRange,
  ScPopoverProvider,
  cn,
} from '@semantic-components/ui';

export interface ScDateRangePreset {
  label: string;
  value: ScDateRange;
}

@Directive({
  selector: 'div[scDateRangePicker]',
  exportAs: 'scDateRangePicker',
  host: {
    'data-slot': 'date-range-picker',
    '[class]': 'class()',
  },
})
export class ScDateRangePicker {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly placeholder = input('Select date range');
  readonly dateFormat = input('short');

  readonly value = model<ScDateRange>({ from: undefined, to: undefined });
  readonly apply = output<ScDateRange>();

  private readonly popoverProvider = contentChild(ScPopoverProvider, {
    descendants: true,
  });

  protected readonly class = computed(() => cn('block', this.classInput()));

  private readonly pendingValue = signal<ScDateRange>({
    from: undefined,
    to: undefined,
  });

  readonly displayText = computed(() => {
    const range = this.value();
    if (!range.from) return '';
    if (!range.to) return this.formatDate(range.from);
    return `${this.formatDate(range.from)} - ${this.formatDate(range.to)}`;
  });

  constructor() {
    effect(() => {
      const isOpen = this.popoverProvider()?.open();
      if (isOpen) {
        this.pendingValue.set({ ...this.value() });
      }
    });
  }

  formatDate(date: Temporal.PlainDate): string {
    const format = this.dateFormat();
    if (format === 'short') {
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    if (format === 'long') {
      return date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
    if (format === 'iso') {
      return date.toString();
    }
    return date.toLocaleString();
  }

  onValueChange(newValue: ScCalendarValue): void {
    this.value.set(newValue as ScDateRange);
  }

  onCancel(): void {
    this.value.set(this.pendingValue());
    this.popoverProvider()?.open.set(false);
  }

  onApply(): void {
    const range = this.value();
    if (range.from && range.to) {
      this.pendingValue.set({ ...range });
      this.apply.emit(range);
      this.popoverProvider()?.open.set(false);
    }
  }
}

// Helper function to create common presets
export function createScDateRangePresets(): ScDateRangePreset[] {
  const today = Temporal.Now.plainDateISO();
  const yesterday = today.subtract({ days: 1 });

  const last7Days = today.subtract({ days: 6 });
  const last14Days = today.subtract({ days: 13 });
  const last30Days = today.subtract({ days: 29 });

  const thisMonthStart = today.with({ day: 1 });
  const thisMonthEnd = today.with({ day: today.daysInMonth });

  const lastMonth = today.subtract({ months: 1 });
  const lastMonthStart = lastMonth.with({ day: 1 });
  const lastMonthEnd = lastMonth.with({ day: lastMonth.daysInMonth });

  return [
    { label: 'Today', value: { from: today, to: today } },
    { label: 'Yesterday', value: { from: yesterday, to: yesterday } },
    { label: 'Last 7 days', value: { from: last7Days, to: today } },
    { label: 'Last 14 days', value: { from: last14Days, to: today } },
    { label: 'Last 30 days', value: { from: last30Days, to: today } },
    { label: 'This month', value: { from: thisMonthStart, to: thisMonthEnd } },
    { label: 'Last month', value: { from: lastMonthStart, to: lastMonthEnd } },
  ];
}
