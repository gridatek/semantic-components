import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicTimeClockDemoContainer } from './demos/basic-time-clock-demo-container';
import { FormTimeClockDemoContainer } from './demos/form-time-clock-demo-container';
import { InputTimeClockDemoContainer } from './demos/input-time-clock-demo-container';
import { LimitsTimeClockDemoContainer } from './demos/limits-time-clock-demo-container';
import { LocaleTimeClockDemoContainer } from './demos/locale-time-clock-demo-container';
import { StepTimeClockDemoContainer } from './demos/step-time-clock-demo-container';

@Component({
  selector: 'app-time-clock-page',
  imports: [
    ScKbd,
    BasicTimeClockDemoContainer,
    LocaleTimeClockDemoContainer,
    StepTimeClockDemoContainer,
    LimitsTimeClockDemoContainer,
    InputTimeClockDemoContainer,
    FormTimeClockDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Time Clock</h1>
        <p class="text-muted-foreground">
          A time picked on a clock face — the hour, then the minute — by pointer
          or keyboard, in the app’s language, 12 or 24 hours. A [formField].
        </p>
        <app-component-badges path="time-clock" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Basic</h2>
        <p>
          The hour, then the minute: drag or click the hand, or the keyboard on
          the dial (arrows, <kbd scKbd>Page Up</kbd>/Down,
          <kbd scKbd>Home</kbd>/<kbd scKbd>End</kbd>, <kbd scKbd>Enter</kbd>).
          The header shows the time and switches the view; AM and PM in 12
          hours.
        </p>
        <app-basic-time-clock-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>24 hours</h2>
        <p>
          LOCALE_ID provided as 'fr-FR': 24 hours — 13 to 00 on an inner ring.
          hourCycle overrides the locale’s 12 or 24.
        </p>
        <app-locale-time-clock-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Step</h2>
        <p>
          step: 5 minutes — the hand snaps to them, the arrows move by them.
        </p>
        <app-step-time-clock-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Limits</h2>
        <p>
          minTime and maxTime: the hours and minutes outside them are dimmed and
          cannot be picked. Here, 9:00 to 17:30, every quarter hour.
        </p>
        <app-limits-time-clock-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>With a time input</h2>
        <p>One value for a time input and the clock: type it, or pick it.</p>
        <app-input-time-clock-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>In a form</h2>
        <p>A [formField]: required, from the schema; marked once left.</p>
        <app-form-time-clock-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TimeClockPage {}
