import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicDateRangePickerDemoContainer } from './demos/basic-date-range-picker-demo-container';
import { PresetsDateRangePickerDemoContainer } from './demos/presets-date-range-picker-demo-container';
import { ConstrainedDateRangePickerDemoContainer } from './demos/constrained-date-range-picker-demo-container';
import { FormatsDateRangePickerDemoContainer } from './demos/formats-date-range-picker-demo-container';
import { NoClearDateRangePickerDemoContainer } from './demos/no-clear-date-range-picker-demo-container';
import { DisabledDateRangePickerDemoContainer } from './demos/disabled-date-range-picker-demo-container';
import { AnalyticsDateRangePickerDemoContainer } from './demos/analytics-date-range-picker-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

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
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">DateRangePicker</h1>
        <p class="text-muted-foreground">
          Select a range of dates with presets, min/max constraints, and various
          display formats.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
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
export default class DateRangePickerPage {
  readonly componentStatus = COMPONENTS.find(
    (c) => c.path === 'date-range-picker',
  )!.status;
}
