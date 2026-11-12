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
import { BasicCopyToClipboardDemoContainer } from './demos/basic-copy-to-clipboard-demo-container';
import { CopyToClipboardUsageDemoContainer } from './demos/copy-to-clipboard-usage-demo-container';

@Component({
  selector: 'app-copy-to-clipboard-page',
  imports: [
    Anatomy,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    BasicCopyToClipboardDemoContainer,
    CopyToClipboardUsageDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Copy to Clipboard</h1>
        <p class="text-muted-foreground">
          A composable directive for copying text to the clipboard with visual
          feedback.
        </p>
        <app-component-badges path="copy-to-clipboard" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-copy-to-clipboard-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          One directive on your button: it copies its text (the CDK’s
          clipboard), and says for a moment that it did, so you can switch the
          icon and text.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-copy-to-clipboard-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          A behaviour only: style the button as you like (scButton here).
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Copy to Clipboard parts"
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
export default class CopyToClipboardPage {
  protected readonly anatomy = {
    imports: [
      "import { ScCopyToClipboard } from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<button [scCopyToClipboard]="…" #copy="scCopyToClipboard">',
      '  @if (copy.copied()) { … } @else { … }',
      '</button>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScCopyToClipboard',
      selector: '[scCopyToClipboard]',
      description:
        '[scCopyToClipboard]: the text copied on click (the CDK’s cdkCopyToClipboard). duration (2000 ms): how long copied() stays true. exportAs scCopyToClipboard: copied().',
    },
  ];
}
