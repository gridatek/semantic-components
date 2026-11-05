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
import { ChainOfThoughtTraceDemoContainer } from './demos/chain-of-thought-trace-demo-container';
import { CollapsibleTraceDemoContainer } from './demos/collapsible-trace-demo-container';
import { CommitTraceDemoContainer } from './demos/commit-trace-demo-container';
import { DescriptionTraceDemoContainer } from './demos/description-trace-demo-container';
import { DialogTraceDemoContainer } from './demos/dialog-trace-demo-container';
import { GroupTraceDemoContainer } from './demos/group-trace-demo-container';
import { LineTraceDemoContainer } from './demos/line-trace-demo-container';
import { LinkTraceDemoContainer } from './demos/link-trace-demo-container';
import { OpenTraceDemoContainer } from './demos/open-trace-demo-container';
import { ReasoningTraceDemoContainer } from './demos/reasoning-trace-demo-container';
import { RtlTraceDemoContainer } from './demos/rtl-trace-demo-container';
import { SheetTraceDemoContainer } from './demos/sheet-trace-demo-container';
import { SourcesTraceDemoContainer } from './demos/sources-trace-demo-container';
import { StatusTraceDemoContainer } from './demos/status-trace-demo-container';
import { ToolTraceDemoContainer } from './demos/tool-trace-demo-container';
import { TraceUsageDemoContainer } from './demos/trace-usage-demo-container';
import { TurnTraceDemoContainer } from './demos/turn-trace-demo-container';

@Component({
  selector: 'app-trace-page',
  imports: [
    Anatomy,
    TraceUsageDemoContainer,
    LineTraceDemoContainer,
    StatusTraceDemoContainer,
    DescriptionTraceDemoContainer,
    CollapsibleTraceDemoContainer,
    OpenTraceDemoContainer,
    LinkTraceDemoContainer,
    DialogTraceDemoContainer,
    SheetTraceDemoContainer,
    GroupTraceDemoContainer,
    SourcesTraceDemoContainer,
    ChainOfThoughtTraceDemoContainer,
    CommitTraceDemoContainer,
    TurnTraceDemoContainer,
    ReasoningTraceDemoContainer,
    ToolTraceDemoContainer,
    RtlTraceDemoContainer,
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
        <h1 scHeading>Trace</h1>
        <p class="text-muted-foreground">
          The steps an agent takes — searches, reads, commands, edits — a line
          each, with a status, a detail and the output it opens on. In the look
          of the app&apos;s preset.
        </p>
        <app-component-badges path="trace" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-trace-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the icons and the words are
          yours. A step that opens on its output is a Collapsible, its parts
          doing the opening.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A line on its own is text, not a tab stop. In a collapsible&apos;s
            trigger it is a button with aria-expanded; in a link, or a
            dialog&apos;s or sheet&apos;s trigger, it takes that element&apos;s
            keyboard and focus.
          </li>
          <li>
            The icons are hidden: the title is the name. Write what happened —
            &quot;Edited trace.ts&quot;, not &quot;trace.ts&quot; — and the
            status too (&quot;Failed to run pnpm build&quot;): the colour and
            the shimmer aren&apos;t read out.
          </li>
          <li>
            A link to a new tab says so in sr-only text (&quot;(opens in a new
            tab)&quot;). The shimmer stops when motion is reduced.
          </li>
          <li>
            Steps that stream in: put them in a live region (aria-live, or a
            Message Scroller&apos;s log), so each is announced once.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-line-trace-demo-container />
        <app-status-trace-demo-container />
        <app-description-trace-demo-container />
        <app-collapsible-trace-demo-container />
        <app-open-trace-demo-container />
        <app-link-trace-demo-container />
        <app-dialog-trace-demo-container />
        <app-sheet-trace-demo-container />
        <app-group-trace-demo-container />
        <app-sources-trace-demo-container />
        <app-chain-of-thought-trace-demo-container />
        <app-commit-trace-demo-container />
        <app-turn-trace-demo-container />
        <app-reasoning-trace-demo-container />
        <app-tool-trace-demo-container />
        <app-rtl-trace-demo-container />
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
          aria-label="Trace parts"
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
export default class TracePage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScTrace, ScTraceLine, ScTraceIcon, ScTraceTitle, ScTraceDescription,',
      '  ScTraceCollapsible, ScTraceCollapsibleTrigger, ScTraceCollapsibleIcon,',
      '  ScTraceCollapsibleContent,',
      '  ScCollapsible, ScCollapsibleTrigger, ScCollapsiblePanel,',
      '  ScCollapsibleContent, ScCollapsibleBody,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scTrace>',
      '  <span scTraceLine status="…">',
      '    <span scTraceIcon>…</span>',
      '    <span scTraceTitle>…</span>',
      '    <span scTraceDescription>…</span>',
      '  </span>',
      '  <div scCollapsible scTraceCollapsible>',
      '    <button scCollapsibleTrigger scTraceCollapsibleTrigger [panel]="output.panel">',
      '      <span scTraceLine>…</span>',
      '      <span scTraceCollapsibleIcon>…</span>',
      '    </button>',
      '    <div scCollapsiblePanel #output="scCollapsiblePanel">',
      '      <ng-template scCollapsibleContent>',
      '        <div scCollapsibleBody>',
      '          <div scTraceCollapsibleContent>…</div>',
      '        </div>',
      '      </ng-template>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScTrace',
      selector: 'div[scTrace]',
      description:
        'The rows; it also styles a trigger or link around a line (its focus ring).',
    },
    {
      name: 'ScTraceLine',
      selector: 'span[scTraceLine]',
      description:
        "A step: status ('running' — its title shimmers, 'error', 'pending' — its icon dimmed). Text on its own; wrap it to make it do something.",
    },
    {
      name: 'ScTraceIcon',
      selector: 'span[scTraceIcon]',
      description:
        'Your icon, hidden: before the title it names the action; after it, an indicator.',
    },
    {
      name: 'ScTraceTitle, ScTraceDescription',
      selector: 'span[…]',
      description:
        'What happened, on one line (truncated); a count or a duration after it.',
    },
    {
      name: 'ScTraceCollapsible, ScTraceCollapsibleTrigger',
      selector: 'div[…], button[scTraceCollapsibleTrigger]',
      description:
        'A step that opens, on scCollapsible and scCollapsibleTrigger: [expanded], [(expanded)].',
    },
    {
      name: 'ScTraceCollapsibleIcon',
      selector: 'span[scTraceCollapsibleIcon]',
      description: 'Your chevron after the line, turned while open.',
    },
    {
      name: 'ScTraceCollapsibleContent',
      selector: 'div[scTraceCollapsibleContent]',
      description: 'The output, muted, under a line at its start.',
    },
  ];
}
