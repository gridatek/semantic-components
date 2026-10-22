import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicTimePickerDemoContainer } from './demos/basic-time-picker-demo-container';
import { FormTimePickerDemoContainer } from './demos/form-time-picker-demo-container';
import { IntervalTimePickerDemoContainer } from './demos/interval-time-picker-demo-container';
import { LocaleTimePickerDemoContainer } from './demos/locale-time-picker-demo-container';

@Component({
  selector: 'app-time-picker-page',
  imports: [
    BasicTimePickerDemoContainer,
    IntervalTimePickerDemoContainer,
    LocaleTimePickerDemoContainer,
    FormTimePickerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Time Picker</h1>
        <p class="text-muted-foreground">
          A time input with a list of times in a popover — every interval,
          within its limits, written in the app’s language. Type the time, or
          pick it.
        </p>
        <app-component-badges path="time-picker" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          The button in the field opens the times, every 30 minutes — focus on
          the value, or the time before it. A pick closes them, focus back on
          the button.
        </p>
        <app-basic-time-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Interval and limits</h2>
        <p class="text-muted-foreground">
          interval: 15 minutes between the times; the input’s minTime and
          maxTime bound the list too.
        </p>
        <app-interval-time-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Locale</h2>
        <p class="text-muted-foreground">
          The input’s locale and hour cycle write the list too: here French, 24
          hours.
        </p>
        <app-locale-time-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>In a form</h2>
        <p class="text-muted-foreground">
          The [formField] is on the time input; the list fills it. Required —
          marked once the list closes or the input is left.
        </p>
        <app-form-time-picker-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TimePickerPage {}
