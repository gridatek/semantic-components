import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ConstrainedDatePickerDemo } from './constrained-date-picker-demo';

@Component({
  selector: 'app-constrained-date-picker-demo-container',
  imports: [DemoContainer, ConstrainedDatePickerDemo],
  template: `
    <app-demo-container
      title="With Constraints"
      demoUrl="/demos/date-picker/constrained-date-picker-demo"
      [code]="code"
    >
      <app-constrained-date-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstrainedDatePickerDemoContainer {
  readonly code = `import { Temporal } from '@js-temporal/polyfill';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScDatePicker } from '@semantic-components/ui';

@Component({
  selector: 'app-constrained-date-picker-demo',
  imports: [ScDatePicker],
  template: \`
    <div class="space-y-4">
      <p class="text-muted-foreground text-xs">
        Only dates within the next 30 days
      </p>
      <sc-date-picker
        [(value)]="selectedDate"
        [minDate]="minDate"
        [maxDate]="maxDate"
        placeholder="Pick a date (next 30 days)"
      />

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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstrainedDatePickerDemo {
  readonly selectedDate = signal<Temporal.PlainDate | undefined>(undefined);
  readonly minDate = Temporal.Now.plainDateISO();
  readonly maxDate = Temporal.Now.plainDateISO().add({ days: 30 });

  clearSelection(): void {
    this.selectedDate.set(undefined);
  }
}`;
}
