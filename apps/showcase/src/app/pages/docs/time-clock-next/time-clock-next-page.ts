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
import { BasicTimeClockNextDemoContainer } from './demos/basic-time-clock-next-demo-container';
import { FormTimeClockNextDemoContainer } from './demos/form-time-clock-next-demo-container';
import { InputTimeClockNextDemoContainer } from './demos/input-time-clock-next-demo-container';
import { LimitsTimeClockNextDemoContainer } from './demos/limits-time-clock-next-demo-container';
import { LocaleTimeClockNextDemoContainer } from './demos/locale-time-clock-next-demo-container';
import { RtlTimeClockNextDemoContainer } from './demos/rtl-time-clock-next-demo-container';
import { SecondsTimeClockNextDemoContainer } from './demos/seconds-time-clock-next-demo-container';
import { StepTimeClockNextDemoContainer } from './demos/step-time-clock-next-demo-container';

@Component({
  selector: 'app-time-clock-next-page',
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
    BasicTimeClockNextDemoContainer,
    LocaleTimeClockNextDemoContainer,
    SecondsTimeClockNextDemoContainer,
    StepTimeClockNextDemoContainer,
    LimitsTimeClockNextDemoContainer,
    InputTimeClockNextDemoContainer,
    FormTimeClockNextDemoContainer,
    RtlTimeClockNextDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Time Clock Next</h1>
        <p class="text-muted-foreground">
          A time picked on a clock face — the hour, then the minute, then the
          second — by pointer or keyboard, each pick moving on to the next. The
          locale&apos;s numbers, 12 hours with AM/PM or 24 on two rings. In a
          form, a Temporal.PlainTime.
        </p>
        <app-component-badges path="time-clock-next" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-basic-time-clock-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The clock holds two parts that write their own content: the header —
          the time, each part a button for its view, AM/PM in 12 hours — and the
          dial, a slider you name by view.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Picking</h2>
        <p>
          Drag or click the hand to an hour; let go, and the dial moves on to
          the minutes — then the seconds, with
          <code scTypeset>granularity="second"</code>. As in every picker, each
          pick moves on to the next part; the header&apos;s buttons go back to
          any view. An empty clock starts at now. Outside
          <code scTypeset>minTime</code> / <code scTypeset>maxTime</code>, the
          numbers are dimmed and can&apos;t be picked.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Time Clock Next keys"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Key</th>
                <th scTableHeaderCell>Does (on the dial)</th>
              </tr>
            </thead>
            <tbody scTableBody>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>↑</kbd> <kbd scKbd>→</kbd> / <kbd scKbd>↓</kbd>
                  <kbd scKbd>←</kbd>
                </td>
                <td scTableCell>One hour, or one step of minutes or seconds</td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Page Up</kbd> / <kbd scKbd>Page Down</kbd>
                </td>
                <td scTableCell>
                  Hours by 2, minutes and seconds by 15 — as the Time Input
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Home</kbd> / <kbd scKbd>End</kbd>
                </td>
                <td scTableCell>The first / last value</td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>Enter</kbd></td>
                <td scTableCell>On to the next view</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The dial is a slider (role slider): its value the hour, minute or
            second, its text the whole time as the locale writes it. Name it by
            view.
          </li>
          <li>
            The header&apos;s buttons are named in the locale&apos;s words and
            pressed while their view shows; AM and PM are pressed while theirs.
          </li>
          <li>
            The numbers on the face are decorative; right to left, the face
            never turns, and the header&apos;s time stays left to right.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-locale-time-clock-next-demo-container />
        <app-seconds-time-clock-next-demo-container />
        <app-step-time-clock-next-demo-container />
        <app-limits-time-clock-next-demo-container />
        <app-input-time-clock-next-demo-container />
        <app-form-time-clock-next-demo-container />
        <app-rtl-time-clock-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over its own (cn: a later class
          wins); the face&apos;s size and the text sizes are the style&apos;s
          (<code scTypeset>timeClock</code>).
        </p>
        <app-parts-table label="Time Clock Next parts" [parts]="parts" />
        <app-api-table label="ScTimeClockNext inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TimeClockNextPage {
  private readonly anatomy = {
    imports:
      "import { ScTimeClockNext, ScTimeClockNextDial, ScTimeClockNextHeader } from '@semantic-components/ui';",
    markup: [
      '<div scTimeClockNext #clock="scTimeClockNext" [formField]="form.at">',
      '  <div scTimeClockNextHeader></div>',
      '  <div scTimeClockNextDial [attr.aria-label]="clock.names()[clock.view()]"></div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScTimeClockNext',
      selector: 'div[scTimeClockNext]',
      description:
        'The root: the value and the view. exportAs scTimeClockNext: views(), names(), text(), partText(view), period(), setHour/Minute/Second(), setPeriod(), moveOn().',
    },
    {
      name: 'ScTimeClockNextHeader',
      selector: 'div[scTimeClockNextHeader]',
      description:
        'The time, each part a button for its view (aria-pressed), AM/PM in 12 hours. Writes its own content.',
    },
    {
      name: 'ScTimeClockNextDial',
      selector: 'div[scTimeClockNextDial]',
      description:
        "The face: a slider; its size and numbers the style's (timeClock). Writes its own content; name it by view.",
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'value',
      type: 'Temporal.PlainTime | null',
      default: 'null',
      description: 'Two-way, or [formField].',
    },
    {
      name: 'view',
      type: "'hours' | 'minutes' | 'seconds'",
      default: "'hours'",
      description: 'Two-way: what the dial shows; each pick moves on.',
    },
    {
      name: 'hourCycle',
      type: '12 | 24',
      default: "the locale's",
      description: '12 hours with AM/PM, or 24 on two rings.',
    },
    {
      name: 'granularity',
      type: "'hour' | 'minute' | 'second'",
      default: "'minute'",
      description: 'The smallest part it picks: its views.',
    },
    {
      name: 'minuteStep, secondStep',
      type: 'number',
      default: '1',
      description: 'The minutes and seconds that can be picked.',
    },
    {
      name: 'minTime, maxTime',
      type: 'Temporal.PlainTime',
      default: '—',
      description: 'Outside them, dimmed and not picked.',
    },
    {
      name: 'disabled, readonly, invalid, touched',
      type: 'boolean',
      default: 'false',
      description: 'Bound by [formField].',
    },
  ];
}
