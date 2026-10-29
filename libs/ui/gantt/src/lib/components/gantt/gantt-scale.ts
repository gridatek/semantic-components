import {
  Component,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScGantt } from './gantt';
import { daysBetween } from './gantt-types';

/** A stretch of the scale: its label and how many days it covers. */
interface ScGanttScaleSpan {
  readonly key: string;
  readonly label: string;
  readonly days: number;
}

/**
 * The timeline's scale, in its header cell: two lines — months over days or
 * weeks, years over months — in the page's locale. Seen, not read: give the
 * header cell a name (`sr-only`). Markers and links go inside it: it is where
 * the timeline starts.
 *
 * ```html
 * <th scTableHeaderCell scGanttTimeline>
 *   <span class="sr-only">Timeline</span>
 *   <div scGanttScale>
 *     <svg scGanttLinks></svg>
 *     <div scGanttMarker [date]="today">Today</div>
 *   </div>
 * </th>
 * ```
 */
@Component({
  selector: 'div[scGanttScale]',
  template: `
    <div aria-hidden="true" class="flex border-b">
      @for (span of upper(); track span.key) {
        <div
          class="text-foreground truncate border-e px-1.5 py-1 text-xs font-medium"
          [style.width.px]="span.days * gantt.dayWidthOrDefault()"
        >
          {{ span.label }}
        </div>
      }
    </div>
    <div aria-hidden="true" class="flex">
      @for (span of lower(); track span.key) {
        <div
          class="text-muted-foreground truncate border-e py-1 text-center text-xs font-normal"
          [style.width.px]="span.days * gantt.dayWidthOrDefault()"
        >
          {{ span.label }}
        </div>
      }
    </div>
    <ng-content />
  `,
  host: {
    'data-slot': 'gantt-scale',
    '[style.width.px]': 'gantt.width()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScGanttScale {
  protected readonly gantt = inject(ScGantt);
  private readonly locale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });

  /** Months (years, on a month scale). */
  protected readonly upper = computed(() =>
    this.gantt.scale() === 'month'
      ? this.spans(
          (date) => date.with({ month: 1, day: 1 }).add({ years: 1 }),
          {
            year: 'numeric',
          },
        )
      : this.spans((date) => date.with({ day: 1 }).add({ months: 1 }), {
          month: 'short',
          year: 'numeric',
        }),
  );

  /** Days, weeks (from Monday, by their first day) or months. */
  protected readonly lower = computed(() => {
    switch (this.gantt.scale()) {
      case 'day':
        return this.spans((date) => date.add({ days: 1 }), { day: 'numeric' });
      case 'week':
        return this.spans(
          (date) => date.add({ days: 8 - date.dayOfWeek }),
          { day: 'numeric', month: 'numeric' },
          (start, days) => days >= 4 || start.dayOfWeek === 1,
        );
      case 'month':
        return this.spans((date) => date.with({ day: 1 }).add({ months: 1 }), {
          month: 'short',
        });
    }
  });

  protected readonly class = computed(() =>
    cn('relative flex flex-col', this.classInput()),
  );

  /** The timeline cut where `next` says, each piece labelled by its first day. */
  private spans(
    next: (date: Temporal.PlainDate) => Temporal.PlainDate,
    format: Intl.DateTimeFormatOptions,
    labelled: (start: Temporal.PlainDate, days: number) => boolean = () => true,
  ): ScGanttScaleSpan[] {
    const to = this.gantt.to();
    const spans: ScGanttScaleSpan[] = [];
    let start = this.gantt.from();
    while (Temporal.PlainDate.compare(start, to) <= 0) {
      const after = next(start);
      const end =
        Temporal.PlainDate.compare(after, to) > 0 ? to.add({ days: 1 }) : after;
      const days = daysBetween(start, end);
      spans.push({
        key: start.toString(),
        // A piece too short for its label (a month's first days) goes without.
        label:
          labelled(start, days) && days * this.gantt.dayWidthOrDefault() >= 24
            ? start.toLocaleString(this.locale, format)
            : '',
        days,
      });
      start = end;
    }
    return spans;
  }
}
