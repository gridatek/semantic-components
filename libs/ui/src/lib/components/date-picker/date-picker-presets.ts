import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';
import type { ScCalendarRange } from '../calendar';

/** The presets, in a column beside the calendar. Name it (`aria-label`). */
@Directive({
  selector: 'div[scDatePickerPresets]',
  host: {
    'data-slot': 'date-picker-presets',
    role: 'group',
    '[class]': 'class()',
  },
})
export class ScDatePickerPresets {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex min-w-36 flex-col gap-1 border-e p-3', this.classInput()),
  );
}

/** The names of the common ranges — the library writes none. */
export interface ScDateRangePresetLabels {
  readonly today: string;
  readonly yesterday: string;
  readonly last7Days: string;
  readonly last30Days: string;
  readonly thisMonth: string;
  readonly lastMonth: string;
}

export interface ScDateRangePreset {
  readonly label: string;
  readonly value: ScCalendarRange;
}

/** The common ranges — today, the last 7 days, this month… — named by you, from `today`. */
export function scDateRangePresets(
  labels: ScDateRangePresetLabels,
  today = Temporal.Now.plainDateISO(),
): ScDateRangePreset[] {
  const yesterday = today.subtract({ days: 1 });
  const lastMonth = today.subtract({ months: 1 });
  return [
    { label: labels.today, value: { from: today, to: today } },
    { label: labels.yesterday, value: { from: yesterday, to: yesterday } },
    {
      label: labels.last7Days,
      value: { from: today.subtract({ days: 6 }), to: today },
    },
    {
      label: labels.last30Days,
      value: { from: today.subtract({ days: 29 }), to: today },
    },
    {
      label: labels.thisMonth,
      value: {
        from: today.with({ day: 1 }),
        to: today.with({ day: today.daysInMonth }),
      },
    },
    {
      label: labels.lastMonth,
      value: {
        from: lastMonth.with({ day: 1 }),
        to: lastMonth.with({ day: lastMonth.daysInMonth }),
      },
    },
  ];
}
