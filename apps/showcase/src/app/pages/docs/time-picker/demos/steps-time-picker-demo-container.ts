import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StepsTimePickerDemo } from './steps-time-picker-demo';

@Component({
  selector: 'app-steps-time-picker-demo-container',
  imports: [DemoContainer, StepsTimePickerDemo],
  template: `
    <app-demo-container
      title="Steps"
      [code]="code"
      demoUrl="/demos/time-picker/steps-time-picker-demo"
    >
      <app-steps-time-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StepsTimePickerDemoContainer {
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

/** minuteStep: the minute column every 15 minutes. Typing still takes any minute. */
@Component({
  selector: 'app-steps-time-picker-demo',
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
      <label scLabel>Call at</label>
      <div scTimePicker [minuteStep]="15">
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
export class StepsTimePickerDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('10:15'),
  );
}`;
}
