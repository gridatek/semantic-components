import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BirthdayCalendarDemo } from './birthday-calendar-demo';

@Component({
  selector: 'app-birthday-calendar-demo-container',
  imports: [DemoContainer, BirthdayCalendarDemo],
  template: `
    <app-demo-container
      title="Birthday Selection"
      demoUrl="/demos/calendar/birthday-calendar-demo"
      [code]="code"
    >
      <app-birthday-calendar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BirthdayCalendarDemoContainer {
  readonly code = `import { Temporal } from '@js-temporal/polyfill';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScCalendar } from '@semantic-components/ui';

@Component({
  selector: 'app-birthday-calendar-demo',
  imports: [ScCalendar],
  template: \`
    <div class="space-y-4">
      <div class="w-fit rounded-md border">
        <sc-calendar
          [(value)]="selectedDate"
          viewMode="year"
          [maxDate]="today"
        />
      </div>

      @if (selectedDate(); as date) {
        <div
          class="bg-muted/50 flex items-center justify-between rounded-md border p-4"
        >
          <div>
            <p class="text-sm font-medium">Birthday</p>
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
          Select your birthday (start by picking a year)
        </p>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BirthdayCalendarDemo {
  readonly selectedDate = signal<Temporal.PlainDate | undefined>(undefined);
  readonly today = Temporal.Now.plainDateISO();

  clearSelection(): void {
    this.selectedDate.set(undefined);
  }
}`;
}
