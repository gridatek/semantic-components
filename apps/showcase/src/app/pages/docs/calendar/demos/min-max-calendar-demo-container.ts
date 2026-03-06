import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MinMaxCalendarDemo } from './min-max-calendar-demo';

@Component({
  selector: 'app-min-max-calendar-demo-container',
  imports: [DemoContainer, MinMaxCalendarDemo],
  template: `
    <app-demo-container
      title="With Min/Max Date"
      description="Only dates within the next 30 days can be selected."
      demoUrl="/demos/calendar/min-max-calendar-demo"
      [code]="code"
    >
      <app-min-max-calendar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinMaxCalendarDemoContainer {
  readonly code = `import { Temporal } from '@js-temporal/polyfill';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScCalendar } from '@semantic-components/ui';

@Component({
  selector: 'app-min-max-calendar-demo',
  imports: [ScCalendar],
  template: \`
    <div class="space-y-4">
      <div class="w-fit rounded-md border">
        <sc-calendar
          [(value)]="selectedDate"
          [minDate]="minDate"
          [maxDate]="maxDate"
        />
      </div>

      <div class="space-y-2">
        <div class="bg-muted/50 rounded-md border p-4">
          <p class="mb-2 text-sm font-medium">Configuration</p>
          <div class="text-muted-foreground space-y-1 text-xs">
            <p>
              Min Date:
              {{
                minDate.toLocaleString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              }}
            </p>
            <p>
              Max Date:
              {{
                maxDate.toLocaleString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              }}
            </p>
          </div>
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
            No date selected. Only dates within the next 30 days are available.
          </p>
        }
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinMaxCalendarDemo {
  readonly selectedDate = signal<Temporal.PlainDate | undefined>(undefined);
  readonly minDate = Temporal.Now.plainDateISO();
  readonly maxDate = Temporal.Now.plainDateISO().add({ days: 30 });

  clearSelection(): void {
    this.selectedDate.set(undefined);
  }
}`;
}
