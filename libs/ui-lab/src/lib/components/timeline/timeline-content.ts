import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTimeline } from './timeline';

/** An event's content — yours: a title, text, a time. On its side of the line. */
@Directive({
  selector: '[scTimelineContent]',
  host: {
    'data-slot': 'timeline-content',
    '[class]': 'class()',
  },
})
export class ScTimelineContent {
  private readonly timeline = inject(ScTimeline);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => {
    if (this.timeline.orientation() === 'horizontal') {
      return cn('min-w-0 space-y-1 pe-2', this.classInput());
    }
    const side = {
      start: 'col-start-3 ps-4',
      end: 'col-start-1 pe-4 text-end',
      alternate:
        'col-start-3 ps-4 group-even/item:col-start-1 group-even/item:ps-0 group-even/item:pe-4 group-even/item:text-end',
    }[this.timeline.align()];
    return cn('row-start-1 min-w-0 space-y-1', side, this.classInput());
  });
}
