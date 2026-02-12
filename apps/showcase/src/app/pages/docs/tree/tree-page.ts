import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FileExplorerTreeDemoContainer } from './demos/file-explorer-tree-demo-container';
import { NavigationTreeDemoContainer } from './demos/navigation-tree-demo-container';
import { SimpleTreeDemoContainer } from './demos/simple-tree-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-tree-page',
  imports: [
    FileExplorerTreeDemoContainer,
    NavigationTreeDemoContainer,
    SimpleTreeDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Tree</h1>
        <p class="text-muted-foreground">
          A hierarchical collapsible tree for displaying nested data.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-file-explorer-tree-demo-container />
        <app-navigation-tree-demo-container />
        <app-simple-tree-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TreePage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'tree')!.status;
}
