import { Directive, computed, inject } from '@angular/core';
import { cn } from '../../utils';
import { ScTimePickerPeriod } from './time-picker-period';

@Directive({
  selector: 'button[scTimePickerPeriodAM]',
  host: {
    'data-slot': 'time-picker-period-am',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'period.timePicker.disabled()',
    '(click)': 'period.selectAM()',
  },
})
export class ScTimePickerPeriodAM {
  protected readonly period = inject(ScTimePickerPeriod);

  protected readonly class = computed(() =>
    cn(
      'rounded-md px-2 py-1.5 text-sm font-medium transition-colors',
      this.period.isAM()
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:bg-accent',
    ),
  );
}
