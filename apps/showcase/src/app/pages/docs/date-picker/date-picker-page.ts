import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BirthDatePickerDemoContainer } from './demos/birth-date-picker-demo-container';
import { ConstraintsDatePickerDemoContainer } from './demos/constraints-date-picker-demo-container';
import { DatePickerUsageDemoContainer } from './demos/date-picker-usage-demo-container';
import { FormDatePickerDemoContainer } from './demos/form-date-picker-demo-container';
import { LocaleDatePickerDemoContainer } from './demos/locale-date-picker-demo-container';
import { MultipleDatePickerDemoContainer } from './demos/multiple-date-picker-demo-container';
import { RtlDatePickerDemoContainer } from './demos/rtl-date-picker-demo-container';
import { TypedDatePickerDemoContainer } from './demos/typed-date-picker-demo-container';

@Component({
  selector: 'app-date-picker-page',
  imports: [
    ScKbd,
    PartsTable,
    Anatomy,
    DatePickerUsageDemoContainer,
    TypedDatePickerDemoContainer,
    BirthDatePickerDemoContainer,
    MultipleDatePickerDemoContainer,
    ConstraintsDatePickerDemoContainer,
    FormDatePickerDemoContainer,
    LocaleDatePickerDemoContainer,
    RtlDatePickerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Date Picker</h1>
        <p class="text-muted-foreground">
          A day — or days, or a range — picked in the calendar, or typed;
          written in the app’s language; a [formField].
        </p>
        <app-component-badges path="date-picker" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-date-picker-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The picker holds the value; a popover holds the calendar, opened by
          the trigger — a button showing the day, or an icon button in an input
          group beside a typed input (the popover then anchored to the group).
          Presets and Apply / Cancel buttons are optional.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The trigger opens a dialog (the popover) holding the calendar, a
            grid: focus goes to the chosen day (or today); the arrow keys move
            by day and week, <kbd scKbd>Home</kbd> and <kbd scKbd>End</kbd>,
            <kbd scKbd>Page Up</kbd> and <kbd scKbd>Page Down</kbd> by month
            (with <kbd scKbd>Shift</kbd>, by year); <kbd scKbd>Enter</kbd> or
            <kbd scKbd>Space</kbd> picks.
          </li>
          <li>
            A pick closes it, focus back on the trigger;
            <kbd scKbd>Escape</kbd> closes it too. With confirm, picks are a
            draft until Apply.
          </li>
          <li>
            Name every icon button and the popover (an sr-only span, an
            aria-label): the library writes no words.
          </li>
          <li>
            In a field, the trigger or the typed input takes its label and
            description; invalid (aria-invalid) once the calendar has closed,
            with Signal Forms.
          </li>
          <li>
            The value is written in the app’s language (Intl), and the calendar
            follows the page’s direction.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-typed-date-picker-demo-container />
        <app-birth-date-picker-demo-container />
        <app-multiple-date-picker-demo-container />
        <app-constraints-date-picker-demo-container />
        <app-form-date-picker-demo-container />
        <app-locale-date-picker-demo-container />
        <app-rtl-date-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the preset (cn: a later
          class wins). The calendar and the popover are their own components:
          see Calendar and Popover.
        </p>
        <app-parts-table label="Date Picker parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class DatePickerPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScDatePicker, ScDatePickerTrigger, ScDatePickerPresets, ScDatePickerPreset,',
      '  ScDatePickerApply, ScDatePickerCancel,',
      '  ScPopoverProvider, ScPopoverPortal, ScPopover,',
      '  ScCalendar, ScCalendarHeader, ScCalendarPrevious, ScCalendarNext,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scDatePicker #dp="scDatePicker" [(value)]="…">',
      '  <div scPopoverProvider [origin]="trigger.overlayOrigin">',
      '    <button scDatePickerTrigger #trigger="scDatePickerTrigger">…</button>',
      '    <ng-template scPopoverPortal>',
      '      <div scPopover aria-label="…">',
      '        <div scDatePickerPresets aria-label="…">',
      '          <button scDatePickerPreset [value]="…">…</button>',
      '        </div>',
      '        <div scCalendar [mode]="dp.mode()" [value]="dp.draft()"',
      '          (valueChange)="dp.pick($event)">',
      '          <div scCalendarHeader>',
      '            <button scCalendarPrevious>…</button>',
      '            <button scCalendarNext>…</button>',
      '          </div>',
      '        </div>',
      '        <button scDatePickerCancel>…</button>',
      '        <button scDatePickerApply>…</button>',
      '      </div>',
      '    </ng-template>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScDatePicker',
      selector: 'div[scDatePicker]',
      description:
        "Holds the value: [(value)] (a day, days or a range — the calendar's); mode ('single', 'multiple', 'range'); format (Intl options, dateStyle medium, in LOCALE_ID); minDate, maxDate, unavailable; confirm (picks a draft until Apply); a [formField] (disabled, invalid, touched). exportAs scDatePicker: text() (the value as written), draft(), pick(), apply(), cancel().",
    },
    {
      name: 'ScDatePickerTrigger',
      selector: 'button[scDatePickerTrigger]',
      description:
        "Opens the calendar. On its own: the input look, size ('default', 'sm'), your icon and text (data-placeholder while empty). In an input group: an icon button, variant ('ghost') and buttonSize ('icon-xs') — name it. exportAs scDatePickerTrigger: overlayOrigin.",
    },
    {
      name: 'ScDatePickerPresets',
      selector: 'div[scDatePickerPresets]',
      description: 'The presets, in a column beside the calendar. Name it.',
    },
    {
      name: 'ScDatePickerPreset',
      selector: 'button[scDatePickerPreset]',
      description:
        "A ready value (today, the last 7 days…): [value], picked as the calendar's would be; pressed while it is the value. variant ('ghost'), size ('sm'); your text.",
    },
    {
      name: 'ScDatePickerApply, ScDatePickerCancel',
      selector: 'button[scDatePickerApply], button[scDatePickerCancel]',
      description:
        "With confirm: Apply keeps the draft and closes (disabled until it is whole); Cancel drops it, as Escape. The preset's button (default / outline, sm); your text.",
    },
  ];
}
