import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_KANBAN_BOARD } from './kanban-board';
import type { KanbanCard, KanbanColumn } from './kanban-types';

@Directive({
  selector: '[scKanbanColumn]',
  exportAs: 'scKanbanColumn',
  host: {
    'data-slot': 'kanban-column',
    '[class]': 'class()',
    '(dragover)': 'onDragOver($event)',
    '(dragleave)': 'onDragLeave($event)',
    '(drop)': 'onDrop($event)',
  },
})
export class ScKanbanColumn {
  readonly board = inject(SC_KANBAN_BOARD);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn(
      'flex flex-col bg-muted/30 border rounded-lg min-w-[280px] max-w-[320px] max-h-full',
      this.classInput(),
    ),
  );

  readonly column = input.required<KanbanColumn>();

  readonly columnCards = computed(() =>
    this.board.getCardsForColumn(this.column().id),
  );

  readonly collapsed = signal(false);
  readonly isDragOver = signal(false);
  readonly dropIndex = signal<number | null>(null);

  readonly isOverLimit = computed(() => {
    const limit = this.column().limit;
    return limit !== undefined && this.columnCards().length > limit;
  });

  toggleCollapse(): void {
    const newValue = !this.collapsed();
    this.collapsed.set(newValue);
    this.board.collapseColumn(this.column().id, newValue);
  }

  onDragOver(event: DragEvent): void {
    if (this.board.disabled()) return;

    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
    this.isDragOver.set(true);

    const container = event.currentTarget as HTMLElement;
    const cards = container.querySelectorAll('[data-slot="kanban-card"]');
    const mouseY = event.clientY;

    let newDropIndex = this.columnCards().length;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardMiddle = rect.top + rect.height / 2;

      if (mouseY < cardMiddle) {
        newDropIndex = Math.min(newDropIndex, index);
      }
    });

    this.dropIndex.set(newDropIndex);
  }

  onDragLeave(event: DragEvent): void {
    const relatedTarget = event.relatedTarget as HTMLElement;
    const container = event.currentTarget as HTMLElement;

    if (!container.contains(relatedTarget)) {
      this.isDragOver.set(false);
      this.dropIndex.set(null);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);

    const data = event.dataTransfer?.getData('application/json');
    if (!data) return;

    try {
      const card = JSON.parse(data) as KanbanCard;
      const sourceColumnId = card.columnId;
      const targetColumnId = this.column().id;
      const sourceIndex = card.order;
      const targetIndex = this.dropIndex() ?? this.columnCards().length;

      this.board.moveCard({
        card,
        sourceColumnId,
        targetColumnId,
        sourceIndex,
        targetIndex,
      });
    } catch {
      // Invalid JSON, ignore
    }

    this.dropIndex.set(null);
  }
}
