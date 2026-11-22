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
import { LargeWaterfallDemoContainer } from './demos/large-waterfall-demo-container';
import { NestedWaterfallDemoContainer } from './demos/nested-waterfall-demo-container';
import { RtlWaterfallDemoContainer } from './demos/rtl-waterfall-demo-container';
import { WaterfallUsageDemoContainer } from './demos/waterfall-usage-demo-container';
import { ZoomWaterfallDemoContainer } from './demos/zoom-waterfall-demo-container';

@Component({
  selector: 'app-waterfall-page',
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
    WaterfallUsageDemoContainer,
    NestedWaterfallDemoContainer,
    ZoomWaterfallDemoContainer,
    LargeWaterfallDemoContainer,
    RtlWaterfallDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Waterfall</h1>
        <p class="text-muted-foreground">
          Spans — a page&apos;s requests, a trace, a build — as bars on a shared
          time axis; a span that started others opens on them.
        </p>
        <app-component-badges path="waterfall" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-waterfall-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          You loop over the rows shown — <code scTypeset>rows()</code>, the
          spans whose parents are open — a row each: its header (the indicator
          and the label), your cells, its bar. The header row, the axis and the
          marks are optional.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Spans and time</h2>
        <p>
          A span is <code scTypeset>{{ itemShape }}</code
          >, in milliseconds on a shared clock. Its bar is a share of the
          <code scTypeset>range</code>
          (by default, the first start to the last end) —
          <code scTypeset>--sc-waterfall-start</code>,
          <code scTypeset>--sc-waterfall-size</code> — from the start of the
          line; out of it, held to its edge. Times are written with
          <code scTypeset>format</code> (milliseconds by default), in the
          app&apos;s language; a bar is read as its times (&quot;120–460
          ms&quot;), or as <code scTypeset>barLabel</code> says.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Waterfall keys"
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
                <td scTableCell><kbd scKbd>↓</kbd> / <kbd scKbd>↑</kbd></td>
                <td scTableCell>The next / previous row</td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>→</kbd></td>
                <td scTableCell>Opens the span, or goes to its first child</td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>←</kbd></td>
                <td scTableCell>Closes the span, or goes to its parent</td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Home</kbd> / <kbd scKbd>End</kbd>,
                  <kbd scKbd>Page Up</kbd> / <kbd scKbd>Page Down</kbd>
                </td>
                <td scTableCell>The first / last row; ten rows</td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Enter</kbd> / <kbd scKbd>Space</kbd>
                </td>
                <td scTableCell>Selects</td>
              </tr>
              <tr scTableRow>
                <td scTableCell>Letters</td>
                <td scTableCell>The next row whose label starts with them</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A tree grid (name it): rows with their level, their place among
            their siblings, open or not, selected or not; a row header names
            each span; one Tab stop.
          </li>
          <li>
            A bar is a cell read as its times; the axis and the marks are hidden
            from screen readers. The indicator is for the pointer: the arrows
            open and close.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-nested-waterfall-demo-container />
        <app-zoom-waterfall-demo-container />
        <app-large-waterfall-demo-container />
        <app-rtl-waterfall-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes <code scTypeset>class</code>, merged over its own (cn:
          a later class wins). The rows and cells are the style&apos;s table;
          the bar&apos;s corners its <code scTypeset>waterfall</code>.
        </p>
        <app-parts-table label="Waterfall parts" [parts]="parts" />
        <app-api-table label="ScWaterfall inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class WaterfallPage {
  private readonly itemShape = '{ value, label, start, duration, children? }';

  private readonly anatomy = {
    imports:
      "import { ScWaterfall, ScWaterfallAxis, ScWaterfallBar, ScWaterfallCell, ScWaterfallColumnHeader, ScWaterfallHeaderRow, ScWaterfallIndicator, ScWaterfallMark, ScWaterfallRow, ScWaterfallRowHeader } from '@semantic-components/ui';",
    markup: [
      '<div scWaterfall #waterfall="scWaterfall" aria-label="Requests" [items]="spans">',
      '  <div scWaterfallHeaderRow>',
      '    <div scWaterfallColumnHeader class="w-48">Name</div>',
      '    <div scWaterfallColumnHeader aria-label="Timeline" class="flex-1">',
      '      <div scWaterfallAxis>',
      '        <span scWaterfallMark [time]="620">DOMContentLoaded</span>',
      '      </div>',
      '    </div>',
      '  </div>',
      '  @for (row of waterfall.rows(); track row.item.value) {',
      '    <div scWaterfallRow [row]="row">',
      '      <div scWaterfallRowHeader>',
      '        <button scWaterfallIndicator><svg siChevronRightIcon></svg></button>',
      '        {{ row.item.label }}',
      '      </div>',
      '      <div scWaterfallCell class="w-20">…</div>',
      '      <div scWaterfallBar></div>',
      '    </div>',
      '  }',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScWaterfall',
      selector: 'div[scWaterfall]',
      description:
        'The tree grid: items, range, [(value)], [(expanded)], format, barLabel. exportAs scWaterfall: rows(), toggle(), expandAll(), collapseAll(), reveal(), focus().',
    },
    {
      name: 'ScWaterfallHeaderRow / ColumnHeader',
      selector: 'div[scWaterfallHeaderRow], [scWaterfallColumnHeader]',
      description: 'The column names; the timeline’s holds the axis.',
    },
    {
      name: 'ScWaterfallAxis',
      selector: '[scWaterfallAxis]',
      description: 'Round times (maxTicks) — or your ticks; holds the marks.',
    },
    {
      name: 'ScWaterfallTick',
      selector: '[scWaterfallTick]',
      description: 'A time on the axis: [time].',
    },
    {
      name: 'ScWaterfallMark',
      selector: '[scWaterfallMark]',
      description: 'A moment across the rows: [time], your text; data-outside.',
    },
    {
      name: 'ScWaterfallRow',
      selector: 'div[scWaterfallRow]',
      description:
        'A span: [row], one of rows(). data-level, data-branch, data-expanded, data-selected.',
    },
    {
      name: 'ScWaterfallRowHeader',
      selector: '[scWaterfallRowHeader]',
      description: 'Names the span, indented by its level.',
    },
    {
      name: 'ScWaterfallIndicator',
      selector: 'button[scWaterfallIndicator]',
      description:
        'Opens and closes (the pointer’s): your chevron, turned when open.',
    },
    {
      name: 'ScWaterfallCell',
      selector: '[scWaterfallCell]',
      description: 'Another column: a status, a size.',
    },
    {
      name: 'ScWaterfallBar',
      selector: '[scWaterfallBar]',
      description: 'The span on the axis, read as its times.',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'items',
      type: 'ScWaterfallItem[]',
      default: '—',
      description: 'The spans: { value, label, start, duration, children? }.',
    },
    {
      name: 'range',
      type: '[number, number] | null',
      default: 'null',
      description: 'The time shown (ms); by default, all of it.',
    },
    {
      name: 'value',
      type: 'string | null',
      default: 'null',
      description: 'The selected span: two-way.',
    },
    {
      name: 'expanded',
      type: 'string[]',
      default: '[]',
      description: 'The spans open: two-way.',
    },
    {
      name: 'format',
      type: 'Intl.NumberFormatOptions | (ms) => string',
      default: 'milliseconds',
      description: 'How times are written.',
    },
    {
      name: 'barLabel',
      type: '(item, { start, duration, range }) => string',
      default: 'its range',
      description: 'A bar’s label for screen readers.',
    },
  ];
}
