import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { FoldedDiffViewerDemoContainer } from './demos/folded-diff-viewer-demo-container';
import { IdenticalDiffViewerDemoContainer } from './demos/identical-diff-viewer-demo-container';
import { SplitDiffViewerDemoContainer } from './demos/split-diff-viewer-demo-container';
import { UnifiedDiffViewerDemoContainer } from './demos/unified-diff-viewer-demo-container';
import { WhitespaceDiffViewerDemoContainer } from './demos/whitespace-diff-viewer-demo-container';

@Component({
  selector: 'app-diff-viewer-page',
  imports: [
    SplitDiffViewerDemoContainer,
    UnifiedDiffViewerDemoContainer,
    FoldedDiffViewerDemoContainer,
    WhitespaceDiffViewerDemoContainer,
    IdenticalDiffViewerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Diff Viewer</h1>
        <p class="text-muted-foreground">
          The differences between two texts, line by line and word by word
          (jsdiff) — split or unified, highlighted like a code block, long
          unchanged runs folded.
        </p>
        <app-component-badges path="diff-viewer" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Split</h2>
        <p class="text-muted-foreground">
          Side by side: the old text facing the new, rows aligned, long lines
          wrapped. Your header holds the title, the counts and a switch for the
          view ([(view)]).
        </p>
        <app-split-diff-viewer-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Unified</h2>
        <p class="text-muted-foreground">
          One column, both line numbers, + and − — the words changed in a
          changed line marked.
        </p>
        <app-unified-diff-viewer-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Folded</h2>
        <p class="text-muted-foreground">
          context: unchanged lines kept around each change; the rest folded —
          your scDiffViewerFold template writes the button, a click shows them.
        </p>
        <app-folded-diff-viewer-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Ignore whitespace</h2>
        <p class="text-muted-foreground">
          ignoreWhitespace: lines that differ only in spaces and tabs count as
          unchanged (ignoreCase, the same for letter case).
        </p>
        <app-whitespace-diff-viewer-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Identical</h2>
        <p class="text-muted-foreground">
          identical(): nothing changed — show your own words.
        </p>
        <app-identical-diff-viewer-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class DiffViewerPage {}
