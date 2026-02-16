import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SingleDateCalendarDemo } from './single-date-calendar-demo';

@Component({
  selector: 'app-single-date-calendar-demo-container',
  imports: [DemoContainer, SingleDateCalendarDemo],
  template: `
    <app-demo-container
      title="Single Date Selection"
      demoUrl="/demos/calendar/single-date-calendar-demo"
      [code]="code"
    >
      <app-single-date-calendar-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleDateCalendarDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScCalendar } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-single-date-calendar-demo',
  imports: [ScCalendar],
  template: \`
    <div class="space-y-4">
      <div class="rounded-md border">
        <sc-calendar [(selected)]="selectedDate" />
      </div>

      <div class="space-y-2">
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
            No date selected
          </p>
        }
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleDateCalendarDemo {
  readonly selectedDate = signal<Date | undefined>(undefined);

  clearSelection(): void {
    this.selectedDate.set(undefined);
  }
}`;
}
