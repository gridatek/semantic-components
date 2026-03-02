import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DisabledTimePickerDemoContainer } from './demos/disabled-time-picker-demo-container';
import { Format12hTimePickerDemoContainer } from './demos/format-12h-time-picker-demo-container';
import { Format24hTimePickerDemoContainer } from './demos/format-24h-time-picker-demo-container';
import { PopoverTimePickerDemoContainer } from './demos/popover-time-picker-demo-container';
import { PresetsTimePickerDemoContainer } from './demos/presets-time-picker-demo-container';
import { SecondsTimePickerDemoContainer } from './demos/seconds-time-picker-demo-container';

@Component({
  selector: 'app-time-picker-page',
  imports: [
    Format12hTimePickerDemoContainer,
    Format24hTimePickerDemoContainer,
    SecondsTimePickerDemoContainer,
    DisabledTimePickerDemoContainer,
    PopoverTimePickerDemoContainer,
    PresetsTimePickerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Time Picker</h1>
        <p class="text-muted-foreground">
          A component for selecting time values.
        </p>
        <app-component-badges path="time-picker" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-format-12h-time-picker-demo-container />
        <app-format-24h-time-picker-demo-container />
        <app-seconds-time-picker-demo-container />
        <app-disabled-time-picker-demo-container />
        <app-popover-time-picker-demo-container />
        <app-presets-time-picker-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TimePickerPage {}
