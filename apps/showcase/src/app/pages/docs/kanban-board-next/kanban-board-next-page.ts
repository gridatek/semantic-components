import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AddKanbanBoardNextDemoContainer } from './demos/add-kanban-board-next-demo-container';
import { BasicKanbanBoardNextDemoContainer } from './demos/basic-kanban-board-next-demo-container';
import { FlatKanbanBoardNextDemoContainer } from './demos/flat-kanban-board-next-demo-container';
import { RichKanbanBoardNextDemoContainer } from './demos/rich-kanban-board-next-demo-container';

@Component({
  selector: 'app-kanban-board-next-page',
  imports: [
    BasicKanbanBoardNextDemoContainer,
    RichKanbanBoardNextDemoContainer,
    FlatKanbanBoardNextDemoContainer,
    AddKanbanBoardNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Kanban Board Next</h1>
        <p class="text-muted-foreground">
          The kanban board, rebuilt: your columns and cards, your items by
          column as its value — dragged by mouse, touch or pen, or lifted and
          moved by the keyboard, each step announced in your words.
        </p>
        <app-component-badges path="kanban-board-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          Cards dragged with the mouse, a finger (hold, then move) or a pen — or
          lifted by the keyboard: Space, the arrows, Space; Escape puts it back.
          Each keyboard step is announced, in your words.
        </p>
        <app-basic-kanban-board-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Rich cards</h2>
        <p class="text-muted-foreground">
          A card is yours: labels, a priority in words and the theme’s colours,
          a due date, an avatar — and a “Move to…” menu, through move(), for
          those who neither drag nor lift.
        </p>
        <app-rich-kanban-board-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>From a flat list</h2>
        <p class="text-muted-foreground">
          Your data as it is stored — issues, each with a status: the board’s
          value made from it, and each move written back.
        </p>
        <app-flat-kanban-board-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Add and limit</h2>
        <p class="text-muted-foreground">
          Adding a card, and a work-in-progress limit, are yours: here a field
          under each column, and In progress said to be over three.
        </p>
        <app-add-kanban-board-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class KanbanBoardNextPage {}
