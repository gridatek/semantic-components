import { Temporal } from '@js-temporal/polyfill';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScCalendar } from '@semantic-components/ui';

@Component({
  selector: 'app-single-date-calendar-demo',
  imports: [ScCalendar],
  template: `
    <div class="space-y-4">
      <div class="w-fit rounded-md border">
        <sc-calendar [(value)]="selectedDate" />
      </div>

      <div class="space-y-2">
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
            No date selected
          </p>
        }
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleDateCalendarDemo {
  readonly selectedDate = signal<Temporal.PlainDate | undefined>(undefined);

  clearSelection(): void {
    this.selectedDate.set(undefined);
  }
}
