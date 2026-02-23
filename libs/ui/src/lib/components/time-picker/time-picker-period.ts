import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_TIME_PICKER } from './time-picker';

@Directive({
  selector: '[scTimePickerPeriod]',
  host: {
    'data-slot': 'time-picker-period',
    '[class]': 'class()',
    role: 'group',
    '[attr.aria-label]': '"Select AM or PM"',
  },
})
export class ScTimePickerPeriod {
  readonly timePicker = inject(SC_TIME_PICKER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'ml-2 inline-flex rounded-md border border-input bg-background p-0.5',
      this.classInput(),
    ),
  );

  readonly isAM = computed(() => {
    const val = this.timePicker.value();
    return val?.period === 'AM' || (!val?.period && (val?.hours ?? 0) < 12);
  });

  readonly isPM = computed(() => {
    const val = this.timePicker.value();
    return val?.period === 'PM' || (!val?.period && (val?.hours ?? 0) >= 12);
  });

  selectAM(): void {
    this.timePicker.setPeriod('AM');
    const val = this.timePicker.value();
    if (val && val.hours >= 12) {
      this.timePicker.setHours(val.hours - 12);
    }
  }

  selectPM(): void {
    this.timePicker.setPeriod('PM');
    const val = this.timePicker.value();
    if (val && val.hours < 12) {
      this.timePicker.setHours(val.hours + 12);
    }
  }
}
