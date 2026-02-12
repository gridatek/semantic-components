import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-stepper-title]',
  host: {
    'data-slot': 'stepper-title',
    '[class]': 'class()',
  },
})
export class ScStepperTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-sm font-medium', this.classInput()),
  );
}
