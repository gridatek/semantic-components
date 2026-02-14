import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-card-title]',
  host: {
    'data-slot': 'card-title',
    '[class]': 'class()',
  },
})
export class ScCardTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-base leading-snug font-medium group-data-[size=sm]/card:text-sm',
      this.classInput(),
    ),
  );
}
