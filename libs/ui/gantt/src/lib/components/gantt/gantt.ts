import {
  Component,
  DestroyRef,
  ElementRef,
  LOCALE_ID,
  ViewEncapsulation,
  afterNextRender,
  booleanAttribute,
  computed,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  type ScGanttBarRef,
  type ScGanttScaleUnit,
  daysBetween,
} from './gantt-types';

/** A column's width, in px a day, for each scale. */
const DAY_WIDTH: Record<ScGanttScaleUnit, number> = {
  day: 32,
  week: 12,
  month: 4,
};

/**
 * A Gantt chart: a Data Table (a tree grid, usually) with a timeline column.
 * Wraps the table, scrolls it, and holds the dates the timeline shows, its
 * scale, and the bars — for their links and the keyboard: on a focused row,
 * Alt+←/→ moves its bar a day, Alt+Shift+←/→ moves its end, Alt+↑/↓ its
 * progress (10 points). Each change is announced; it is a proposal, the bar's
 * `(dateChange)` / `(progressChange)`, which your data applies.
 *
 * ```html
 * <div scGantt [from]="from" [to]="to" scale="day">
 *   <table scTable scDataTableTreeGrid [table]="table" aria-label="Plan">…</table>
 * </div>
 * ```
 */
@Component({
  selector: 'div[scGantt]',
  exportAs: 'scGantt',
  template: `
    <ng-content />
    <span role="status" class="sr-only empty:absolute">{{
      announcement()
    }}</span>
  `,
  host: {
    'data-slot': 'gantt',
    '[style.--sc-gantt-day-width.px]': 'dayWidthOrDefault()',
    '[style.--sc-gantt-body-height.px]': 'bodyHeight()',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScGantt {
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly locale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The timeline's first day. */
  readonly from = input.required<Temporal.PlainDate>();
  /** The timeline's last day. */
  readonly to = input.required<Temporal.PlainDate>();
  /** What a column of the scale stands for. */
  readonly scale = input<ScGanttScaleUnit>('day');
  /** px a day; by default 32 (day), 12 (week), 4 (month). */
  readonly dayWidth = input<number | undefined, unknown>(undefined, {
    transform: (value: unknown) =>
      value === undefined || value === null || value === ''
        ? undefined
        : numberAttribute(value),
  });
  /** Bars can't be moved, resized or have their progress changed. */
  readonly readonly = input(false, { transform: booleanAttribute });

  readonly dayWidthOrDefault = computed(
    () => this.dayWidth() ?? DAY_WIDTH[this.scale()],
  );
  /** Days the timeline shows. */
  readonly days = computed(() => daysBetween(this.from(), this.to()) + 1);
  /** The timeline's width, in px. */
  readonly width = computed(() => this.days() * this.dayWidthOrDefault());

  /** The table body's height: markers and links run down it. */
  readonly bodyHeight = signal(0);

  private readonly barsSignal = signal<readonly ScGanttBarRef[]>([]);
  readonly bars = this.barsSignal.asReadonly();

  protected readonly announcement = signal('');

  protected readonly class = computed(() =>
    cn('relative block w-full overflow-auto', this.classInput()),
  );

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const table = this.element.querySelector('table');
      if (!table) return;
      const observer = new ResizeObserver(() =>
        this.bodyHeight.set(table.tBodies[0]?.offsetHeight ?? 0),
      );
      observer.observe(table);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  register(bar: ScGanttBarRef): () => void {
    this.barsSignal.update((bars) => [...bars, bar]);
    return () =>
      this.barsSignal.update((bars) => bars.filter((b) => b !== bar));
  }

  /** A day's offset from the timeline's start, in px. */
  offset(date: Temporal.PlainDate): number {
    return daysBetween(this.from(), date) * this.dayWidthOrDefault();
  }

  /** "3 – 14 Nov 2026", in the page's locale: a bar's dates, read out. */
  rangeText(start: Temporal.PlainDate, end: Temporal.PlainDate): string {
    const format = new Intl.DateTimeFormat(this.locale, {
      dateStyle: 'medium',
    });
    return Temporal.PlainDate.compare(start, end) === 0
      ? format.format(start)
      : format.formatRange(start, end);
  }

  /** "60 %", in the page's locale. */
  percentText(progress: number): string {
    return new Intl.NumberFormat(this.locale, { style: 'percent' }).format(
      progress / 100,
    );
  }

  announce(text: string): void {
    // The same text twice is still read: clear it first.
    this.announcement.set('');
    queueMicrotask(() => this.announcement.set(text));
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (!event.altKey || event.ctrlKey || event.metaKey || this.readonly())
      return;
    const row = (event.target as HTMLElement).closest('tr');
    const bar = row && this.bars().find((b) => b.row === row);
    if (!bar) return;
    const rtl = getComputedStyle(this.element).direction === 'rtl';
    const forward = rtl ? 'ArrowLeft' : 'ArrowRight';
    const back = rtl ? 'ArrowRight' : 'ArrowLeft';
    switch (event.key) {
      case forward:
      case back:
        bar.step(
          event.shiftKey ? 'resize' : 'shift',
          event.key === forward ? 1 : -1,
        );
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        bar.step('progress', event.key === 'ArrowUp' ? 10 : -10);
        break;
      default:
        return;
    }
    // Alt+← is the browser's Back too.
    event.preventDefault();
  }
}
