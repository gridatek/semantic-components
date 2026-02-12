import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-card-footer]',
  host: {
    'data-slot': 'card-footer',
    '[class]': 'class()',
  },
})
export class ScCardFooter {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center p-6 pt-0', this.classInput()),
  );
}
