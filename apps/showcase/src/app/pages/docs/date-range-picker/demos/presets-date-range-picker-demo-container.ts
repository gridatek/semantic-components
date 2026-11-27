import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PresetsDateRangePickerDemo } from './presets-date-range-picker-demo';

@Component({
  selector: 'app-presets-date-range-picker-demo-container',
  imports: [DemoContainer, PresetsDateRangePickerDemo],
  template: `
    <app-demo-container
      title="Presets"
      [code]="code"
      demoUrl="/demos/date-range-picker/presets-date-range-picker-demo"
    >
      <app-presets-date-range-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PresetsDateRangePickerDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarRange,
  ScDateRangePicker,
  ScDateRangePickerPreset,
  ScDateRangePickerPresets,
  ScDateRangePickerTrigger,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  injectFormatDate,
  scDateRangePresets,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** scDateRangePickerPreset buttons beside the calendar: a preset is picked as the calendar’s pick would be — and pressed while it is the value. scDateRangePresets gives the common ones, named by you. */
@Component({
  selector: 'app-presets-date-range-picker-demo',
  imports: [
    ScDateRangePicker,
    ScDateRangePickerTrigger,
    ScPopoverProvider,
    ScPopoverPortal,
    ScPopover,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarPrevious,
    ScCalendarNext,
    ScDateRangePickerPreset,
    ScDateRangePickerPresets,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scDateRangePicker
      #dp="scDateRangePicker"
      [(value)]="range"
      class="w-72"
    >
      <div scPopoverProvider [origin]="trigger.overlayOrigin" alignment="start">
        <button scDateRangePickerTrigger #trigger="scDateRangePickerTrigger">
          <svg siCalendarIcon></svg>
          <span>{{ formatDate(range()) || 'Pick dates' }}</span>
        </button>
        <ng-template scPopoverPortal>
          <div
            scPopover
            class="w-auto flex-row gap-0 p-0"
            aria-label="Choose dates"
          >
            <div scDateRangePickerPresets aria-label="Presets">
              @for (preset of presets; track preset.label) {
                <button scDateRangePickerPreset [value]="preset.value">
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
      {{ formatDate(range()) || 'Nothing picked.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class PresetsDateRangePickerDemo {
  // The value as written: Intl's, in the user's digits — or your own format.
  private readonly formatDate = injectFormatDate();
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
