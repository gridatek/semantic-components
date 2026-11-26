import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  Injector,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { injectDisplayLocale, injectFormatNumber } from '../../utils';
import { ScScheduler } from './scheduler';
import { eventsOn } from './scheduler-layout';
import { schedulerEventInjector } from './scheduler-types';

/**
 * The agenda: the month's days that have events, each a list of them in
 * order — readable on a phone and by screen readers. An event over days is
 * under each of its days. Nothing on: your content (`No events this month`).
 */
@Component({
  selector: 'div[scSchedulerAgenda]',
  imports: [NgTemplateOutlet],
  template: `
    @if (days().length) {
      <ul class="divide-y">
        @for (day of days(); track day.key) {
          <li class="flex gap-4 px-4 py-3">
            <div
              aria-hidden="true"
              class="flex w-12 shrink-0 flex-col items-center"
            >
              <span class="text-muted-foreground text-xs font-medium uppercase">
                {{ day.weekday }}
              </span>
              <span
                class="flex size-8 items-center justify-center text-sm font-semibold"
                [class]="day.number"
                >{{ formatNumber(day.day.day) }}</span
              >
            </div>
            <ul
              class="flex min-w-0 flex-1 flex-col gap-1"
              [attr.aria-label]="day.label"
            >
              @for (item of day.events; track item.key) {
                <li class="flex min-w-0">
                  <ng-container
                    [ngTemplateOutlet]="template()"
                    [ngTemplateOutletContext]="item.context"
                    [ngTemplateOutletInjector]="item.injector"
                  />
                </li>
              }
            </ul>
          </li>
        }
      </ul>
    } @else {
      <div class="text-muted-foreground p-6 text-center text-sm">
        <ng-content />
      </div>
    }
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSchedulerAgenda {
  private readonly scheduler = inject(ScScheduler);
  private readonly injector = inject(Injector);
  /** What it shows: the locale, in the user's numbering system. */
  private readonly locale = injectDisplayLocale();
  /** Its numbers (the days), in the user's numbering system. */
  private readonly formatNumber = injectFormatNumber();
  private readonly style = injectStyle();

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly template = computed(
    () => this.scheduler.eventTemplate()?.template ?? null,
  );

  /** The days with events, each with its events. */
  private readonly days = computed(() => {
    const events = this.scheduler.shownEvents();
    const timeZone = this.scheduler.timeZone();
    const today = this.scheduler.today();
    return this.scheduler
      .days()
      .map((day) => ({ day, on: eventsOn(events, day, timeZone) }))
      .filter(({ on }) => on.length)
      .map(({ day, on }) => ({
        day,
        key: day.toString(),
        weekday: day.toLocaleString(this.locale(), { weekday: 'short' }),
        label: day.toLocaleString(this.locale(), { dateStyle: 'full' }),
        number: cn(
          this.style.scheduler.day,
          day.equals(today) && 'bg-primary text-primary-foreground',
        ),
        events: on.map((event) => ({
          key: event.id,
          context: { $implicit: event },
          injector: schedulerEventInjector(this.injector, {
            event,
            place: 'agenda',
            day,
          }),
        })),
      }));
  });

  private readonly class = computed(() =>
    cn(
      'bg-background min-h-0 overflow-y-auto',
      this.style.frame,
      this.classInput(),
    ),
  );
}
