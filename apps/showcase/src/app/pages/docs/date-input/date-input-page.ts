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
import { ControlledDateInputDemoContainer } from './demos/controlled-date-input-demo-container';
import { DateInputUsageDemoContainer } from './demos/date-input-usage-demo-container';
import { DisabledDateInputDemoContainer } from './demos/disabled-date-input-demo-container';
import { FormDateInputDemoContainer } from './demos/form-date-input-demo-container';
import { LimitsDateInputDemoContainer } from './demos/limits-date-input-demo-container';
import { LocaleDateInputDemoContainer } from './demos/locale-date-input-demo-container';
import { ReadOnlyDateInputDemoContainer } from './demos/read-only-date-input-demo-container';
import { RtlDateInputDemoContainer } from './demos/rtl-date-input-demo-container';
import { UnavailableDateInputDemoContainer } from './demos/unavailable-date-input-demo-container';

@Component({
  selector: 'app-date-input-page',
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
    DateInputUsageDemoContainer,
    LimitsDateInputDemoContainer,
    UnavailableDateInputDemoContainer,
    LocaleDateInputDemoContainer,
    DisabledDateInputDemoContainer,
    ReadOnlyDateInputDemoContainer,
    FormDateInputDemoContainer,
    ControlledDateInputDemoContainer,
    RtlDateInputDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Date Input</h1>
        <p class="text-muted-foreground">
          A date typed part by part — day, month, year — in the order of its
          locale. Each part is an input: a number pad on a phone, digits that
          move on by themselves, arrows that step. In a form, a
          Temporal.PlainDate; in a Date Picker, the picker&apos;s day.
        </p>
        <app-component-badges path="date-input" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-date-input-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          One part, in a field: it writes its own parts from the locale — their
          order and the text between them — so there is nothing to put inside
          it. The label, the description and the errors are the field&apos;s.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>The value</h2>
        <p>
          A <code scTypeset>Temporal.PlainDate</code>, through
          <code scTypeset>[formField]</code> or
          <code scTypeset>[(value)]</code>: <code scTypeset>null</code> until
          every part is filled, and again when one is emptied. The day stays
          within its month — January 31, then February: the 28th. A year of one
          or two digits is this century&apos;s (<span class="font-mono"
            >27</span
          >
          → 2027). A whole date pasted — <code scTypeset>2026-11-02</code>, or
          in the locale&apos;s order — fills every part. In a Date Picker it is
          the picker&apos;s day, a range&apos;s end with
          <code scTypeset>part</code>, and takes the picker&apos;s limits.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Date Input keys"
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
                  Fill the part; on to the next once no digit can follow (<span
                    class="font-mono"
                    >4</span
                  >, <span class="font-mono">12</span>,
                  <span class="font-mono">2026</span>)
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>↑</kbd> / <kbd scKbd>↓</kbd></td>
                <td scTableCell>
                  One up or down — the day and month wrap; an empty part starts
                  at today
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Page Up</kbd> / <kbd scKbd>Page Down</kbd>
                </td>
                <td scTableCell>
                  A bigger step: the year by 5, the month by 3, the day by 7
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Home</kbd> / <kbd scKbd>End</kbd>
                </td>
                <td scTableCell>
                  The part&apos;s lowest / highest (the day&apos;s: the
                  month&apos;s last)
                </td>
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
                  <span class="font-mono">/ . -</span>, <kbd scKbd>Tab</kbd>
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
            named in the locale&apos;s words (day, month, year), with its value,
            its range and its text — the month by its name; the field&apos;s
            description is read with it.
          </li>
          <li>
            Each part is an input: the number pad on a phone, a part to tap.
          </li>
          <li>
            Out of its limits, unavailable, or invalid once left: every part is
            marked invalid; the message is the field&apos;s.
          </li>
          <li>
            It reads in its locale&apos;s direction — right to left in Arabic,
            left to right in English, whatever the page; the arrows follow the
            parts as they show.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-limits-date-input-demo-container />
        <app-unavailable-date-input-demo-container />
        <app-locale-date-input-demo-container />
        <app-disabled-date-input-demo-container />
        <app-read-only-date-input-demo-container />
        <app-form-date-input-demo-container />
        <app-controlled-date-input-demo-container />
        <app-rtl-date-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over its own (cn: a later class
          wins); the look is the style&apos;s segmented input, as the Time
          Input&apos;s.
        </p>
        <app-parts-table label="Date Input parts" [parts]="parts" />
        <app-api-table label="ScDateInput inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class DateInputPage {
  private readonly anatomy = {
    imports:
      "import { ScDateInput, ScField, ScFieldDescription, ScLabel } from '@semantic-components/ui';",
    markup: [
      '<div scField>',
      '  <label scLabel>Birthday</label>',
      '  <div scDateInput [formField]="form.birthday"></div>',
      '  <p scFieldDescription>We send a card on the day.</p>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScDateInput',
      selector: 'div[scDateInput]',
      description:
        "The group, its parts written from the locale, in the locale's direction. data-empty, data-invalid, data-disabled, data-readonly. exportAs scDateInput: clear(), focus(options, part), segments(), date().",
    },
    {
      name: 'ScDateInputSegment',
      selector: 'input[scDateInputSegment]',
      description:
        "A part: an input (spin button) the date input writes, one per part, from the locale — not one to place or style yourself; its look is the style's (segmentedInput.segment). data-type, data-empty.",
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'value',
      type: 'Temporal.PlainDate | null',
      default: 'null',
      description:
        'Two-way, or [formField]: null until every part is filled. In a Date Picker: the picker’s.',
    },
    {
      name: 'minDate, maxDate',
      type: 'Temporal.PlainDate',
      default: '—',
      description:
        'A day outside them is marked invalid (in a Date Picker: the picker’s).',
    },
    {
      name: 'unavailable',
      type: '(date: Temporal.PlainDate) => boolean',
      default: '() => false',
      description: 'Days that can’t be picked: marked invalid.',
    },
    {
      name: 'part',
      type: "'start' | 'end'",
      default: '—',
      description: 'In a Date Picker’s range: the end it is.',
    },
    {
      name: 'disabled, readonly, required, invalid, touched',
      type: 'boolean',
      default: 'false',
      description: 'Bound by [formField]: from the schema and its state.',
    },
  ];
}
