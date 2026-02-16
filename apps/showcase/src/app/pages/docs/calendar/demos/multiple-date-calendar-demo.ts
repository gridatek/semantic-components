import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScCalendar } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-multiple-date-calendar-demo',
  imports: [ScCalendar],
  template: `
    <div class="space-y-4">
      <div class="rounded-md border">
        <sc-calendar mode="multiple" [(selectedDates)]="selectedDates" />
      </div>

      <div class="space-y-2">
        @if (selectedDates().length > 0) {
          <div class="p-4 rounded-md border bg-muted/50">
            <div class="flex items-center justify-between mb-3">
              <p class="text-sm font-medium">
                Selected Dates ({{ selectedDates().length }})
              </p>
              <button
                type="button"
                class="px-3 py-1 text-sm rounded-md border hover:bg-accent"
                (click)="clearSelection()"
              >
                Clear All
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              @for (date of selectedDates(); track date.getTime()) {
                <span
                  class="inline-flex items-center gap-2 px-3 py-1 text-sm rounded-md border bg-background"
                >
                  {{ date.toLocaleDateString() }}
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
            class="text-sm text-muted-foreground p-4 text-center border rounded-md"
          >
            No dates selected. Click multiple dates to select them.
          </p>
        }
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleDateCalendarDemo {
  readonly selectedDates = signal<Date[]>([]);

  clearSelection(): void {
    this.selectedDates.set([]);
  }

  removeDate(dateToRemove: Date): void {
    this.selectedDates.update((dates) =>
      dates.filter((d) => d.getTime() !== dateToRemove.getTime()),
    );
  }
}
