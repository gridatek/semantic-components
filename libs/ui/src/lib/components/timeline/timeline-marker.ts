import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScTimelineItem } from './timeline-item';

/**
 * The event's dot on the line — or your icon in it. Filled when complete
 * (or with no status), ringed when current, muted when upcoming, in the
 * destructive colour when failed. Hidden from screen readers: say the
 * status in words too. Its size is the timeline's `--sc-timeline-marker`
 * (0.75rem; larger for an icon).
 */
@Directive({
  selector: '[scTimelineMarker]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScTimelineMarker {
  private readonly item = inject(ScTimelineItem);
  private readonly styles = injectStyle().timeline;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => {
    const status = this.item.status();
    const alignment = this.item.timeline.alignment();
    return cn(
      'flex size-(--sc-timeline-marker) items-center justify-center',
      this.styles.marker,
      '[&_svg]:size-[calc(var(--sc-timeline-marker)*0.6)] [&_svg]:shrink-0',
      this.item.vertical()
        ? cn(
            // In the line's column, level with the title's first line.
            'col-start-2! row-start-1! mt-[max(0px,calc((var(--sc-timeline-line)-var(--sc-timeline-marker))/2))] self-start',
            alignment === 'start'
              ? 'justify-self-start'
              : alignment === 'end'
                ? 'justify-self-end'
                : 'justify-self-center',
          )
        : 'absolute start-0 top-0',
      status === 'current'
        ? cn('bg-background ring-primary ring-inset', this.styles.markerRing)
        : status === 'upcoming'
          ? 'bg-muted ring-border ring-1 ring-inset'
          : status === 'failed'
            ? 'bg-destructive text-white'
            : 'bg-primary text-primary-foreground',
      this.classInput(),
    );
  });
}
