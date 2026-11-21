import { CdkOverlayOrigin } from '@angular/cdk/overlay';
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
  ScTimePickerNext,
  ScTimePickerNextColumns,
  ScTimePickerNextNow,
  ScTimePickerNextTrigger,
} from '@semantic-components/ui';
import { SiClockIcon } from '@semantic-icons/lucide-icons';

/** scTimePickerNow: the current time, on the steps — and closed. Its text is yours. */
@Component({
  selector: 'app-now-time-picker-next-demo',
  imports: [
    CdkOverlayOrigin,
    ScField,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScTimeInput,
    ScTimePickerNext,
    ScTimePickerNextColumns,
    ScTimePickerNextNow,
    ScTimePickerNextTrigger,
    SiClockIcon,
  ],
  template: `
    <div scField class="w-44">
      <label scLabel>Arrived at</label>
      <div scTimePickerNext [minuteStep]="5">
        <div scPopoverProvider [origin]="anchor" alignment="start">
          <div scInputGroup cdkOverlayOrigin #anchor="cdkOverlayOrigin">
            <div scTimeInput [(value)]="time"></div>
            <div scInputGroupAddon side="inline-end">
              <button scTimePickerNextTrigger>
                <svg siClockIcon></svg>
                <span class="sr-only">Choose a time</span>
              </button>
            </div>
          </div>
          <ng-template scPopoverPortal>
            <div scPopover class="w-auto p-0" aria-label="Choose a time">
              <div scTimePickerNextColumns></div>
              <div class="flex justify-end border-t p-1">
                <button scTimePickerNextNow>Now</button>
              </div>
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
export class NowTimePickerNextDemo {
  private readonly time = signal<Temporal.PlainTime | null>(null);
}
