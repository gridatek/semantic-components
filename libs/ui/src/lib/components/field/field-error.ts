import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-field-error]',
  host: {
    role: 'alert',
    'data-slot': 'field-error',
    '[class]': 'class()',
  },
})
export class ScFieldError {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-destructive text-sm font-normal', this.classInput()),
  );
}
