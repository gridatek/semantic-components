import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TimePickerUsageDemo } from './time-picker-usage-demo';

@Component({
  selector: 'app-time-picker-usage-demo-container',
  imports: [DemoContainer, TimePickerUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/time-picker/time-picker-usage-demo"
    >
      <app-time-picker-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TimePickerUsageDemoContainer {
  private readonly code = `import { CdkOverlayOrigin } from '@angular/cdk/overlay';
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
  ScTimePickerColumns,
  ScTimePickerTrigger,
} from '@semantic-components/ui';
import { SiClockIcon } from '@semantic-icons/lucide-icons';

/** The button in the field opens the columns, on the value; a pick sets its part at once. Enter, Escape or a click outside closes them, focus back on the button. */
@Component({
  selector: 'app-time-picker-usage-demo',
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
    ScTimePickerTrigger,
    SiClockIcon,
  ],
  template: \`
    <div scField class="w-44">
      <label scLabel>Meeting time</label>
      <div scTimePicker>
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
            </div>
          </ng-template>
        </div>
      </div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ time()?.toString() ?? 'No time.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class TimePickerUsageDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('09:30'),
  );
}`;
}
