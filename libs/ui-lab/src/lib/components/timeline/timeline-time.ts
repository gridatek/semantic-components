import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scTimelineTime]',
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
