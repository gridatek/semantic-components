import { Temporal } from '@js-temporal/polyfill';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScDatePicker } from '@semantic-components/ui';

@Component({
  selector: 'app-multiple-date-picker-demo',
  imports: [ScDatePicker],
  template: `
    <div class="space-y-4">
      <sc-date-picker
        mode="multiple"
        [(value)]="selectedDates"
        placeholder="Select dates"
      />

      @if (selectedDates().length > 0) {
        <div
          class="bg-muted/50 flex items-center justify-between rounded-md border p-4"
        >
          <div>
            <p class="text-sm font-medium">Selected Dates</p>
            <p class="text-muted-foreground text-sm">
              {{ selectedDates().length }} date(s) selected
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
          No dates selected
        </p>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleDatePickerDemo {
  readonly selectedDates = signal<Temporal.PlainDate[]>([]);

  clearSelection(): void {
    this.selectedDates.set([]);
  }
}
