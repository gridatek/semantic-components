import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScCalendar } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-dates-calendar-demo',
  imports: [ScCalendar],
  template: `
    <div class="space-y-4">
      <div class="rounded-md border">
        <sc-calendar [(selected)]="selectedDate" [disabled]="disabledDates()" />
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
                  date.toLocaleDateString('en-US', {
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
  readonly selectedDate = signal<Date | undefined>(undefined);
  readonly disabledDates = signal<Date[]>(this.getWeekendDates());

  clearSelection(): void {
    this.selectedDate.set(undefined);
  }

  private getWeekendDates(): Date[] {
    const weekends: Date[] = [];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    for (let m = month; m <= month + 1; m++) {
      const daysInMonth = new Date(year, m + 1, 0).getDate();
      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, m, d);
        if (date.getDay() === 0 || date.getDay() === 6) {
          weekends.push(date);
        }
      }
    }
    return weekends;
  }
}
