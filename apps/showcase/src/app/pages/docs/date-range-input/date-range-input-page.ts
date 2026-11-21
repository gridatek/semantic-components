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
import { ControlledDateRangeInputDemoContainer } from './demos/controlled-date-range-input-demo-container';
import { DateRangeInputUsageDemoContainer } from './demos/date-range-input-usage-demo-container';
import { DisabledDateRangeInputDemoContainer } from './demos/disabled-date-range-input-demo-container';
import { FormDateRangeInputDemoContainer } from './demos/form-date-range-input-demo-container';
import { LimitsDateRangeInputDemoContainer } from './demos/limits-date-range-input-demo-container';
import { LocaleDateRangeInputDemoContainer } from './demos/locale-date-range-input-demo-container';
import { RtlDateRangeInputDemoContainer } from './demos/rtl-date-range-input-demo-container';

@Component({
  selector: 'app-date-range-input-page',
  imports: [
    ScKbd,
    ScTypeset,
    Anatomy,
    ApiTable,
    PartsTable,
    TocHeading,
    ComponentBadges,
    DateRangeInputUsageDemoContainer,
    LimitsDateRangeInputDemoContainer,
    LocaleDateRangeInputDemoContainer,
    DisabledDateRangeInputDemoContainer,
    FormDateRangeInputDemoContainer,
    ControlledDateRangeInputDemoContainer,
    RtlDateRangeInputDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Date Range Input</h1>
        <p class="text-muted-foreground">
          A range of days typed in one box: your two Date Inputs, start and end,
          named by you. In a form, a range of Temporal.PlainDate; in a Date
          Range Picker, the picker&apos;s field.
        </p>
        <app-component-badges path="date-range-input" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-date-range-input-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The box is the range; inside it, your two
          <code scTypeset>scDateInput</code>s —
          <code scTypeset>part="start"</code> and
          <code scTypeset>part="end"</code>, each named by you — and what goes
          between them. The ends lose their own box: the range draws one round
          both.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>The value</h2>
        <p>
          <code scTypeset>{{ '{' }} from, to {{ '}' }}</code> — the
          Calendar&apos;s range — or <code scTypeset>null</code>, through
          <code scTypeset>[formField]</code> or
          <code scTypeset>[(value)]</code>. Each end writes its side once it is
          whole. A day outside the limits, an unavailable one, or an end before
          the start is marked invalid; whether both ends are required is your
          schema&apos;s to say. In a Date Range Picker, the value and the limits
          are the picker&apos;s.
        </p>
        <p>
          The keys are the Date Input&apos;s, all the way through:
          <kbd scKbd>Tab</kbd> or a typed separator goes from the start&apos;s
          last part to the end&apos;s first.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A group, named by the field&apos;s label; each end a group named by
            you (Check-in, Check-out), its parts spin buttons named in the
            locale&apos;s words.
          </li>
          <li>
            Leaving the range — not going from one end to the other — marks it
            touched.
          </li>
          <li>
            Invalid: the box, and the parts of an end on the wrong side or out
            of range.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-limits-date-range-input-demo-container />
        <app-locale-date-range-input-demo-container />
        <app-disabled-date-range-input-demo-container />
        <app-form-date-range-input-demo-container />
        <app-controlled-date-range-input-demo-container />
        <app-rtl-date-range-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          It takes
          <code scTypeset>class</code>, merged over its own (cn: a later class
          wins); its look is the style&apos;s segmented input. The ends are Date
          Inputs.
        </p>
        <app-parts-table label="Date Range Input parts" [parts]="parts" />
        <app-api-table label="ScDateRangeInput inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class DateRangeInputPage {
  private readonly anatomy = {
    imports:
      "import { ScDateInput, ScDateRangeInput } from '@semantic-components/ui';",
    markup: [
      '<div scDateRangeInput [formField]="form.stay">',
      '  <div scDateInput part="start" aria-label="Check-in"></div>',
      '  <span aria-hidden="true">–</span>',
      '  <div scDateInput part="end" aria-label="Check-out"></div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScDateRangeInput',
      selector: 'div[scDateRangeInput]',
      description:
        "The range: a group in the style's box, its two ends inside. data-invalid, data-disabled, data-readonly, data-empty. exportAs scDateRangeInput: clear(), focus(), current(), canPick(date).",
    },
    {
      name: 'ScDateInput',
      selector: 'div[scDateInput][part]',
      description:
        "An end: part='start' or 'end', named by you; its box dropped in the range's.",
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'value',
      type: 'ScCalendarRange | null',
      default: 'null',
      description:
        'Two-way, or [formField]: { from, to }. In a Date Range Picker: the picker’s.',
    },
    {
      name: 'minDate, maxDate',
      type: 'Temporal.PlainDate',
      default: '—',
      description: 'For both ends: a day outside them is marked invalid.',
    },
    {
      name: 'unavailable',
      type: '(date: Temporal.PlainDate) => boolean',
      default: '() => false',
      description: 'Days that can’t be picked, at either end.',
    },
    {
      name: 'disabled, readonly, required, invalid, touched',
      type: 'boolean',
      default: 'false',
      description:
        'Bound by [formField]; disabled, read-only and required reach both ends.',
    },
  ];
}
