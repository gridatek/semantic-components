import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScKbd,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScTypeset,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ControlledDateTimeInputDemoContainer } from './demos/controlled-date-time-input-demo-container';
import { DateTimeInputUsageDemoContainer } from './demos/date-time-input-usage-demo-container';
import { DisabledDateTimeInputDemoContainer } from './demos/disabled-date-time-input-demo-container';
import { FormDateTimeInputDemoContainer } from './demos/form-date-time-input-demo-container';
import { HourCycleDateTimeInputDemoContainer } from './demos/hour-cycle-date-time-input-demo-container';
import { LimitsDateTimeInputDemoContainer } from './demos/limits-date-time-input-demo-container';
import { LocaleDateTimeInputDemoContainer } from './demos/locale-date-time-input-demo-container';
import { ReadOnlyDateTimeInputDemoContainer } from './demos/read-only-date-time-input-demo-container';
import { RtlDateTimeInputDemoContainer } from './demos/rtl-date-time-input-demo-container';

@Component({
  selector: 'app-date-time-input-page',
  imports: [
    ScKbd,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScTypeset,
    Anatomy,
    ApiTable,
    PartsTable,
    TocHeading,
    ComponentBadges,
    DateTimeInputUsageDemoContainer,
    HourCycleDateTimeInputDemoContainer,
    LimitsDateTimeInputDemoContainer,
    LocaleDateTimeInputDemoContainer,
    DisabledDateTimeInputDemoContainer,
    ReadOnlyDateTimeInputDemoContainer,
    FormDateTimeInputDemoContainer,
    ControlledDateTimeInputDemoContainer,
    RtlDateTimeInputDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Date Time Input</h1>
        <p class="text-muted-foreground">
          A date and a time typed part by part — day, month, year, hour, minute,
          AM/PM — in the order and on the clock of its locale, as the Date and
          Time Inputs. In a form, a Temporal.PlainDateTime; in a Date Time
          Picker, the field.
        </p>
        <app-component-badges path="date-time-input" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-date-time-input-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          One part, in a field: it writes its own parts from the locale — their
          order, the text between them, its clock — so there is nothing to put
          inside it. The label, the description and the errors are the
          field&apos;s.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>The value</h2>
        <p>
          A <code scTypeset>Temporal.PlainDateTime</code>, through
          <code scTypeset>[formField]</code> or
          <code scTypeset>[(value)]</code>: <code scTypeset>null</code> until
          every part is filled, and again when one is emptied. No time zone: a
          local date and time, as a calendar shows them. The day stays within
          its month; a year of one or two digits is this century&apos;s. A whole
          value pasted — <code scTypeset>2026-11-02T14:30</code>, or in the
          locale&apos;s order — fills every part.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Date Time Input keys"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Key</th>
                <th scTableHeaderCell>Does</th>
              </tr>
            </thead>
            <tbody scTableBody>
              <tr scTableRow>
                <td scTableCell>Digits</td>
                <td scTableCell>
                  Fill the part; on to the next once no digit can follow
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>A</kbd> / <kbd scKbd>P</kbd></td>
                <td scTableCell>AM / PM, on a 12-hour clock</td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>↑</kbd> / <kbd scKbd>↓</kbd></td>
                <td scTableCell>
                  One up or down — all but the year wrap; an empty part starts
                  at now
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Page Up</kbd> / <kbd scKbd>Page Down</kbd>
                </td>
                <td scTableCell>
                  A bigger step: the year by 5, the month by 3, the day by 7,
                  hours by 2, minutes and seconds by 15
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Home</kbd> / <kbd scKbd>End</kbd>
                </td>
                <td scTableCell>The part&apos;s lowest / highest</td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>Backspace</kbd></td>
                <td scTableCell>
                  A digit back, then the part emptied, then the part before
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>Delete</kbd></td>
                <td scTableCell>Empties the part</td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>←</kbd> / <kbd scKbd>→</kbd></td>
                <td scTableCell>The part to the left / right, as they show</td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <span class="font-mono">/ . : ,</span>,
                  <kbd scKbd>Tab</kbd>
                </td>
                <td scTableCell>The next part (Tab: then out)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A group, named by the field&apos;s label; each part a spin button
            named in the locale&apos;s words (day, month, year, hour, minute,
            AM/PM), with its value, its range and its text — the month by its
            name; the field&apos;s description is read with it.
          </li>
          <li>
            Each part is an input: the number pad on a phone, a part to tap.
          </li>
          <li>
            Out of its limits, on an unavailable day, or invalid once left:
            every part is marked invalid; the message is the field&apos;s.
          </li>
          <li>
            It reads in its locale&apos;s direction, the clock&apos;s digits
            left to right; the arrows follow the parts as they show.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-hour-cycle-date-time-input-demo-container />
        <app-limits-date-time-input-demo-container />
        <app-locale-date-time-input-demo-container />
        <app-disabled-date-time-input-demo-container />
        <app-read-only-date-time-input-demo-container />
        <app-form-date-time-input-demo-container />
        <app-controlled-date-time-input-demo-container />
        <app-rtl-date-time-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over its own (cn: a later class
          wins); the look is the style&apos;s segmented input, as the Date and
          Time Inputs&apos;.
        </p>
        <app-parts-table label="Date Time Input parts" [parts]="parts" />
        <app-api-table label="ScDateTimeInput inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class DateTimeInputPage {
  private readonly anatomy = {
    imports:
      "import { ScDateTimeInput, ScField, ScFieldDescription, ScLabel } from '@semantic-components/ui';",
    markup: [
      '<div scField>',
      '  <label scLabel>Departure</label>',
      '  <div scDateTimeInput [formField]="form.departure"></div>',
      "  <p scFieldDescription>The airport's local time.</p>",
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScDateTimeInput',
      selector: 'div[scDateTimeInput]',
      description:
        "The group, its parts written from the locale, in the locale's direction. data-empty, data-invalid, data-disabled, data-readonly. exportAs scDateTimeInput: clear(), focus(options, part), segments(), parts().",
    },
    {
      name: 'ScDateTimeSegment',
      selector: 'input[scDateTimeSegment]',
      description:
        "A part: an input (spin button) the input writes, one per part, from the locale — the Date and Time Inputs' too; not one to place or style yourself: its look is the style's (segmentedInput.segment). data-type, data-empty.",
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'value',
      type: 'Temporal.PlainDateTime | null',
      default: 'null',
      description: 'Two-way, or [formField]: null until every part is filled.',
    },
    {
      name: 'hourCycle',
      type: '12 | 24',
      default: "the locale's",
      description: 'A 12-hour clock (with AM/PM), or 24.',
    },
    {
      name: 'granularity',
      type: "'hour' | 'minute' | 'second'",
      default: "'minute'",
      description: 'The smallest part it shows.',
    },
    {
      name: 'leadingZeros',
      type: 'boolean',
      default: 'false',
      description: "The hour always in two digits (09); else the locale's way.",
    },
    {
      name: 'minDateTime, maxDateTime',
      type: 'Temporal.PlainDateTime',
      default: '—',
      description: 'A value outside them is marked invalid.',
    },
    {
      name: 'unavailable',
      type: '(date: Temporal.PlainDate) => boolean',
      default: '() => false',
      description: 'Days that can’t be picked: marked invalid.',
    },
    {
      name: 'disabled, readonly, required, invalid, touched',
      type: 'boolean',
      default: 'false',
      description: 'Bound by [formField]: from the schema and its state.',
    },
  ];
}
