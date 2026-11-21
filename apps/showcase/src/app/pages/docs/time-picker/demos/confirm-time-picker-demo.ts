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
  ScTimePicker,
  ScTimePickerApply,
  ScTimePickerCancel,
  ScTimePickerColumns,
  ScTimePickerTrigger,
} from '@semantic-components/ui';
import { SiClockIcon } from '@semantic-icons/lucide-icons';

/** confirm: the picks are tried out in the field; Apply (or Enter) keeps them — Cancel, Escape or a click outside put back the time from before. */
@Component({
  selector: 'app-confirm-time-picker-demo',
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
    ScTimePicker,
    ScTimePickerColumns,
    ScTimePickerApply,
    ScTimePickerCancel,
    ScTimePickerTrigger,
    SiClockIcon,
  ],
  template: `
    <div scField class="w-44">
      <label scLabel>Meeting time</label>
      <div scTimePicker confirm>
        <div scPopoverProvider [origin]="anchor" alignment="start">
          <div scInputGroup cdkOverlayOrigin #anchor="cdkOverlayOrigin">
            <div scTimeInput [(value)]="time"></div>
            <div scInputGroupAddon side="inline-end">
              <button scTimePickerTrigger>
                <svg siClockIcon></svg>
                <span class="sr-only">Choose a time</span>
              </button>
            </div>
          </div>
          <ng-template scPopoverPortal>
            <div scPopover class="w-auto p-0" aria-label="Choose a time">
              <div scTimePickerColumns></div>
              <div class="flex justify-end gap-2 border-t p-2">
                <button scTimePickerCancel>Cancel</button>
                <button scTimePickerApply>Apply</button>
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
export class ConfirmTimePickerDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('09:30'),
  );
}
