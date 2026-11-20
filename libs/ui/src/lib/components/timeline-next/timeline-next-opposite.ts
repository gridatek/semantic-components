import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScTimelineNextItem } from './timeline-next-item';

/**
 * Across the line from the event's content — a date, a year, a label. In a
 * vertical timeline, on the other side of the line (the line stays straight,
 * whatever its width); across, above the content.
 */
@Directive({
  selector: '[scTimelineNextOpposite]',
  host: {
    '[class]': 'class()',
  },
})
export class ScTimelineNextOpposite {
  private readonly item = inject(ScTimelineNextItem);
  private readonly styles = injectStyle().timeline;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => {
    const alignment = this.item.timeline.alignment();
    return cn(
      'block',
      this.styles.time,
      this.item.vertical()
        ? cn(
            'row-start-1! leading-(--sc-timeline-line)',
            this.item.side() === 'after'
              ? cn('col-start-1! text-end', alignment === 'start' && 'pe-3')
              : cn('col-start-3! text-start', alignment === 'end' && 'ps-3'),
          )
        : 'order-first',
      this.classInput(),
    );
  });
}
