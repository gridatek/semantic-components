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
import { BasicCollapsibleNextDemoContainer } from './demos/basic-collapsible-next-demo-container';
import { CollapsibleNextUsageDemoContainer } from './demos/collapsible-next-usage-demo-container';
import { DisabledCollapsibleNextDemoContainer } from './demos/disabled-collapsible-next-demo-container';
import { FileTreeCollapsibleNextDemoContainer } from './demos/file-tree-collapsible-next-demo-container';
import { HiddenUntilFoundCollapsibleNextDemoContainer } from './demos/hidden-until-found-collapsible-next-demo-container';
import { OpenCollapsibleNextDemoContainer } from './demos/open-collapsible-next-demo-container';
import { RtlCollapsibleNextDemoContainer } from './demos/rtl-collapsible-next-demo-container';
import { SettingsCollapsibleNextDemoContainer } from './demos/settings-collapsible-next-demo-container';

@Component({
  selector: 'app-collapsible-next-page',
  imports: [
    Anatomy,
    CollapsibleNextUsageDemoContainer,
    BasicCollapsibleNextDemoContainer,
    SettingsCollapsibleNextDemoContainer,
    FileTreeCollapsibleNextDemoContainer,
    HiddenUntilFoundCollapsibleNextDemoContainer,
    DisabledCollapsibleNextDemoContainer,
    OpenCollapsibleNextDemoContainer,
    RtlCollapsibleNextDemoContainer,
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
        <h1 scHeading>Collapsible Next</h1>
        <p class="text-muted-foreground">
          A trigger that shows and hides a panel of content.
        </p>
        <app-component-badges path="collapsible-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-collapsible-next-usage-demo-container />
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
        <app-basic-collapsible-next-demo-container />
        <app-settings-collapsible-next-demo-container />
        <app-file-tree-collapsible-next-demo-container />
        <app-hidden-until-found-collapsible-next-demo-container />
        <app-disabled-collapsible-next-demo-container />
        <app-open-collapsible-next-demo-container />
        <app-rtl-collapsible-next-demo-container />
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
          aria-label="Collapsible Next parts"
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
export default class CollapsibleNextPage {
  protected readonly anatomy = {
    imports:
      "import { ScCollapsibleNext, ScCollapsibleNextPanel, ScCollapsibleNextTrigger } from '@semantic-components/ui';",
    markup: [
      '<div scCollapsibleNext [(open)]="…">',
      '  <button scButton scCollapsibleNextTrigger>…</button>',
      '  <div scCollapsibleNextPanel>…</div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScCollapsibleNext',
      selector: '[scCollapsibleNext]',
      description:
        'The disclosure: open (two-way), disabled; data-open / data-closed.',
    },
    {
      name: 'ScCollapsibleNextTrigger',
      selector: 'button[scCollapsibleNextTrigger]',
      description:
        'Shows and hides the panel: aria-expanded, aria-controls, data-panel-open. Behaviour only: its look is yours (scButton).',
    },
    {
      name: 'ScCollapsibleNextPanel',
      selector: 'div[scCollapsibleNextPanel]',
      description:
        'Its content written inside. Closed, hidden, its height animating; hiddenUntilFound: still searched by find-in-page, a match opens it.',
    },
  ];
}
