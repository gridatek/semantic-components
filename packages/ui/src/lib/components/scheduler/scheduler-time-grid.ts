import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  Injector,
  LOCALE_ID,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScScheduler } from './scheduler';
import { ScSchedulerDayPointer } from './scheduler-day-pointer';
import { eventsOn, layoutRow, placeTimed } from './scheduler-layout';
import { schedulerEventInjector } from './scheduler-types';

/** A time range in one of the columns, in minutes from midnight. */
interface ScSchedulerTimeRange {
  readonly column: number;
  readonly from: number;
  readonly to: number;
}

/**
 * Week and day: a column per day, the all-day row (bars across their days),
 * events by time — overlapping ones side by side — and now. `editable`: an
 * event dragged moves (by `slotMinutes`, to another day too), dragged by its
 * bottom edge ends sooner or later. `pickable`: a time dragged over (or
 * clicked) is picked; with the keyboard, in the hours, ↑ ↓ move a slot, ← →
 * a day, Shift with ↑ ↓ makes it longer or shorter, Enter picks it.
 */
@Component({
  selector: 'div[scSchedulerTimeGrid]',
  imports: [NgTemplateOutlet],
  template: `
    <!-- The same scrollbar gutter as the hours below, so the columns line up. -->
    <div class="flex [scrollbar-gutter:stable] overflow-y-hidden border-b">
      <div class="w-14 shrink-0" aria-hidden="true"></div>
      <div
        class="grid flex-1"
        [style.grid-template-columns]="columnsTemplate()"
      >
        @for (column of columns(); track column.key) {
          <div
            class="flex flex-col items-center gap-0.5 py-2"
            [class.border-e]="!$last"
          >
            <span class="text-muted-foreground text-xs font-medium">
              {{ column.weekday }}
            </span>
            @if (columns().length > 1) {
              <button
                type="button"
                [class]="column.number"
                [attr.aria-label]="column.label"
                [attr.aria-current]="column.today ? 'date' : null"
                (click)="scheduler.goTo(column.day, 'day')"
              >
                {{ column.day.day }}
              </button>
            } @else {
              <span
                [class]="column.number"
                [attr.aria-current]="column.today ? 'date' : null"
                >{{ column.day.day }}</span
              >
            }
          </div>
        }
      </div>
    </div>

    @if (allDay().segments.length || scheduler.pickable()) {
      <div
        class="flex [scrollbar-gutter:stable] overflow-y-hidden border-b"
        (pointerdown)="dayPointer.down($event)"
        (pointermove)="dayPointer.move($event)"
        (pointerup)="dayPointer.up()"
        (pointercancel)="dayPointer.cancel()"
      >
        <div class="w-14 shrink-0" aria-hidden="true"></div>
        <div
          class="grid min-h-8 flex-1 py-0.5"
          [style.grid-template-columns]="columnsTemplate()"
          [style.grid-template-rows]="allDayRows()"
        >
          @for (column of columns(); track column.key) {
            <div
              aria-hidden="true"
              [class]="column.background"
              [style.grid-column]="$index + 1"
              [attr.data-day]="column.key"
            ></div>
          }
          @for (column of columns(); track column.key) {
            <ul class="contents" [attr.aria-label]="column.label">
              @for (item of column.allDay; track item.key) {
                <li
                  class="flex min-w-0 px-0.5 py-px"
                  [style.grid-column]="item.column"
                  [style.grid-row]="item.row"
                >
                  <ng-container
                    [ngTemplateOutlet]="template()"
                    [ngTemplateOutletContext]="item.context"
                    [ngTemplateOutletInjector]="item.injector"
                  />
                </li>
              }
            </ul>
          }
        </div>
      </div>
    }

    <div
      #body
      class="focus-visible:ring-ring/50 relative min-h-0 flex-1 [scrollbar-gutter:stable] overflow-y-auto outline-none focus-visible:ring-3 focus-visible:ring-inset"
      tabindex="0"
      [attr.aria-label]="scheduler.label()"
      (keydown)="onKeydown($event)"
      (focus)="onFocus($event)"
      (blur)="focused.set(false)"
      (pointerdown)="onPointerDown($event)"
      (pointermove)="onPointerMove($event)"
      (pointerup)="onPointerUp()"
      (pointercancel)="cancel()"
    >
      <div
        class="flex"
        [style.height]="
          'calc(var(--sc-scheduler-hour-height) * ' + hours().length + ')'
        "
      >
        <div class="relative w-14 shrink-0" aria-hidden="true">
          @for (hour of hours(); track hour.value; let first = $first) {
            <div class="relative h-(--sc-scheduler-hour-height)">
              @if (!first) {
                <span
                  class="text-muted-foreground absolute end-2 -top-2 text-[0.7rem] tabular-nums"
                  >{{ hour.label }}</span
                >
              }
            </div>
          }
        </div>
        <div
          #grid
          class="grid flex-1"
          [style.grid-template-columns]="columnsTemplate()"
        >
          @for (column of columns(); track column.key; let i = $index) {
            <div
              role="group"
              class="relative"
              [class.border-e]="!$last"
              [attr.aria-label]="column.label"
            >
              @for (hour of hours(); track hour.value) {
                <div
                  class="h-(--sc-scheduler-hour-height) border-b border-dashed last:border-b-0"
                  aria-hidden="true"
                ></div>
              }
              @for (item of column.timed; track item.key) {
                <div
                  class="absolute p-px"
                  [style.top.%]="item.placement.top"
                  [style.height.%]="item.placement.height"
                  [style.inset-inline-start.%]="item.placement.left"
                  [style.width.%]="item.placement.width"
                >
                  <ng-container
                    [ngTemplateOutlet]="template()"
                    [ngTemplateOutletContext]="item.context"
                    [ngTemplateOutletInjector]="item.injector"
                  />
                </div>
              }
              @if (shownRange(); as range) {
                @if (range.column === i) {
                  <div
                    aria-hidden="true"
                    class="bg-primary/10 ring-primary pointer-events-none absolute inset-x-0 z-10 ring-2 ring-inset"
                    [class]="style.scheduler.event"
                    [style.top.%]="percent(range.from)"
                    [style.height.%]="percent(range.to) - percent(range.from)"
                  ></div>
                }
              }
              @if (column.today && nowTop() !== null) {
                <div
                  class="bg-destructive before:bg-destructive pointer-events-none absolute inset-x-0 z-10 h-0.5 before:absolute before:-start-1 before:-top-1 before:size-2.5 before:rounded-full"
                  [style.top.%]="nowTop()"
                  aria-hidden="true"
                ></div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSchedulerTimeGrid {
  private readonly scheduler = inject(ScScheduler);
  private readonly injector = inject(Injector);
  private readonly locale = inject(LOCALE_ID);
  private readonly announcer = inject(LiveAnnouncer);
  private readonly direction = inject(Directionality).valueSignal;
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly style = injectStyle();
  private readonly body = viewChild.required<ElementRef<HTMLElement>>('body');
  private readonly grid = viewChild.required<ElementRef<HTMLElement>>('grid');
  private readonly dayPointer = new ScSchedulerDayPointer(
    this.scheduler,
    this.host,
  );

  readonly classInput = input<string>('', { alias: 'class' });
  /** The first hour shown (0–23). */
  readonly startHour = input<number>(0);
  /** The hour it ends at (1–24). */
  readonly endHour = input<number>(24);
  /** Scrolled to on first render. */
  readonly scrollToHour = input<number>(8);

  private readonly template = computed(
    () => this.scheduler.eventTemplate()?.template ?? null,
  );

  private readonly hours = computed(() =>
    Array.from(
      { length: this.endHour() - this.startHour() },
      (_, i) => this.startHour() + i,
    ).map((value) => ({
      value,
      label: Temporal.PlainTime.from({ hour: value }).toLocaleString(
        this.locale,
        { hour: 'numeric' },
      ),
    })),
  );

  private readonly columnsTemplate = computed(
    () => `repeat(${this.columns().length}, minmax(0, 1fr))`,
  );

  /** The all-day row: its bars, across the days shown. */
  private readonly allDay = computed(() =>
    layoutRow(
      this.scheduler.shownEvents().filter((event) => event.allDay),
      this.scheduler.days(),
      this.scheduler.timeZone(),
    ),
  );

  /** A line per lane of the all-day row (one at least). */
  private readonly allDayRows = computed(() => {
    const lanes = Math.max(
      1,
      ...this.allDay().segments.map((segment) => segment.lane + 1),
    );
    return `repeat(${lanes}, auto)`;
  });

  /** Each day shown, with its all-day bars (starting on it) and its timed events (placed). */
  private readonly columns = computed(() => {
    const events = this.scheduler.shownEvents();
    const timeZone = this.scheduler.timeZone();
    const today = this.scheduler.today();
    const { segments } = this.allDay();
    return this.scheduler.days().map((day, i) => {
      const isToday = day.equals(today);
      return {
        day,
        key: day.toString(),
        today: isToday,
        weekday: day.toLocaleString(this.locale, { weekday: 'short' }),
        label: day.toLocaleString(this.locale, { dateStyle: 'full' }),
        background: cn(
          'row-[1/-1]',
          i < this.scheduler.days().length - 1 && 'border-e',
          this.dayPointer.picking(day) && 'bg-primary/10',
        ),
        number: cn(
          'flex size-8 items-center justify-center text-sm font-semibold outline-none transition-colors motion-reduce:transition-none',
          'focus-visible:ring-3 focus-visible:ring-ring/50',
          this.style.scheduler.day,
          isToday
            ? 'bg-primary text-primary-foreground'
            : '[&:is(button)]:hover:bg-muted',
        ),
        allDay: segments
          .filter((segment) => segment.column === i)
          .map((segment) => ({
            key: segment.event.id,
            column: `${segment.column + 1} / span ${segment.span}`,
            row: `${segment.lane + 1}`,
            context: { $implicit: segment.event },
            injector: schedulerEventInjector(this.injector, {
              event: segment.event,
              place: 'all-day',
              day,
              continuesBefore: segment.continuesBefore,
              continuesAfter: segment.continuesAfter,
            }),
          })),
        timed: placeTimed(
          eventsOn(events, day, timeZone),
          day,
          timeZone,
          this.startHour(),
          this.endHour(),
        ).map((placement) => ({
          key: placement.event.id,
          placement,
          context: { $implicit: placement.event },
          injector: schedulerEventInjector(this.injector, {
            event: placement.event,
            place: 'time',
            day,
          }),
        })),
      };
    });
  });

  /** Where now is, in percent of the day shown; null outside it. */
  private readonly nowTop = computed(() => {
    const now = this.scheduler.now();
    const minutes = now.hour * 60 + now.minute;
    const from = this.startHour() * 60;
    const to = this.endHour() * 60;
    return minutes < from || minutes > to ? null : this.percent(minutes);
  });

  /** The keyboard's slot (while the hours have focus) or the range dragged over. */
  private readonly cursor = signal<ScSchedulerTimeRange | null>(null);
  private readonly picked = signal<ScSchedulerTimeRange | null>(null);
  private readonly focused = signal(false);
  private readonly shownRange = computed(
    () => this.picked() ?? (this.focused() ? this.cursor() : null),
  );

  private drag: {
    mode: 'move' | 'resize' | 'pick';
    id?: string;
    column: number;
    minute: number;
    x: number;
    y: number;
    started: boolean;
  } | null = null;
  private swallowClick = false;

  private readonly class = computed(() =>
    cn(
      'bg-background flex min-h-0 flex-col overflow-hidden [--sc-scheduler-hour-height:3rem]',
      this.style.frame,
      this.classInput(),
    ),
  );

  constructor() {
    afterNextRender(() => {
      const body = this.body().nativeElement;
      const hours = this.endHour() - this.startHour();
      const hour = Math.min(
        Math.max(this.scrollToHour() - this.startHour(), 0),
        hours,
      );
      // A little above the hour, so its label shows.
      body.scrollTop = Math.max(0, (body.scrollHeight / hours) * hour - 8);
    });
    this.host.addEventListener(
      'click',
      (event) => {
        if (!this.swallowClick) return;
        this.swallowClick = false;
        event.preventDefault();
        event.stopPropagation();
      },
      true,
    );
  }

  /** Minutes from midnight to percent of the hours shown. */
  private percent(minutes: number): number {
    const from = this.startHour() * 60;
    const to = this.endHour() * 60;
    return ((minutes - from) / (to - from)) * 100;
  }

  private snap(minutes: number, round: 'floor' | 'ceil' | 'round'): number {
    const slot = this.scheduler.slotMinutes();
    return Math[round](minutes / slot) * slot;
  }

  /** A column's day at a time (minutes from midnight; 1440 is the next day). */
  private at(column: number, minutes: number): Temporal.ZonedDateTime {
    const day = this.scheduler.days()[column];
    return day.add({ days: Math.floor(minutes / 1440) }).toZonedDateTime({
      timeZone: this.scheduler.timeZone(),
      plainTime: Temporal.PlainTime.from({
        hour: Math.floor((minutes % 1440) / 60),
        minute: minutes % 60,
      }),
    });
  }

  /** The column and the time under a point, within the hours shown. */
  private pointAt(x: number, y: number): { column: number; minute: number } {
    const rect = this.grid().nativeElement.getBoundingClientRect();
    const count = this.columns().length;
    let column = Math.floor(((x - rect.left) / rect.width) * count);
    column = Math.min(Math.max(column, 0), count - 1);
    if (this.direction() === 'rtl') column = count - 1 - column;
    const from = this.startHour() * 60;
    const to = this.endHour() * 60;
    const ratio = Math.min(Math.max((y - rect.top) / rect.height, 0), 1);
    return { column, minute: from + ratio * (to - from) };
  }

  private onPointerDown(event: PointerEvent): void {
    if (event.button !== 0 || event.pointerType === 'touch') return;
    const target = event.target as HTMLElement;
    if (!this.grid().nativeElement.contains(target)) return;
    const { column, minute } = this.pointAt(event.clientX, event.clientY);
    const eventElement = target.closest<HTMLElement>('[data-event-id]');
    let mode: 'move' | 'resize' | 'pick';
    if (eventElement) {
      if (!this.scheduler.editable()) return;
      const box = eventElement.getBoundingClientRect();
      mode = box.bottom - event.clientY <= 6 ? 'resize' : 'move';
    } else {
      if (!this.scheduler.pickable()) return;
      mode = 'pick';
    }
    this.drag = {
      mode,
      id: eventElement?.dataset['eventId'],
      column,
      minute,
      x: event.clientX,
      y: event.clientY,
      started: false,
    };
    this.body().nativeElement.setPointerCapture(event.pointerId);
  }

  private onPointerMove(event: PointerEvent): void {
    const drag = this.drag;
    if (!drag) return;
    if (
      !drag.started &&
      Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 4
    ) {
      return;
    }
    drag.started = true;
    const { column, minute } = this.pointAt(event.clientX, event.clientY);
    if (drag.mode === 'pick') {
      const a = Math.min(drag.minute, minute);
      const b = Math.max(drag.minute, minute);
      const from = this.snap(a, 'floor');
      this.picked.set({
        column: drag.column,
        from,
        to: Math.max(this.snap(b, 'ceil'), from + this.scheduler.slotMinutes()),
      });
      return;
    }
    const original = this.scheduler.events().find((e) => e.id === drag.id);
    if (!original) return;
    if (drag.mode === 'move') {
      const days = column - drag.column;
      const minutes = this.snap(minute - drag.minute, 'round');
      this.scheduler.preview.set({
        id: original.id,
        start: original.start.add({ days, minutes }),
        end: original.end.add({ days, minutes }),
      });
      return;
    }
    // Resize: its end, on its own day, at least a step after its start.
    let end = this.at(drag.column, this.snap(minute, 'round'));
    const shortest = original.start.add({
      minutes: this.scheduler.slotMinutes(),
    });
    if (Temporal.ZonedDateTime.compare(end, shortest) < 0) end = shortest;
    this.scheduler.preview.set({ id: original.id, start: original.start, end });
  }

  private onPointerUp(): void {
    const drag = this.drag;
    this.drag = null;
    if (!drag) return;
    if (drag.mode !== 'pick') {
      const preview = this.scheduler.preview();
      if (!drag.started || !preview) return;
      this.swallowClick = true;
      this.scheduler.change(preview.id, preview.start, preview.end);
      return;
    }
    const slot = this.scheduler.slotMinutes();
    const range = this.picked() ?? {
      column: drag.column,
      from: this.snap(drag.minute, 'floor'),
      to: this.snap(drag.minute, 'floor') + slot,
    };
    this.picked.set(null);
    this.pickRange(range);
  }

  private cancel(): void {
    this.drag = null;
    this.picked.set(null);
    this.scheduler.preview.set(null);
  }

  private pickRange(range: ScSchedulerTimeRange): void {
    this.scheduler.pick({
      start: this.at(range.column, range.from),
      end: this.at(range.column, range.to),
      allDay: false,
    });
  }

  private onFocus(event: FocusEvent): void {
    if (event.target !== this.body().nativeElement) return;
    this.focused.set(true);
    if (!this.scheduler.pickable() || this.cursor()) return;
    const days = this.scheduler.days();
    const index = days.findIndex((day) => day.equals(this.scheduler.date()));
    const from = this.snap(
      Math.max(this.scrollToHour(), this.startHour()) * 60,
      'floor',
    );
    this.cursor.set({
      column: Math.max(index, 0),
      from,
      to: from + this.scheduler.slotMinutes(),
    });
  }

  private onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      if (this.drag) this.cancel();
      return;
    }
    const cursor = this.cursor();
    if (
      !cursor ||
      !this.scheduler.pickable() ||
      event.target !== this.body().nativeElement ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    ) {
      return;
    }
    const slot = this.scheduler.slotMinutes();
    const min = this.startHour() * 60;
    const max = this.endHour() * 60;
    const count = this.columns().length;
    const rtl = this.direction() === 'rtl';
    let next: ScSchedulerTimeRange;
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown': {
        const step = event.key === 'ArrowUp' ? -slot : slot;
        if (event.shiftKey) {
          next = {
            ...cursor,
            to: Math.min(Math.max(cursor.to + step, cursor.from + slot), max),
          };
        } else {
          const length = cursor.to - cursor.from;
          const from = Math.min(
            Math.max(cursor.from + step, min),
            max - length,
          );
          next = { ...cursor, from, to: from + length };
        }
        break;
      }
      case 'ArrowLeft':
      case 'ArrowRight': {
        const forward = (event.key === 'ArrowRight') !== rtl;
        const column = Math.min(
          Math.max(cursor.column + (forward ? 1 : -1), 0),
          count - 1,
        );
        next = { ...cursor, column };
        break;
      }
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.pickRange(cursor);
        return;
      default:
        return;
    }
    event.preventDefault();
    this.cursor.set(next);
    this.scrollTo(next);
    this.announcer.announce(
      this.scheduler.describe(
        this.at(next.column, next.from),
        this.at(next.column, next.to),
        false,
      ),
    );
  }

  /** The cursor kept in sight as it moves. */
  private scrollTo(range: ScSchedulerTimeRange): void {
    const body = this.body().nativeElement;
    const height = this.grid().nativeElement.offsetHeight;
    const top = (this.percent(range.from) / 100) * height;
    const bottom = (this.percent(range.to) / 100) * height;
    if (top < body.scrollTop) body.scrollTop = top;
    else if (bottom > body.scrollTop + body.clientHeight) {
      body.scrollTop = bottom - body.clientHeight;
    }
  }
}
