import { Directive, computed, inject, input, output } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_KANBAN_BOARD } from './kanban-board';
import type { KanbanCard } from './kanban-types';

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
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      this.board.disabled() && 'opacity-50 cursor-not-allowed',
      this.classInput(),
    ),
  );

  readonly card = input.required<KanbanCard>();
  readonly cardClick = output<KanbanCard>();

  readonly priorityClass = computed(() => {
    const priority = this.card().priority;
    const base = 'text-xs font-medium';

    switch (priority) {
      case 'urgent':
        return cn(base, 'text-red-600 dark:text-red-400');
      case 'high':
        return cn(base, 'text-orange-600 dark:text-orange-400');
      case 'medium':
        return cn(base, 'text-yellow-600 dark:text-yellow-400');
      case 'low':
        return cn(base, 'text-green-600 dark:text-green-400');
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
      return 'text-red-600 dark:text-red-400';
    } else if (diffDays <= 2) {
      return 'text-orange-600 dark:text-orange-400';
    }
    return 'text-muted-foreground';
  });

  priorityIcon(): string {
    const priority = this.card().priority;
    switch (priority) {
      case 'urgent':
        return '!!!';
      case 'high':
        return '!!';
      case 'medium':
        return '!';
      case 'low':
        return '-';
      default:
        return '';
    }
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
    event.dataTransfer!.effectAllowed = 'move';

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
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.cardClick.emit(this.card());
    }
  }
}
