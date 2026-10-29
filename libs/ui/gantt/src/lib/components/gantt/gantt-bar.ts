import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScDataTableRow } from '@semantic-components/ui/data-table';
import { ScGantt } from './gantt';
import {
  type ScGanttBarRef,
  type ScGanttDates,
  daysBetween,
} from './gantt-types';

/** What a drag changes: the whole bar, one of its ends, or its progress. */
type ScGanttDragMode = 'move' | 'start' | 'end' | 'progress';

interface ScGanttDrag {
  readonly mode: ScGanttDragMode;
  readonly originX: number;
  readonly rtl: boolean;
  readonly startDays: number;
  readonly endDays: number;
  readonly progress: number | undefined;
}

/**
 * A row's bar, in its timeline cell: from `start` to `end` (both days
 * included), its `progress` filled in, your label inside. A row with children
 * is a summary (a bracket, set from its children's dates by you); a
 * `milestone` is a diamond on its `start`. Its dates are read out with the
 * row ("3 – 14 Nov 2026, 60 %"), in the page's locale.
 *
 * Unless the Gantt is `readonly`, a task is dragged (moved), its ends dragged
 * (resized) and its progress handle dragged, a day at a time — or changed from
 * the keyboard on its row (see `scGantt`). It doesn't change itself: it
 * proposes, `(dateChange)` and `(progressChange)`, and your data follows.
 *
 * ```html
 * <div scGanttBar [id]="task.id" [start]="task.start" [end]="task.end"
 *      [progress]="task.progress" [dependencies]="task.dependsOn"
 *      (dateChange)="move(task, $event)">{{ task.name }}</div>
 * ```
 */
