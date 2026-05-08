import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scStepperTitle]',
  host: {
    '[class]': 'class()',
  },
})
export class ScStepperTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-sm font-medium', this.classInput()),
  );
}
