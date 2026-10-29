import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScGantt } from './gantt';

/**
 * A date marked down the timeline — today, a launch: a line through the rows
 * from the scale, your label at its top. Inside `scGanttScale`.
 *
 * ```html
 * <div scGanttMarker [date]="today">Today</div>
 * ```
 */
@Directive({
  selector: 'div[scGanttMarker]',
  host: {
    'data-slot': 'gantt-marker',
    '[style.inset-inline-start.px]': 'offset()',
    '[class]': 'class()',
  },
})
export class ScGanttMarker {
  private readonly gantt = inject(ScGantt);

  readonly date = input.required<Temporal.PlainDate>();
  readonly classInput = input<string>('', { alias: 'class' });

  /** The middle of its day. */
  protected readonly offset = computed(
    () => this.gantt.offset(this.date()) + this.gantt.dayWidthOrDefault() / 2,
  );

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute top-full -translate-x-1/2 rtl:translate-x-1/2',
      // The line, down the body.
      'before:bg-primary before:absolute before:start-1/2 before:top-0 before:h-(--sc-gantt-body-height) before:w-px',
      // The label, at its top.
      'bg-primary text-primary-foreground mt-0.5 rounded-sm px-1 text-[0.625rem] leading-4 font-medium whitespace-nowrap',
      this.classInput(),
    ),
  );
}
