import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScHeading, ScLink } from '@semantic-components/ui';
import { Anatomy } from '../../../../components/anatomy/anatomy';
import { TocHeading } from '../../../../components/toc/toc-heading';
import { MutedFramesStackTraceDemoContainer } from './demos/muted-frames-stack-trace-demo-container';
import { RtlStackTraceDemoContainer } from './demos/rtl-stack-trace-demo-container';
import { StackTraceUsageDemoContainer } from './demos/stack-trace-usage-demo-container';

/** shadcn's Stack Trace pattern: a failed tool call and its frames. */
@Component({
  selector: 'app-stack-trace-page',
  imports: [
    Anatomy,
    MutedFramesStackTraceDemoContainer,
    RouterLink,
    RtlStackTraceDemoContainer,
    ScHeading,
    ScLink,
    StackTraceUsageDemoContainer,
    TocHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Stack Trace</h1>
        <p class="text-muted-foreground">
          A line for a tool call that failed. The error is the title, like
          &quot;Failed: TypeError&quot;; open it for the stack frames, which can
          link to the file and line.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-stack-trace-usage-demo-container />
        <p class="text-muted-foreground">
          A <a scLink routerLink="/docs/components/trace">Trace</a> line with an
          error status, collapsible on the frames. Your own frames are links to
          the file at the line; the framework&apos;s fold into a line of their
          own, so the frames you can fix come first.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
        <p class="text-muted-foreground">
          The title truncates, so the content repeats the whole error at its
          top.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Sending the stack</h2>
        <p class="text-muted-foreground">
          A failed tool sends only its error message by default; the server has
          to send the stack for the frames. A stack shows file paths from your
          server: send it in development only.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <div class="space-y-4">
          <p class="text-muted-foreground">
            Every frame in one block: the framework&apos;s stay muted, so your
            own stand out.
          </p>
          <app-muted-frames-stack-trace-demo-container />
        </div>
        <app-rtl-stack-trace-demo-container />
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
export default class StackTracePage {
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
      '      <span scTraceLine status="error">',
      '        <span scTraceIcon><svg siTerminalIcon></svg></span>',
      '        <span scTraceTitle>Failed: {{ error }}</span>',
      '      </span>',
      '    </button>',
      '    <div scCollapsiblePanel>',
      '      <div scTraceCollapsiblePanelContent class="flex flex-col gap-2">',
      '        <p class="text-destructive font-mono text-xs">{{ error }}</p>',
      '        <div scTrace>',
      '          <a [href]="frameLink">',
      '            <span scTraceLine>… in prisma/seed.ts:27</span>',
      '          </a>',
      '        </div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };
}
