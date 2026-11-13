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
import { ExitCodeTerminalDemoContainer } from './demos/exit-code-terminal-demo-container';
import { RtlTerminalDemoContainer } from './demos/rtl-terminal-demo-container';
import { TerminalUsageDemoContainer } from './demos/terminal-usage-demo-container';

/** shadcn's Terminal pattern: a command the agent runs, its output streaming. */
@Component({
  selector: 'app-terminal-page',
  imports: [
    Anatomy,
    ExitCodeTerminalDemoContainer,
    RouterLink,
    RtlTerminalDemoContainer,
    ScHeading,
    ScLink,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    TerminalUsageDemoContainer,
    TocHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Terminal</h1>
        <p class="text-muted-foreground">
          A shell command the agent runs — a lint, a test run, a build. The line
          shows the command, and its output streams in underneath while it runs.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-terminal-usage-demo-container />
        <p class="text-muted-foreground">
          A <a scLink routerLink="/docs/components/trace">Trace</a> with a
          collapsible line for each command, its output in a
          <a scLink routerLink="/docs/components/code-block">Code Block</a>.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Exit code</h2>
        <p class="text-muted-foreground">
          A command that exits with any code other than 0 failed: an error
          status. It is a tool call, so its states map as in
          <a scLink routerLink="/docs/ai-elements/tool">Tool</a>.
        </p>
        <div scTableContainer tabindex="0" role="region" aria-label="Exit code">
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Command</th>
                <th scTableHeaderCell>status</th>
                <th scTableHeaderCell>Title</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (row of exits; track row.command) {
                <tr scTableRow>
                  <td scTableCell>{{ row.command }}</td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ row.status }}</code>
                  </td>
                  <td scTableCell>{{ row.title }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Open while running</h2>
        <p class="text-muted-foreground">
          The line opens once the first output arrives, so the output shows
          while the command runs; after that it stays as it is, or as the person
          left it. The output streams beside the command and grows in place: a
          command&apos;s result only comes when it exits.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-exit-code-terminal-demo-container />
        <app-rtl-terminal-demo-container />
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
export default class TerminalPage {
  protected readonly exits = [
    { command: 'Running', status: '"running"', title: 'Running pnpm build' },
    { command: 'Exited with 0', status: 'none', title: 'Ran pnpm build' },
    {
      command: 'Exited with another code',
      status: '"error"',
      title: 'pnpm lint exited with code 1',
    },
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
      '        <span scTraceTitle>Ran pnpm build</span>',
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
