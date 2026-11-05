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
import { DisabledTabsNextDemoContainer } from './demos/disabled-tabs-next-demo-container';
import { IconsTabsNextDemoContainer } from './demos/icons-tabs-next-demo-container';
import { LineTabsNextDemoContainer } from './demos/line-tabs-next-demo-container';
import { RtlTabsNextDemoContainer } from './demos/rtl-tabs-next-demo-container';
import { TabsNextUsageDemoContainer } from './demos/tabs-next-usage-demo-container';
import { VerticalTabsNextDemoContainer } from './demos/vertical-tabs-next-demo-container';

@Component({
  selector: 'app-tabs-next-page',
  imports: [
    Anatomy,
    TabsNextUsageDemoContainer,
    LineTabsNextDemoContainer,
    VerticalTabsNextDemoContainer,
    DisabledTabsNextDemoContainer,
    IconsTabsNextDemoContainer,
    RtlTabsNextDemoContainer,
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
        <h1 scHeading>Tabs Next</h1>
        <p class="text-muted-foreground">
          Tabs and their panels, one shown at a time. In the look of the
          app&apos;s preset. The rewrite of Tabs, beside it until it is
          validated.
        </p>
        <app-component-badges path="tabs-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-tabs-next-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the tabs&apos; text and
          icons are yours. A panel&apos;s content goes in an ng-template
          scTabsNextContent.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Limitation: panel content</h2>
        <p class="text-muted-foreground">
          Angular Aria, which the tabs are built on, renders a panel only
          through its template: content written straight in a panel is not
          allowed (Aria reports it in development). So every panel&apos;s
          content goes in an ng-template scTabsNextContent.
        </p>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            It is created when its tab is selected — a heavy panel costs nothing
            until it is opened.
          </li>
          <li>
            It is destroyed when another tab is selected: what was typed in a
            panel&apos;s fields, its scroll, its own state are gone when you
            come back. Keep that state outside the panel — in your component or
            your form — if it must survive a switch.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Keyboard</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Tab enters the list on the selected tab, then goes on to its panel.
          </li>
          <li>
            ArrowLeft and ArrowRight move between the tabs (mirrored right to
            left), ArrowUp and ArrowDown when vertical; Home and End go to the
            ends.
          </li>
          <li>
            Enter or Space selects the tab — or the arrows select as they move,
            with activateOnFocus.
          </li>
          <li>A disabled tab is reached, not selected.</li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-line-tabs-next-demo-container />
        <app-vertical-tabs-next-demo-container />
        <app-disabled-tabs-next-demo-container />
        <app-icons-tabs-next-demo-container />
        <app-rtl-tabs-next-demo-container />
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
          aria-label="Tabs Next parts"
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
export default class TabsNextPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScTabsNext, ScTabsNextList, ScTabsNextTab, ScTabsNextPanel,',
      '  ScTabsNextContent,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scTabsNext [(value)]="…">',
      '  <div scTabsNextList>',
      '    <button scTabsNextTab value="…">…</button>',
      '  </div>',
      '  <div scTabsNextPanel value="…">',
      '    <ng-template scTabsNextContent>…</ng-template>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScTabsNext',
      selector: '[scTabsNext]',
      description:
        "The root: [(value)], the selected tab; orientation ('horizontal' or 'vertical').",
    },
    {
      name: 'ScTabsNextList',
      selector: '[scTabsNextList]',
      description:
        "The tabs (role tablist): variant ('default' or 'line'), activateOnFocus (the arrows select), wrap.",
    },
    {
      name: 'ScTabsNextTab',
      selector: 'button[scTabsNextTab]',
      description: 'A tab (role tab): value, disabled.',
    },
    {
      name: 'ScTabsNextPanel',
      selector: '[scTabsNextPanel]',
      description:
        'A tab’s panel (role tabpanel), named by its tab: value. Shown while its tab is selected.',
    },
    {
      name: 'ScTabsNextContent',
      selector: 'ng-template[scTabsNextContent]',
      description: 'In a panel: its content, created when the panel is shown.',
    },
  ];
}
