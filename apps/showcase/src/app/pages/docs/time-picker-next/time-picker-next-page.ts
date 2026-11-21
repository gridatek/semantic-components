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
import { DisabledTimePickerNextDemoContainer } from './demos/disabled-time-picker-next-demo-container';
import { FormTimePickerNextDemoContainer } from './demos/form-time-picker-next-demo-container';
import { HourCycleTimePickerNextDemoContainer } from './demos/hour-cycle-time-picker-next-demo-container';
import { LimitsTimePickerNextDemoContainer } from './demos/limits-time-picker-next-demo-container';
import { LocaleTimePickerNextDemoContainer } from './demos/locale-time-picker-next-demo-container';
import { NowTimePickerNextDemoContainer } from './demos/now-time-picker-next-demo-container';
import { RangeTimePickerNextDemoContainer } from './demos/range-time-picker-next-demo-container';
import { RtlTimePickerNextDemoContainer } from './demos/rtl-time-picker-next-demo-container';
import { StepsTimePickerNextDemoContainer } from './demos/steps-time-picker-next-demo-container';
import { TimePickerNextUsageDemoContainer } from './demos/time-picker-next-usage-demo-container';

@Component({
  selector: 'app-time-picker-next-page',
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
    TimePickerNextUsageDemoContainer,
    HourCycleTimePickerNextDemoContainer,
    StepsTimePickerNextDemoContainer,
    LimitsTimePickerNextDemoContainer,
    RangeTimePickerNextDemoContainer,
    NowTimePickerNextDemoContainer,
    LocaleTimePickerNextDemoContainer,
    DisabledTimePickerNextDemoContainer,
    FormTimePickerNextDemoContainer,
    RtlTimePickerNextDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Time Picker Next</h1>
        <p class="text-muted-foreground">
          A time typed in a Time Input, or picked in columns — hour, minute,
          second, AM/PM — in a popover beside it: on the input&apos;s clock,
          locale and limits. For a range&apos;s end, how long it makes.
        </p>
        <app-component-badges path="time-picker-next" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-time-picker-next-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The picker holds your field: the Time Input — the value, the locale,
          the clock, the limits; put
          <code scTypeset>[formField]</code> on it — and a button that opens the
          columns in a popover. Under them, if you want, a Now button and the
          duration.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>The columns</h2>
        <p>
          One column per part of the time input, in the locale&apos;s order —
          AM/PM first in Korean — the clock&apos;s left to right in any page. A
          pick sets that part at once, as typing does: an hour alone leaves the
          value empty until the minute is there. Outside
          <code scTypeset>minTime</code> / <code scTypeset>maxTime</code>, or
          before <code scTypeset>startTime</code>, values can&apos;t be picked:
          an hour with no minute left, the minutes of the hour picked.
        </p>
        <p>
          The columns are written by the picker, from the locale: not markup of
          yours, and not styled from it — an option&apos;s look is the
          style&apos;s.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Time Picker Next keys"
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
                <td scTableCell><kbd scKbd>↑</kbd> / <kbd scKbd>↓</kbd></td>
                <td scTableCell>
                  The value before / after in the column: picked
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Home</kbd> / <kbd scKbd>End</kbd>
                </td>
                <td scTableCell>The column&apos;s first / last value</td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>←</kbd> / <kbd scKbd>→</kbd></td>
                <td scTableCell>
                  The column to the left / right, as they show
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>Space</kbd></td>
                <td scTableCell>Picks the focused value</td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>Enter</kbd></td>
                <td scTableCell>Picks it and closes</td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>Escape</kbd></td>
                <td scTableCell>Closes, focus back on the button</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The button is named by you, and says the popover is open
            (aria-expanded); the popover is a dialog, named by you.
          </li>
          <li>
            Each column is a listbox named in the locale&apos;s words (hour,
            minute, AM/PM); its value selected, the ones out of range disabled.
          </li>
          <li>
            It opens on the value, focus on the hour; closed, focus is back on
            the button.
          </li>
          <li>The duration is said as it changes.</li>
          <li>
            Typing in the field is always there: the columns are another way,
            not the only one.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-hour-cycle-time-picker-next-demo-container />
        <app-steps-time-picker-next-demo-container />
        <app-limits-time-picker-next-demo-container />
        <app-range-time-picker-next-demo-container />
        <app-now-time-picker-next-demo-container />
        <app-locale-time-picker-next-demo-container />
        <app-disabled-time-picker-next-demo-container />
        <app-form-time-picker-next-demo-container />
        <app-rtl-time-picker-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over its own (cn: a later class
          wins). The value, the clock and the limits are the Time Input&apos;s.
        </p>
        <app-parts-table label="Time Picker Next parts" [parts]="parts" />
        <app-api-table label="ScTimePickerNext inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TimePickerNextPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScTimeInput,',
      '  ScTimePickerNext,',
      '  ScTimePickerNextColumns,',
      '  ScTimePickerNextDuration,',
      '  ScTimePickerNextNow,',
      '  ScTimePickerNextTrigger,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scTimePickerNext>',
      '  <div scPopoverProvider [origin]="anchor">',
      '    <div scInputGroup cdkOverlayOrigin #anchor="cdkOverlayOrigin">',
      '      <div scTimeInput [formField]="form.time"></div>',
      '      <div scInputGroupAddon side="inline-end">',
      '        <button scTimePickerNextTrigger>…icon, name…</button>',
      '      </div>',
      '    </div>',
      '    <ng-template scPopoverPortal>',
      '      <div scPopover aria-label="Choose a time">',
      '        <div scTimePickerNextColumns></div>',
      '        <span scTimePickerNextDuration></span>',
      '        <button scTimePickerNextNow>Now</button>',
      '      </div>',
      '    </ng-template>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScTimePickerNext',
      selector: 'div[scTimePickerNext]',
      description:
        'The root: reads its Time Input; the columns’ steps, a range’s start. exportAs scTimePickerNext: values(), enabled(part, value), pick(part, value), now(), close(), duration().',
    },
    {
      name: 'ScTimePickerNextTrigger',
      selector: 'button[scTimePickerNextTrigger]',
      description:
        'Opens and closes the columns: ghost in an input group (buttonSize), outline alone (variant). Write its icon and name.',
    },
    {
      name: 'ScTimePickerNextColumns',
      selector: 'div[scTimePickerNextColumns]',
      description:
        'The columns, written from the locale: one per part, in its order. Opens on the value, focus on the hour.',
    },
    {
      name: 'ScTimePickerNextColumn',
      selector: 'div[scTimePickerNextColumn]',
      description:
        "A column (a listbox), written by the columns — not one to place or style yourself: an option's look is the style's (timePicker.option).",
    },
    {
      name: 'ScTimePickerNextNow',
      selector: 'button[scTimePickerNextNow]',
      description:
        'The current time, on the steps — and closed: the style’s button (ghost, sm). Write its text.',
    },
    {
      name: 'ScTimePickerNextDuration',
      selector: '[scTimePickerNextDuration]',
      description:
        'How long from startTime to the value, in the locale’s words (Intl.DurationFormat); empty without a start. aria-live.',
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
    {
      name: 'startTime',
      type: 'Temporal.PlainTime',
      default: '—',
      description:
        'A range’s start: earlier times can’t be picked; the duration counts from it.',
    },
  ];
}
