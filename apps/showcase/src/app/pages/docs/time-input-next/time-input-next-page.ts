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
import { ControlledTimeInputNextDemoContainer } from './demos/controlled-time-input-next-demo-container';
import { DisabledTimeInputNextDemoContainer } from './demos/disabled-time-input-next-demo-container';
import { FormTimeInputNextDemoContainer } from './demos/form-time-input-next-demo-container';
import { HourCycleTimeInputNextDemoContainer } from './demos/hour-cycle-time-input-next-demo-container';
import { LimitsTimeInputNextDemoContainer } from './demos/limits-time-input-next-demo-container';
import { LocaleTimeInputNextDemoContainer } from './demos/locale-time-input-next-demo-container';
import { ReadOnlyTimeInputNextDemoContainer } from './demos/read-only-time-input-next-demo-container';
import { RtlTimeInputNextDemoContainer } from './demos/rtl-time-input-next-demo-container';
import { TimeInputNextUsageDemoContainer } from './demos/time-input-next-usage-demo-container';

@Component({
  selector: 'app-time-input-next-page',
  imports: [
    ScKbd,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeaderCell,
    ScTableHeader,
    ScTableRow,
    ScTypeset,
    Anatomy,
    ApiTable,
    PartsTable,
    TocHeading,
    ComponentBadges,
    TimeInputNextUsageDemoContainer,
    HourCycleTimeInputNextDemoContainer,
    LimitsTimeInputNextDemoContainer,
    LocaleTimeInputNextDemoContainer,
    DisabledTimeInputNextDemoContainer,
    ReadOnlyTimeInputNextDemoContainer,
    FormTimeInputNextDemoContainer,
    ControlledTimeInputNextDemoContainer,
    RtlTimeInputNextDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Time Input Next</h1>
        <p class="text-muted-foreground">
          A time typed part by part — hour, minute, second, AM/PM — on the clock
          and in the order of its locale. Each part is an input: a number pad on
          a phone, digits that move on by themselves, arrows that step. In a
          form, a Temporal.PlainTime.
        </p>
        <app-component-badges path="time-input-next" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-time-input-next-usage-demo-container />
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
          A <code scTypeset>Temporal.PlainTime</code>, through
          <code scTypeset>[formField]</code> or
          <code scTypeset>[(value)]</code>: <code scTypeset>null</code> until
          every part is filled, and again when one is emptied. Whatever clock
          shows, the value is the day&apos;s time (14:30). A whole time pasted —
          <code scTypeset>14:30</code>, <code scTypeset>2:30 PM</code> — fills
          every part.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Time Input Next keys"
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
                    >9</span
                  >, <span class="font-mono">30</span>)
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>A</kbd> / <kbd scKbd>P</kbd></td>
                <td scTableCell>AM / PM, on a 12-hour clock</td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>↑</kbd> / <kbd scKbd>↓</kbd></td>
                <td scTableCell>
                  One up or down, wrapping; an empty part starts at now
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Page Up</kbd> / <kbd scKbd>Page Down</kbd>
                </td>
                <td scTableCell>
                  A bigger step: hours by 2, minutes and seconds by 15
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
                  <span class="font-mono">:</span>, <kbd scKbd>Tab</kbd>
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
            named in the locale&apos;s words (hour, minute, AM/PM), with its
            value, its range and its text; the field&apos;s description is read
            with it.
          </li>
          <li>
            Each part is an input: the number pad on a phone, a part to tap.
          </li>
          <li>
            Out of its limits, or invalid once left: every part is marked
            invalid; the message is the field&apos;s.
          </li>
          <li>
            Right to left, the clock&apos;s digits stay left to right; the
            arrows follow the parts as they show.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-hour-cycle-time-input-next-demo-container />
        <app-limits-time-input-next-demo-container />
        <app-locale-time-input-next-demo-container />
        <app-disabled-time-input-next-demo-container />
        <app-read-only-time-input-next-demo-container />
        <app-form-time-input-next-demo-container />
        <app-controlled-time-input-next-demo-container />
        <app-rtl-time-input-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          It takes
          <code scTypeset>class</code>, merged over its own (cn: a later class
          wins); its look is the style&apos;s input.
        </p>
        <app-parts-table label="Time Input Next parts" [parts]="parts" />
        <app-api-table label="ScTimeInputNext inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TimeInputNextPage {
  private readonly anatomy = {
    imports:
      "import { ScField, ScFieldDescription, ScLabel, ScTimeInputNext } from '@semantic-components/ui';",
    markup: [
      '<div scField>',
      '  <label scLabel>Meeting time</label>',
      '  <div scTimeInputNext [formField]="form.time"></div>',
      '  <p scFieldDescription>In your local time.</p>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScTimeInputNext',
      selector: 'div[scTimeInputNext]',
      description:
        'The group, its parts written from the locale: an input each (role spinbutton). data-empty, data-invalid, data-disabled, data-readonly; on a part, data-type and data-empty. exportAs scTimeInputNext: clear(), focus(options, part), segments(), twelveHours().',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'value',
      type: 'Temporal.PlainTime | null',
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
      name: 'minTime, maxTime',
      type: 'Temporal.PlainTime',
      default: '—',
      description: 'A time outside them is marked invalid.',
    },
    {
      name: 'disabled, readonly, required, invalid, touched',
      type: 'boolean',
      default: 'false',
      description: 'Bound by [formField]: from the schema and its state.',
    },
  ];
}
