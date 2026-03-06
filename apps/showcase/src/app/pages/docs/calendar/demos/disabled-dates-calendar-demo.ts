import { Temporal } from '@js-temporal/polyfill';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScCalendar } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-dates-calendar-demo',
  imports: [ScCalendar],
  template: `
    <div class="space-y-4">
      <div class="w-fit rounded-md border">
        <sc-calendar [(value)]="selectedDate" [disabled]="disabledDates()" />
      </div>

      <div class="space-y-2">
        <div class="bg-muted/50 rounded-md border p-4">
          <p class="mb-2 text-sm font-medium">Configuration</p>
          <p class="text-muted-foreground text-xs">
            Weekends (Saturday & Sunday) are disabled for the current and next
            month.
          </p>
        </div>

        @if (selectedDate(); as date) {
          <div
            class="bg-muted/50 flex items-center justify-between rounded-md border p-4"
          >
            <div>
              <p class="text-sm font-medium">Selected Date</p>
              <p class="text-muted-foreground text-sm">
                {{
                  date.toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                }}
              </p>
            </div>
            <button
              type="button"
              class="hover:bg-accent rounded-md border px-3 py-1 text-sm"
              (click)="clearSelection()"
            >
              Clear
            </button>
          </div>
        } @else {
          <p
            class="text-muted-foreground rounded-md border p-4 text-center text-sm"
          >
            No date selected. Weekends are disabled.
          </p>
        }
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledDatesCalendarDemo {
  readonly selectedDate = signal<Temporal.PlainDate | undefined>(undefined);
  readonly disabledDates = signal<Temporal.PlainDate[]>(this.getWeekendDates());

  clearSelection(): void {
    this.selectedDate.set(undefined);
  }

  private getWeekendDates(): Temporal.PlainDate[] {
    const weekends: Temporal.PlainDate[] = [];
    const today = Temporal.Now.plainDateISO();
    const start = today.with({ day: 1 });
    const nextMonth = start.add({ months: 1 });
    const end = nextMonth.with({ day: nextMonth.daysInMonth });

    let current = start;
    while (Temporal.PlainDate.compare(current, end) <= 0) {
      if (current.dayOfWeek === 6 || current.dayOfWeek === 7) {
        weekends.push(current);
      }
      current = current.add({ days: 1 });
    }
    return weekends;
  }
}
