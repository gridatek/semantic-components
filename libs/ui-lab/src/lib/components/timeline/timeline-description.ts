import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-timeline-description]',
  host: {
    'data-slot': 'timeline-description',
    '[class]': 'class()',
  },
})
export class ScTimelineDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-sm text-muted-foreground', this.classInput()),
  );
}
