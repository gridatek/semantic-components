import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicDatePickerDemoContainer } from './demos/basic-date-picker-demo-container';
import { ConstrainedDatePickerDemoContainer } from './demos/constrained-date-picker-demo-container';
import { FormDatePickerDemoContainer } from './demos/form-date-picker-demo-container';
import { MultipleDatePickerDemoContainer } from './demos/multiple-date-picker-demo-container';
import { RangeDatePickerDemoContainer } from './demos/range-date-picker-demo-container';

@Component({
  selector: 'app-date-picker-page',
  imports: [
    BasicDatePickerDemoContainer,
    RangeDatePickerDemoContainer,
    MultipleDatePickerDemoContainer,
    ConstrainedDatePickerDemoContainer,
    FormDatePickerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Date Picker</h1>
        <p class="text-muted-foreground">
          A date picker component with calendar popup for selecting dates.
        </p>
        <app-component-badges path="date-picker" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-date-picker-demo-container />
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
export default class DatePickerPage {}
