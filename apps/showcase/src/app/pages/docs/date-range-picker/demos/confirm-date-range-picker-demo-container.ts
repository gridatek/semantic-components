import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ConfirmDateRangePickerDemo } from './confirm-date-range-picker-demo';

@Component({
  selector: 'app-confirm-date-range-picker-demo-container',
  imports: [DemoContainer, ConfirmDateRangePickerDemo],
  template: `
    <app-demo-container
      title="Apply"
      [code]="code"
      demoUrl="/demos/date-range-picker/confirm-date-range-picker-demo"
    >
      <app-confirm-date-range-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmDateRangePickerDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarFooter,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarRange,
  ScDateRangePicker,
  ScDateRangePickerApply,
  ScDateRangePickerCancel,
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

/** confirm: picks and presets are a draft, kept by scDateRangePickerApply — Cancel, Escape or a click outside drop it. Two months and presets, as on an analytics page. */
@Component({
  selector: 'app-confirm-date-range-picker-demo',
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
    ScDateRangePickerApply,
    ScDateRangePickerCancel,
    ScCalendarFooter,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scDateRangePicker
      #dp="scDateRangePicker"
      confirm
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
              [numberOfMonths]="2"
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
              <div scCalendarFooter class="justify-end">
                <button scDateRangePickerCancel>Cancel</button>
                <button scDateRangePickerApply>Apply</button>
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
export class ConfirmDateRangePickerDemo {
  // The value as written: Intl's, in the user's digits — or your own format.
  private readonly formatDate = injectFormatDate();
  private readonly presets = scDateRangePresets({
    today: 'Today',
    yesterday: 'Yesterday',
    last7Days: 'Last 7 days',
    last30Days: 'Last 30 days',
    thisMonth: 'This month',
    lastMonth: 'Last month',
  });
  private readonly range = signal<ScCalendarRange | null>(
    this.presets[2].value,
  );
}`;
}
