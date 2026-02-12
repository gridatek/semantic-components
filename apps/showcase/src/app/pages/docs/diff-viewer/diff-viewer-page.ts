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
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

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
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">DiffViewer</h1>
        <p class="text-muted-foreground">
          Side-by-side or unified view for comparing text and code changes.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
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
export default class DiffViewerPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'diff-viewer')!
    .status;
}
