import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicTimePickerDemo } from './basic-time-picker-demo';

@Component({
  selector: 'app-basic-time-picker-demo-container',
  imports: [DemoContainer, BasicTimePickerDemo],
  template: `
    <app-demo-container
      title="Basic"
      [code]="code"
      demoUrl="/demos/time-picker/basic-time-picker-demo"
    >
      <app-basic-time-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicTimePickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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

/** The button in the field opens the times, every 30 minutes — focus on the value, or the time before it. A pick closes them, focus back on the button. */
@Component({
  selector: 'app-basic-time-picker-demo',
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
  template: \`
    <div scField class="w-44">
      <label scLabel>Meeting</label>
      <div scTimePicker>
        <div scPopoverProvider [origin]="trigger.overlayOrigin" align="end">
          <div scInputGroup>
            <div scTimeInput [(value)]="time"></div>
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
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicTimePickerDemo {
  readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('10:00'),
  );
}`;
}
