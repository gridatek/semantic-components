import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicKanbanBoardDemoContainer } from './demos/basic-kanban-board-demo-container';
import { MinimalKanbanBoardDemoContainer } from './demos/minimal-kanban-board-demo-container';

@Component({
  selector: 'app-kanban-board-page',
  imports: [
    BasicKanbanBoardDemoContainer,
    MinimalKanbanBoardDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>KanbanBoard</h1>
        <p class="text-muted-foreground">
          Drag-and-drop task board for project management and workflow
          visualization.
        </p>
        <app-component-badges path="kanban-board" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-basic-kanban-board-demo-container />
        <app-minimal-kanban-board-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class KanbanBoardPage {}
