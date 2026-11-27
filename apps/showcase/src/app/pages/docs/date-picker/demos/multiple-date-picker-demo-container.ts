import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MultipleDatePickerDemo } from './multiple-date-picker-demo';

@Component({
  selector: 'app-multiple-date-picker-demo-container',
  imports: [DemoContainer, MultipleDatePickerDemo],
  template: `
    <app-demo-container
      title="Multiple"
      description="Several days, written as a list in the app’s language; it stays open while you pick."
      [code]="code"
      demoUrl="/demos/date-picker/multiple-date-picker-demo"
    >
      <app-multiple-date-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleDatePickerDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScDatePicker,
  ScDatePickerTrigger,
  ScInputButton,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  injectFormatDate,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** Several days, written as a list in the app’s language; it stays open while you pick. */
@Component({
  selector: 'app-multiple-date-picker-demo',
  imports: [
    ScInputButton,
    ScDatePicker,
    ScDatePickerTrigger,
    ScPopoverProvider,
    ScPopoverPortal,
    ScPopover,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarPrevious,
    ScCalendarNext,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scDatePicker
      #dp="scDatePicker"
      mode="multiple"
      [(value)]="days"
      class="w-full max-w-80"
    >
      <div scPopoverProvider [origin]="trigger.overlayOrigin" alignment="start">
        <button
          scInputButton
          scDatePickerTrigger
          #trigger="scDatePickerTrigger"
          class="w-full"
        >
          <svg siCalendarIcon></svg>
          <span>{{ formatDate(days()) || 'Pick days' }}</span>
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-auto p-0" aria-label="Choose days">
            <div
              scCalendar
              initialFocus
              aria-label="Choose days"
              [mode]="dp.mode()"
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
      {{ formatDate(days()) || 'Nothing picked.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleDatePickerDemo {
  // The value as written: Intl's, in the user's digits — or your own format.
  private readonly formatDate = injectFormatDate();
  private readonly days = signal<ScCalendarValue>(null);
}`;
}
