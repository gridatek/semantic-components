import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicKanbanBoardDemo } from './basic-kanban-board-demo';

@Component({
  selector: 'app-basic-kanban-board-demo-container',
  imports: [DemoContainer, BasicKanbanBoardDemo],
  template: `
    <app-demo-container
      title="Project Board"
      demoUrl="/demos/kanban-board/basic-kanban-board-demo"
      [code]="code"
    >
      <app-basic-kanban-board-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicKanbanBoardDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  type KanbanCard,
  type KanbanColumn,
  type KanbanDragEvent,
  ScKanbanBoard,
  ScKanbanCard,
  ScKanbanColumn,
} from '@semantic-components/ui-lab';
import {
  SiChevronDownIcon,
  SiPlusIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-kanban-board-demo',
  imports: [
    ScKanbanBoard,
    ScKanbanColumn,
    ScKanbanCard,
    SiChevronDownIcon,
    SiPlusIcon,
    SiXIcon,
  ],
  template: \`
    <div class="bg-muted/10 h-[600px] overflow-hidden rounded-lg border">
      <div
        scKanbanBoard
        #board="scKanbanBoard"
        [(columns)]="columns"
        [(cards)]="cards"
        (cardMoved)="onCardMoved($event)"
        (cardAdded)="onCardAdded($event)"
        (cardDeleted)="onCardDeleted($event)"
        (columnAdded)="onColumnAdded($event)"
      >
        @for (column of board.sortedColumns(); track column.id) {
          <div scKanbanColumn #col="scKanbanColumn" [column]="column">
            <!-- Header -->
            <div
              class="flex items-center justify-between border-b p-3"
              [style.border-top-color]="column.color || 'transparent'"
              [style.border-top-width]="column.color ? '3px' : '0'"
            >
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="hover:bg-muted rounded p-0.5 transition-colors"
                  (click)="col.toggleCollapse()"
                  [attr.aria-expanded]="!col.collapsed()"
                  [attr.aria-label]="
                    col.collapsed() ? 'Expand column' : 'Collapse column'
                  "
                >
                  <svg
                    siChevronDownIcon
                    [class]="
                      col.collapsed()
                        ? '-rotate-90 transition-transform'
                        : 'rotate-0 transition-transform'
                    "
                  ></svg>
                </button>
                <h3 class="text-foreground text-sm font-semibold">
                  {{ column.title }}
                </h3>
                <span
                  class="bg-muted rounded-full px-1.5 py-0.5 text-xs font-medium"
                >
                  {{ col.columnCards().length }}
                  @if (column.limit) {
                    /{{ column.limit }}
                  }
                </span>
              </div>

              <button
                type="button"
                class="hover:bg-muted text-muted-foreground hover:text-foreground rounded p-1 transition-colors"
                (click)="startAddingCard(column.id)"
                aria-label="Add card"
              >
                <svg siPlusIcon class="size-4"></svg>
              </button>
            </div>

            @if (col.collapsed()) {
              <div class="text-muted-foreground p-3 text-center text-sm">
                {{ col.columnCards().length }} cards
              </div>
            } @else {
              <!-- Cards container -->
              <div
                class="min-h-[100px] flex-1 space-y-2 overflow-y-auto p-2"
                [class.bg-primary/5]="col.isDragOver()"
                [class.ring-2]="col.isDragOver()"
                [class.ring-primary]="col.isDragOver()"
                [class.ring-inset]="col.isDragOver()"
                role="list"
                [attr.aria-label]="column.title + ' cards'"
              >
                @for (
                  card of col.columnCards();
                  track card.id;
                  let idx = $index
                ) {
                  <div
                    [class.border-t-2]="col.dropIndex() === idx"
                    [class.border-primary]="col.dropIndex() === idx"
                    [class.pt-2]="col.dropIndex() === idx"
                  >
                    <div
                      scKanbanCard
                      #c="scKanbanCard"
                      [card]="card"
                      (cardClick)="board.cardClick.emit($event)"
                    >
                      <!-- Labels -->
                      @if (card.labels?.length) {
                        <div class="mb-2 flex flex-wrap gap-1">
                          @for (label of card.labels; track label.id) {
                            <span
                              class="rounded px-1.5 py-0.5 text-xs font-medium"
                              [style.background-color]="label.color + '20'"
                              [style.color]="label.color"
                            >
                              {{ label.text }}
                            </span>
                          }
                        </div>
                      }

                      <!-- Title -->
                      <h4
                        class="text-foreground text-sm leading-tight font-medium"
                      >
                        {{ card.title }}
                      </h4>

                      <!-- Description -->
                      @if (card.description) {
                        <p
                          class="text-muted-foreground mt-1 line-clamp-2 text-xs"
                        >
                          {{ card.description }}
                        </p>
                      }

                      <!-- Footer -->
                      @if (card.assignee || card.dueDate || card.priority) {
                        <div
                          class="mt-3 flex items-center justify-between border-t pt-2"
                        >
                          <div class="flex items-center gap-2">
                            @if (card.priority) {
                              <span [class]="c.priorityClass()">
                                {{ c.priorityIcon() }}
                              </span>
                            }
                            @if (card.dueDate) {
                              <span class="text-xs" [class]="c.dueDateClass()">
                                {{ c.formatDate(card.dueDate) }}
                              </span>
                            }
                          </div>
                          @if (card.assignee) {
                            <div
                              class="bg-primary/10 text-primary flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium"
                              [attr.title]="card.assignee.name"
                            >
                              {{
                                card.assignee.initials ||
                                  card.assignee.name.charAt(0).toUpperCase()
                              }}
                            </div>
                          }
                        </div>
                      }

                      <!-- Delete button -->
                      <button
                        type="button"
                        class="hover:bg-destructive/10 text-muted-foreground hover:text-destructive absolute top-2 right-2 rounded p-1 opacity-0 transition-opacity group-hover:opacity-100"
                        (click)="
                          $event.stopPropagation();
                          board.deleteCard(column.id, card)
                        "
                        aria-label="Delete card"
                      >
                        <svg siXIcon class="size-3.5"></svg>
                      </button>
                    </div>
                  </div>
                }

                @if (
                  col.dropIndex() === col.columnCards().length &&
                  col.columnCards().length > 0
                ) {
                  <div class="border-primary border-t-2 pt-2"></div>
                }

                @if (
                  col.columnCards().length === 0 &&
                  addingCardInColumn() !== column.id
                ) {
                  <div
                    class="text-muted-foreground flex h-24 items-center justify-center rounded-lg border-2 border-dashed text-sm"
                  >
                    Drop cards here
                  </div>
                }

                @if (addingCardInColumn() === column.id) {
                  <div class="bg-card rounded-lg border p-2 shadow-sm">
                    <textarea
                      #addInput
                      class="focus:ring-ring w-full resize-none rounded border p-2 text-sm focus:ring-2 focus:outline-none"
                      rows="2"
                      placeholder="Enter card title..."
                      (keydown.enter)="submitNewCard($event, column.id)"
                      (keydown.escape)="cancelAddingCard()"
                      (blur)="onCardInputBlur()"
                    ></textarea>
                    <div class="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        class="bg-primary text-primary-foreground hover:bg-primary/90 rounded px-3 py-1.5 text-xs font-medium transition-colors"
                        (mousedown)="submitNewCardFromButton(column.id)"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        class="text-muted-foreground hover:text-foreground px-3 py-1.5 text-xs font-medium transition-colors"
                        (mousedown)="cancelAddingCard()"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                }
              </div>

              @if (addingCardInColumn() !== column.id) {
                <button
                  type="button"
                  class="text-muted-foreground hover:text-foreground hover:bg-muted/50 flex w-full items-center justify-center gap-1 border-t p-2 text-sm transition-colors"
                  (click)="startAddingCard(column.id)"
                >
                  <svg siPlusIcon class="size-3.5"></svg>
                  Add card
                </button>
              }

              @if (col.isOverLimit()) {
                <div
                  class="border-t bg-orange-500/10 px-3 py-1.5 text-xs text-orange-600 dark:text-orange-400"
                >
                  Column limit exceeded ({{ col.columnCards().length }}/{{
                    column.limit
                  }})
                </div>
              }
            }
          </div>
        }

        <!-- Add column -->
        <div class="max-w-[320px] min-w-[280px] shrink-0">
          @if (isAddingColumn()) {
            <div class="bg-muted/30 rounded-lg border p-3">
              <input
                #columnInput
                type="text"
                class="focus:ring-ring w-full rounded border p-2 text-sm focus:ring-2 focus:outline-none"
                placeholder="Enter column title..."
                (keydown.enter)="submitNewColumn($event)"
                (keydown.escape)="cancelAddingColumn()"
                (blur)="onColumnInputBlur()"
              />
              <div class="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  class="bg-primary text-primary-foreground hover:bg-primary/90 rounded px-3 py-1.5 text-xs font-medium transition-colors"
                  (mousedown)="submitNewColumnFromButton()"
                >
                  Add Column
                </button>
                <button
                  type="button"
                  class="text-muted-foreground hover:text-foreground px-3 py-1.5 text-xs font-medium transition-colors"
                  (mousedown)="cancelAddingColumn()"
                >
                  Cancel
                </button>
              </div>
            </div>
          } @else {
            <button
              type="button"
              class="text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-muted/30 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed p-3 text-sm transition-colors"
              (click)="startAddingColumn()"
            >
              <svg siPlusIcon class="size-4"></svg>
              Add Column
            </button>
          }
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicKanbanBoardDemo {
  readonly addingCardInColumn = signal<string | null>(null);
  readonly isAddingColumn = signal(false);

  readonly columns = signal<KanbanColumn[]>([
    { id: 'backlog', title: 'Backlog', order: 0, color: '#6b7280' },
    { id: 'todo', title: 'To Do', order: 1, color: '#3b82f6' },
    {
      id: 'in-progress',
      title: 'In Progress',
      order: 2,
      color: '#f59e0b',
      limit: 3,
    },
    { id: 'review', title: 'Review', order: 3, color: '#8b5cf6' },
    { id: 'done', title: 'Done', order: 4, color: '#22c55e' },
  ]);

  readonly cards = signal<KanbanCard[]>([
    {
      id: '1',
      title: 'Set up project repository',
      description: 'Initialize Git repo and configure CI/CD pipeline',
      columnId: 'done',
      order: 0,
      labels: [{ id: 'l1', text: 'Setup', color: '#22c55e' }],
      assignee: { id: 'u1', name: 'Alice Johnson', initials: 'AJ' },
      priority: 'high',
    },
    {
      id: '2',
      title: 'Design database schema',
      description: 'Create ERD and define table relationships',
      columnId: 'done',
      order: 1,
      labels: [{ id: 'l2', text: 'Database', color: '#3b82f6' }],
      assignee: { id: 'u2', name: 'Bob Smith', initials: 'BS' },
      priority: 'high',
    },
    {
      id: '3',
      title: 'Implement user authentication',
      description: 'Add login, registration, and password reset',
      columnId: 'review',
      order: 0,
      labels: [
        { id: 'l3', text: 'Feature', color: '#8b5cf6' },
        { id: 'l4', text: 'Security', color: '#ef4444' },
      ],
      assignee: { id: 'u1', name: 'Alice Johnson', initials: 'AJ' },
      priority: 'urgent',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: '4',
      title: 'Create dashboard layout',
      description: 'Design and implement the main dashboard UI',
      columnId: 'in-progress',
      order: 0,
      labels: [{ id: 'l5', text: 'UI', color: '#f59e0b' }],
      assignee: { id: 'u3', name: 'Carol Davis', initials: 'CD' },
      priority: 'medium',
    },
    {
      id: '5',
      title: 'Add API endpoints for users',
      columnId: 'in-progress',
      order: 1,
      labels: [{ id: 'l6', text: 'Backend', color: '#6366f1' }],
      assignee: { id: 'u2', name: 'Bob Smith', initials: 'BS' },
      priority: 'medium',
    },
    {
      id: '6',
      title: 'Write unit tests for auth module',
      columnId: 'todo',
      order: 0,
      labels: [{ id: 'l7', text: 'Testing', color: '#14b8a6' }],
      priority: 'low',
    },
    {
      id: '7',
      title: 'Set up error monitoring',
      description: 'Integrate Sentry or similar service',
      columnId: 'todo',
      order: 1,
      labels: [{ id: 'l8', text: 'DevOps', color: '#ec4899' }],
      priority: 'medium',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: '8',
      title: 'Research payment providers',
      description: 'Compare Stripe, PayPal, and Square for integration',
      columnId: 'backlog',
      order: 0,
      labels: [{ id: 'l9', text: 'Research', color: '#64748b' }],
    },
    {
      id: '9',
      title: 'Mobile responsive design',
      columnId: 'backlog',
      order: 1,
      labels: [{ id: 'l5', text: 'UI', color: '#f59e0b' }],
    },
    {
      id: '10',
      title: 'Performance optimization',
      description: 'Audit and improve load times',
      columnId: 'backlog',
      order: 2,
      labels: [{ id: 'l10', text: 'Performance', color: '#06b6d4' }],
    },
  ]);

  onCardMoved(event: KanbanDragEvent): void {
    console.log('Card moved:', event);
  }

  onCardAdded(event: { columnId: string; title: string }): void {
    console.log('Card added:', event);
  }

  onCardDeleted(event: { card: KanbanCard; columnId: string }): void {
    console.log('Card deleted:', event);
  }

  onColumnAdded(title: string): void {
    console.log('Column added:', title);
  }

  startAddingCard(columnId: string): void {
    this.addingCardInColumn.set(columnId);
    requestAnimationFrame(() => {
      const textarea = document.querySelector(
        '[scKanbanBoard] textarea',
      ) as HTMLTextAreaElement;
      textarea?.focus();
    });
  }

  cancelAddingCard(): void {
    this.addingCardInColumn.set(null);
  }

  submitNewCard(event: Event, columnId: string): void {
    event.preventDefault();
    const textarea = event.target as HTMLTextAreaElement;
    const title = textarea.value.trim();

    if (title) {
      // Access the board through template ref would be ideal,
      // but we can use the signal directly since we have two-way binding
      const newCard: KanbanCard = {
        id: \`\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`,
        title,
        columnId,
        order: this.cards().filter((c) => c.columnId === columnId).length,
      };
      this.cards.update((cards) => [...cards, newCard]);
      textarea.value = '';
    }

    this.addingCardInColumn.set(null);
  }

  submitNewCardFromButton(columnId: string): void {
    const textarea = document.querySelector(
      '[scKanbanBoard] textarea',
    ) as HTMLTextAreaElement;
    const title = textarea?.value.trim();

    if (title) {
      const newCard: KanbanCard = {
        id: \`\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`,
        title,
        columnId,
        order: this.cards().filter((c) => c.columnId === columnId).length,
      };
      this.cards.update((cards) => [...cards, newCard]);
    }

    this.addingCardInColumn.set(null);
  }

  onCardInputBlur(): void {
    setTimeout(() => {
      if (this.addingCardInColumn() !== null) {
        this.addingCardInColumn.set(null);
      }
    }, 150);
  }

  startAddingColumn(): void {
    this.isAddingColumn.set(true);
    requestAnimationFrame(() => {
      const input = document.querySelector(
        '[scKanbanBoard] input[type="text"]',
      ) as HTMLInputElement;
      input?.focus();
    });
  }

  cancelAddingColumn(): void {
    this.isAddingColumn.set(false);
  }

  submitNewColumn(event: Event): void {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    const title = input.value.trim();

    if (title) {
      const newColumn: KanbanColumn = {
        id: \`\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`,
        title,
        order: this.columns().length,
      };
      this.columns.update((cols) => [...cols, newColumn]);
      input.value = '';
    }

    this.isAddingColumn.set(false);
  }

  submitNewColumnFromButton(): void {
    const input = document.querySelector(
      '[scKanbanBoard] input[type="text"]',
    ) as HTMLInputElement;
    const title = input?.value.trim();

    if (title) {
      const newColumn: KanbanColumn = {
        id: \`\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`,
        title,
        order: this.columns().length,
      };
      this.columns.update((cols) => [...cols, newColumn]);
    }

    this.isAddingColumn.set(false);
  }

  onColumnInputBlur(): void {
    setTimeout(() => {
      if (this.isAddingColumn()) {
        this.isAddingColumn.set(false);
      }
    }, 150);
  }
}`;
}
