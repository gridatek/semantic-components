import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicDatePickerDemoContainer } from './demos/basic-date-picker-demo-container';
import { PlaceholderDatePickerDemoContainer } from './demos/placeholder-date-picker-demo-container';
import { RangeDatePickerDemoContainer } from './demos/range-date-picker-demo-container';
import { MultipleDatePickerDemoContainer } from './demos/multiple-date-picker-demo-container';
import { ConstrainedDatePickerDemoContainer } from './demos/constrained-date-picker-demo-container';
import { FormDatePickerDemoContainer } from './demos/form-date-picker-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-date-picker-page',
  imports: [
    BasicDatePickerDemoContainer,
    PlaceholderDatePickerDemoContainer,
    RangeDatePickerDemoContainer,
    MultipleDatePickerDemoContainer,
    ConstrainedDatePickerDemoContainer,
    FormDatePickerDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">DatePicker</h1>
        <p class="text-muted-foreground">
          A date picker component with calendar popup for selecting dates.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-date-picker-demo-container />
        <app-placeholder-date-picker-demo-container />
        <app-range-date-picker-demo-container />
        <app-multiple-date-picker-demo-container />
        <app-constrained-date-picker-demo-container />
        <app-form-date-picker-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DatePickerPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'date-picker')!
    .status;
}
