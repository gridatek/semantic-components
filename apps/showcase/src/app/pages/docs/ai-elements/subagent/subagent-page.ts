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
import { DetailsSubagentDemoContainer } from './demos/details-subagent-demo-container';
import { RtlSubagentDemoContainer } from './demos/rtl-subagent-demo-container';
import { RunningSubagentDemoContainer } from './demos/running-subagent-demo-container';
import { SubagentUsageDemoContainer } from './demos/subagent-usage-demo-container';

/** shadcn's Subagent pattern: a subagent run, its tool calls and result. */
@Component({
  selector: 'app-subagent-page',
  imports: [
    Anatomy,
    DetailsSubagentDemoContainer,
    RouterLink,
    RtlSubagentDemoContainer,
    RunningSubagentDemoContainer,
    ScHeading,
    ScLink,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    SubagentUsageDemoContainer,
    TocHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Subagent</h1>
        <p class="text-muted-foreground">
          A line for work the agent hands to a subagent. The run is the title,
          like &quot;Ran the research agent&quot;; open it for the tool calls
          the subagent made and what it found.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-subagent-usage-demo-container />
        <p class="text-muted-foreground">
          A <a scLink routerLink="/docs/components/trace">Trace</a> line,
          collapsible on the run, with a Trace of its tool calls inside — each
          as a <a scLink routerLink="/docs/ai-elements/tool">Tool</a> line — and
          its report under them.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>States</h2>
        <p class="text-muted-foreground">
          The subagent streams what it has done so far, then its final result,
          which replaces it: show &quot;Ran&quot; only once the result is final.
        </p>
        <div scTableContainer tabindex="0" role="region" aria-label="States">
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>State</th>
                <th scTableHeaderCell>Line status</th>
                <th scTableHeaderCell>Title</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (row of states; track row.state) {
                <tr scTableRow>
                  <td scTableCell class="whitespace-normal">{{ row.state }}</td>
                  <td scTableCell>{{ row.status }}</td>
                  <td scTableCell>{{ row.title }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <div class="space-y-4">
          <p class="text-muted-foreground">
            While it runs, the line is running and its content shows the tool
            calls so far; add the result when it finishes.
          </p>
          <app-running-subagent-demo-container />
        </div>
        <div class="space-y-4">
          <p class="text-muted-foreground">
            The task it was given at the top, its model and tools as badges, how
            long it ran after the title.
          </p>
          <app-details-subagent-demo-container />
        </div>
        <app-rtl-subagent-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          See the
          <a scLink routerLink="/docs/components/trace" fragment="api-reference"
            >Trace</a
          >.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SubagentPage {
  protected readonly states = [
    {
      state: 'Starting, or a partial result',
      status: '"running" while the chat streams',
      title: 'Running …',
    },
    { state: 'Final result', status: 'none', title: 'Ran …' },
    {
      state: 'Failed, or still running after the chat stops',
      status: '"error"',
      title: 'Failed to run …',
    },
  ];

  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScTrace, ScTraceLine, ScTraceIcon, ScTraceTitle,',
      '  ScTraceCollapsible, ScTraceCollapsibleTrigger, ScTraceCollapsiblePanelContent,',
      '  ScCollapsible, ScCollapsibleTrigger, ScCollapsiblePanel,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scTrace>',
      '  <div scCollapsible scTraceCollapsible>',
      '    <button scCollapsibleTrigger scTraceCollapsibleTrigger>',
      '      <span scTraceLine>',
      '        <span scTraceIcon><svg siCircleCheckIcon></svg></span>',
      '        <span scTraceTitle>Ran the research agent</span>',
      '      </span>',
      '    </button>',
      '    <div scCollapsiblePanel>',
      '      <div scTraceCollapsiblePanelContent class="flex flex-col gap-3">',
      '        <div scTrace>',
      '          <span scTraceLine>… Ran grep -rn cacheKey scripts</span>',
      '        </div>',
      '        <p>The cache is keyed on the commit SHA.</p>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };
}
