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
import { DescriptionsQueueDemoContainer } from './demos/descriptions-queue-demo-container';
import { QueueUsageDemoContainer } from './demos/queue-usage-demo-container';
import { RtlQueueDemoContainer } from './demos/rtl-queue-demo-container';

/** shadcn's Queue pattern: the agent's todo list, left and done. */
@Component({
  selector: 'app-queue-page',
  imports: [
    Anatomy,
    DescriptionsQueueDemoContainer,
    QueueUsageDemoContainer,
    RouterLink,
    RtlQueueDemoContainer,
    ScHeading,
    ScLink,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    TocHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Queue</h1>
        <p class="text-muted-foreground">
          The agent&apos;s todo list, split into what is left and what is done.
          A todo moves from one section to the other when it is done.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-queue-usage-demo-container />
        <p class="text-muted-foreground">
          A <a scLink routerLink="/docs/components/trace">Trace</a> with a
          collapsible line for each section, To do and Completed; the icon on
          each todo shows its status.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Statuses</h2>
        <p class="text-muted-foreground">
          The agent sends the whole list each time it updates it: render the
          latest. Mark the todo in progress as running only while the chat
          streams, so its title stops shimmering when the agent stops.
        </p>
        <div scTableContainer tabindex="0" role="region" aria-label="Statuses">
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Todo status</th>
                <th scTableHeaderCell>Section</th>
                <th scTableHeaderCell>Icon</th>
                <th scTableHeaderCell>Line status</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (row of statuses; track row.status) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ row.status }}</code>
                  </td>
                  <td scTableCell>{{ row.section }}</td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ row.icon }}</code>
                  </td>
                  <td scTableCell>{{ row.line }}</td>
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
            A todo with a description opens to show it; one without stays a
            line.
          </p>
          <app-descriptions-queue-demo-container />
        </div>
        <app-rtl-queue-demo-container />
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
export default class QueuePage {
  protected readonly statuses = [
    { status: 'pending', section: 'To do', icon: 'siCircleIcon', line: 'none' },
    {
      status: 'in_progress',
      section: 'To do',
      icon: 'siCircleDotIcon',
      line: '"running" while the chat streams',
    },
    {
      status: 'completed',
      section: 'Completed',
      icon: 'siCircleCheckIcon',
      line: 'none',
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
      '  <div scCollapsible scTraceCollapsible [open]="true">',
      '    <button scCollapsibleTrigger scTraceCollapsibleTrigger>',
      '      <span scTraceLine>',
      '        <span scTraceIcon><svg siListTodoIcon></svg></span>',
      '        <span scTraceTitle>2 to do</span>',
      '      </span>',
      '    </button>',
      '    <div scCollapsiblePanel>',
      '      <div scTraceCollapsiblePanelContent>',
      '        <div scTrace>',
      '          <span scTraceLine>…</span>',
      '        </div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '  <div scCollapsible scTraceCollapsible>… 1 completed …</div>',
      '</div>',
    ].join('\n'),
  };
}
