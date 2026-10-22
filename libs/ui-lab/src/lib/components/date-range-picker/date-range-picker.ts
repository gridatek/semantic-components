import {
  Directive,
  LOCALE_ID,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import {
  ScCalendarRange,
  ScCalendarValue,
  ScPopoverProvider,
  cn,
} from '@semantic-components/ui';

export interface ScDateRangePreset {
  label: string;
  value: ScCalendarRange;
}

@Directive({
  selector: 'div[scDateRangePicker]',
  exportAs: 'scDateRangePicker',
  host: {
    '[class]': 'class()',
  },
})
export class ScDateRangePicker {
  private readonly locale = inject(LOCALE_ID);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly dateFormat = input('short');

  readonly value = model<ScCalendarRange>({ from: undefined, to: undefined });
  readonly apply = output<ScCalendarRange>();

  private readonly popoverProvider = contentChild(ScPopoverProvider, {
    descendants: true,
  });

  protected readonly class = computed(() => cn('block', this.classInput()));

  private readonly pendingValue = signal<ScCalendarRange>({
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
      return date.toLocaleString(this.locale, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    if (format === 'long') {
      return date.toLocaleString(this.locale, {
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
    // Cleared in the calendar (null): no days.
    this.value.set(
      (newValue as ScCalendarRange | null) ?? {
        from: undefined,
        to: undefined,
      },
    );
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

/** The names of the common presets — the library writes none. */
export interface ScDateRangePresetLabels {
  readonly today: string;
  readonly yesterday: string;
  readonly last7Days: string;
  readonly last14Days: string;
  readonly last30Days: string;
  readonly thisMonth: string;
  readonly lastMonth: string;
}

/** The common presets (today, the last 7 days, this month…), named by you. */
export function createScDateRangePresets(
  labels: ScDateRangePresetLabels,
): ScDateRangePreset[] {
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
    { label: labels.today, value: { from: today, to: today } },
    { label: labels.yesterday, value: { from: yesterday, to: yesterday } },
    { label: labels.last7Days, value: { from: last7Days, to: today } },
    { label: labels.last14Days, value: { from: last14Days, to: today } },
    { label: labels.last30Days, value: { from: last30Days, to: today } },
    {
      label: labels.thisMonth,
      value: { from: thisMonthStart, to: thisMonthEnd },
    },
    {
      label: labels.lastMonth,
      value: { from: lastMonthStart, to: lastMonthEnd },
    },
  ];
}
