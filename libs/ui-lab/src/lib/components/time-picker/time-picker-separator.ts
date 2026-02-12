import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

// ============================================================================
// TimePickerSeparator
// ============================================================================
@Directive({
  selector: '[sc-time-picker-separator]',
  host: {
    'data-slot': 'time-picker-separator',
    '[class]': 'class()',
  },
})
export class ScTimePickerSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-lg font-medium text-muted-foreground', this.classInput()),
  );
}
