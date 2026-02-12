import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-card-description]',
  host: {
    'data-slot': 'card-description',
    '[class]': 'class()',
  },
})
export class ScCardDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-sm text-muted-foreground', this.classInput()),
  );
}
