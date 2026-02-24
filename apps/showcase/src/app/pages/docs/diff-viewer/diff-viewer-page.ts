import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicDiffViewerDemoContainer } from './demos/basic-diff-viewer-demo-container';
import { UnifiedDiffViewerDemoContainer } from './demos/unified-diff-viewer-demo-container';
import { JsonDiffViewerDemoContainer } from './demos/json-diff-viewer-demo-container';
import { MinimalDiffViewerDemoContainer } from './demos/minimal-diff-viewer-demo-container';
import { WhitespaceDiffViewerDemoContainer } from './demos/whitespace-diff-viewer-demo-container';
import { LargeDiffViewerDemoContainer } from './demos/large-diff-viewer-demo-container';
import { IdenticalDiffViewerDemoContainer } from './demos/identical-diff-viewer-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-diff-viewer-page',
  imports: [
    BasicDiffViewerDemoContainer,
    UnifiedDiffViewerDemoContainer,
    JsonDiffViewerDemoContainer,
    MinimalDiffViewerDemoContainer,
    WhitespaceDiffViewerDemoContainer,
    LargeDiffViewerDemoContainer,
    IdenticalDiffViewerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>DiffViewer</h1>
        <p class="text-muted-foreground">
          Side-by-side or unified view for comparing text and code changes.
        </p>
        <app-component-badges path="diff-viewer" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-basic-diff-viewer-demo-container />
        <app-unified-diff-viewer-demo-container />
        <app-json-diff-viewer-demo-container />
        <app-minimal-diff-viewer-demo-container />
        <app-whitespace-diff-viewer-demo-container />
        <app-large-diff-viewer-demo-container />
        <app-identical-diff-viewer-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DiffViewerPage {}
