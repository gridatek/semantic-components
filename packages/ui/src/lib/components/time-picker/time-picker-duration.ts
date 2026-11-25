import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScTimePicker } from './time-picker';

/**
 * How long from the picker's `startTime` to its value, in the locale's words
 * (`Intl.DurationFormat`: "1 hr, 30 min") — said as it changes. Empty
 * without a start, or before it.
 */
@Directive({
  selector: '[scTimePickerDuration]',
  host: {
    'data-slot': 'time-picker-duration',
    'aria-live': 'polite',
    '[textContent]': 'picker.duration()',
    '[class]': 'class()',
  },
})
export class ScTimePickerDuration {
  private readonly picker = inject(ScTimePicker);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('text-muted-foreground text-sm tabular-nums', this.classInput()),
  );
}
