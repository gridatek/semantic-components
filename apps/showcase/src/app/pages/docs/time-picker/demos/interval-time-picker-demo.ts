import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScTimeInput,
  ScTimePicker,
  ScTimePickerList,
  ScTimePickerTrigger,
} from '@semantic-components/ui';
import { SiClockIcon } from '@semantic-icons/lucide-icons';

/** interval: 15 minutes between the times; the input’s minTime and maxTime bound the list too. */
@Component({
  selector: 'app-interval-time-picker-demo',
  imports: [
    ScTimePicker,
    ScTimePickerTrigger,
    ScTimePickerList,
    ScTimeInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScPopoverProvider,
    ScPopoverPortal,
    ScPopover,
    ScField,
    ScLabel,
    SiClockIcon,
  ],
  template: `
    <div scField class="w-44">
      <label scLabel>Pickup</label>
      <div scTimePicker [interval]="15">
        <div scPopoverProvider [origin]="trigger.overlayOrigin" align="end">
          <div scInputGroup>
            <div
              scTimeInput
              [step]="{ minutes: 15 }"
              [minTime]="open"
              [maxTime]="close"
              [(value)]="time"
            ></div>
            <div scInputGroupAddon align="inline-end">
              <button scTimePickerTrigger #trigger="scTimePickerTrigger">
                <svg siClockIcon></svg>
                <span class="sr-only">Choose a time</span>
              </button>
            </div>
          </div>
          <ng-template scPopoverPortal>
            <div scPopover class="w-auto p-0" aria-label="Choose a time">
              <div scTimePickerList aria-label="Times"></div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ time()?.toString() ?? 'No time.' }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class IntervalTimePickerDemo {
  readonly open = Temporal.PlainTime.from('08:00');
  readonly close = Temporal.PlainTime.from('12:00');
  readonly time = signal<Temporal.PlainTime | null>(null);
}
