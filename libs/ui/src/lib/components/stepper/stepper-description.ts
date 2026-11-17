import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

@Directive({
  selector: '[scStepperDescription]',
  host: {
    '[class]': 'class()',
  },
})
export class ScStepperDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('text-xs text-muted-foreground', this.classInput()),
  );
}
