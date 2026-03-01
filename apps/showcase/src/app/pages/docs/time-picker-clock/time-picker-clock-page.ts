import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { HoursTimePickerClockDemoContainer } from './demos/hours-time-picker-clock-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-time-picker-clock-page',
  imports: [
    HoursTimePickerClockDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>TimePickerClock</h1>
        <p class="text-muted-foreground">
          A visual clock interface for selecting hours or minutes.
        </p>
        <app-component-badges path="time-picker-clock" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-hours-time-picker-clock-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TimePickerClockPage {}
