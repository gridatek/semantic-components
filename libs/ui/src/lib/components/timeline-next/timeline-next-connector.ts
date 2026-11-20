import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
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
  private readonly styles = injectStyle().timeline;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => {
    const alignment = this.item.timeline.alignment();
    return cn(
      'absolute',
      this.item.vertical()
        ? cn(
            // In the line's column (both lines: an absolute part's auto end is the edge), under the marker, to the event's end (its gap included).
            'col-[2/3]! top-[calc(max(0px,(var(--sc-timeline-line)-var(--sc-timeline-marker))/2)+var(--sc-timeline-marker)+0.25rem)] -bottom-1 w-px',
            alignment === 'start'
              ? 'start-[calc(var(--sc-timeline-marker)/2-0.5px)]'
              : alignment === 'end'
                ? 'end-[calc(var(--sc-timeline-marker)/2-0.5px)]'
                : 'start-[calc(50%-0.5px)]',
          )
        : // After the marker, to the next one.
          'start-[calc(var(--sc-timeline-marker)+0.25rem)] -end-1 top-[calc(var(--sc-timeline-marker)/2-0.5px)] h-px',
      this.item.status() === 'complete' ? 'bg-primary' : this.styles.connector,
      this.item.isLast() && 'hidden',
      this.classInput(),
    );
  });
}
