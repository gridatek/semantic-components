import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from '../../utils';
import { SC_TIME_PICKER } from './time-picker';

@Directive({
  selector: 'input[scTimePickerInput]',
  host: {
    'data-slot': 'time-picker-input',
    type: 'text',
    inputmode: 'numeric',
    '[class]': 'class()',
    '[disabled]': 'timePicker.disabled()',
  },
})
export class ScTimePickerInput {
  readonly timePicker = inject(SC_TIME_PICKER);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly focused = signal(false);

  protected readonly class = computed(() =>
    cn(
      'w-10 rounded-md border border-input bg-background px-2 py-1.5 text-center text-sm tabular-nums',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );
}
