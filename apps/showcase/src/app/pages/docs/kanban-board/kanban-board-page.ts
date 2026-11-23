import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScKbd, ScLink, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AddKanbanBoardDemoContainer } from './demos/add-kanban-board-demo-container';
import { BasicKanbanBoardDemoContainer } from './demos/basic-kanban-board-demo-container';
import { FlatKanbanBoardDemoContainer } from './demos/flat-kanban-board-demo-container';
import { RichKanbanBoardDemoContainer } from './demos/rich-kanban-board-demo-container';

@Component({
  selector: 'app-kanban-board-page',
  imports: [
    Anatomy,
    RouterLink,
    ScKbd,
    ScLink,
    ScTypeset,
    BasicKanbanBoardDemoContainer,
    RichKanbanBoardDemoContainer,
    FlatKanbanBoardDemoContainer,
    AddKanbanBoardDemoContainer,
    TocHeading,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Kanban Board</h1>
        <p class="text-muted-foreground">
          A recipe: your columns and cards, your items by column as the value —
          <a scLink routerLink="/docs/components/sortable">Sortable</a>
          lists, linked in a group. No component of its own.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-basic-kanban-board-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>How it is made</h2>
        <p>
          <code scTypeset>scSortableGroup</code>
          holds the value — your items by column, replaced on each move. Each
          column is a list of it,
          <code scTypeset>[scSortable]="column.id"</code>, its cards
          <code scTypeset>scSortableItem</code>s: dragged from column to column,
          or lifted by the keyboard and carried across. The group&apos;s
          <code scTypeset>items(column)</code>
          is what to draw, its
          <code scTypeset>move(item, column, index)</code>
          a «Move to…» menu&apos;s.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Each card is a Tab stop: <kbd scKbd>Space</kbd> lifts it, the arrows
            move it — down a column and across to the next —
            <kbd scKbd>Space</kbd> drops it, <kbd scKbd>Escape</kbd> puts it
            back.
          </li>
          <li>
            Each step is announced, in your words: the group&apos;s
            <code scTypeset>announce</code>
            gets the card, its column, its place and the count.
          </li>
          <li>
            Say how it works beside the board (aria-describedby on the cards),
            and name each column (aria-labelledby its heading).
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-rich-kanban-board-demo-container />
        <app-flat-kanban-board-demo-container />
        <app-add-kanban-board-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class KanbanBoardPage {
  private readonly anatomy = {
    imports:
      "import { ScSortableGroup, ScSortable, ScSortableItem } from '@semantic-components/ui';",
    markup: [
      '<div scSortableGroup #board="scSortableGroup" [(value)]="tasks" [announce]="announce">',
      '  @for (column of columns; track column.id) {',
      '    <h3 [id]="column.id">{{ column.title }}</h3>',
      '    <ul [scSortable]="column.id" [attr.aria-labelledby]="column.id">',
      '      @for (task of board.items(column.id); track task.id) {',
      '        <li [scSortableItem]="task" aria-describedby="help">{{ task.title }}</li>',
      '      }',
      '    </ul>',
      '  }',
      '</div>',
    ].join('\n'),
  };
}
