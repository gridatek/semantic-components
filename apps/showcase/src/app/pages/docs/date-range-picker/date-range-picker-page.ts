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
import { BasicDateRangePickerDemoContainer } from './demos/basic-date-range-picker-demo-container';
import { ConfirmDateRangePickerDemoContainer } from './demos/confirm-date-range-picker-demo-container';
import { ConstraintsDateRangePickerDemoContainer } from './demos/constraints-date-range-picker-demo-container';
import { DurationDateRangePickerDemoContainer } from './demos/duration-date-range-picker-demo-container';
import { FormDateRangePickerDemoContainer } from './demos/form-date-range-picker-demo-container';
import { PresetsDateRangePickerDemoContainer } from './demos/presets-date-range-picker-demo-container';
import { RtlDateRangePickerDemoContainer } from './demos/rtl-date-range-picker-demo-container';
import { TypedDateRangePickerDemoContainer } from './demos/typed-date-range-picker-demo-container';

@Component({
  selector: 'app-date-range-picker-page',
  imports: [
    ScKbd,
    ScTypeset,
    Anatomy,
    ApiTable,
    PartsTable,
    TocHeading,
    ComponentBadges,
    BasicDateRangePickerDemoContainer,
    TypedDateRangePickerDemoContainer,
    PresetsDateRangePickerDemoContainer,
    ConfirmDateRangePickerDemoContainer,
    DurationDateRangePickerDemoContainer,
    ConstraintsDateRangePickerDemoContainer,
    FormDateRangePickerDemoContainer,
    RtlDateRangePickerDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Date Range Picker</h1>
        <p class="text-muted-foreground">
          A range of days, picked in a calendar — the start, then the end —
          typed in a Date Range Input, or a preset; written as one span in your
          language. Its own part: a range, nothing else.
        </p>
        <app-component-badges path="date-range-picker" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-basic-date-range-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The picker holds a trigger — alone, showing the value as you write it
          (<code scTypeset>injectFormatDate()</code>, or your own format), or an
          icon beside your <code scTypeset>scDateRangeInput</code> in an input
          group — and the popover: your Calendar in range mode, and if you want
          presets beside it, the duration and Apply / Cancel under it.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Picking</h2>
        <p>
          The first click sets the start, the second the end. With
          <code scTypeset>confirm</code>, picks and presets are a draft until
          Apply — Cancel, <kbd scKbd>Escape</kbd> or a click outside drop it.
          The calendar shows <code scTypeset>draft()</code> and reports to
          <code scTypeset>pick()</code>.
        </p>
        <p>
          <strong>Closing</strong> — the same in every picker: each pick moves
          on to the next part — the start to the end, and the popover closes
          once the value is whole, focus back on the trigger. With
          <code scTypeset>[closeOnPick]="false"</code> the picks still move on,
          but it stays open until <kbd scKbd>Enter</kbd> (keeping what is
          picked), <kbd scKbd>Escape</kbd> or a click outside. The arrow keys
          only browse. With <code scTypeset>confirm</code>, nothing closes by
          itself: Apply (or <kbd scKbd>Enter</kbd>) keeps what is picked;
          Cancel, <kbd scKbd>Escape</kbd> or a click outside leave the value as
          it was before it opened.
        </p>
        <p>
          Give the calendar the picker&apos;s
          <code scTypeset>minDate</code>, <code scTypeset>maxDate</code> and
          <code scTypeset>unavailable</code> too; a typed field takes them from
          the picker.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The trigger says it opens a dialog and whether it is open; the
            popover and the calendar are named by you.
          </li>
          <li>
            A preset is pressed (aria-pressed) while it is the value; the
            presets are a group you name.
          </li>
          <li>The duration is said as it changes.</li>
          <li>
            Typing is always there with a Date Range Input: the calendar is
            another way.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-typed-date-range-picker-demo-container />
        <app-presets-date-range-picker-demo-container />
        <app-confirm-date-range-picker-demo-container />
        <app-duration-date-range-picker-demo-container />
        <app-constraints-date-range-picker-demo-container />
        <app-form-date-range-picker-demo-container />
        <app-rtl-date-range-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over its own (cn: a later class
          wins). The calendar is the Calendar, the typed field the Date Range
          Input.
        </p>
        <app-parts-table label="Date Range Picker parts" [parts]="parts" />
        <app-api-table label="ScDateRangePicker inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class DateRangePickerPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScCalendar,',
      '  ScDateRangePicker,',
      '  ScDateRangePickerApply,',
      '  ScDateRangePickerCancel,',
      '  ScDateRangePickerDuration,',
      '  ScDateRangePickerPreset,',
      '  ScDateRangePickerPresets,',
      '  ScDateRangePickerTrigger,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scDateRangePicker #dp="scDateRangePicker" [(value)]="range">',
      '  <div scPopoverProvider [origin]="trigger.overlayOrigin">',
      '    <button scInputButton scDateRangePickerTrigger #trigger="scDateRangePickerTrigger">',
      "      …icon… {{ formatDate(range()) || 'Pick dates' }}",
      '    </button>',
      '    <ng-template scPopoverPortal>',
      '      <div scPopover aria-label="Choose dates">',
      '        <div scDateRangePickerPresets aria-label="Presets">',
      '          <button scDateRangePickerPreset [value]="…">…</button>',
      '        </div>',
      '        <div scCalendar mode="range" initialFocus [value]="dp.draft()"',
      '             (valueChange)="dp.pick($event)">…</div>',
      '        <span scDateRangePickerDuration></span>',
      '        <button scDateRangePickerCancel>Cancel</button>',
      '        <button scDateRangePickerApply>Apply</button>',
      '      </div>',
      '    </ng-template>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScDateRangePicker',
      selector: 'div[scDateRangePicker]',
      description:
        'The root: { from, to }. exportAs scDateRangePicker: hasValue(), draft(), canApply(), days(), nights(), pick(value), apply(), cancel(), canPick(date).',
    },
    {
      name: 'ScDateRangePickerTrigger',
      selector: 'button[scDateRangePickerTrigger]',
      description:
        'Opens the calendar — behaviour only, on your button: scInputButton alone (muted while data-placeholder, set while empty), scInputGroupButton in an input group.',
    },
    {
      name: 'ScDateRangePickerPresets',
      selector: 'div[scDateRangePickerPresets]',
      description:
        'A column of presets beside the calendar (a group: name it).',
    },
    {
      name: 'ScDateRangePickerPreset',
      selector: 'button[scDateRangePickerPreset]',
      description:
        '[value]: a ready range, picked as the calendar’s pick would be; aria-pressed while it is the value. scDateRangePresets() gives the common ones.',
    },
    {
      name: 'ScDateRangePickerDuration',
      selector: '[scDateRangePickerDuration]',
      description:
        'The draft’s days, both ends counted, in the locale’s words (Intl); aria-live. Nights: nights(), your words.',
    },
    {
      name: 'ScDateRangePickerApply / Cancel',
      selector: 'button[scDateRangePickerApply], button[…Cancel]',
      description:
        'confirm: keeps the draft (disabled until whole) / drops it — closed either way.',
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
      name: 'value',
      type: 'ScCalendarRange | null',
      default: 'null',
      description: 'Two-way, or [formField]: { from, to }.',
    },
    {
      name: 'minDate, maxDate',
      type: 'Temporal.PlainDate',
      default: '—',
      description:
        'The days that can be picked — give them to the calendar too.',
    },
    {
      name: 'unavailable',
      type: '(date: Temporal.PlainDate) => boolean',
      default: '() => false',
      description: 'Days that can’t be picked — the calendar’s too.',
    },
    {
      name: 'confirm',
      type: 'boolean',
      default: 'false',
      description: 'Picks are a draft until Apply.',
    },
    {
      name: 'disabled, invalid, touched',
      type: 'boolean',
      default: 'false',
      description: 'Bound by [formField].',
    },
  ];
}
