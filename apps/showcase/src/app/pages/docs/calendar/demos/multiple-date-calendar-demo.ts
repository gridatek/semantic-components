import { Temporal } from '@js-temporal/polyfill';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScCalendar } from '@semantic-components/ui';

@Component({
  selector: 'app-multiple-date-calendar-demo',
  imports: [ScCalendar],
  template: `
    <div class="space-y-4">
      <div class="w-fit rounded-md border">
        <sc-calendar mode="multiple" [(value)]="selectedDates" />
      </div>

      <div class="space-y-2">
        @if (selectedDates().length > 0) {
          <div class="bg-muted/50 rounded-md border p-4">
            <div class="mb-3 flex items-center justify-between">
              <p class="text-sm font-medium">
                Selected Dates ({{ selectedDates().length }})
              </p>
              <button
                type="button"
                class="hover:bg-accent rounded-md border px-3 py-1 text-sm"
                (click)="clearSelection()"
              >
                Clear All
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              @for (date of selectedDates(); track date.toString()) {
                <span
                  class="bg-background inline-flex items-center gap-2 rounded-md border px-3 py-1 text-sm"
                >
                  {{ date.toLocaleString() }}
                  <button
                    type="button"
                    class="hover:text-destructive"
                    (click)="removeDate(date)"
                  >
                    ×
                  </button>
                </span>
              }
            </div>
          </div>
        } @else {
          <p
            class="text-muted-foreground rounded-md border p-4 text-center text-sm"
          >
            No dates selected. Click multiple dates to select them.
          </p>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleDateCalendarDemo {
  readonly selectedDates = signal<Temporal.PlainDate[]>([]);

  clearSelection(): void {
    this.selectedDates.set([]);
  }

  removeDate(dateToRemove: Temporal.PlainDate): void {
    this.selectedDates.update((dates) =>
      dates.filter((d) => !d.equals(dateToRemove)),
    );
  }
}
