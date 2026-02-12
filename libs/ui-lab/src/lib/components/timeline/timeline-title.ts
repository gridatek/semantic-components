import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-timeline-title]',
  host: {
    'data-slot': 'timeline-title',
    '[class]': 'class()',
  },
})
export class ScTimelineTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('font-medium leading-none', this.classInput()),
  );
}
