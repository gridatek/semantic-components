import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScButton,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
  ScTimePicker,
  ScTimePickerHoursInput,
  ScTimePickerInput,
  ScTimePickerMinutesInput,
  ScTimePickerPeriod,
  ScTimePickerPeriodAM,
  ScTimePickerPeriodPM,
  ScTimePickerSeparator,
  ScTimeValue,
} from '@semantic-components/ui';
import { SiClockIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-popover-time-picker-demo',
  imports: [
    ScButton,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTrigger,
    ScTimePicker,
    ScTimePickerInput,
    ScTimePickerHoursInput,
    ScTimePickerMinutesInput,
    ScTimePickerSeparator,
    ScTimePickerPeriod,
    ScTimePickerPeriodAM,
    ScTimePickerPeriodPM,
    SiClockIcon,
  ],
  template: `
    <div scPopoverProvider>
      <button
        scButton
        scPopoverTrigger
        variant="outline"
        class="w-48 justify-start gap-2"
      >
        <svg siClockIcon class="size-4"></svg>
        {{ formatTime(time()) }}
      </button>
      <ng-template scPopoverPortal>
        <div scPopover class="w-auto p-4">
          <div scTimePicker format="12h" [(value)]="time">
            <input scTimePickerInput scTimePickerHoursInput />
            <span scTimePickerSeparator>:</span>
            <input scTimePickerInput scTimePickerMinutesInput />
            <div scTimePickerPeriod>
              <button scTimePickerPeriodAM>AM</button>
              <button scTimePickerPeriodPM>PM</button>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverTimePickerDemo {
  readonly time = signal<ScTimeValue | null>({
    hours: 9,
    minutes: 30,
    period: 'AM',
  });

  formatTime(val: ScTimeValue | null): string {
    if (!val) return 'Pick a time';
    const hours = val.hours % 12 || 12;
    const period = val.period || (val.hours >= 12 ? 'PM' : 'AM');
    return `${hours.toString().padStart(2, '0')}:${val.minutes.toString().padStart(2, '0')} ${period}`;
  }
}
