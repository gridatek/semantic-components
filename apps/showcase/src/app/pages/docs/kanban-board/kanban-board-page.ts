import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicKanbanBoardDemoContainer } from './demos/basic-kanban-board-demo-container';
import { MinimalKanbanBoardDemoContainer } from './demos/minimal-kanban-board-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-kanban-board-page',
  imports: [
    BasicKanbanBoardDemoContainer,
    MinimalKanbanBoardDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">KanbanBoard</h1>
        <p class="text-muted-foreground">
          Drag-and-drop task board for project management and workflow
          visualization.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-kanban-board-demo-container />
        <app-minimal-kanban-board-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class KanbanBoardPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'kanban-board')!
    .status;
}
