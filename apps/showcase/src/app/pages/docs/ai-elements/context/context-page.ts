import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScHeading, ScLink } from '@semantic-components/ui';
import { Anatomy } from '../../../../components/anatomy/anatomy';
import { TocHeading } from '../../../../components/toc/toc-heading';
import { ContextUsageDemoContainer } from './demos/context-usage-demo-container';
import { RtlContextDemoContainer } from './demos/rtl-context-demo-container';

/** shadcn's Context pattern: how much of the context window is used. */
@Component({
  selector: 'app-context-page',
  imports: [
    Anatomy,
    ContextUsageDemoContainer,
    RouterLink,
    RtlContextDemoContainer,
    ScHeading,
    ScLink,
    TocHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Context</h1>
        <p class="text-muted-foreground">
          How much of the model&apos;s context window the conversation has used.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-context-usage-demo-container />
        <p class="text-muted-foreground">
          A
          <a scLink routerLink="/docs/components/preview-card">Preview Card</a>
          (shadcn&apos;s Hover Card) on a button, with a
          <a scLink routerLink="/docs/components/progress">Progress</a> bar and
          the breakdown: input, output, reasoning.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <p class="text-muted-foreground">
          A preview card is for the eyes only: it opens on hover and focus, but
          it is not announced. The button&apos;s own text carries what matters
          (&quot;8% context&quot;); the breakdown is extra. If it must be read
          too, use a
          <a scLink routerLink="/docs/components/popover">Popover</a> instead,
          opened on click.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Limit</h2>
        <p class="text-muted-foreground">
          The usage comes with the agent&apos;s message, once its stream ends;
          the limit is the model&apos;s context window, which the stream does
          not send: set it from the model you use.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-rtl-context-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          See the
          <a scLink routerLink="/docs/components/preview-card">Preview Card</a>
          and the
          <a scLink routerLink="/docs/components/progress">Progress</a>.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ContextPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScPreviewCardProvider, ScPreviewCardTrigger, ScPreviewCardPortal, ScPreviewCard,',
      '  ScProgress, ScProgressTrack, ScProgressRange, ScButton,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scPreviewCardProvider>',
      '  <button scButton scPreviewCardTrigger variant="outline" size="sm">',
      '    {{ percent }}% context',
      '  </button>',
      '  <ng-template scPreviewCardPortal>',
      '    <div scPreviewCard class="flex w-64 flex-col gap-3">',
      '      …',
      '      <div scProgress [value]="percent" aria-label="Context used">',
      '        <div scProgressTrack><div scProgressRange></div></div>',
      '      </div>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };
}
