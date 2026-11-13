import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScHeading, ScLink } from '@semantic-components/ui';
import { Anatomy } from '../../../../components/anatomy/anatomy';
import { TocHeading } from '../../../../components/toc/toc-heading';
import { RtlSourcesDemoContainer } from './demos/rtl-sources-demo-container';
import { SourcesUsageDemoContainer } from './demos/sources-usage-demo-container';

/** shadcn's Sources pattern: the links the agent used for a reply. */
@Component({
  selector: 'app-sources-page',
  imports: [
    Anatomy,
    RouterLink,
    RtlSourcesDemoContainer,
    ScHeading,
    ScLink,
    SourcesUsageDemoContainer,
    TocHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Sources</h1>
        <p class="text-muted-foreground">
          The links the agent used for a reply: a line that says how many there
          are, like &quot;Used 3 sources&quot;, and opens into a link for each.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-sources-usage-demo-container />
        <p class="text-muted-foreground">
          A <a scLink routerLink="/docs/components/trace">Trace</a> with a
          collapsible line for the list, after the reply. The agent can cite the
          same page more than once: list each once, by its address. A title is
          optional — fall back to the page&apos;s host. To cite in the sentence
          itself, use an
          <a scLink routerLink="/docs/ai-elements/inline-citation"
            >Inline Citation</a
          >.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Each source is a plain link in the list. It opens in a new tab: say
            so in hidden text, &quot;(opens in a new tab)&quot;.
          </li>
          <li>The arrow is decorative; the title is the link&apos;s name.</li>
          <li>
            The count, &quot;Used 3 sources&quot;, tells the person what opens
            before they open it.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-rtl-sources-demo-container />
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
export default class SourcesPage {
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
      '        <span scTraceIcon><svg siGlobeIcon></svg></span>',
      '        <span scTraceTitle>Used {{ sources.length }} sources</span>',
      '      </span>',
      '    </button>',
      '    <div scCollapsiblePanel>',
      '      <div scTraceCollapsiblePanelContent>',
      '        <div scTrace>',
      '          <a [href]="source.url" target="_blank" rel="noreferrer">',
      '            <span scTraceLine>',
      '              <span scTraceTitle>',
      '                {{ source.title }}',
      '                <span class="sr-only"> (opens in a new tab)</span>',
      '              </span>',
      '              <span scTraceIcon><svg siArrowUpRightIcon></svg></span>',
      '            </span>',
      '          </a>',
      '        </div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };
}
