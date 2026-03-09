import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AnalyticsDateRangePickerDemoContainer } from './demos/analytics-date-range-picker-demo-container';
import { BasicDateRangePickerDemoContainer } from './demos/basic-date-range-picker-demo-container';
import { ConstrainedDateRangePickerDemoContainer } from './demos/constrained-date-range-picker-demo-container';
import { DisabledDateRangePickerDemoContainer } from './demos/disabled-date-range-picker-demo-container';
import { FormatsDateRangePickerDemoContainer } from './demos/formats-date-range-picker-demo-container';
import { NoClearDateRangePickerDemoContainer } from './demos/no-clear-date-range-picker-demo-container';
import { PresetsDateRangePickerDemoContainer } from './demos/presets-date-range-picker-demo-container';

@Component({
  selector: 'app-date-range-picker-page',
  imports: [
    BasicDateRangePickerDemoContainer,
    PresetsDateRangePickerDemoContainer,
    ConstrainedDateRangePickerDemoContainer,
    FormatsDateRangePickerDemoContainer,
    NoClearDateRangePickerDemoContainer,
    DisabledDateRangePickerDemoContainer,
    AnalyticsDateRangePickerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>DateRangePicker</h1>
        <p class="text-muted-foreground">
          Select a range of dates with presets, min/max constraints, and various
          display formats.
        </p>
        <app-component-badges path="date-range-picker" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-date-range-picker-demo-container />
        <app-presets-date-range-picker-demo-container />
        <app-constrained-date-range-picker-demo-container />
        <app-formats-date-range-picker-demo-container />
        <app-no-clear-date-range-picker-demo-container />
        <app-disabled-date-range-picker-demo-container />
        <app-analytics-date-range-picker-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DateRangePickerPage {}
