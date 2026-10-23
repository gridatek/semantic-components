import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/**
 * A timeline: your ordered list of events (`li[scTimelineItem]`), each
 * with its marker, the line drawn between them. Down the side (`align`:
 * `start`, `end`) or both (`alternate`) — or across (`horizontal`).
 */
@Directive({
  selector: 'ol[scTimeline], ul[scTimeline]',
  host: {
    'data-slot': 'timeline',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-align]': 'align()',
    // Across, it scrolls sideways: reachable from the keyboard (name it).
    '[attr.tabindex]': 'orientation() === "horizontal" ? 0 : null',
    '[class]': 'class()',
  },
})
export class ScTimeline {
  readonly classInput = input<string>('', { alias: 'class' });

  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
  /** Where the content is, down the line: after it, before it, or in turn. */
  readonly align = input<'start' | 'end' | 'alternate'>('start');

  protected readonly class = computed(() =>
    cn(
      this.orientation() === 'horizontal'
        ? 'flex overflow-x-auto rounded-md pb-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/50'
        : // One grid: the items share its columns (subgrid), so the line is straight.
          [
            'grid',
            {
              start: 'grid-cols-[auto_auto_1fr]',
              end: 'grid-cols-[1fr_auto_auto]',
              alternate: 'grid-cols-[1fr_auto_1fr]',
            }[this.align()],
          ],
      this.classInput(),
    ),
  );
}
