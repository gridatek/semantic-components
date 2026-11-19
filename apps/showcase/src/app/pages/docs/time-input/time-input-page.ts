import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicTimeInputDemoContainer } from './demos/basic-time-input-demo-container';
import { DisabledTimeInputDemoContainer } from './demos/disabled-time-input-demo-container';
import { FormTimeInputDemoContainer } from './demos/form-time-input-demo-container';
import { LimitsTimeInputDemoContainer } from './demos/limits-time-input-demo-container';
import { LocaleTimeInputDemoContainer } from './demos/locale-time-input-demo-container';
import { SecondsTimeInputDemoContainer } from './demos/seconds-time-input-demo-container';

@Component({
  selector: 'app-time-input-page',
  imports: [
    ScKbd,
    BasicTimeInputDemoContainer,
    LocaleTimeInputDemoContainer,
    SecondsTimeInputDemoContainer,
    LimitsTimeInputDemoContainer,
    FormTimeInputDemoContainer,
    DisabledTimeInputDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Time Input</h1>
        <p class="text-muted-foreground">
          A time, typed part by part — hour, minute, AM/PM — in the order, the
          separators and the hour cycle of the app’s language. Each part is a
          spin button: arrows step it, digits fill it,
          <kbd scKbd>Backspace</kbd> clears it. A [formField], its value a
          Temporal.PlainTime.
        </p>
        <app-component-badges path="time-input" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Basic</h2>
        <p>
          In a field, named by its label. Type the digits — it moves on by
          itself — or use the arrows; AM/PM takes a or p.
        </p>
        <app-basic-time-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Locale</h2>
        <p>
          LOCALE_ID provided as 'fr-FR': 24 hours, the parts named in French.
          hourCycle overrides the locale’s 12 or 24 hours.
        </p>
        <app-locale-time-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Seconds</h2>
        <p>
          granularity="second" adds the seconds; "hour" keeps only the hour.
        </p>
        <app-seconds-time-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Step and limits</h2>
        <p>
          step, 15 minutes here, for the arrows; minTime and maxTime: a time
          outside them is marked.
        </p>
        <app-limits-time-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>In a form</h2>
        <p>
          A [formField]: required, from the schema — null until every part is
          filled; marked once left.
        </p>
        <app-form-time-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Disabled</h2>
        <p>disabled: shown, not edited — out of the tab order.</p>
        <app-disabled-time-input-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TimeInputPage {}
