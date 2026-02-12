import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-stepper-description]',
  host: {
    'data-slot': 'stepper-description',
    '[class]': 'class()',
  },
})
export class ScStepperDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-xs text-muted-foreground', this.classInput()),
  );
}
