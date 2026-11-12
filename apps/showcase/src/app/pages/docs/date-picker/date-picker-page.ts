import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScHeading,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BirthDatePickerDemoContainer } from './demos/birth-date-picker-demo-container';
import { ConstraintsDatePickerDemoContainer } from './demos/constraints-date-picker-demo-container';
import { DatePickerUsageDemoContainer } from './demos/date-picker-usage-demo-container';
import { FormDatePickerDemoContainer } from './demos/form-date-picker-demo-container';
import { LocaleDatePickerDemoContainer } from './demos/locale-date-picker-demo-container';
import { MultipleDatePickerDemoContainer } from './demos/multiple-date-picker-demo-container';
import { RangeDatePickerDemoContainer } from './demos/range-date-picker-demo-container';
import { RtlDatePickerDemoContainer } from './demos/rtl-date-picker-demo-container';
import { SegmentedDatePickerDemoContainer } from './demos/segmented-date-picker-demo-container';
import { TypedDatePickerDemoContainer } from './demos/typed-date-picker-demo-container';

@Component({
  selector: 'app-date-picker-page',
  imports: [
    Anatomy,
    DatePickerUsageDemoContainer,
    TypedDatePickerDemoContainer,
    SegmentedDatePickerDemoContainer,
    BirthDatePickerDemoContainer,
    RangeDatePickerDemoContainer,
    MultipleDatePickerDemoContainer,
    ConstraintsDatePickerDemoContainer,
    FormDatePickerDemoContainer,
    LocaleDatePickerDemoContainer,
    RtlDatePickerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
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
        <h2 scHeading appToc>Usage</h2>
        <app-date-picker-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          The picker holds the value; a popover holds the calendar, opened by
          the trigger — a button showing the day, or an icon button in an input
          group beside a typed input (the popover then anchored to the group).
          Presets and Apply / Cancel buttons are optional.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            The trigger opens a dialog (the popover) holding the calendar, a
            grid: focus goes to the chosen day (or today); the arrow keys move
            by day and week, Home and End, Page Up and Page Down by month (with
            Shift, by year); Enter or Space picks.
          </li>
          <li>
            A pick closes it, focus back on the trigger; Escape closes it too.
            With confirm, picks are a draft until Apply.
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
        <h2 scHeading appToc>Examples</h2>
        <app-typed-date-picker-demo-container />
        <app-segmented-date-picker-demo-container />
        <app-birth-date-picker-demo-container />
        <app-range-date-picker-demo-container />
        <app-multiple-date-picker-demo-container />
        <app-constraints-date-picker-demo-container />
        <app-form-date-picker-demo-container />
        <app-locale-date-picker-demo-container />
        <app-rtl-date-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the preset (cn: a later class wins). The calendar and the
          popover are their own components: see Calendar and Popover.
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Date Picker parts"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Part</th>
                <th scTableHeaderCell>Selector</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (part of parts; track part.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.name }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.selector }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ part.description }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class DatePickerPage {
  protected readonly anatomy = {
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

  protected readonly parts = [
    {
      name: 'ScDatePicker',
      selector: 'div[scDatePicker]',
      description:
        "Holds the value: [(value)] (a day, days or a range — the calendar's); mode ('single', 'multiple', 'range'); format (Intl options, dateStyle medium) and locale; minDate, maxDate, unavailable; confirm (picks a draft until Apply); a [formField] (disabled, invalid, touched). exportAs scDatePicker: text() (the value as written), draft(), pick(), apply(), cancel().",
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
