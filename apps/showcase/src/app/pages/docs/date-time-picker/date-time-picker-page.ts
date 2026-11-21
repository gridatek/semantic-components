import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DateTimePickerUsageDemoContainer } from './demos/date-time-picker-usage-demo-container';
import { FormDateTimePickerDemoContainer } from './demos/form-date-time-picker-demo-container';
import { LimitsDateTimePickerDemoContainer } from './demos/limits-date-time-picker-demo-container';
import { LocaleDateTimePickerDemoContainer } from './demos/locale-date-time-picker-demo-container';
import { RtlDateTimePickerDemoContainer } from './demos/rtl-date-time-picker-demo-container';
import { StepsDateTimePickerDemoContainer } from './demos/steps-date-time-picker-demo-container';

@Component({
  selector: 'app-date-time-picker-page',
  imports: [
    ScKbd,
    ScTypeset,
    Anatomy,
    ApiTable,
    PartsTable,
    TocHeading,
    ComponentBadges,
    DateTimePickerUsageDemoContainer,
    StepsDateTimePickerDemoContainer,
    LimitsDateTimePickerDemoContainer,
    LocaleDateTimePickerDemoContainer,
    FormDateTimePickerDemoContainer,
    RtlDateTimePickerDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Date Time Picker</h1>
        <p class="text-muted-foreground">
          A date and a time typed in a Date Time Input, or picked in a popover
          beside it: the day in a calendar, the time in columns — on the
          input&apos;s clock, locale and limits.
        </p>
        <app-component-badges path="date-time-picker" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-date-time-picker-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The picker holds your field — the Date Time Input, the value, the
          locale, the clock, the limits: put
          <code scTypeset>[formField]</code> on it — and a button that opens the
          popover: your Calendar, and the Time Picker&apos;s columns beside it.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Picking</h2>
        <p>
          A day picked in the calendar sets the input&apos;s date, a value
          picked in a column its time&apos;s part — at once, as typing does; the
          value comes once both are there. The popover stays open for the other:
          <kbd scKbd>Enter</kbd> in a column, <kbd scKbd>Escape</kbd> or a click
          outside closes it, focus back on the button. It opens on the day,
          focus in the calendar; the columns at the time.
        </p>
        <p>
          Give the calendar the picker&apos;s
          <code scTypeset>date()</code>, <code scTypeset>minDate()</code>,
          <code scTypeset>maxDate()</code> and
          <code scTypeset>unavailable()</code>: they are the input&apos;s. On
          the first or last day, the times outside the limits can&apos;t be
          picked.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The button is named by you, and says the popover is open; the
            popover is a dialog, named by you; the calendar is a grid, each time
            column a listbox named in the locale&apos;s words.
          </li>
          <li>
            <kbd scKbd>Tab</kbd> goes from the calendar to the columns; in them,
            <kbd scKbd>←</kbd> / <kbd scKbd>→</kbd> move between columns,
            <kbd scKbd>↑</kbd> / <kbd scKbd>↓</kbd> pick.
          </li>
          <li>
            Typing in the field is always there: the popover is another way, not
            the only one.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-steps-date-time-picker-demo-container />
        <app-limits-date-time-picker-demo-container />
        <app-locale-date-time-picker-demo-container />
        <app-form-date-time-picker-demo-container />
        <app-rtl-date-time-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over its own (cn: a later class
          wins). The value, the clock and the limits are the Date Time
          Input&apos;s; the calendar is the Calendar, the columns the Time
          Picker&apos;s.
        </p>
        <app-parts-table label="Date Time Picker parts" [parts]="parts" />
        <app-api-table label="ScDateTimePicker inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class DateTimePickerPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScCalendar,',
      '  ScDateTimeInput,',
      '  ScDateTimePicker,',
      '  ScDateTimePickerTrigger,',
      '  ScTimePickerColumns,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scDateTimePicker #dtp="scDateTimePicker">',
      '  <div scPopoverProvider [origin]="anchor">',
      '    <div scInputGroup cdkOverlayOrigin #anchor="cdkOverlayOrigin">',
      '      <div scDateTimeInput [formField]="form.departure"></div>',
      '      <div scInputGroupAddon side="inline-end">',
      '        <button scDateTimePickerTrigger>…icon, name…</button>',
      '      </div>',
      '    </div>',
      '    <ng-template scPopoverPortal>',
      '      <div scPopover class="w-auto flex-row gap-0 p-0" aria-label="…">',
      '        <div scCalendar initialFocus [value]="dtp.date()"',
      '             [minDate]="dtp.minDate()" [maxDate]="dtp.maxDate()"',
      '             [unavailable]="dtp.unavailable()"',
      '             (valueChange)="dtp.pickDate($event)">…</div>',
      '        <div scTimePickerColumns [initialFocus]="false"></div>',
      '      </div>',
      '    </ng-template>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScDateTimePicker',
      selector: 'div[scDateTimePicker]',
      description:
        'The root: reads its Date Time Input; the columns’ steps. exportAs scDateTimePicker: date(), minDate(), maxDate(), unavailable() for the calendar; pickDate(value), pick(part, value), enabled(part, value), close().',
    },
    {
      name: 'ScDateTimePickerTrigger',
      selector: 'button[scDateTimePickerTrigger]',
      description:
        'Opens and closes the popover: ghost in an input group (buttonSize), outline alone (variant). Write its icon and name.',
    },
    {
      name: 'ScTimePickerColumns',
      selector: 'div[scTimePickerColumns]',
      description:
        'The Time Picker’s columns, for the time: [initialFocus]="false" here — the calendar takes the focus.',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'minuteStep',
      type: 'number',
      default: '1',
      description: 'Minutes between the minute column’s values.',
    },
    {
      name: 'secondStep',
      type: 'number',
      default: '1',
      description: 'Seconds between the second column’s values.',
    },
  ];
}
