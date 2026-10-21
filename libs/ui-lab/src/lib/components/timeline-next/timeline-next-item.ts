import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTimelineNext } from './timeline-next';

/** Where an event stands: past, now, to come. */
export type ScTimelineStatus = 'done' | 'current' | 'upcoming';

/**
 * An event: your `li` — its marker, its content, and across the line, if you
 * like, its opposite. `status`: the current one is `aria-current="step"`;
 * say the status in words if it matters ("Delivered").
 */
@Directive({
  selector: 'li[scTimelineNextItem]',
  host: {
    'data-slot': 'timeline-item',
    '[attr.data-status]': 'status()',
    '[attr.aria-current]': 'status() === "current" ? "step" : null',
    '[class]': 'class()',
  },
})
export class ScTimelineNextItem {
  protected readonly timeline = inject(ScTimelineNext);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly status = input<ScTimelineStatus>('done');

  protected readonly class = computed(() => {
    if (this.timeline.orientation() === 'horizontal') {
      return cn(
        'group/item flex min-w-44 flex-1 flex-col gap-2 pe-4 last:pe-0',
        this.classInput(),
      );
    }
    return cn(
      'group/item col-span-full grid grid-cols-subgrid pb-8 last:pb-0',
      this.classInput(),
    );
  });
}
