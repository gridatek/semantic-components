import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScHeading, ScLink } from '@semantic-components/ui';
import { Anatomy } from '../../../../components/anatomy/anatomy';
import { TocHeading } from '../../../../components/toc/toc-heading';
import { DurationReasoningDemoContainer } from './demos/duration-reasoning-demo-container';
import { PartsReasoningDemoContainer } from './demos/parts-reasoning-demo-container';
import { ReasoningUsageDemoContainer } from './demos/reasoning-usage-demo-container';
import { RtlReasoningDemoContainer } from './demos/rtl-reasoning-demo-container';

/** shadcn's Reasoning pattern: the agent's thinking, built with the Trace. */
@Component({
  selector: 'app-reasoning-page',
  imports: [
    Anatomy,
    DurationReasoningDemoContainer,
    PartsReasoningDemoContainer,
    ReasoningUsageDemoContainer,
    RouterLink,
    RtlReasoningDemoContainer,
    ScHeading,
    ScLink,
    TocHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Reasoning</h1>
        <p class="text-muted-foreground">
          The agent&apos;s thinking as it streams. A line that reads
          &quot;Thinking&quot; and opens while the model thinks, then reads
          &quot;Thought&quot; and closes when it is done; the thinking itself
          sits inside, and the line can show how long it took.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-reasoning-usage-demo-container />
        <p class="text-muted-foreground">
          A pattern, not a component: it is built with the
          <a scLink routerLink="/docs/components/trace">Trace</a>, a Collapsible
          for the thinking, in a
          <a scLink routerLink="/docs/components/message">Message</a>. The
          streaming here is replayed on a timer.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Open state</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Until the first words arrive, it is a plain line: nothing to open
            before the model has written anything.
          </li>
          <li>
            Then it opens while the model thinks and closes when it finishes —
            unless the person opened or closed it: their choice wins. The
            Collapsible&apos;s
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">open</code> is
            your choice, else the running state.
          </li>
          <li>
            The streamed text goes in a live region (here
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >aria-live="polite"</code
            >
            on the trace), so &quot;Thinking&quot; and &quot;Thought&quot; are
            announced.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <div class="space-y-4">
          <p class="text-muted-foreground">
            How long it thought, in a description after the title: measure it on
            the server and send it with the message.
          </p>
          <app-duration-reasoning-demo-container />
        </div>
        <div class="space-y-4">
          <p class="text-muted-foreground">
            Some models send several reasoning parts in one message: each one is
            a line in the same trace, with its own open state.
          </p>
          <app-parts-reasoning-demo-container />
        </div>
        <app-rtl-reasoning-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          See the
          <a scLink routerLink="/docs/components/trace" fragment="api-reference"
            >Trace</a
          >
          and the
          <a scLink routerLink="/docs/components/collapsible">Collapsible</a>.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ReasoningPage {
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
      '      <span scTraceLine [status]="running() ? \'running\' : undefined">',
      '        <span scTraceIcon>…</span>',
      '        <span scTraceTitle>Thought</span>',
      '      </span>',
      '    </button>',
      '    <div scCollapsiblePanel>',
      '      <div scTraceCollapsiblePanelContent>…</div>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };
}
