import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClockHoursTimePickerDemoContainer } from './demos/clock-hours-time-picker-demo-container';
import { ClockMinutesTimePickerDemoContainer } from './demos/clock-minutes-time-picker-demo-container';
import { DisabledTimePickerDemoContainer } from './demos/disabled-time-picker-demo-container';
import { Format12hTimePickerDemoContainer } from './demos/format-12h-time-picker-demo-container';
import { Format24hTimePickerDemoContainer } from './demos/format-24h-time-picker-demo-container';
import { PresetsTimePickerDemoContainer } from './demos/presets-time-picker-demo-container';
import { SecondsTimePickerDemoContainer } from './demos/seconds-time-picker-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-time-picker-page',
  imports: [
    Format12hTimePickerDemoContainer,
    Format24hTimePickerDemoContainer,
    SecondsTimePickerDemoContainer,
    DisabledTimePickerDemoContainer,
    ClockHoursTimePickerDemoContainer,
    ClockMinutesTimePickerDemoContainer,
    PresetsTimePickerDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">TimePicker</h1>
        <p class="text-muted-foreground">
          A component for selecting time values.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-format-12h-time-picker-demo-container />
        <app-format-24h-time-picker-demo-container />
        <app-seconds-time-picker-demo-container />
        <app-disabled-time-picker-demo-container />
        <app-clock-hours-time-picker-demo-container />
        <app-clock-minutes-time-picker-demo-container />
        <app-presets-time-picker-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TimePickerPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'time-picker')!
    .status;
}
