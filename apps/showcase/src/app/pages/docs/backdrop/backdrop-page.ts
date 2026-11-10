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
import { BackdropUsageDemoContainer } from './demos/backdrop-usage-demo-container';
import { CustomBackdropDemoContainer } from './demos/custom-backdrop-demo-container';

@Component({
  selector: 'app-backdrop-page',
  imports: [
    Anatomy,
    BackdropUsageDemoContainer,
    CustomBackdropDemoContainer,
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
        <h1 scHeading>Backdrop</h1>
        <p class="text-muted-foreground">
          The dimmed, blurred layer behind an overlay, in the look of the
          app&apos;s preset. The
          <a scLink routerLink="/docs/components/dialog">Dialog</a>,
          <a scLink routerLink="/docs/components/alert-dialog">Alert Dialog</a>,
          <a scLink routerLink="/docs/components/sheet">Sheet</a>
          and
          <a scLink routerLink="/docs/components/drawer">Drawer</a>
          render it in theirs; use it on its own for an overlay of yours.
        </p>
        <app-component-badges path="backdrop" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-backdrop-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          One directive, on an empty
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">div</code>, shown
          with
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">&#64;if</code>
          or inside an overlay.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Notes</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            It fades in when shown and out when it goes (<code
              class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >animate.enter</code
            >
            /
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >animate.leave</code
            >): Angular removes it once it has faded out.
          </li>
          <li>
            It covers the window (<code
              class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >fixed inset-0</code
            >) behind the overlay&apos;s content;
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">absolute</code>
            puts it over a positioned box instead.
          </li>
          <li>
            It takes no clicks and no focus, and is not read by screen readers:
            closing on a click outside, trapping focus and hiding the page are
            the overlay&apos;s.
          </li>
          <li>
            Its shade and blur are the preset&apos;s — shadcn&apos;s overlay,
            the same behind every overlay of a style:
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >bg-black/10</code
            >
            with a light blur in nova, vega and lyra,
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">/80</code> in
            maia and mira,
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">/30</code>
            with more blur in luma and rhea,
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">/20</code> in
            sera.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-custom-backdrop-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <h3 class="font-heading text-base font-medium">
          ScBackdrop —
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >div[scBackdrop]</code
          >
        </h3>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="ScBackdrop inputs"
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
                <td scTableCell>
                  <code class="font-mono text-sm">''</code>
                </td>
                <td scTableCell class="text-muted-foreground whitespace-normal">
                  Classes merged over the preset (cn: a later class wins) — your
                  own shade, its place.
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
export default class BackdropPage {
  protected readonly anatomy = {
    imports: "import { ScBackdrop } from '@semantic-components/ui';",
    markup: ['@if (open()) {', '  <div scBackdrop></div>', '}'].join('\n'),
  };
}
