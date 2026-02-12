import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-timeline-time]',
  host: {
    'data-slot': 'timeline-time',
    '[class]': 'class()',
  },
})
export class ScTimelineTime {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-xs text-muted-foreground', this.classInput()),
  );
}
