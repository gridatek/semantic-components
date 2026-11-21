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
import { ConfirmTimePickerDemoContainer } from './demos/confirm-time-picker-demo-container';
import { DisabledTimePickerDemoContainer } from './demos/disabled-time-picker-demo-container';
import { FormTimePickerDemoContainer } from './demos/form-time-picker-demo-container';
import { HourCycleTimePickerDemoContainer } from './demos/hour-cycle-time-picker-demo-container';
import { LimitsTimePickerDemoContainer } from './demos/limits-time-picker-demo-container';
import { LocaleTimePickerDemoContainer } from './demos/locale-time-picker-demo-container';
import { NowTimePickerDemoContainer } from './demos/now-time-picker-demo-container';
import { RangeTimePickerDemoContainer } from './demos/range-time-picker-demo-container';
import { RtlTimePickerDemoContainer } from './demos/rtl-time-picker-demo-container';
import { StaysOpenTimePickerDemoContainer } from './demos/stays-open-time-picker-demo-container';
import { StepsTimePickerDemoContainer } from './demos/steps-time-picker-demo-container';
import { TimePickerUsageDemoContainer } from './demos/time-picker-usage-demo-container';

@Component({
  selector: 'app-time-picker-page',
  imports: [
    ConfirmTimePickerDemoContainer,
    StaysOpenTimePickerDemoContainer,
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
    TimePickerUsageDemoContainer,
    HourCycleTimePickerDemoContainer,
    StepsTimePickerDemoContainer,
    LimitsTimePickerDemoContainer,
    RangeTimePickerDemoContainer,
    NowTimePickerDemoContainer,
    LocaleTimePickerDemoContainer,
    DisabledTimePickerDemoContainer,
    FormTimePickerDemoContainer,
    RtlTimePickerDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Time Picker</h1>
        <p class="text-muted-foreground">
          A time typed in a Time Input, or picked in columns — hour, minute,
          second, AM/PM — in a popover beside it: on the input&apos;s clock,
          locale and limits. For a range&apos;s end, how long it makes.
        </p>
        <app-component-badges path="time-picker" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-time-picker-usage-demo-container />
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
          <strong>Closing</strong> — the same in every picker: each pick moves
          on to the next part — the hour to the minutes, the minutes to AM/PM,
          and the popover closes once the value is whole, focus back on the
          trigger. With <code scTypeset>[closeOnPick]="false"</code> the picks
          still move on, but it stays open until <kbd scKbd>Enter</kbd> (keeping
          what is picked), <kbd scKbd>Escape</kbd> or a click outside. The arrow
          keys only browse. With <code scTypeset>confirm</code>, nothing closes
          by itself: Apply (or <kbd scKbd>Enter</kbd>) keeps what is picked;
          Cancel, <kbd scKbd>Escape</kbd> or a click outside leave the value as
          it was before it opened.
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
          aria-label="Time Picker keys"
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
        <app-stays-open-time-picker-demo-container />
        <app-confirm-time-picker-demo-container />
        <app-hour-cycle-time-picker-demo-container />
        <app-steps-time-picker-demo-container />
        <app-limits-time-picker-demo-container />
        <app-range-time-picker-demo-container />
        <app-now-time-picker-demo-container />
        <app-locale-time-picker-demo-container />
        <app-disabled-time-picker-demo-container />
        <app-form-time-picker-demo-container />
        <app-rtl-time-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over its own (cn: a later class
          wins). The value, the clock and the limits are the Time Input&apos;s.
        </p>
        <app-parts-table label="Time Picker parts" [parts]="parts" />
        <app-api-table label="ScTimePicker inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TimePickerPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScTimeInput,',
      '  ScTimePicker,',
      '  ScTimePickerColumns,',
      '  ScTimePickerDuration,',
      '  ScTimePickerNow,',
      '  ScTimePickerTrigger,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scTimePicker>',
      '  <div scPopoverProvider [origin]="anchor">',
      '    <div scInputGroup cdkOverlayOrigin #anchor="cdkOverlayOrigin">',
      '      <div scTimeInput [formField]="form.time"></div>',
      '      <div scInputGroupAddon side="inline-end">',
      '        <button scTimePickerTrigger>…icon, name…</button>',
      '      </div>',
      '    </div>',
      '    <ng-template scPopoverPortal>',
      '      <div scPopover aria-label="Choose a time">',
      '        <div scTimePickerColumns></div>',
      '        <span scTimePickerDuration></span>',
      '        <button scTimePickerNow>Now</button>',
      '      </div>',
      '    </ng-template>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScTimePicker',
      selector: 'div[scTimePicker]',
      description:
        'The root: reads its Time Input; the columns’ steps, a range’s start. exportAs scTimePicker: values(), enabled(part, value), pick(part, value), now(), close(), duration().',
    },
    {
      name: 'ScTimePickerTrigger',
      selector: 'button[scTimePickerTrigger]',
      description:
        'Opens and closes the columns: ghost in an input group (buttonSize), outline alone (variant). Write its icon and name.',
    },
    {
      name: 'ScTimePickerColumns',
      selector: 'div[scTimePickerColumns]',
      description:
        'The columns, written from the locale: one per part, in its order. Opens on the value, focus on the hour.',
    },
    {
      name: 'ScTimePickerColumn',
      selector: 'div[scTimePickerColumn]',
      description:
        "A column (a listbox), written by the columns — not one to place or style yourself: an option's look is the style's (timePicker.option).",
    },
    {
      name: 'ScTimePickerNow',
      selector: 'button[scTimePickerNow]',
      description:
        'The current time, on the steps — and closed: the style’s button (ghost, sm). Write its text.',
    },
    {
      name: 'ScTimePickerDuration',
      selector: '[scTimePickerDuration]',
      description:
        'How long from startTime to the value, in the locale’s words (Intl.DurationFormat); empty without a start. aria-live.',
    },
    {
      name: 'ScTimePickerApply / Cancel',
      selector: 'button[scTimePickerApply], button[scTimePickerCancel]',
      description:
        'confirm: Apply keeps what is picked (disabled until the value is whole); Cancel puts back the value from before — closed either way. The style’s buttons; your text.',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'closeOnPick',
      type: 'boolean',
      default: 'true',
      description:
        'Each pick moves on to the next part; the popover closes once the value is whole. False: it stays open until Enter, Escape or a click outside.',
    },
    {
      name: 'confirm',
      type: 'boolean',
      default: 'false',
      description:
        'Nothing closes by itself: Apply (or Enter) keeps what is picked; Cancel, Escape or a click outside put back the value from before.',
    },
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
