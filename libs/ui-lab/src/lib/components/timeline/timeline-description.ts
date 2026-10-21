import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** An event's text. */
@Directive({
  selector: '[scTimelineDescription]',
  host: {
    'data-slot': 'timeline-description',
    '[class]': 'class()',
  },
})
export class ScTimelineDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground text-sm', this.classInput()),
  );
}
