import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PresetsDateRangePickerNextDemo } from './presets-date-range-picker-next-demo';

@Component({
  selector: 'app-presets-date-range-picker-next-demo-container',
  imports: [DemoContainer, PresetsDateRangePickerNextDemo],
  template: `
    <app-demo-container
      title="Presets"
      [code]="code"
      demoUrl="/demos/date-range-picker-next/presets-date-range-picker-next-demo"
    >
      <app-presets-date-range-picker-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PresetsDateRangePickerNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarRange,
  ScDateRangePickerNext,
  ScDateRangePickerNextPreset,
  ScDateRangePickerNextPresets,
  ScDateRangePickerNextTrigger,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  scDateRangePresets,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** scDateRangePickerNextPreset buttons beside the calendar: a preset is picked as the calendar’s pick would be — and pressed while it is the value. scDateRangePresets gives the common ones, named by you. */
@Component({
  selector: 'app-presets-date-range-picker-next-demo',
  imports: [
    ScDateRangePickerNext,
    ScDateRangePickerNextTrigger,
    ScPopoverProvider,
    ScPopoverPortal,
    ScPopover,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarPrevious,
    ScCalendarNext,
    ScDateRangePickerNextPreset,
    ScDateRangePickerNextPresets,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scDateRangePickerNext
      #dp="scDateRangePickerNext"
      [(value)]="range"
      class="w-72"
    >
      <div scPopoverProvider [origin]="trigger.overlayOrigin" alignment="start">
        <button
          scDateRangePickerNextTrigger
          #trigger="scDateRangePickerNextTrigger"
        >
          <svg siCalendarIcon></svg>
          <span>{{ dp.text() || 'Pick dates' }}</span>
        </button>
        <ng-template scPopoverPortal>
          <div
            scPopover
            class="w-auto flex-row gap-0 p-0"
            aria-label="Choose dates"
          >
            <div scDateRangePickerNextPresets aria-label="Presets">
              @for (preset of presets; track preset.label) {
                <button scDateRangePickerNextPreset [value]="preset.value">
                  {{ preset.label }}
                </button>
              }
            </div>
            <div
              scCalendar
              initialFocus
              aria-label="Choose dates"
              mode="range"
              [numberOfMonths]="1"
              [value]="dp.draft()"
              (valueChange)="dp.pick($event)"
            >
              <div scCalendarHeader>
                <button scCalendarPrevious>
                  <svg siChevronLeftIcon></svg>
                  <span class="sr-only">Previous month</span>
                </button>
                <button scCalendarNext>
                  <svg siChevronRightIcon></svg>
                  <span class="sr-only">Next month</span>
                </button>
              </div>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ dp.text() || 'Nothing picked.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class PresetsDateRangePickerNextDemo {
  private readonly range = signal<ScCalendarRange | null>(null);
  private readonly presets = scDateRangePresets({
    today: 'Today',
    yesterday: 'Yesterday',
    last7Days: 'Last 7 days',
    last30Days: 'Last 30 days',
    thisMonth: 'This month',
    lastMonth: 'Last month',
  });
}`;
}
