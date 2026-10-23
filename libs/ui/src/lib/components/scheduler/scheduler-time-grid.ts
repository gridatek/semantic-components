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
  viewChild,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScScheduler } from './scheduler';
import { eventsOn, placeTimed } from './scheduler-layout';
import { schedulerEventInjector } from './scheduler-types';

/**
 * The week and day views: a column for each day, from `startHour` to
 * `endHour`. Timed events are placed by their times — overlapping ones side
 * by side — and all-day ones go in a row above. A line shows now. Events are
 * written by your `scSchedulerEventTemplate`. Height: give the view one (it
 * scrolls), and an hour's with `--sc-scheduler-hour-height`.
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
            class="flex flex-col items-center gap-0.5 border-e py-2 last:border-e-0"
            [attr.data-today]="column.today || null"
          >
            <span class="text-muted-foreground text-xs font-medium">
              {{ column.weekday }}
            </span>
            @if (columns().length > 1) {
              <button
                type="button"
                [class]="dayClass"
                [attr.aria-label]="column.label"
                [attr.aria-current]="column.today ? 'date' : null"
                (click)="scheduler.goTo(column.day, 'day')"
              >
                {{ column.day.day }}
              </button>
            } @else {
              <span
                [class]="dayClass"
                [attr.aria-current]="column.today ? 'date' : null"
                >{{ column.day.day }}</span
              >
            }
          </div>
        }
      </div>
    </div>

    @if (hasAllDay()) {
      <div
        class="flex [scrollbar-gutter:stable] overflow-y-hidden border-b"
        data-slot="scheduler-all-day"
      >
        <div class="w-14 shrink-0" aria-hidden="true"></div>
        <div
          class="grid flex-1"
          [style.grid-template-columns]="columnsTemplate()"
        >
          @for (column of columns(); track column.key) {
            <ul
              class="flex min-w-0 flex-col gap-0.5 border-e p-1 last:border-e-0"
              [attr.aria-label]="column.label"
            >
              @for (item of column.allDay; track item.event.id) {
                <li class="flex min-w-0">
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
      class="relative min-h-0 flex-1 [scrollbar-gutter:stable] overflow-y-auto"
      tabindex="0"
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
          class="grid flex-1"
          [style.grid-template-columns]="columnsTemplate()"
        >
          @for (column of columns(); track column.key) {
            <div
              role="group"
              class="relative border-e last:border-e-0"
              [attr.aria-label]="column.label"
            >
              @for (hour of hours(); track hour.value) {
                <div
                  class="h-(--sc-scheduler-hour-height) border-b border-dashed last:border-b-0"
                  aria-hidden="true"
                ></div>
              }
              @for (item of column.timed; track item.placement.event.id) {
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
              @if (column.today && nowTop() !== null) {
                <div
                  data-slot="scheduler-now"
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
    'data-slot': 'scheduler-time-grid',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSchedulerTimeGrid {
  protected readonly scheduler = inject(ScScheduler);
  private readonly injector = inject(Injector);
  private readonly locale = inject(LOCALE_ID);
  private readonly body = viewChild.required<ElementRef<HTMLElement>>('body');

  readonly classInput = input<string>('', { alias: 'class' });
  /** The first hour shown (0–23). */
  readonly startHour = input<number>(0);
  /** The hour it ends at (1–24). */
  readonly endHour = input<number>(24);
  /** Scrolled to on first render. */
  readonly scrollToHour = input<number>(8);

  protected readonly template = computed(
    () => this.scheduler.eventTemplate()?.template ?? null,
  );

  protected readonly hours = computed(() =>
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

  protected readonly columnsTemplate = computed(
    () => `repeat(${this.columns().length}, minmax(0, 1fr))`,
  );

  /** Each day shown, with its all-day and its timed events (placed). */
  protected readonly columns = computed(() => {
    const events = this.scheduler.events();
    const timeZone = this.scheduler.timeZone();
    const today = this.scheduler.today();
    return this.scheduler.days().map((day) => {
      const on = eventsOn(events, day, timeZone);
      return {
        day,
        key: day.toString(),
        today: day.equals(today),
        weekday: day.toLocaleString(this.locale, { weekday: 'short' }),
        label: day.toLocaleString(this.locale, { dateStyle: 'full' }),
        allDay: on
          .filter((event) => event.allDay)
          .map((event) => ({
            event,
            context: { $implicit: event },
            injector: schedulerEventInjector(this.injector, {
              event,
              place: 'all-day',
              day,
            }),
          })),
        timed: placeTimed(
          on,
          day,
          timeZone,
          this.startHour(),
          this.endHour(),
        ).map((placement) => ({
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

  protected readonly hasAllDay = computed(() =>
    this.columns().some((column) => column.allDay.length),
  );

  /** Where now is, in percent of the day shown; null outside it. */
  protected readonly nowTop = computed(() => {
    const now = this.scheduler.now();
    const minutes = now.hour * 60 + now.minute;
    const from = this.startHour() * 60;
    const to = this.endHour() * 60;
    return minutes < from || minutes > to
      ? null
      : ((minutes - from) / (to - from)) * 100;
  });

  protected readonly dayClass = cn(
    'flex size-8 items-center justify-center rounded-full text-sm font-semibold outline-none transition-colors',
    'focus-visible:ring-3 focus-visible:ring-ring/50',
    '[&:is(button)]:hover:bg-muted',
    'aria-[current=date]:bg-primary aria-[current=date]:text-primary-foreground',
  );

  protected readonly class = computed(() =>
    cn(
      'flex min-h-0 flex-col overflow-hidden rounded-lg border [--sc-scheduler-hour-height:3rem]',
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
  }
}
