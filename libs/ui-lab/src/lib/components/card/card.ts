import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-card]',
  host: {
    'data-slot': 'card',
    '[class]': 'class()',
  },
})
export class ScCard {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      this.classInput(),
    ),
  );
}
