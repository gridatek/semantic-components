# Kanban Board Next

The kanban board, rebuilt: your columns and cards, your items by column as its value — dragged by mouse, touch or pen, or lifted and moved by the keyboard, each step announced in your words.

## Architecture

```
[scKanbanBoardNext] ([(value)]: Record<columnId, T[]>, announce, disabled)
│  items(column) · move(item, column, index) · active() · dragging() · lifted()
└── [scKanbanColumnNext]="columnId"   — a column's list: where cards drop (data-over)
    └── [scKanbanCardNext]="item"     — a card: dragged, or lifted (data-dragging, data-lifted)
```

## Usage

```html
<p id="kanban-help" class="sr-only">Space lifts a card, the arrow keys move it, Space drops it, Escape puts it back.</p>

<div scKanbanBoardNext #kanban="scKanbanBoardNext" [(value)]="board" [announce]="announce">
  @for (column of columns; track column.id) {
  <div class="bg-muted/50 w-64 rounded-xl p-2">
    <h3 [id]="column.id">{{ column.title }}</h3>
    <ul [scKanbanColumnNext]="column.id" [attr.aria-labelledby]="column.id">
      @for (task of kanban.items(column.id); track task.id) {
      <li [scKanbanCardNext]="task" aria-describedby="kanban-help">{{ task.title }}</li>
      }
    </ul>
  </div>
  }
</div>
```

```ts
readonly board = signal<ScKanbanBoardNextValue<Task>>({ todo: [...], doing: [...], done: [] });

readonly announce = ({ type, item, column, position, count }: ScKanbanBoardNextAnnouncement<Task>) =>
  ({
    lift: `Lifted ${item.title}, in ${this.titles[column]}, ${position} of ${count}.`,
    move: `${item.title}: ${this.titles[column]}, ${position} of ${count}.`,
    drop: `Dropped ${item.title} in ${this.titles[column]}, ${position} of ${count}.`,
    cancel: `${item.title} back in ${this.titles[column]}, ${position} of ${count}.`,
  })[type];
```

## Value

- Your items, by column id, in order — any type. A move replaces the value (new arrays), never changes your items.
- Render each column from `items(column)`: while a card is moved, it is the moving arrangement; the value changes on the drop.
- Stored flat (each item with a status)? Make the value with a `computed`, and write moves back from `(valueChange)`.
- `move(item, column, index)` moves one directly — for a "Move to…" menu of yours.

## Pointer

- Mouse and pen: a press that moves a few pixels drags. Touch: a press held a moment, then moved (a quick swipe scrolls).
- The card follows the pointer; the others make room. It drops in the column across from the pointer — anywhere down it — at the place it is over. Near the board's or a column's edge, they scroll.
- Escape cancels. A press on the card's buttons, links or fields is theirs, not a drag.

## Keyboard

| Key          | Does                                                                       |
| ------------ | -------------------------------------------------------------------------- |
| Space, Enter | lifts the focused card; again, drops it                                    |
| ← →          | lifted: to the column before, after — in reading order (right to left too) |
| ↑ ↓          | lifted: one place up, down                                                 |
| Escape       | lifted: back where it was                                                  |
| Tab          | lifted: stays — drop or cancel first                                       |

## Accessibility

- Each card is a Tab stop; describe the keys once (`aria-describedby`).
- `announce` puts each keyboard step into words — the library writes none: lift, move, drop, cancel, with the column, the place and the count.
- Name each column's list (`aria-labelledby` its heading).
- Offer `move()` in a menu too: some can neither drag nor lift.

## Not here

Animated shifting, dragging columns, dragging between boards, several cards at once, virtual scrolling.
