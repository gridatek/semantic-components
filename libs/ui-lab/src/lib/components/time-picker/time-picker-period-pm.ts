import { computed, Directive, inject } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTimePickerPeriod } from './time-picker-period';

@Directive({
  selector: 'button[scTimePickerPeriodPM]',
  host: {
    'data-slot': 'time-picker-period-pm',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'period.timePicker.disabled()',
    '(click)': 'period.selectPM()',
  },
})
export class ScTimePickerPeriodPM {
  protected readonly period = inject(ScTimePickerPeriod);

  protected readonly class = computed(() =>
    cn(
      'rounded-md px-2 py-1.5 text-sm font-medium transition-colors',
      this.period.isPM()
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:bg-accent',
    ),
  );
}
