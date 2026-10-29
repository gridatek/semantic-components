import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScGantt } from './gantt';

/**
 * The timeline column's cells: as wide as the timeline, no padding. A body
 * cell holds a bar and draws a line at each column (a day, or a week from
 * Monday); the header cell holds the scale.
 *
 * ```html
 * <th scTableHeaderCell scGanttTimeline>…<div scGanttScale>…</div></th>
 * <td scTableCell scGanttTimeline><div scGanttBar …>…</div></td>
 * ```
 */
@Directive({
  selector: 'td[scGanttTimeline], th[scGanttTimeline]',
  host: {
    'data-slot': 'gantt-timeline',
    '[style.width.px]': 'gantt.width()',
    '[style.min-width.px]': 'gantt.width()',
    '[style.background-image]': 'lines()',
    '[style.background-position-x]': 'linesOffset()',
    '[class]': 'class()',
  },
})
export class ScGanttTimeline {
  protected readonly gantt = inject(ScGantt);
  private readonly header =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName === 'TH';

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly lines = computed(() => {
    const scale = this.gantt.scale();
    if (this.header || scale === 'month') return null;
    const period = this.gantt.dayWidthOrDefault() * (scale === 'week' ? 7 : 1);
    return `repeating-linear-gradient(to var(--sc-gantt-end), var(--border) 0 1px, transparent 1px ${period}px)`;
  });

  /** Weeks start on Monday: the lines start at the first one. */
  protected readonly linesOffset = computed(() => {
    if (this.header || this.gantt.scale() !== 'week') return null;
    const toMonday = (8 - this.gantt.from().dayOfWeek) % 7;
    return `var(--sc-gantt-start) ${toMonday * this.gantt.dayWidthOrDefault()}px`;
  });

  protected readonly class = computed(() =>
    cn(
      'relative p-0',
      // The timeline runs with the text: from the right in right-to-left.
      '[--sc-gantt-start:left] [--sc-gantt-end:right] rtl:[--sc-gantt-start:right] rtl:[--sc-gantt-end:left]',
      this.header ? 'align-bottom' : 'h-10',
      this.classInput(),
    ),
  );
}