@Component({
  selector: 'div[scGanttBar]',
  template: `
    @if (kind() === 'task' && progress() !== undefined) {
      <span
        aria-hidden="true"
        data-slot="gantt-bar-progress"
        class="bg-primary/35 pointer-events-none absolute inset-y-0 start-0 rounded-s-[inherit]"
        [style.width.%]="shownProgress()"
      ></span>
    }
    <span data-slot="gantt-bar-label" [class]="labelClass()" aria-hidden="true"
      ><ng-content
    /></span>
    <span class="sr-only">{{ text() }}</span>
    @if (editable() && kind() === 'task') {
      <span
        aria-hidden="true"
        data-handle="start"
        class="absolute inset-y-0 -start-1 w-2.5 cursor-ew-resize"
      ></span>
      <span
        aria-hidden="true"
        data-handle="end"
        class="absolute inset-y-0 -end-1 w-2.5 cursor-ew-resize"
      ></span>
      @if (progress() !== undefined) {
        <span
          aria-hidden="true"
          data-handle="progress"
          class="border-b-primary absolute top-full size-0 -translate-x-1/2 -translate-y-1.5 cursor-ew-resize border-x-[5px] border-b-[6px] border-x-transparent opacity-0 transition-opacity group-hover/gantt-bar:opacity-100 rtl:translate-x-1/2"
          [style.inset-inline-start.%]="shownProgress()"
        ></span>
      }
    }
  `,
  host: {
    'data-slot': 'gantt-bar',
    '[attr.data-kind]': 'kind()',
    '[attr.data-dragging]': 'drag() ? "" : null',
    '[style.inset-inline-start.px]': 'x()',
    '[style.width.px]': 'width()',
    '[class]': 'class()',
    '(pointerdown)': 'onPointerdown($event)',
    '(pointermove)': 'onPointermove($event)',
    '(pointerup)': 'onPointerup()',
    '(pointercancel)': 'drag.set(null)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScGanttBar implements ScGanttBarRef {
  private readonly gantt = inject(ScGantt);
  private readonly dataTableRow = inject(ScDataTableRow, { optional: true });
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The bar's name, for links: another bar's `dependencies` name it. */
  readonly id = input<string>();
  readonly start = input.required<Temporal.PlainDate>();
  /** Its last day (included). */
  readonly end = input.required<Temporal.PlainDate>();
  /** Done, from 0 to 100. */
  readonly progress = input<number>();
  /** The bars it follows: an arrow from each one's end to its start. */
  readonly dependencies = input<readonly string[]>([]);
  /** A point in time: a diamond on `start`. */
  readonly milestone = input(false, { transform: booleanAttribute });

  /** New dates, proposed: apply them to your data. */
  readonly dateChange = output<ScGanttDates>();
  /** A new progress, proposed. */
  readonly progressChange = output<number>();

  protected readonly drag = signal<ScGanttDrag | null>(null);

  protected readonly kind = computed(() =>
    this.dataTableRow?.row()?.getCanExpand?.()
      ? 'summary'
      : this.milestone()
        ? 'milestone'
        : 'task',
  );

  protected readonly editable = computed(
    () => !this.gantt.readonly() && this.kind() !== 'summary',
  );

  private readonly shownStart = computed(() =>
    this.start().add({ days: this.drag()?.startDays ?? 0 }),
  );
  private readonly shownEnd = computed(() =>
    this.milestone()
      ? this.shownStart()
      : this.end().add({ days: this.drag()?.endDays ?? 0 }),
  );
  protected readonly shownProgress = computed(
    () => this.drag()?.progress ?? this.progress() ?? 0,
  );

  readonly x = computed(() => this.gantt.offset(this.shownStart()));
  readonly width = computed(
    () =>
      (daysBetween(this.shownStart(), this.shownEnd()) + 1) *
      this.gantt.dayWidthOrDefault(),
  );

  /** Its dates and progress, read out with its row. */
  protected readonly text = computed(() => {
    const progress = this.progress();
    const range = this.gantt.rangeText(
      this.start(),
      this.milestone() ? this.start() : this.end(),
    );
    return progress === undefined
      ? range
      : `${range}, ${this.gantt.percentText(progress)}`;
  });

  get row(): HTMLElement | null {
    return this.element.closest('tr');
  }

  protected readonly class = computed(() =>
    cn(
      'group/gantt-bar absolute top-1/2 flex -translate-y-1/2 items-center text-xs select-none touch-none',
      this.editable() && 'cursor-grab data-dragging:cursor-grabbing',
      this.kind() === 'task' &&
        'bg-primary/10 border-primary/60 text-foreground h-6 rounded-md border px-2',
      this.kind() === 'summary' &&
        'bg-foreground/80 h-2 rounded-xs before:bg-foreground/80 after:bg-foreground/80 before:absolute before:start-0 before:top-full before:h-1.5 before:w-1.5 after:absolute after:end-0 after:top-full after:h-1.5 after:w-1.5',
      this.kind() === 'milestone' &&
        'h-6 justify-center before:bg-foreground before:size-3 before:rotate-45 before:rounded-[2px]',
      this.classInput(),
    ),
  );

  protected readonly labelClass = computed(() =>
    cn(
      'relative truncate',
      // A summary's and a milestone's label follow them.
      this.kind() !== 'task' &&
        'text-muted-foreground absolute start-full ms-2 overflow-visible',
    ),
  );

  constructor() {
    const unregister = this.gantt.register(this);
    inject(DestroyRef).onDestroy(unregister);
  }

  step(kind: 'shift' | 'resize' | 'progress', amount: number): void {
    if (!this.editable()) return;
    if (kind === 'progress') {
      const progress = this.progress();
      if (progress === undefined || this.kind() !== 'task') return;
      this.proposeProgress(Math.min(100, Math.max(0, progress + amount)));
      return;
    }
    const start = this.start();
    const end = this.milestone() ? start : this.end();
    if (kind === 'shift')
      this.proposeDates(start.add({ days: amount }), end.add({ days: amount }));
    else if (!this.milestone() && daysBetween(start, end) + amount >= 0)
      this.proposeDates(start, end.add({ days: amount }));
  }

  protected onPointerdown(event: PointerEvent): void {
    if (!this.editable() || event.button !== 0) return;
    const handle = (event.target as HTMLElement)
      .closest<HTMLElement>('[data-handle]')
      ?.getAttribute('data-handle') as ScGanttDragMode | undefined;
    this.element.setPointerCapture(event.pointerId);
    this.drag.set({
      mode: this.kind() === 'milestone' ? 'move' : (handle ?? 'move'),
      originX: event.clientX,
      rtl: getComputedStyle(this.element).direction === 'rtl',
      startDays: 0,
      endDays: 0,
      progress: undefined,
    });
  }

  protected onPointermove(event: PointerEvent): void {
    const drag = this.drag();
    if (!drag) return;
    const dx = (event.clientX - drag.originX) * (drag.rtl ? -1 : 1);
    const days = Math.round(dx / this.gantt.dayWidthOrDefault());
    const length = daysBetween(this.start(), this.end());
    switch (drag.mode) {
      case 'move':
        this.drag.set({ ...drag, startDays: days, endDays: days });
        break;
      case 'start':
        this.drag.set({ ...drag, startDays: Math.min(days, length) });
        break;
      case 'end':
        this.drag.set({ ...drag, endDays: Math.max(days, -length) });
        break;
      case 'progress': {
        const rect = this.element.getBoundingClientRect();
        const along = drag.rtl
          ? rect.right - event.clientX
          : event.clientX - rect.left;
        // By 5 points: a pixel either side lands on the same value.
        const progress = Math.round((along / rect.width) * 20) * 5;
        this.drag.set({
          ...drag,
          progress: Math.min(100, Math.max(0, progress)),
        });
        break;
      }
    }
  }

  protected onPointerup(): void {
    const drag = this.drag();
    if (!drag) return;
    this.drag.set(null);
    if (drag.mode === 'progress') {
      if (drag.progress !== undefined && drag.progress !== this.progress())
        this.proposeProgress(drag.progress);
    } else if (drag.startDays !== 0 || drag.endDays !== 0) {
      const start = this.start().add({ days: drag.startDays });
      this.proposeDates(
        start,
        this.milestone() ? start : this.end().add({ days: drag.endDays }),
      );
    }
  }

  private proposeDates(start: Temporal.PlainDate, end: Temporal.PlainDate) {
    this.dateChange.emit({ start, end });
    this.gantt.announce(this.gantt.rangeText(start, end));
  }

  private proposeProgress(progress: number) {
    this.progressChange.emit(progress);
    this.gantt.announce(this.gantt.percentText(progress));
  }
}
