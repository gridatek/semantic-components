import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

@Directive({
  selector: '[scStepperDescription]',
  host: {
    '[class]': 'class()',
  },
})
export class ScStepperDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-xs text-muted-foreground', this.classInput()),
  );
}
