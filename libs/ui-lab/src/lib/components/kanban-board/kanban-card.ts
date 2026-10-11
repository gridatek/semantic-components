import { Directive, computed, inject, input, output } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_KANBAN_BOARD } from './kanban-board';
import type { ScKanbanCardData } from './kanban-types';

@Directive({
  selector: '[scKanbanCard]',
  exportAs: 'scKanbanCard',
  host: {
    'data-slot': 'kanban-card',
    '[class]': 'class()',
    '[attr.draggable]': '!board.disabled()',
    '(dragstart)': 'onDragStart($event)',
    '(dragend)': 'onDragEnd($event)',
    role: 'listitem',
    '[attr.aria-label]': 'card().title',
    '[attr.data-card-id]': 'card().id',
    tabindex: '0',
    '(keydown)': 'onKeyDown($event)',
  },
})
export class ScKanbanCard {
  readonly board = inject(SC_KANBAN_BOARD);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn(
      'group relative p-3 bg-card border rounded-lg shadow-sm cursor-grab active:cursor-grabbing block',
      'hover:border-primary/50 hover:shadow-md transition-all',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.board.disabled() && 'opacity-50 cursor-not-allowed',
      this.classInput(),
    ),
  );

  readonly card = input.required<ScKanbanCardData>();
  readonly cardClick = output<ScKanbanCardData>();

  readonly priorityClass = computed(() => {
    const priority = this.card().priority;
    const base = 'text-xs font-medium';

    switch (priority) {
      case 'urgent':
        return cn(base, 'text-red-700 dark:text-red-400');
      case 'high':
        return cn(base, 'text-orange-700 dark:text-orange-400');
      case 'medium':
        return cn(base, 'text-yellow-800 dark:text-yellow-400');
      case 'low':
        return cn(base, 'text-green-700 dark:text-green-400');
      default:
        return base;
    }
  });

  readonly dueDateClass = computed(() => {
    const dueDate = this.card().dueDate;
    if (!dueDate) return 'text-muted-foreground';

    const now = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil(
      (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays < 0) {
      return 'text-red-700 dark:text-red-400';
    } else if (diffDays <= 2) {
      return 'text-orange-700 dark:text-orange-400';
    }
    return 'text-muted-foreground';
  });

  /** Priority as text ("Urgent", "High"…), readable by everyone. */
  priorityLabel(): string {
    const priority = this.card().priority;
    return priority ? priority[0].toUpperCase() + priority.slice(1) : '';
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const month = d.toLocaleString('default', { month: 'short' });
    const day = d.getDate();
    return `${month} ${day}`;
  }

  onDragStart(event: DragEvent): void {
    if (this.board.disabled()) {
      event.preventDefault();
      return;
    }

    event.dataTransfer?.setData(
      'application/json',
      JSON.stringify(this.card()),
    );
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';

    const target = event.target as HTMLElement;
    requestAnimationFrame(() => {
      target.classList.add('opacity-50');
    });
  }

  onDragEnd(event: DragEvent): void {
    const target = event.target as HTMLElement;
    target.classList.remove('opacity-50');
  }

  onKeyDown(event: KeyboardEvent): void {
    // Keys from controls inside the card (e.g. its delete button) are theirs.
    if (event.target !== event.currentTarget) return;

    if (event.altKey) {
      const direction = (
        {
          ArrowLeft: 'left',
          ArrowRight: 'right',
          ArrowUp: 'up',
          ArrowDown: 'down',
        } as const
      )[event.key];
      if (direction) {
        event.preventDefault();
        this.board.moveCardByKeyboard(this.card(), direction);
      }
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.cardClick.emit(this.card());
    }
  }
}
