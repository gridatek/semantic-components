import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScTimelineNextItem } from './timeline-next-item';

/**
 * The event's dot on the line — or your icon in it. Filled when complete
 * (or with no status), ringed when current, muted when upcoming. Hidden from
 * screen readers: say the status in words too. Its size is the timeline's
 * `--sc-timeline-marker` (0.75rem; larger for an icon).
 */
@Directive({
  selector: '[scTimelineNextMarker]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScTimelineNextMarker {
  private readonly item = inject(ScTimelineNextItem);
  private readonly styles = injectStyle().timeline;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => {
    const status = this.item.status();
    return cn(
      'absolute start-0 flex size-(--sc-timeline-marker) items-center justify-center',
      this.styles.marker,
      '[&_svg]:size-[calc(var(--sc-timeline-marker)*0.6)] [&_svg]:shrink-0',
      // Level with the title's first line (--sc-timeline-line), or at the top.
      this.item.vertical()
        ? 'top-[max(0px,calc((var(--sc-timeline-line)-var(--sc-timeline-marker))/2))]'
        : 'top-0',
      status === 'current'
        ? cn('bg-background ring-primary ring-inset', this.styles.markerRing)
        : status === 'upcoming'
          ? 'bg-muted ring-border ring-1 ring-inset'
          : 'bg-primary text-primary-foreground',
      this.classInput(),
    );
  });
}
