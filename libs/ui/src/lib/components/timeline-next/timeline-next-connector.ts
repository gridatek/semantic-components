import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScTimelineNextItem } from './timeline-next-item';

/**
 * The line from the event's marker to the next one: down (vertical) or
 * across (horizontal), in the primary colour after a complete event. None
 * after the last event. Hidden from screen readers.
 */
@Directive({
  selector: '[scTimelineNextConnector]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScTimelineNextConnector {
  private readonly item = inject(ScTimelineNextItem);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      'absolute',
      this.item.vertical()
        ? // Under the marker, to the event's end (its gap included).
          'start-[calc(var(--sc-timeline-marker)/2-0.5px)] top-[calc(max(0px,(1.25rem-var(--sc-timeline-marker))/2)+var(--sc-timeline-marker)+0.25rem)] -bottom-1 w-px'
        : // After the marker, to the next one.
          'start-[calc(var(--sc-timeline-marker)+0.25rem)] -end-1 top-[calc(var(--sc-timeline-marker)/2-0.5px)] h-px',
      this.item.status() === 'complete' ? 'bg-primary' : 'bg-border',
      this.item.isLast() && 'hidden',
      this.classInput(),
    ),
  );
}
