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
import { DisabledTabsDemoContainer } from './demos/disabled-tabs-demo-container';
import { IconsTabsDemoContainer } from './demos/icons-tabs-demo-container';
import { LineTabsDemoContainer } from './demos/line-tabs-demo-container';
import { RtlTabsDemoContainer } from './demos/rtl-tabs-demo-container';
import { TabsUsageDemoContainer } from './demos/tabs-usage-demo-container';
import { VerticalTabsDemoContainer } from './demos/vertical-tabs-demo-container';

@Component({
  selector: 'app-tabs-page',
  imports: [
    Anatomy,
    TabsUsageDemoContainer,
    LineTabsDemoContainer,
    VerticalTabsDemoContainer,
    DisabledTabsDemoContainer,
    IconsTabsDemoContainer,
    RtlTabsDemoContainer,
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
        <h1 scHeading>Tabs</h1>
        <p class="text-muted-foreground">
          Tabs and their panels, one shown at a time. In the look of the
          app&apos;s preset.
        </p>
        <app-component-badges path="tabs" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-tabs-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the tabs&apos; text and
          icons are yours. A panel&apos;s content goes in an ng-template
          scTabsContent.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Limitation: panel content</h2>
        <p class="text-muted-foreground">
          Angular Aria, which the tabs are built on, renders a panel only
          through its template: content written straight in a panel is not
          allowed (Aria reports it in development). So every panel&apos;s
          content goes in an ng-template scTabsContent.
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
        <app-line-tabs-demo-container />
        <app-vertical-tabs-demo-container />
        <app-disabled-tabs-demo-container />
        <app-icons-tabs-demo-container />
        <app-rtl-tabs-demo-container />
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
          aria-label="Tabs parts"
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
export default class TabsPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScTabs, ScTabsList, ScTabsTab, ScTabsPanel,',
      '  ScTabsContent,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scTabs [(value)]="…">',
      '  <div scTabsList>',
      '    <button scTabsTab value="…">…</button>',
      '  </div>',
      '  <div scTabsPanel value="…">',
      '    <ng-template scTabsContent>…</ng-template>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScTabs',
      selector: '[scTabs]',
      description:
        "The root: [(value)], the selected tab; orientation ('horizontal' or 'vertical').",
    },
    {
      name: 'ScTabsList',
      selector: '[scTabsList]',
      description:
        "The tabs (role tablist): variant ('default' or 'line'), activateOnFocus (the arrows select), wrap.",
    },
    {
      name: 'ScTabsTab',
      selector: 'button[scTabsTab]',
      description: 'A tab (role tab): value, disabled.',
    },
    {
      name: 'ScTabsPanel',
      selector: '[scTabsPanel]',
      description:
        'A tab’s panel (role tabpanel), named by its tab: value. Shown while its tab is selected.',
    },
    {
      name: 'ScTabsContent',
      selector: 'ng-template[scTabsContent]',
      description: 'In a panel: its content, created when the panel is shown.',
    },
  ];
}
