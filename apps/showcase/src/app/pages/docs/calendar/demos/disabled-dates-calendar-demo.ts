import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Temporal } from '@js-temporal/polyfill';
import { ScCalendar } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-dates-calendar-demo',
  imports: [ScCalendar],
  template: `
    <div class="space-y-4">
      <div class="rounded-md border">
        <sc-calendar [(value)]="selectedDate" [disabled]="disabledDates()" />
      </div>

      <div class="space-y-2">
        <div class="p-4 rounded-md border bg-muted/50">
          <p class="text-sm font-medium mb-2">Configuration</p>
          <p class="text-xs text-muted-foreground">
            Weekends (Saturday & Sunday) are disabled for the current and next
            month.
          </p>
        </div>

        @if (selectedDate(); as date) {
          <div
            class="flex items-center justify-between p-4 rounded-md border bg-muted/50"
          >
            <div>
              <p class="text-sm font-medium">Selected Date</p>
              <p class="text-sm text-muted-foreground">
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
              class="px-3 py-1 text-sm rounded-md border hover:bg-accent"
              (click)="clearSelection()"
            >
              Clear
            </button>
          </div>
        } @else {
          <p
            class="text-sm text-muted-foreground p-4 text-center border rounded-md"
          >
            No date selected. Weekends are disabled.
          </p>
        }
      </div>
    </div>
  `,
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
