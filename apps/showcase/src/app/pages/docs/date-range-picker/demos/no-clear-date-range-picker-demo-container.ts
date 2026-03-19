import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NoClearDateRangePickerDemo } from './no-clear-date-range-picker-demo';

@Component({
  selector: 'app-no-clear-date-range-picker-demo-container',
  imports: [DemoContainer, NoClearDateRangePickerDemo],
  template: `
    <app-demo-container
      title="Without Clear Button"
      demoUrl="/demos/date-range-picker/no-clear-date-range-picker-demo"
      [code]="code"
    >
      <app-no-clear-date-range-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoClearDateRangePickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
  ScCalendarNext,
  ScCalendarPrevious,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
} from '@semantic-components/ui';
import {
  ScDateRangePicker,
  ScDateRangePickerFooter,
  ScDateRangePickerTrigger,
} from '@semantic-components/ui-lab';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-no-clear-date-range-picker-demo',
  imports: [
    ScDateRangePicker,
    ScDateRangePickerTrigger,
    ScDateRangePickerFooter,
    ScPopoverProvider,
    ScPopoverPortal,
    ScPopover,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarHeading,
    ScCalendarPrevious,
    ScCalendarNext,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scDateRangePicker
      placeholder="No clear button"
      #drp="scDateRangePicker"
    >
      <div scPopoverProvider [origin]="trigger.overlayOrigin" align="start">
        <button scDateRangePickerTrigger #trigger="scDateRangePickerTrigger">
          <svg siCalendarIcon class="mr-2 size-4"></svg>
          <span [class]="drp.displayText() ? '' : 'text-muted-foreground'">
            {{ drp.displayText() || drp.placeholder() }}
          </span>
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-auto p-0">
            <div class="p-3">
              <div
                scCalendar
                mode="range"
                [value]="drp.value()"
                (valueChange)="drp.onValueChange($event)"
                #cal="scCalendar"
              >
                <div scCalendarHeader>
                  <button scCalendarPrevious>
                    <svg siChevronLeftIcon class="size-4"></svg>
                    <span class="sr-only">
                      @switch (cal.viewMode()) {
                        @case ('day') {
                          Go to previous month
                        }
                        @case ('month') {
                          Go to previous year
                        }
                        @case ('year') {
                          Go to previous decade
                        }
                      }
                    </span>
                  </button>
                  <button scCalendarHeading>{{ cal.heading() }}</button>
                  <button scCalendarNext>
                    <svg siChevronRightIcon class="size-4"></svg>
                    <span class="sr-only">
                      @switch (cal.viewMode()) {
                        @case ('day') {
                          Go to next month
                        }
                        @case ('month') {
                          Go to next year
                        }
                        @case ('year') {
                          Go to next decade
                        }
                      }
                    </span>
                  </button>
                </div>
              </div>
              <div scDateRangePickerFooter></div>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoClearDateRangePickerDemo {}`;
}
