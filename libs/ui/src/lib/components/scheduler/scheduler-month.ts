import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  Injector,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScScheduler } from './scheduler';
import { eventsOn } from './scheduler-layout';
import { schedulerEventInjector } from './scheduler-types';

/**
 * The month view: a table of the month's weeks. Each day has its number (it
 * opens the day) and its events, as your `scSchedulerEventTemplate` writes
 * them — up to `maxEvents`, then your `scSchedulerMoreTemplate`.
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
    @for (week of weeks(); track week[0].day.toString()) {
      <div role="row" class="grid flex-1 grid-cols-7 border-b last:border-b-0">
        @for (cell of week; track cell.day.toString()) {
          <div
            role="cell"
            class="data-outside:bg-muted/40 flex min-h-28 min-w-0 flex-col gap-1 border-e p-1 last:border-e-0"
            [attr.data-outside]="cell.outside || null"
            [attr.data-today]="cell.today || null"
          >
            <button
              type="button"
              [class]="dayClass"
              [attr.aria-label]="cell.label"
              [attr.aria-current]="cell.today ? 'date' : null"
              (click)="scheduler.goTo(cell.day, 'day')"
            >
              {{ cell.day.day }}
            </button>
            @if (cell.events.length) {
              <ul class="flex min-w-0 flex-col gap-0.5">
                @for (item of cell.events; track item.event.id) {
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
            @if (cell.more && moreTemplate()) {
              <ng-container
                [ngTemplateOutlet]="moreTemplate()"
                [ngTemplateOutletContext]="{
                  $implicit: cell.more,
                  day: cell.day,
                }"
              />
            }
          </div>
        }
      </div>
    }
  `,
  host: {
    role: 'table',
    'data-slot': 'scheduler-month',
    '[attr.aria-label]': 'scheduler.label()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSchedulerMonth {
  protected readonly scheduler = inject(ScScheduler);
  private readonly injector = inject(Injector);
  private readonly locale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });
  /** How many events a day shows; the rest go to your "more". */
  readonly maxEvents = input<number>(3);

  protected readonly template = computed(
    () => this.scheduler.eventTemplate()?.template ?? null,
  );
  protected readonly moreTemplate = computed(
    () => this.scheduler.moreTemplate()?.template ?? null,
  );

  protected readonly weekdays = computed(() =>
    (this.scheduler.weeks()[0] ?? []).map((day) => ({
      short: day.toLocaleString(this.locale, { weekday: 'short' }),
      long: day.toLocaleString(this.locale, { weekday: 'long' }),
    })),
  );

  /** Each week's days, with their events (and their injectors). */
  protected readonly weeks = computed(() => {
    const events = this.scheduler.events();
    const timeZone = this.scheduler.timeZone();
    const month = this.scheduler.date().month;
    const today = this.scheduler.today();
    const max = this.maxEvents();
    return this.scheduler.weeks().map((week) =>
      week.map((day) => {
        const all = eventsOn(events, day, timeZone);
        // Room for all, or for all but one line, which says how many more.
        const shown = all.length > max ? all.slice(0, max - 1) : all;
        return {
          day,
          label: day.toLocaleString(this.locale, { dateStyle: 'full' }),
          outside: day.month !== month,
          today: day.equals(today),
          more: all.length - shown.length,
          events: shown.map((event) => ({
            event,
            context: { $implicit: event },
            injector: schedulerEventInjector(this.injector, {
              event,
              place: 'month',
              day,
            }),
          })),
        };
      }),
    );
  });

  protected readonly dayClass = cn(
    'hover:bg-muted size-7 shrink-0 self-start rounded-full text-xs font-medium outline-none transition-colors',
    'focus-visible:ring-3 focus-visible:ring-ring/50',
    'in-data-outside:text-muted-foreground',
    'aria-[current=date]:bg-primary aria-[current=date]:text-primary-foreground',
  );

  protected readonly class = computed(() =>
    cn('flex flex-col overflow-hidden rounded-lg border', this.classInput()),
  );
}
