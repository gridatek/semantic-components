import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicDatePickerDemoContainer } from './demos/basic-date-picker-demo-container';
import { BirthDatePickerDemoContainer } from './demos/birth-date-picker-demo-container';
import { ConstraintsDatePickerDemoContainer } from './demos/constraints-date-picker-demo-container';
import { FormDatePickerDemoContainer } from './demos/form-date-picker-demo-container';
import { LocaleDatePickerDemoContainer } from './demos/locale-date-picker-demo-container';
import { MultipleDatePickerDemoContainer } from './demos/multiple-date-picker-demo-container';
import { RangeDatePickerDemoContainer } from './demos/range-date-picker-demo-container';
import { SegmentedDatePickerDemoContainer } from './demos/segmented-date-picker-demo-container';
import { TypedDatePickerDemoContainer } from './demos/typed-date-picker-demo-container';

@Component({
  selector: 'app-date-picker-page',
  imports: [
    BasicDatePickerDemoContainer,
    BirthDatePickerDemoContainer,
    TypedDatePickerDemoContainer,
    SegmentedDatePickerDemoContainer,
    RangeDatePickerDemoContainer,
    MultipleDatePickerDemoContainer,
    ConstraintsDatePickerDemoContainer,
    FormDatePickerDemoContainer,
    LocaleDatePickerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Date Picker</h1>
        <p class="text-muted-foreground">
          A day — or days, or a range — picked in the calendar, or typed;
          written in the app’s language; a [formField].
        </p>
        <app-component-badges path="date-picker" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          A button showing the day, opening the calendar — focus on its day. A
          pick closes it, focus back on the button; Escape closes it too.
        </p>
        <app-basic-date-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Typed</h2>
        <p class="text-muted-foreground">
          Typed, or picked: the locale’s numeric order (here 10/14/2026) or ISO,
          read on Enter or leaving; text that is not a day stays, marked. The
          button in the field opens the calendar.
        </p>
        <app-typed-date-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Segmented</h2>
        <p class="text-muted-foreground">
          scSegmentedDateInput in the picker: typed part by part, the picker’s
          value — or picked. The button in the field opens the calendar.
        </p>
        <app-segmented-date-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Date of birth</h2>
        <p class="text-muted-foreground">
          startView="year" on the calendar: it opens on the years — a year, then
          its month, then its day. 18 or older: maxDate is today minus 18 years.
        </p>
        <app-birth-date-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Range</h2>
        <p class="text-muted-foreground">
          A range over two months: written as one span ("Oct 12 – 18, 2026"),
          closed once both ends are picked.
        </p>
        <app-range-date-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Multiple</h2>
        <p class="text-muted-foreground">
          Several days, written as a list in the app’s language; it stays open
          while you pick.
        </p>
        <app-multiple-date-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Constraints</h2>
        <p class="text-muted-foreground">
          minDate, maxDate and unavailable days on the picker — given to its
          calendar, and kept for typed days too: weekends cannot be picked.
        </p>
        <app-constraints-date-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>In a form</h2>
        <p class="text-muted-foreground">
          A [formField]: required, from the schema; marked once the calendar has
          closed — the trigger, then its field.
        </p>
        <app-form-date-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Locale</h2>
        <p class="text-muted-foreground">
          locale="fr-FR" and a long format: the value, the calendar and the
          typed order (jj/mm/aaaa) in French.
        </p>
        <app-locale-date-picker-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class DatePickerPage {}
