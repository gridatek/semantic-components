import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicDateInputDemoContainer } from './demos/basic-date-input-demo-container';
import { DisabledDateInputDemoContainer } from './demos/disabled-date-input-demo-container';
import { FormDateInputDemoContainer } from './demos/form-date-input-demo-container';
import { LimitsDateInputDemoContainer } from './demos/limits-date-input-demo-container';
import { LocaleDateInputDemoContainer } from './demos/locale-date-input-demo-container';
import { SegmentedDateInputDemoContainer } from './demos/segmented-date-input-demo-container';
import { SegmentedLocaleDateInputDemoContainer } from './demos/segmented-locale-date-input-demo-container';

@Component({
  selector: 'app-date-input-page',
  imports: [
    ScKbd,
    BasicDateInputDemoContainer,
    LocaleDateInputDemoContainer,
    LimitsDateInputDemoContainer,
    FormDateInputDemoContainer,
    DisabledDateInputDemoContainer,
    SegmentedDateInputDemoContainer,
    SegmentedLocaleDateInputDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Date Input</h1>
        <p class="text-muted-foreground">
          A date, typed — as text in the locale’s numeric order (scDateInput, an
          input), or part by part (scSegmentedDateInput, spin buttons). A
          [formField], its value a Temporal.PlainDate. In a date picker, either
          one is the picker’s value.
        </p>
        <app-component-badges path="date-input" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Basic</h2>
        <p>
          A text input in a field: the locale’s numeric order (here 10/14/2026)
          or ISO (2026-10-14), read on <kbd scKbd>Enter</kbd> or leaving. Text
          that is not a day stays, marked — the value as it was.
        </p>
        <app-basic-date-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Locale</h2>
        <p>LOCALE_ID provided as 'fr-FR': typed day first (14/10/2026).</p>
        <app-locale-date-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Limits</h2>
        <p>
          minDate, maxDate and unavailable days: a date outside them is not read
          — marked. Here, weekdays from today on.
        </p>
        <app-limits-date-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>In a form</h2>
        <p>A [formField]: required, from the schema; marked once left.</p>
        <app-form-date-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Disabled</h2>
        <p>disabled: shown, not edited.</p>
        <app-disabled-date-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Segmented</h2>
        <p>
          scSegmentedDateInput: typed part by part — each part a spin button.
          Digits fill it and move on, arrows step it (an empty part starts at
          today), <kbd scKbd>Backspace</kbd> clears it; the day stays within its
          month. Its value is null until every part is filled.
        </p>
        <app-segmented-date-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Segmented, French</h2>
        <p>
          LOCALE_ID provided as 'fr-FR': day, month, year — the parts named in
          French.
        </p>
        <app-segmented-locale-date-input-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class DateInputPage {}
