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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinMaxCalendarDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScCalendar } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-min-max-calendar-demo',
  imports: [ScCalendar],
  template: \`
    <div class="space-y-4">
      <div class="rounded-md border">
        <sc-calendar
          [(selected)]="selectedDate"
          [minDate]="minDate"
          [maxDate]="maxDate"
        />
      </div>

      <div class="space-y-2">
        <div class="p-4 rounded-md border bg-muted/50">
          <p class="text-sm font-medium mb-2">Configuration</p>
          <div class="space-y-1 text-xs text-muted-foreground">
            <p>
              Min Date:
              {{
                minDate.toLocaleDateString('en-US', {
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
                maxDate.toLocaleDateString('en-US', {
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
            No date selected. Only dates within the next 30 days are available.
          </p>
        }
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinMaxCalendarDemo {
  readonly selectedDate = signal<Date | undefined>(undefined);
  readonly minDate = new Date();
  readonly maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  clearSelection(): void {
    this.selectedDate.set(undefined);
  }
}`;
}
