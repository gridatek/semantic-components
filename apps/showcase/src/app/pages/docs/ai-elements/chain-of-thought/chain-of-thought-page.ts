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
import { ChainOfThoughtUsageDemoContainer } from './demos/chain-of-thought-usage-demo-container';
import { RtlChainOfThoughtDemoContainer } from './demos/rtl-chain-of-thought-demo-container';
import { SearchResultsChainOfThoughtDemoContainer } from './demos/search-results-chain-of-thought-demo-container';
import { StepsChainOfThoughtDemoContainer } from './demos/steps-chain-of-thought-demo-container';

/** shadcn's Chain of Thought pattern: a summary that opens on the agent's steps. */
@Component({
  selector: 'app-chain-of-thought-page',
  imports: [
    Anatomy,
    ChainOfThoughtUsageDemoContainer,
    RouterLink,
    RtlChainOfThoughtDemoContainer,
    ScHeading,
    ScLink,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    SearchResultsChainOfThoughtDemoContainer,
    StepsChainOfThoughtDemoContainer,
    TocHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Chain of Thought</h1>
        <p class="text-muted-foreground">
          A summary line that expands into the steps an agent took. The summary
          says what happened, like &quot;Researched in 3 steps&quot;; the steps
          sit inside it, each one a line of its own.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-chain-of-thought-usage-demo-container />
        <p class="text-muted-foreground">
          A pattern, not a component: a
          <a scLink routerLink="/docs/components/trace">Trace</a> whose
          collapsible line is the summary, with a Trace of steps inside — their
          output in a
          <a scLink routerLink="/docs/components/code-block">Code Block</a>,
          links or <a scLink routerLink="/docs/components/badge">Badges</a>. The
          streaming here is replayed on a timer.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Steps</h2>
        <p class="text-muted-foreground">
          Each step is a line: set its status, and write its title in the
          matching tense.
        </p>
        <div scTableContainer tabindex="0" role="region" aria-label="Steps">
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Step</th>
                <th scTableHeaderCell>status</th>
                <th scTableHeaderCell>Title</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (row of steps; track row.step) {
                <tr scTableRow>
                  <td scTableCell>{{ row.step }}</td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ row.status }}</code>
                  </td>
                  <td scTableCell>{{ row.title }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <p class="text-muted-foreground">
          The steps stay in the page when the summary closes (the
          Collapsible&apos;s panel only hides them), so each keeps its own open
          state.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Open state</h2>
        <p class="text-muted-foreground">
          The summary is researching while the steps run and before the reply
          starts: it opens then and closes when the reply begins, unless the
          person opened or closed it. Its status and title follow the steps —
          &quot;Researched in 4 steps, 1 failed&quot; with an error status when
          one failed.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-steps-chain-of-thought-demo-container />
        <div class="space-y-4">
          <p class="text-muted-foreground">
            A web search&apos;s results: a badge for each hostname, in the
            step&apos;s content.
          </p>
          <app-search-results-chain-of-thought-demo-container />
        </div>
        <app-rtl-chain-of-thought-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          See the
          <a scLink routerLink="/docs/components/trace" fragment="api-reference"
            >Trace</a
          >, the
          <a scLink routerLink="/docs/components/code-block">Code Block</a> and
          the <a scLink routerLink="/docs/components/badge">Badge</a>.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ChainOfThoughtPage {
  protected readonly steps = [
    { step: 'Running', status: '"running"', title: 'Searching for …' },
    { step: 'Done, with detail', status: 'none', title: 'Searched for …' },
    {
      step: 'Done, links out',
      status: 'none',
      title: 'Read the Image component docs',
    },
    { step: 'Failed', status: '"error"', title: 'Failed to search for …' },
  ];

  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScTrace, ScTraceLine, ScTraceIcon, ScTraceTitle,',
      '  ScTraceCollapsible, ScTraceCollapsibleTrigger,',
      '  ScTraceCollapsiblePanelContent,',
      '  ScCollapsible, ScCollapsibleTrigger, ScCollapsiblePanel,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scTrace>',
      '  <div scCollapsible scTraceCollapsible [open]="open()">',
      '    <button scCollapsibleTrigger scTraceCollapsibleTrigger>',
      '      <span scTraceLine>',
      '        <span scTraceIcon>…</span>',
      '        <span scTraceTitle>Researched in 3 steps</span>',
      '      </span>',
      '    </button>',
      '    <div scCollapsiblePanel>',
      '      <div scTraceCollapsiblePanelContent>',
      '        <div scTrace>',
      '          <span scTraceLine>…</span>',
      '          …',
      '        </div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };
}
