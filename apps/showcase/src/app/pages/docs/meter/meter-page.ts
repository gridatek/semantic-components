import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BoundsMeterDemoContainer } from './demos/bounds-meter-demo-container';
import { FormatMeterDemoContainer } from './demos/format-meter-demo-container';
import { LocaleMeterDemoContainer } from './demos/locale-meter-demo-container';
import { MeterUsageDemoContainer } from './demos/meter-usage-demo-container';
import { RtlMeterDemoContainer } from './demos/rtl-meter-demo-container';
import { ValueLabelMeterDemoContainer } from './demos/value-label-meter-demo-container';

@Component({
  selector: 'app-meter-page',
  imports: [
    ScTypeset,
    Anatomy,
    ApiTable,
    PartsTable,
    TocHeading,
    ComponentBadges,
    MeterUsageDemoContainer,
    BoundsMeterDemoContainer,
    FormatMeterDemoContainer,
    LocaleMeterDemoContainer,
    ValueLabelMeterDemoContainer,
    RtlMeterDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Meter</h1>
        <p class="text-muted-foreground">
          A measurement within a known range — storage used, a quota, a score: a
          bar filled to it, and the value screen readers hear. For a task
          getting done, a Progress.
        </p>
        <app-component-badges path="meter" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-meter-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The meter holds the value and the range; the label names it, the value
          part shows the value written, the track and its indicator draw the
          bar.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>The value</h2>
        <p>
          It follows yours — no output, no busy state (a meter always has a
          value). Written as a percent of the range by default, or as
          <code scTypeset>format</code> says: number format options (a unit, a
          currency, a decimal — then the value itself) or a function of it; in
          the app&apos;s language (<code scTypeset>LOCALE_ID</code>). A value
          outside the range is held to it for the bar, the percent and
          <code scTypeset>aria-valuenow</code>; a format that isn&apos;t a
          percent writes it as given. The root sets
          <code scTypeset>--sc-meter-value</code>, the percent.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A <code scTypeset>meter</code>: its range, its value and the value
            written (<code scTypeset>aria-valuetext</code>); named by its label,
            or <code scTypeset>aria-label</code>.
          </li>
          <li>
            The value shown is hidden from screen readers — the meter reads it.
            When it needs more words, <code scTypeset>valueLabel</code> gives
            them.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-bounds-meter-demo-container />
        <app-format-meter-demo-container />
        <app-locale-meter-demo-container />
        <app-value-label-meter-demo-container />
        <app-rtl-meter-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes <code scTypeset>class</code>, merged over its own (cn:
          a later class wins). The look is the style&apos;s progress bar (<code
            scTypeset
            >progress</code
          >: track, label, value).
        </p>
        <app-parts-table label="Meter parts" [parts]="parts" />
        <app-api-table label="ScMeter inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class MeterPage {
  private readonly anatomy = {
    imports:
      "import { ScMeter, ScMeterIndicator, ScMeterLabel, ScMeterTrack, ScMeterValue } from '@semantic-components/ui';",
    markup: [
      '<div scMeter [value]="68">',
      '  <span scMeterLabel>Storage used</span>',
      '  <span scMeterValue></span>',
      '  <div scMeterTrack><div scMeterIndicator></div></div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScMeter',
      selector: 'div[scMeter]',
      description:
        'The value and the range: role meter. exportAs scMeter: text(), percent(), clamped().',
    },
    {
      name: 'ScMeterLabel',
      selector: '[scMeterLabel]',
      description: 'Its name.',
    },
    {
      name: 'ScMeterValue',
      selector: '[scMeterValue]',
      description:
        'The value written — or your text inside it. Hidden from screen readers.',
    },
    {
      name: 'ScMeterTrack',
      selector: 'div[scMeterTrack]',
      description: 'The bar.',
    },
    {
      name: 'ScMeterIndicator',
      selector: 'div[scMeterIndicator]',
      description: 'The bar filled to the value, from the start of the line.',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'value',
      type: 'number',
      default: '—',
      description: 'Required: the reading.',
    },
    {
      name: 'min, max',
      type: 'number',
      default: '0, 100',
      description: 'The range.',
    },
    {
      name: 'format',
      type: 'Intl.NumberFormatOptions | (value) => string',
      default: "{ style: 'percent' }",
      description: 'How the value is written.',
    },
    {
      name: 'valueLabel',
      type: '(value, { formatted, percent, min, max }) => string',
      default: '—',
      description: 'What screen readers hear instead.',
    },
  ];
}
