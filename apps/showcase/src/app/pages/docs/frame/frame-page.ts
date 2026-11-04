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
import { AspectRatioFrameDemoContainer } from './demos/aspect-ratio-frame-demo-container';
import { FrameUsageDemoContainer } from './demos/frame-usage-demo-container';
import { TableFrameDemoContainer } from './demos/table-frame-demo-container';

@Component({
  selector: 'app-frame-page',
  imports: [
    Anatomy,
    FrameUsageDemoContainer,
    AspectRatioFrameDemoContainer,
    TableFrameDemoContainer,
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
        <h1 scHeading>Frame</h1>
        <p class="text-muted-foreground">
          A frame round a box, in the app&apos;s preset: the style&apos;s card
          radius, ring and shadow — for an aspect ratio, a table, any box that
          isn&apos;t a card.
        </p>
        <app-component-badges path="frame" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-frame-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          One directive, beside another part or on a plain box. Only the look:
          clipping is the box&apos;s (the aspect ratio clips, the table&apos;s
          container scrolls; on a plain box with an image, add
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >overflow-hidden</code
          >).
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-aspect-ratio-frame-demo-container />
        <app-table-frame-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <h3 class="font-heading text-base font-medium">
          ScFrame —
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">[scFrame]</code>
        </h3>
        <p class="text-muted-foreground">
          The preset&apos;s frame: the style&apos;s card radius, ring and shadow
          — square in lyra and sera,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">4xl</code> in
          luma.
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="ScFrame inputs"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Input</th>
                <th scTableHeaderCell>Type</th>
                <th scTableHeaderCell>Default</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              <tr scTableRow>
                <td scTableCell>
                  <code class="font-mono text-sm">class</code>
                </td>
                <td scTableCell>
                  <code class="font-mono text-sm">string</code>
                </td>
                <td scTableCell><code class="font-mono text-sm">''</code></td>
                <td scTableCell class="text-muted-foreground whitespace-normal">
                  Classes merged over the preset (cn: a later class wins).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class FramePage {
  protected readonly anatomy = {
    imports: "import { ScFrame } from '@semantic-components/ui';",
    markup: '<div scFrame>…</div>',
  };
}
