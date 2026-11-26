import { Directionality } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  Injector,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { injectDisplayLocale, injectFormatNumber } from '../../utils';
import { ScScheduler } from './scheduler';
import { ScSchedulerDayPointer } from './scheduler-day-pointer';
import { layoutRow, startOfWeek } from './scheduler-layout';
import { schedulerEventInjector } from './scheduler-types';

/**
 * The month: a grid of weeks, one Tab stop on its days — ← → (mirrored right
 * to left), ↑ ↓ a week, Home and End the week's ends, Page Up and Page Down a
 * month (with Shift, a year); Enter opens the day. An event is a line on its
 * day, a bar across its days (all day, or over days), going on into the next
 * week; a crowded day says how many more (your `scSchedulerMoreTemplate`).
 */
@Component({
  selector: 'div[scSchedulerMonth]',
  imports: [NgTemplateOutlet],
  template: `
    <div role="row" class="grid grid-cols-7 border-b">
      @for (weekday of weekdays(); track weekday.long) {
        <div
          role="columnheader"
          class="text-muted-foreground py-2 text-center text-xs font-medium"
        >
          <span aria-hidden="true">{{ weekday.short }}</span>
          <span class="sr-only">{{ weekday.long }}</span>
        </div>
      }
    </div>
    @for (week of weeks(); track week.key) {
      <div
        role="row"
        class="grid min-h-28 flex-1 grid-cols-7 border-b last:border-b-0"
        [style.grid-template-rows]="rows()"
      >
        @for (cell of week.cells; track cell.key) {
          <div role="gridcell" class="contents">
            <div
              aria-hidden="true"
              [class]="cell.background"
              [style.grid-column]="cell.column"
              [attr.data-day]="cell.key"
            ></div>
            <button
              type="button"
              [class]="cell.number"
              [style.grid-column]="cell.column"
              [attr.data-day-button]="cell.key"
              [attr.aria-label]="cell.label"
              [attr.aria-current]="cell.today ? 'date' : null"
              [tabIndex]="cell.focused ? 0 : -1"
              (click)="scheduler.goTo(cell.day, 'day')"
            >
              {{ formatNumber(cell.day.day) }}
            </button>
            @for (item of cell.segments; track item.key) {
              <div
                class="flex min-w-0 px-0.5 py-px"
                [style.grid-column]="item.column"
                [style.grid-row]="item.row"
              >
                <ng-container
                  [ngTemplateOutlet]="template()"
                  [ngTemplateOutletContext]="item.context"
                  [ngTemplateOutletInjector]="item.injector"
                />
              </div>
            }
            @if (cell.more && moreTemplate()) {
              <div
                class="flex min-w-0 px-0.5 py-px"
                [style.grid-column]="cell.column"
                [style.grid-row]="maxEvents() + 1"
              >
                <ng-container
                  [ngTemplateOutlet]="moreTemplate()"
                  [ngTemplateOutletContext]="{
                    $implicit: cell.more,
                    day: cell.day,
                  }"
                />
              </div>
            }
          </div>
        }
      </div>
    }
  `,
  host: {
    role: 'grid',
    '[attr.aria-label]': 'scheduler.label()',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
    '(pointerdown)': 'pointer.down($event)',
    '(pointermove)': 'pointer.move($event)',
    '(pointerup)': 'pointer.up()',
    '(pointercancel)': 'pointer.cancel()',
    '(keydown.escape)': 'pointer.cancel()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSchedulerMonth {
  private readonly scheduler = inject(ScScheduler);
  private readonly injector = inject(Injector);
  /** What it shows: the locale, in the user's numbering system. */
  private readonly locale = injectDisplayLocale();
  /** Its numbers (the days), in the user's numbering system. */
  private readonly formatNumber = injectFormatNumber();
  private readonly direction = inject(Directionality).valueSignal;
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly style = injectStyle();
  private readonly pointer = new ScSchedulerDayPointer(
    this.scheduler,
    this.host,
  );

  readonly classInput = input<string>('', { alias: 'class' });
  /** How many lines a day shows; the rest go to your "more". */
  readonly maxEvents = input<number>(3);

  private readonly template = computed(
    () => this.scheduler.eventTemplate()?.template ?? null,
  );
  private readonly moreTemplate = computed(
    () => this.scheduler.moreTemplate()?.template ?? null,
  );

  /** The day's number, then a line per event, then the rest of the day. */
  private readonly rows = computed(
    () => `auto repeat(${this.maxEvents()}, auto) minmax(0, 1fr)`,
  );

  /** A day moved to by the keys: focused once drawn. */
  private readonly focusDay = signal<string | null>(null);

  private readonly weekdays = computed(() =>
    (this.scheduler.weeks()[0] ?? []).map((day) => ({
      short: day.toLocaleString(this.locale(), { weekday: 'short' }),
      long: day.toLocaleString(this.locale(), { weekday: 'long' }),
    })),
  );

  /** Each week: its days, each with the events that start on it there. */
  private readonly weeks = computed(() => {
    const events = this.scheduler.shownEvents();
    const timeZone = this.scheduler.timeZone();
    const date = this.scheduler.date();
    const today = this.scheduler.today();
    const max = this.maxEvents();
    return this.scheduler.weeks().map((days) => {
      const { segments, more } = layoutRow(events, days, timeZone, max);
      return {
        key: days[0].toString(),
        cells: days.map((day, i) => {
          const outside = day.month !== date.month;
          const isToday = day.equals(today);
          return {
            day,
            key: day.toString(),
            column: `${i + 1}`,
            label: day.toLocaleString(this.locale(), { dateStyle: 'full' }),
            today: isToday,
            focused: day.equals(date),
            more: more[i],
            background: cn(
              'row-[1/-1]',
              i < 6 && 'border-e',
              outside && 'bg-muted/40',
              this.pointer.picking(day) && 'bg-primary/10',
            ),
            number: cn(
              'row-start-1 m-1 size-7 shrink-0 self-start justify-self-start text-xs font-medium outline-none transition-colors motion-reduce:transition-none',
              'focus-visible:ring-3 focus-visible:ring-ring/50',
              this.style.scheduler.day,
              isToday
                ? 'bg-primary text-primary-foreground'
                : cn('hover:bg-muted', outside && 'text-muted-foreground'),
            ),
            segments: segments
              .filter((segment) => segment.column === i)
              .map((segment) => ({
                key: segment.event.id,
                column: `${segment.column + 1} / span ${segment.span}`,
                row: `${segment.lane + 2}`,
                context: { $implicit: segment.event },
                injector: schedulerEventInjector(this.injector, {
                  event: segment.event,
                  place: 'month',
                  day,
                  continuesBefore: segment.continuesBefore,
                  continuesAfter: segment.continuesAfter,
                }),
              })),
          };
        }),
      };
    });
  });

  private readonly class = computed(() =>
    cn(
      'bg-background flex flex-col overflow-hidden',
      this.style.frame,
      this.classInput(),
    ),
  );

  constructor() {
    afterRenderEffect(() => {
      const key = this.focusDay();
      if (!key) return;
      this.focusDay.set(null);
      this.host
        .querySelector<HTMLElement>(`[data-day-button="${key}"]`)
        ?.focus();
    });
  }

  private onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (!target.dataset['dayButton'] || event.altKey || event.ctrlKey) return;
    const date = this.scheduler.date();
    const rtl = this.direction() === 'rtl';
    const weekStart = startOfWeek(date, this.scheduler.weekStart());
    let to: Temporal.PlainDate;
    switch (event.key) {
      case 'ArrowLeft':
        to = date.add({ days: rtl ? 1 : -1 });
        break;
      case 'ArrowRight':
        to = date.add({ days: rtl ? -1 : 1 });
        break;
      case 'ArrowUp':
        to = date.subtract({ weeks: 1 });
        break;
      case 'ArrowDown':
        to = date.add({ weeks: 1 });
        break;
      case 'Home':
        to = weekStart;
        break;
      case 'End':
        to = weekStart.add({ days: 6 });
        break;
      case 'PageUp':
        to = date.subtract(event.shiftKey ? { years: 1 } : { months: 1 });
        break;
      case 'PageDown':
        to = date.add(event.shiftKey ? { years: 1 } : { months: 1 });
        break;
      default:
        return;
    }
    event.preventDefault();
    this.scheduler.date.set(to);
    this.focusDay.set(to.toString());
  }
}
