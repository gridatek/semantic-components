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
import { ListSeparatorDemoContainer } from './demos/list-separator-demo-container';
import { MenuSeparatorDemoContainer } from './demos/menu-separator-demo-container';
import { RtlSeparatorDemoContainer } from './demos/rtl-separator-demo-container';
import { SeparatorUsageDemoContainer } from './demos/separator-usage-demo-container';
import { VerticalSeparatorDemoContainer } from './demos/vertical-separator-demo-container';

@Component({
  selector: 'app-separator-page',
  imports: [
    Anatomy,
    SeparatorUsageDemoContainer,
    ListSeparatorDemoContainer,
    MenuSeparatorDemoContainer,
    VerticalSeparatorDemoContainer,
    RtlSeparatorDemoContainer,
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
        <h1 scHeading>Separator</h1>
        <p class="text-muted-foreground">
          A line between sections, across or up and down. The same in every
          style.
        </p>
        <app-component-badges path="separator" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-separator-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A directive on your div; orientation sets which way it runs.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A separator (role=&quot;separator&quot;, aria-orientation): screen
            readers announce the break, as for an hr.
          </li>
          <li>
            Only decoration — a line under a heading, behind &quot;Or continue
            with&quot; — hide it yourself: aria-hidden=&quot;true&quot;.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-list-separator-demo-container />
        <app-menu-separator-demo-container />
        <app-vertical-separator-demo-container />
        <app-rtl-separator-demo-container />
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
          aria-label="Separator parts"
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
export default class SeparatorPage {
  protected readonly anatomy = {
    imports: "import { ScSeparator } from '@semantic-components/ui';",
    markup: '<div scSeparator orientation="…"></div>',
  };

  protected readonly parts = [
    {
      name: 'ScSeparator',
      selector: 'div[scSeparator]',
      description:
        "A line between sections: role=\"separator\", orientation ('horizontal', 'vertical'). The same in every style.",
    },
  ];
}
