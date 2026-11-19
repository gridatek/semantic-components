import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CardNumberTickerDemoContainer } from './demos/card-number-ticker-demo-container';
import { ChartNumberTickerDemoContainer } from './demos/chart-number-ticker-demo-container';
import { FormatsNumberTickerDemoContainer } from './demos/formats-number-ticker-demo-container';
import { NumberTickerUsageDemoContainer } from './demos/number-ticker-usage-demo-container';
import { RollNumberTickerDemoContainer } from './demos/roll-number-ticker-demo-container';
import { RtlNumberTickerDemoContainer } from './demos/rtl-number-ticker-demo-container';
import { VisibleNumberTickerDemoContainer } from './demos/visible-number-ticker-demo-container';

@Component({
  selector: 'app-number-ticker-page',
  imports: [
    NumberTickerUsageDemoContainer,
    RollNumberTickerDemoContainer,
    FormatsNumberTickerDemoContainer,
    VisibleNumberTickerDemoContainer,
    CardNumberTickerDemoContainer,
    ChartNumberTickerDemoContainer,
    RtlNumberTickerDemoContainer,
    Anatomy,
    ApiTable,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Number Ticker</h1>
        <p class="text-muted-foreground">
          A number that moves to its new value — counting, or each digit rolling
          — written in the reader’s language. No animation library: it runs
          frame by frame, and works on an SVG text too (a chart’s total).
        </p>
        <app-component-badges path="number-ticker" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-number-ticker-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          One part, on the element that holds the number — a span, a heading, an
          SVG text. It writes the number; you style it.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Screen readers get the value, never the numbers on the way: a hidden
            text with it, the moving digits hidden from them — on an SVG text,
            an image named by it.
          </li>
          <li>
            A change isn't announced: put the ticker in a live region (an
            aria-live parent) if its new value must be heard.
          </li>
          <li>
            With reduced motion (prefers-reduced-motion), the new value is there
            at once; the digits don't roll.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-roll-number-ticker-demo-container />
        <app-formats-number-ticker-demo-container />
        <app-visible-number-ticker-demo-container />
        <app-card-number-ticker-demo-container />
        <app-chart-number-ticker-demo-container />
        <app-rtl-number-ticker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <app-api-table label="ScNumberTicker inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class NumberTickerPage {
  private readonly anatomy = {
    imports: "import { ScNumberTicker } from '@semantic-components/ui';",
    markup: '<span scNumberTicker [value]="…"></span>',
  };

  private readonly inputs: ApiInput[] = [
    {
      name: 'value',
      type: 'number',
      default: '—',
      description: 'The number (required): a new one is moved to.',
    },
    {
      name: 'effect',
      type: "'count' | 'roll'",
      default: "'count'",
      description:
        'Counting to it, or each digit rolling (an odometer; on HTML only).',
    },
    {
      name: 'format',
      type: 'Intl.NumberFormatOptions',
      default: '{}',
      description:
        'How it is written — currency, percent, compact, a unit, decimals — in LOCALE_ID.',
    },
    {
      name: 'duration',
      type: 'number',
      default: '1000',
      description: 'How long a change takes, in ms.',
    },
    {
      name: 'delay',
      type: 'number',
      default: '0',
      description: 'The wait before it moves, in ms (a chart’s: its series’).',
    },
    {
      name: 'easing',
      type: "'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'",
      default: "'ease-out'",
      description: 'How it moves: CSS’s timing names.',
    },
    {
      name: 'from',
      type: 'number',
      default: '0',
      description: 'Where the first move starts from.',
    },
    {
      name: 'start',
      type: "'now' | 'visible'",
      default: "'now'",
      description:
        'When the first move starts: at once, or when it is first seen.',
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: 'Merged over its own classes.',
    },
  ];
}
