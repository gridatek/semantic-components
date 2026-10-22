import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicDateRangePickerDemoContainer } from './demos/basic-date-range-picker-demo-container';
import { ConfirmDateRangePickerDemoContainer } from './demos/confirm-date-range-picker-demo-container';
import { ConstraintsDateRangePickerDemoContainer } from './demos/constraints-date-range-picker-demo-container';
import { FormDateRangePickerDemoContainer } from './demos/form-date-range-picker-demo-container';
import { PresetsDateRangePickerDemoContainer } from './demos/presets-date-range-picker-demo-container';
import { TypedDateRangePickerDemoContainer } from './demos/typed-date-range-picker-demo-container';

@Component({
  selector: 'app-date-range-picker-page',
  imports: [
    BasicDateRangePickerDemoContainer,
    PresetsDateRangePickerDemoContainer,
    TypedDateRangePickerDemoContainer,
    ConfirmDateRangePickerDemoContainer,
    ConstraintsDateRangePickerDemoContainer,
    FormDateRangePickerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Date Range Picker</h1>
        <p class="text-muted-foreground">
          The date picker in range mode (mode="range"): a range picked in the
          calendar, typed end by end, or a preset; kept at once, or on Apply.
        </p>
        <app-component-badges path="date-range-picker" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          mode="range" on the date picker, two months: written as one span ("Oct
          12 – 18, 2026"); it closes once both ends are picked.
        </p>
        <app-basic-date-range-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Presets</h2>
        <p class="text-muted-foreground">
          scDatePickerPreset buttons beside the calendar: a preset is picked as
          the calendar’s pick would be — and pressed while it is the value.
          scDateRangePresets gives the common ones, named by you.
        </p>
        <app-presets-date-range-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Typed</h2>
        <p class="text-muted-foreground">
          Each end typed — part="start" and part="end" in one input group: the
          locale’s numeric order or ISO; an end before the start is marked. The
          button in the field opens the calendar.
        </p>
        <app-typed-date-range-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Apply</h2>
        <p class="text-muted-foreground">
          confirm: picks and presets are a draft, kept by scDatePickerApply —
          Cancel, Escape or a click outside drop it. Two months and presets, as
          on an analytics page.
        </p>
        <app-confirm-date-range-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Constraints</h2>
        <p class="text-muted-foreground">
          minDate and maxDate on the picker and its calendar: from today, up to
          90 days ahead.
        </p>
        <app-constraints-date-range-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>In a form</h2>
        <p class="text-muted-foreground">
          A [formField]: a whole range required, by a validator in the schema;
          marked once the calendar has closed.
        </p>
        <app-form-date-range-picker-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class DateRangePickerPage {}
