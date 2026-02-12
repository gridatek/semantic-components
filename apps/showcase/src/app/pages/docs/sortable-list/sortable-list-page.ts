import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicSortableListDemoContainer } from './demos/basic-sortable-list-demo-container';
import { HandleSortableListDemoContainer } from './demos/handle-sortable-list-demo-container';
import { TaskListSortableListDemoContainer } from './demos/task-list-sortable-list-demo-container';
import { PlaylistSortableListDemoContainer } from './demos/playlist-sortable-list-demo-container';
import { HorizontalSortableListDemoContainer } from './demos/horizontal-sortable-list-demo-container';
import { KanbanSortableListDemoContainer } from './demos/kanban-sortable-list-demo-container';
import { DisabledSortableListDemoContainer } from './demos/disabled-sortable-list-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-sortable-list-page',
  imports: [
    BasicSortableListDemoContainer,
    HandleSortableListDemoContainer,
    TaskListSortableListDemoContainer,
    PlaylistSortableListDemoContainer,
    HorizontalSortableListDemoContainer,
    KanbanSortableListDemoContainer,
    DisabledSortableListDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">SortableList</h1>
        <p class="text-muted-foreground">
          A drag and drop list component for reordering items.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-sortable-list-demo-container />
        <app-handle-sortable-list-demo-container />
        <app-task-list-sortable-list-demo-container />
        <app-playlist-sortable-list-demo-container />
        <app-horizontal-sortable-list-demo-container />
        <app-kanban-sortable-list-demo-container />
        <app-disabled-sortable-list-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SortableListPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'sortable-list')!
    .status;
}
