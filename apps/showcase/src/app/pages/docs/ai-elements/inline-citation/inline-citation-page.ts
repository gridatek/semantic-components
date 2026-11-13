import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScHeading, ScLink } from '@semantic-components/ui';
import { Anatomy } from '../../../../components/anatomy/anatomy';
import { TocHeading } from '../../../../components/toc/toc-heading';
import { InlineCitationUsageDemoContainer } from './demos/inline-citation-usage-demo-container';
import { RtlInlineCitationDemoContainer } from './demos/rtl-inline-citation-demo-container';

/** shadcn's Inline Citation pattern: a source in the sentence that opens on hover. */
@Component({
  selector: 'app-inline-citation-page',
  imports: [
    Anatomy,
    InlineCitationUsageDemoContainer,
    RouterLink,
    RtlInlineCitationDemoContainer,
    ScHeading,
    ScLink,
    TocHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Inline Citation</h1>
        <p class="text-muted-foreground">
          A source that sits in the sentence it supports, and opens on hover.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-inline-citation-usage-demo-container />
        <p class="text-muted-foreground">
          A <a scLink routerLink="/docs/components/link">Link</a> in a small
          secondary button look, with a
          <a scLink routerLink="/docs/components/preview-card">Preview Card</a>
          of the page. To list the sources after the reply, use
          <a scLink routerLink="/docs/ai-elements/sources">Sources</a>.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <p class="text-muted-foreground">
          Not shadcn&apos;s: there, the citation is a button, and the link to
          the source sits in the card. A preview card is for the eyes only — not
          announced, not reached with the keyboard — so here the citation is the
          link itself: Tab reaches it, Enter follows it, and its name says where
          it goes (the title, in hidden text, and that it opens in a new tab).
          The card only previews it.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-rtl-inline-citation-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          See the
          <a scLink routerLink="/docs/components/preview-card">Preview Card</a>
          and the <a scLink routerLink="/docs/components/link">Link</a>.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class InlineCitationPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScPreviewCardProvider, ScPreviewCardTrigger, ScPreviewCardPortal, ScPreviewCard,',
      '  ScLink,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<span scPreviewCardProvider>',
      '  <a scLink scPreviewCardTrigger variant="secondary" size="xs"',
      '     [href]="url" target="_blank" rel="noreferrer">',
      '    {{ hostname }}',
      '    <span class="sr-only">: {{ title }} (opens in a new tab)</span>',
      '  </a>',
      '  <ng-template scPreviewCardPortal>',
      '    <div scPreviewCard class="flex w-64 flex-col gap-1">',
      '      <div class="font-medium">{{ title }}</div>',
      '      …',
      '    </div>',
      '  </ng-template>',
      '</span>',
    ].join('\n'),
  };
}
