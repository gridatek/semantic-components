import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScHeading, ScLink } from '@semantic-components/ui';
import { Anatomy } from '../../../../components/anatomy/anatomy';
import { TocHeading } from '../../../../components/toc/toc-heading';
import { CheckpointUsageDemoContainer } from './demos/checkpoint-usage-demo-container';
import { RtlCheckpointDemoContainer } from './demos/rtl-checkpoint-demo-container';

/** shadcn's Checkpoint pattern: a point in the conversation to return to. */
@Component({
  selector: 'app-checkpoint-page',
  imports: [
    Anatomy,
    CheckpointUsageDemoContainer,
    RouterLink,
    RtlCheckpointDemoContainer,
    ScHeading,
    ScLink,
    TocHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Checkpoint</h1>
        <p class="text-muted-foreground">
          Marks a point in the conversation you can return to.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-checkpoint-usage-demo-container />
        <p class="text-muted-foreground">
          A
          <a scLink routerLink="/docs/components/marker">Marker</a> after a
          turn, with a Restore button. Restore keeps that turn and drops every
          message after it; send a new message to continue from there.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
        <p class="text-muted-foreground">
          The button&apos;s name says which point it restores: hidden text after
          &quot;Restore&quot;, so the visible word starts its name.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-rtl-checkpoint-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          See the
          <a scLink routerLink="/docs/components/marker">Marker</a> and the
          <a scLink routerLink="/docs/components/button">Button</a>.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class CheckpointPage {
  protected readonly anatomy = {
    imports:
      "import { ScMarker, ScMarkerContent, ScButton } from '@semantic-components/ui';",
    markup: [
      '<div scMarker variant="separator">',
      '  <span scMarkerContent class="inline-flex items-center gap-2">',
      '    {{ label }}',
      '    <button scButton size="xs" variant="outline" (click)="restore()">',
      '      Restore',
      '      <span class="sr-only">to {{ label }}</span>',
      '    </button>',
      '  </span>',
      '</div>',
    ].join('\n'),
  };
}
