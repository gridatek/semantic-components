import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import type { KanbanCard } from './kanban-types';

@Component({
  selector: 'sc-kanban-card',
  template: `
    <div
      [class]="cardClass()"
      [attr.draggable]="!disabled()"
      (dragstart)="onDragStart($event)"
      (dragend)="onDragEnd($event)"
      role="listitem"
      [attr.aria-label]="card().title"
      tabindex="0"
      (keydown)="onKeyDown($event)"
    >
      <!-- Labels -->
      @if (card().labels?.length) {
        <div class="flex flex-wrap gap-1 mb-2">
          @for (label of card().labels; track label.id) {
            <span
              class="px-1.5 py-0.5 text-xs font-medium rounded"
              [style.background-color]="label.color + '20'"
              [style.color]="label.color"
            >
              {{ label.text }}
            </span>
          }
        </div>
      }

      <!-- Title -->
      <h4 class="font-medium text-sm text-foreground leading-tight">
        {{ card().title }}
      </h4>

      <!-- Description -->
      @if (card().description) {
        <p class="mt-1 text-xs text-muted-foreground line-clamp-2">
          {{ card().description }}
        </p>
      }

      <!-- Footer -->
      @if (card().assignee || card().dueDate || card().priority) {
        <div class="flex items-center justify-between mt-3 pt-2 border-t">
          <div class="flex items-center gap-2">
            <!-- Priority -->
            @if (card().priority) {
              <span [class]="priorityClass()">
                {{ priorityIcon() }}
              </span>
            }

            <!-- Due date -->
            @if (card().dueDate) {
              <span class="text-xs" [class]="dueDateClass()">
                {{ formatDate(card().dueDate!) }}
              </span>
            }
          </div>

          <!-- Assignee -->
          @if (card().assignee) {
            <div
              class="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center"
              [attr.title]="card().assignee!.name"
            >
              @if (card().assignee!.avatar) {
                <img
                  [src]="card().assignee!.avatar"
                  [alt]="card().assignee!.name"
                  class="w-full h-full rounded-full object-cover"
                />
              } @else {
                {{
                  card().assignee!.initials ||
                    card().assignee!.name.charAt(0).toUpperCase()
                }}
              }
            </div>
          }
        </div>
      }

      <!-- Delete button -->
      @if (showDelete()) {
        <button
          type="button"
          class="absolute top-2 right-2 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-opacity"
          (click)="onDelete($event)"
          aria-label="Delete card"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScKanbanCard {
  readonly card = input.required<KanbanCard>();
  readonly disabled = input(false);
  readonly showDelete = input(true);
  readonly class = input<string>('');

  readonly dragStart = output<DragEvent>();
  readonly dragEnd = output<DragEvent>();
  readonly delete = output<void>();
  readonly cardClick = output<KanbanCard>();

  protected readonly cardClass = computed(() =>
    cn(
      'group relative p-3 bg-card border rounded-lg shadow-sm cursor-grab active:cursor-grabbing',
      'hover:border-primary/50 hover:shadow-md transition-all',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      this.disabled() && 'opacity-50 cursor-not-allowed',
      this.class(),
    ),
  );

  protected readonly priorityClass = computed(() => {
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

  protected priorityIcon(): string {
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

  protected readonly dueDateClass = computed(() => {
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

  protected formatDate(date: Date): string {
    const d = new Date(date);
    const month = d.toLocaleString('default', { month: 'short' });
    const day = d.getDate();
    return `${month} ${day}`;
  }

  protected onDragStart(event: DragEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }

    event.dataTransfer?.setData(
      'application/json',
      JSON.stringify(this.card()),
    );
    event.dataTransfer!.effectAllowed = 'move';

    // Add dragging class after a brief delay
    const target = event.target as HTMLElement;
    requestAnimationFrame(() => {
      target.classList.add('opacity-50');
    });

    this.dragStart.emit(event);
  }

  protected onDragEnd(event: DragEvent): void {
    const target = event.target as HTMLElement;
    target.classList.remove('opacity-50');
    this.dragEnd.emit(event);
  }

  protected onDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.delete.emit();
  }

  protected onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.cardClick.emit(this.card());
    }
  }
}
