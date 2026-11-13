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
import { Anatomy } from '../../../../components/anatomy/anatomy';
import { TocHeading } from '../../../../components/toc/toc-heading';
import { RtlToolDemoContainer } from './demos/rtl-tool-demo-container';
import { SheetToolDemoContainer } from './demos/sheet-tool-demo-container';
import { StatesToolDemoContainer } from './demos/states-tool-demo-container';
import { ToolUsageDemoContainer } from './demos/tool-usage-demo-container';

/** shadcn's Tool pattern: a tool call, from input to output. */
@Component({
  selector: 'app-tool-page',
  imports: [
    Anatomy,
    RouterLink,
    RtlToolDemoContainer,
    ScHeading,
    ScLink,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    SheetToolDemoContainer,
    StatesToolDemoContainer,
    TocHeading,
    ToolUsageDemoContainer,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Tool</h1>
        <p class="text-muted-foreground">
          A tool call the agent makes, from input to output.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-tool-usage-demo-container />
        <p class="text-muted-foreground">
          A <a scLink routerLink="/docs/components/trace">Trace</a> line: plain
          while the tool runs, collapsible once its output arrives — the output
          in a
          <a scLink routerLink="/docs/components/code-block">Code Block</a>.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>States</h2>
        <p class="text-muted-foreground">
          The Trace doesn&apos;t read tool calls: map each call&apos;s state to
          a status and a title.
        </p>
        <app-states-tool-demo-container />
        <div scTableContainer tabindex="0" role="region" aria-label="States">
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Tool call</th>
                <th scTableHeaderCell>Line status</th>
                <th scTableHeaderCell>Title</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (row of states; track row.state) {
                <tr scTableRow>
                  <td scTableCell class="whitespace-normal">{{ row.state }}</td>
                  <td scTableCell class="whitespace-normal">
                    {{ row.status }}
                  </td>
                  <td scTableCell class="whitespace-normal">{{ row.title }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <p class="text-muted-foreground">
          A tool that runs in the browser stays waiting after the chat stops,
          until you give it its output: treat it as waiting, not failed.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Approval</h2>
        <p class="text-muted-foreground">
          A pending approval is a question for the person, not a step the agent
          took, so it sits outside the Trace as an Item with Deny and Approve;
          once answered, the tool is a line again. See
          <a scLink routerLink="/docs/ai-elements/confirmation">Confirmation</a
          >.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <div class="space-y-4">
          <p class="text-muted-foreground">
            Long output in a sheet: the line is the
            <a scLink routerLink="/docs/components/sheet">Sheet</a>&apos;s
            trigger.
          </p>
          <app-sheet-tool-demo-container />
        </div>
        <app-rtl-tool-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          See the
          <a scLink routerLink="/docs/components/trace" fragment="api-reference"
            >Trace</a
          >
          and the
          <a scLink routerLink="/docs/components/code-block">Code Block</a>.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ToolPage {
  protected readonly states = [
    {
      state: 'Its input arriving, or waiting',
      status: '"running" while the chat streams',
      title: 'Running …',
    },
    {
      state: 'The same, after the chat stops',
      status: '"error"',
      title: 'Failed to run …',
    },
    {
      state: 'Asking for approval',
      status: '—',
      title: 'Not a line: an Item outside the Trace, Deny and Approve',
    },
    {
      state: 'Answered',
      status: '"running" if approved, none if not',
      title: 'Running … if approved, Denied … if not',
    },
    { state: 'Output', status: 'none', title: 'Ran …' },
    { state: 'Error', status: '"error"', title: 'Failed to run …' },
    { state: 'Denied', status: 'none', title: 'Denied …' },
  ];

  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScTrace, ScTraceLine, ScTraceIcon, ScTraceTitle,',
      '  ScTraceCollapsible, ScTraceCollapsibleTrigger, ScTraceCollapsiblePanelContent,',
      '  ScCollapsible, ScCollapsibleTrigger, ScCollapsiblePanel,',
      "} from '@semantic-components/ui';",
      "import { ScCodeBlock, ScCodeBlockContent } from '@semantic-components/ui/code-block';",
    ].join('\n'),
    markup: [
      '<div scTrace>',
      '  <div scCollapsible scTraceCollapsible>',
      '    <button scCollapsibleTrigger scTraceCollapsibleTrigger>',
      '      <span scTraceLine>',
      '        <span scTraceIcon><svg siTerminalIcon></svg></span>',
      '        <span scTraceTitle>Ran git status --short</span>',
      '      </span>',
      '    </button>',
      '    <div scCollapsiblePanel>',
      '      <div scTraceCollapsiblePanelContent>',
      '        <div scCodeBlock size="sm">',
      '          <pre scCodeBlockContent wrap class="max-h-64" [code]="output"></pre>',
      '        </div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };
}
