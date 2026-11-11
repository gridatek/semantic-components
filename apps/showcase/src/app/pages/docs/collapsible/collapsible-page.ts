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
import { BasicCollapsibleDemoContainer } from './demos/basic-collapsible-demo-container';
import { CollapsibleUsageDemoContainer } from './demos/collapsible-usage-demo-container';
import { DisabledCollapsibleDemoContainer } from './demos/disabled-collapsible-demo-container';
import { FileTreeCollapsibleDemoContainer } from './demos/file-tree-collapsible-demo-container';
import { HiddenUntilFoundCollapsibleDemoContainer } from './demos/hidden-until-found-collapsible-demo-container';
import { OpenCollapsibleDemoContainer } from './demos/open-collapsible-demo-container';
import { RtlCollapsibleDemoContainer } from './demos/rtl-collapsible-demo-container';
import { SettingsCollapsibleDemoContainer } from './demos/settings-collapsible-demo-container';

@Component({
  selector: 'app-collapsible-page',
  imports: [
    Anatomy,
    CollapsibleUsageDemoContainer,
    BasicCollapsibleDemoContainer,
    SettingsCollapsibleDemoContainer,
    FileTreeCollapsibleDemoContainer,
    HiddenUntilFoundCollapsibleDemoContainer,
    DisabledCollapsibleDemoContainer,
    OpenCollapsibleDemoContainer,
    RtlCollapsibleDemoContainer,
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
        <h1 scHeading>Collapsible</h1>
        <p class="text-muted-foreground">
          A trigger that shows and hides a panel of content.
        </p>
        <app-component-badges path="collapsible" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-collapsible-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Base UI&apos;s Collapsible: a root holding open, a trigger on your
          button, a panel with its content written inside.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            The disclosure pattern: a native button, aria-expanded, and
            aria-controls naming its panel; Space and Enter toggle it.
          </li>
          <li>
            Name an icon trigger with sr-only text; its name stays the same as
            it opens and closes.
          </li>
          <li>
            Closed, its panel is hidden from everyone; with hiddenUntilFound,
            find-in-page still finds its text and opens it.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-collapsible-demo-container />
        <app-settings-collapsible-demo-container />
        <app-file-tree-collapsible-demo-container />
        <app-hidden-until-found-collapsible-demo-container />
        <app-disabled-collapsible-demo-container />
        <app-open-collapsible-demo-container />
        <app-rtl-collapsible-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over its own (cn: a later class wins).
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Collapsible parts"
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
export default class CollapsiblePage {
  protected readonly anatomy = {
    imports:
      "import { ScCollapsible, ScCollapsiblePanel, ScCollapsibleTrigger } from '@semantic-components/ui';",
    markup: [
      '<div scCollapsible [(open)]="…">',
      '  <button scButton scCollapsibleTrigger>…</button>',
      '  <div scCollapsiblePanel>…</div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScCollapsible',
      selector: '[scCollapsible]',
      description:
        'The disclosure: open (two-way), disabled; data-open / data-closed.',
    },
    {
      name: 'ScCollapsibleTrigger',
      selector: 'button[scCollapsibleTrigger]',
      description:
        'Shows and hides the panel: aria-expanded, aria-controls, data-panel-open. Behaviour only: its look is yours (scButton).',
    },
    {
      name: 'ScCollapsiblePanel',
      selector: 'div[scCollapsiblePanel]',
      description:
        'Its content written inside. Closed, hidden, its height animating; hiddenUntilFound: still searched by find-in-page, a match opens it.',
    },
  ];
}
