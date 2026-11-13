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
import { RtlTaskDemoContainer } from './demos/rtl-task-demo-container';
import { StepsTaskDemoContainer } from './demos/steps-task-demo-container';
import { TaskUsageDemoContainer } from './demos/task-usage-demo-container';

/** shadcn's Task pattern: the steps the agent takes, as it takes them. */
@Component({
  selector: 'app-task-page',
  imports: [
    Anatomy,
    RouterLink,
    RtlTaskDemoContainer,
    ScHeading,
    ScLink,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    StepsTaskDemoContainer,
    TaskUsageDemoContainer,
    TocHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Task</h1>
        <p class="text-muted-foreground">
          A piece of work the agent is doing, such as finding the project files
          or updating a page. Each step — a search, a read, an edit — appears
          under the task when the agent takes it.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-task-usage-demo-container />
        <p class="text-muted-foreground">
          A <a scLink routerLink="/docs/components/trace">Trace</a> with a
          collapsible line for each task. Keep the running task open, and close
          each one once it is done.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Task or Plan</h2>
        <p class="text-muted-foreground">
          Both are a list of steps under a collapsible line; they differ in when
          the steps are known. Use a
          <a scLink routerLink="/docs/ai-elements/plan">Plan</a> when the agent
          decides the steps before it starts; a Task when they come from the
          work itself, the next one known only once the last is taken.
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Task or Plan"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell><span class="sr-only">Aspect</span></th>
                <th scTableHeaderCell>Plan</th>
                <th scTableHeaderCell>Task</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (row of comparison; track row.aspect) {
                <tr scTableRow>
                  <td scTableCell class="font-medium">{{ row.aspect }}</td>
                  <td scTableCell class="whitespace-normal">{{ row.plan }}</td>
                  <td scTableCell class="whitespace-normal">{{ row.task }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Status</h2>
        <p class="text-muted-foreground">
          The task&apos;s status comes from its steps. Its title is in the
          present tense while it runs, in the past tense once it is done:
          &quot;Updating the page metadata&quot;, &quot;Failed to update the
          page metadata&quot;, &quot;Updated the page metadata&quot;.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <div class="space-y-4">
          <p class="text-muted-foreground">
            Steps with icons, a read linking to its file.
          </p>
          <app-steps-task-demo-container />
        </div>
        <app-rtl-task-demo-container />
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
export default class TaskPage {
  protected readonly comparison = [
    {
      aspect: 'Steps',
      plan: 'Every step, from the start',
      task: 'Each step, once the agent takes it',
    },
    {
      aspect: 'Pending steps',
      plan: 'Yes, waiting their turn',
      task: 'None',
    },
    {
      aspect: 'Title',
      plan: 'The goal, with progress: "2 of 4 done"',
      task: 'What the agent is doing, then what it did',
    },
    {
      aspect: 'Per reply',
      plan: 'One plan',
      task: 'One or more tasks, each closing when it is done',
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
      '  <div scCollapsible scTraceCollapsible [open]="choice() ?? running()">',
      '    <button scCollapsibleTrigger scTraceCollapsibleTrigger>',
      '      <span scTraceLine [status]="running() ? \'running\' : undefined">',
      '        <span scTraceTitle>Updating the page metadata</span>',
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
      '</div>',
    ].join('\n'),
  };
}
