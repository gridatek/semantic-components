import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/** The presets, in a column beside the calendar. Name it (`aria-label`). */
@Directive({
  selector: 'div[scDateRangePickerNextPresets]',
  host: {
    'data-slot': 'date-range-picker-presets',
    role: 'group',
    '[class]': 'class()',
  },
})
export class ScDateRangePickerNextPresets {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('flex min-w-36 flex-col gap-1 border-e p-3', this.classInput()),
  );
}
