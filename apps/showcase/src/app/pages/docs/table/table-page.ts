import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScHeading,
  ScLink,
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
import { FooterTableDemoContainer } from './demos/footer-table-demo-container';
import { RtlTableDemoContainer } from './demos/rtl-table-demo-container';
import { ScrollingTableDemoContainer } from './demos/scrolling-table-demo-container';
import { TableUsageDemoContainer } from './demos/table-usage-demo-container';

@Component({
  selector: 'app-table-page',
  imports: [
    Anatomy,
    TableUsageDemoContainer,
    FooterTableDemoContainer,
    ScrollingTableDemoContainer,
    RtlTableDemoContainer,
    RouterLink,
    TocHeading,
    ComponentBadges,
    ScHeading,
    ScLink,
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
        <h1 scHeading>Table</h1>
        <p class="text-muted-foreground">
          A table of data: the native table elements, in the look of the
          app&apos;s preset. For sorting, filtering, selection and pages, use a
          <a scLink routerLink="/docs/components/data-table">Data Table</a>.
        </p>
        <app-component-badges path="table" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-table-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on the native element, so the table stays a
          table to screen readers: its caption names it, its header cells name
          their columns.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Notes</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            The container scrolls a wide table sideways instead of the page.
            Make it focusable and name it (<code
              class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >tabindex="0" role="region" aria-label</code
            >) when it may scroll, so the keyboard can reach what is hidden.
          </li>
          <li>
            A header cell for a row, not a column, takes
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >scope="row"</code
            >.
          </li>
          <li>
            A row is highlighted on hover, while it holds an expanded control
            (<code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >aria-expanded</code
            >, an open menu) and when it has
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >data-state="selected"</code
            >.
          </li>
          <li>
            Align numbers with
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">text-end</code
            >, not
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >text-right</code
            >: it follows the reading direction.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-footer-table-demo-container />
        <app-scrolling-table-demo-container />
        <app-rtl-table-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the preset (cn: a later class wins).
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Table parts"
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
export default class TablePage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScTableContainer, ScTable, ScTableCaption, ScTableHeader,',
      '  ScTableBody, ScTableFooter, ScTableRow, ScTableHeaderCell,',
      '  ScTableCell,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scTableContainer>',
      '  <table scTable>',
      '    <caption scTableCaption>…</caption>',
      '    <thead scTableHeader>',
      '      <tr scTableRow><th scTableHeaderCell>…</th></tr>',
      '    </thead>',
      '    <tbody scTableBody>',
      '      <tr scTableRow><td scTableCell>…</td></tr>',
      '    </tbody>',
      '    <tfoot scTableFooter>',
      '      <tr scTableRow><td scTableCell>…</td></tr>',
      '    </tfoot>',
      '  </table>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScTableContainer',
      selector: 'div[scTableContainer]',
      description:
        'Scrolls a wide table sideways. Framed: add scFrame (the preset’s frame).',
    },
    {
      name: 'ScTable',
      selector: 'table[scTable]',
      description: 'The table: full width, its text size from the preset.',
    },
    {
      name: 'ScTableCaption',
      selector: 'caption[scTableCaption]',
      description: 'Names the table; shown below it.',
    },
    {
      name: 'ScTableHeader',
      selector: 'thead[scTableHeader]',
      description: 'The header rows, a line below.',
    },
    {
      name: 'ScTableBody',
      selector: 'tbody[scTableBody]',
      description: 'The rows; no line below the last.',
    },
    {
      name: 'ScTableFooter',
      selector: 'tfoot[scTableFooter]',
      description: 'Totals: muted, a line above.',
    },
    {
      name: 'ScTableRow',
      selector: 'tr[scTableRow]',
      description:
        'A row: a line below; highlighted on hover, with an expanded control, or data-state="selected".',
    },
    {
      name: 'ScTableHeaderCell',
      selector: 'th[scTableHeaderCell]',
      description: 'Names its column (or its row, with scope="row").',
    },
    {
      name: 'ScTableCell',
      selector: 'td[scTableCell]',
      description: 'A cell; no padding at the end beside a checkbox.',
    },
  ];
}
