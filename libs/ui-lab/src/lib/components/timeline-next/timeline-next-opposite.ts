import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTimelineNext } from './timeline-next';

/** Across the line from the content — a date facing its event. Optional. */
@Directive({
  selector: '[scTimelineNextOpposite]',
  host: {
    'data-slot': 'timeline-opposite',
    '[class]': 'class()',
  },
})
export class ScTimelineNextOpposite {
  private readonly timeline = inject(ScTimelineNext);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => {
    if (this.timeline.orientation() === 'horizontal') {
      // Above the marker.
      return cn('text-muted-foreground order-first text-sm', this.classInput());
    }
    const side = {
      start: 'col-start-1 pe-4 text-end',
      end: 'col-start-3 ps-4',
      alternate:
        'col-start-1 pe-4 text-end group-even/item:col-start-3 group-even/item:pe-0 group-even/item:ps-4 group-even/item:text-start',
    }[this.timeline.align()];
    return cn(
      'text-muted-foreground row-start-1 pt-0.5 text-sm',
      side,
      this.classInput(),
    );
  });
}
