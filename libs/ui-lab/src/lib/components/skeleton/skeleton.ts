import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-skeleton]',
  host: {
    'data-slot': 'skeleton',
    '[class]': 'class()',
  },
})
export class ScSkeleton {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('animate-pulse rounded-md bg-muted', this.classInput()),
  );
}
