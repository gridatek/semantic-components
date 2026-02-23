import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { HoursTimePickerClockDemoContainer } from './demos/hours-time-picker-clock-demo-container';
import { MinutesTimePickerClockDemoContainer } from './demos/minutes-time-picker-clock-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

@Component({
  selector: 'app-time-picker-clock-page',
  imports: [
    HoursTimePickerClockDemoContainer,
    MinutesTimePickerClockDemoContainer,
    TocHeading,
    ComponentBadges,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">TimePickerClock</h1>
        <p class="text-muted-foreground">
          A visual clock interface for selecting hours or minutes.
        </p>
        <app-component-badges path="time-picker-clock" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-hours-time-picker-clock-demo-container />
        <app-minutes-time-picker-clock-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TimePickerClockPage {}
