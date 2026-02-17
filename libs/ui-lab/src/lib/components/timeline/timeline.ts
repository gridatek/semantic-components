import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scTimeline]',
  host: {
    'data-slot': 'timeline',
    '[class]': 'class()',
  },
})
export class ScTimeline {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('relative space-y-0', this.classInput()),
  );
}
