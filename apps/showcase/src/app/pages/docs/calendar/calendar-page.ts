import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DisabledDatesCalendarDemoContainer } from './demos/disabled-dates-calendar-demo-container';
import { MinMaxCalendarDemoContainer } from './demos/min-max-calendar-demo-container';
import { MultipleDateCalendarDemoContainer } from './demos/multiple-date-calendar-demo-container';
import { RangeCalendarDemoContainer } from './demos/range-calendar-demo-container';
import { SingleDateCalendarDemoContainer } from './demos/single-date-calendar-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-calendar-page',
  imports: [
    SingleDateCalendarDemoContainer,
    MultipleDateCalendarDemoContainer,
    RangeCalendarDemoContainer,
    DisabledDatesCalendarDemoContainer,
    MinMaxCalendarDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Calendar</h1>
        <p class="text-muted-foreground">
          A date picker component with support for single, multiple, and range
          selection.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-single-date-calendar-demo-container />
        <app-multiple-date-calendar-demo-container />
        <app-range-calendar-demo-container />
        <app-disabled-dates-calendar-demo-container />
        <app-min-max-calendar-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalendarPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'calendar')!
    .status;
}
