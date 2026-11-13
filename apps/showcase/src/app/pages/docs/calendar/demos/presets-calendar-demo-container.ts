import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PresetsCalendarDemo } from './presets-calendar-demo';

@Component({
  selector: 'app-presets-calendar-demo-container',
  imports: [DemoContainer, PresetsCalendarDemo],
  template: `
    <app-demo-container
      title="Presets"
      demoUrl="/demos/calendar/presets-calendar-demo"
      [code]="code"
    >
      <app-presets-calendar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PresetsCalendarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScCard,
  ScCardBody,
  ScCardFooter,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** Buttons that pick a day from today; the calendar shows its month. */
@Component({
  selector: 'app-presets-calendar-demo',
  imports: [
    ScButton,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarNext,
    ScCalendarPrevious,
    ScCard,
    ScCardBody,
    ScCardFooter,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div scCard class="w-fit max-w-[300px]">
      <div scCardBody>
        <div
          scCalendar
          #cal="scCalendar"
          aria-label="Due date"
          fixedWeeks
          [(value)]="date"
          class="p-0 [--cell-size:--spacing(9.5)]"
        >
          <div scCalendarHeader>
            <button scCalendarPrevious>
              <svg siChevronLeftIcon></svg>
              <span class="sr-only">{{ previousLabel[cal.view()] }}</span>
            </button>
            <button scCalendarNext>
              <svg siChevronRightIcon></svg>
              <span class="sr-only">{{ nextLabel[cal.view()] }}</span>
            </button>
          </div>
        </div>
      </div>
      <div scCardFooter class="flex flex-wrap gap-2 border-t">
        @for (preset of presets; track preset.days) {
          <button
            scButton
            variant="outline"
            size="sm"
            class="flex-1"
            (click)="pick(preset.days)"
          >
            {{ preset.label }}
          </button>
        }
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PresetsCalendarDemo {
  readonly date = signal<ScCalendarValue>(
    Temporal.PlainDate.from('2026-02-12'),
  );
  readonly presets = [
    { label: 'Today', days: 0 },
    { label: 'Tomorrow', days: 1 },
    { label: 'In 3 days', days: 3 },
    { label: 'In a week', days: 7 },
    { label: 'In 2 weeks', days: 14 },
  ];
  pick(days: number): void {
    this.date.set(Temporal.Now.plainDateISO().add({ days }));
  }
  readonly previousLabel = {
    day: 'Previous month',
    month: 'Previous year',
    year: 'Previous years',
  };
  readonly nextLabel = {
    day: 'Next month',
    month: 'Next year',
    year: 'Next years',
  };
}`;
}
