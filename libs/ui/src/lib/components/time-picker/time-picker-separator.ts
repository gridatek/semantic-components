import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scTimePickerSeparator]',
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
