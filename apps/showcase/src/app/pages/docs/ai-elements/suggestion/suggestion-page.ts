import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScHeading, ScLink } from '@semantic-components/ui';
import { Anatomy } from '../../../../components/anatomy/anatomy';
import { TocHeading } from '../../../../components/toc/toc-heading';
import { RtlSuggestionDemoContainer } from './demos/rtl-suggestion-demo-container';
import { SuggestionUsageDemoContainer } from './demos/suggestion-usage-demo-container';

/** shadcn's Suggestion pattern: a prompt sent in one click. */
@Component({
  selector: 'app-suggestion-page',
  imports: [
    Anatomy,
    RouterLink,
    RtlSuggestionDemoContainer,
    ScHeading,
    ScLink,
    SuggestionUsageDemoContainer,
    TocHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Suggestion</h1>
        <p class="text-muted-foreground">
          A short prompt you can send to the agent in one click.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-suggestion-usage-demo-container />
        <p class="text-muted-foreground">
          Each one is a
          <a scLink routerLink="/docs/components/button">Button</a> with the
          prompt as its label; the label is the message, sent as is. Put a row
          of them above the
          <a scLink routerLink="/docs/ai-elements/prompt-input">Prompt Input</a
          >.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Scrolling</h2>
        <p class="text-muted-foreground">
          The row scrolls sideways when the suggestions do not fit.
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >scroll-fade-x</code
          >
          fades the edge that has more to show, and
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">shrink-0</code>
          keeps each label on one line.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-rtl-suggestion-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          See the <a scLink routerLink="/docs/components/button">Button</a>.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SuggestionPage {
  protected readonly anatomy = {
    imports: "import { ScButton } from '@semantic-components/ui';",
    markup: [
      '<div class="scroll-fade-x scrollbar-none flex gap-2 overflow-x-auto overscroll-x-contain">',
      '  @for (suggestion of suggestions; track suggestion) {',
      '    <button scButton variant="outline" size="sm" class="shrink-0"',
      '      (click)="send(suggestion)">',
      '      {{ suggestion }}',
      '    </button>',
      '  }',
      '</div>',
    ].join('\n'),
  };
}
