import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SiChevronDownIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';
import { ScKanbanCard } from './kanban-card';
import type { KanbanCard, KanbanColumn, KanbanDragEvent } from './kanban-types';

@Component({
  selector: 'sc-kanban-column',
  imports: [ScKanbanCard, SiChevronDownIcon, SiPlusIcon],
  template: `
    <div [class]="columnClass()">
      <!-- Header -->
      <div
        class="flex items-center justify-between border-b p-3"
        [style.border-top-color]="column().color || 'transparent'"
        [style.border-top-width]="column().color ? '3px' : '0'"
      >
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="hover:bg-muted rounded p-0.5 transition-colors"
            (click)="toggleCollapse()"
            [attr.aria-expanded]="!collapsed()"
            [attr.aria-label]="
              collapsed() ? 'Expand column' : 'Collapse column'
            "
          >
            <svg
              siChevronDownIcon
              [class]="
                collapsed()
                  ? '-rotate-90 transition-transform'
                  : 'rotate-0 transition-transform'
              "
            ></svg>
          </button>
          <h3 class="text-foreground text-sm font-semibold">
            {{ column().title }}
          </h3>
          <span class="bg-muted rounded-full px-1.5 py-0.5 text-xs font-medium">
            {{ cards().length }}
            @if (column().limit) {
              /{{ column().limit }}
            }
          </span>
        </div>

        @if (showAddButton()) {
          <button
            type="button"
            class="hover:bg-muted text-muted-foreground hover:text-foreground rounded p-1 transition-colors"
            (click)="startAddingCard()"
            aria-label="Add card"
          >
            <svg siPlusIcon class="size-4"></svg>
          </button>
        }
      </div>

      <!-- Collapsed state -->
      @if (collapsed()) {
        <div class="text-muted-foreground p-3 text-center text-sm">
          {{ cards().length }} cards
        </div>
      } @else {
        <!-- Cards container -->
        <div
          class="min-h-[100px] flex-1 space-y-2 overflow-y-auto p-2"
          [class.bg-primary/5]="isDragOver()"
          [class.ring-2]="isDragOver()"
          [class.ring-primary]="isDragOver()"
          [class.ring-inset]="isDragOver()"
          (dragover)="onDragOver($event)"
          (dragleave)="onDragLeave($event)"
          (drop)="onDrop($event)"
          role="list"
          [attr.aria-label]="column().title + ' cards'"
        >
          @for (card of cards(); track card.id; let idx = $index) {
            <div
              [class.border-t-2]="dropIndex() === idx"
              [class.border-primary]="dropIndex() === idx"
              [class.pt-2]="dropIndex() === idx"
            >
              <sc-kanban-card
                [card]="card"
                [disabled]="disabled()"
                [showDelete]="showDeleteCard()"
                (dragStart)="onCardDragStart($event, card)"
                (dragEnd)="onCardDragEnd()"
                (delete)="deleteCard.emit(card)"
                (cardClick)="cardClick.emit($event)"
              />
            </div>
          }

          <!-- Drop indicator at end -->
          @if (dropIndex() === cards().length && cards().length > 0) {
            <div class="border-primary border-t-2 pt-2"></div>
          }

          <!-- Empty state -->
          @if (cards().length === 0 && !isAddingCard()) {
            <div
              class="text-muted-foreground flex h-24 items-center justify-center rounded-lg border-2 border-dashed text-sm"
            >
              Drop cards here
            </div>
          }

          <!-- Add card form -->
          @if (isAddingCard()) {
            <div class="bg-card rounded-lg border p-2 shadow-sm">
              <textarea
                #addInput
                class="focus:ring-ring w-full resize-none rounded border p-2 text-sm focus:ring-2 focus:outline-none"
                rows="2"
                placeholder="Enter card title..."
                (keydown.enter)="submitNewCard($event)"
                (keydown.escape)="cancelAddingCard()"
                (blur)="onInputBlur()"
              ></textarea>
              <div class="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  class="bg-primary text-primary-foreground hover:bg-primary/90 rounded px-3 py-1.5 text-xs font-medium transition-colors"
                  (mousedown)="submitNewCardFromButton()"
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

        <!-- Add card button at bottom -->
        @if (!isAddingCard() && showAddButton()) {
          <button
            type="button"
            class="text-muted-foreground hover:text-foreground hover:bg-muted/50 flex w-full items-center justify-center gap-1 border-t p-2 text-sm transition-colors"
            (click)="startAddingCard()"
          >
            <svg siPlusIcon class="size-3.5"></svg>
            Add card
          </button>
        }

        <!-- Limit warning -->
        @if (isOverLimit()) {
          <div
            class="border-t bg-orange-500/10 px-3 py-1.5 text-xs text-orange-600 dark:text-orange-400"
          >
            Column limit exceeded ({{ cards().length }}/{{ column().limit }})
          </div>
        }
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScKanbanColumn {
  readonly column = input.required<KanbanColumn>();
  readonly cards = input<KanbanCard[]>([]);
  readonly disabled = input(false);
  readonly showAddButton = input(true);
  readonly showDeleteCard = input(true);
  readonly class = input<string>('');

  readonly cardMoved = output<KanbanDragEvent>();
  readonly addCard = output<string>();
  readonly deleteCard = output<KanbanCard>();
  readonly cardClick = output<KanbanCard>();
  readonly collapseChange = output<boolean>();

  protected readonly collapsed = signal(false);
  protected readonly isDragOver = signal(false);
  protected readonly dropIndex = signal<number | null>(null);
  protected readonly isAddingCard = signal(false);
  protected readonly draggedCard = signal<KanbanCard | null>(null);

  protected readonly columnClass = computed(() =>
    cn(
      'flex flex-col bg-muted/30 border rounded-lg min-w-[280px] max-w-[320px] max-h-full',
      this.class(),
    ),
  );

  protected readonly isOverLimit = computed(() => {
    const limit = this.column().limit;
    return limit !== undefined && this.cards().length > limit;
  });

  protected toggleCollapse(): void {
    const newValue = !this.collapsed();
    this.collapsed.set(newValue);
    this.collapseChange.emit(newValue);
  }

  protected onDragOver(event: DragEvent): void {
    if (this.disabled()) return;

    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
    this.isDragOver.set(true);

    // Calculate drop index based on mouse position
    const container = event.currentTarget as HTMLElement;
    const cards = container.querySelectorAll('sc-kanban-card');
    const mouseY = event.clientY;

    let newDropIndex = this.cards().length;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardMiddle = rect.top + rect.height / 2;

      if (mouseY < cardMiddle) {
        newDropIndex = Math.min(newDropIndex, index);
      }
    });

    this.dropIndex.set(newDropIndex);
  }

  protected onDragLeave(event: DragEvent): void {
    // Only handle if leaving the container, not entering a child
    const relatedTarget = event.relatedTarget as HTMLElement;
    const container = event.currentTarget as HTMLElement;

    if (!container.contains(relatedTarget)) {
      this.isDragOver.set(false);
      this.dropIndex.set(null);
    }
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);

    const data = event.dataTransfer?.getData('application/json');
    if (!data) return;

    try {
      const card = JSON.parse(data) as KanbanCard;
      const sourceColumnId = card.columnId;
      const targetColumnId = this.column().id;
      const sourceIndex = card.order;
      const targetIndex = this.dropIndex() ?? this.cards().length;

      this.cardMoved.emit({
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

  protected onCardDragStart(_event: DragEvent, card: KanbanCard): void {
    this.draggedCard.set(card);
  }

  protected onCardDragEnd(): void {
    this.draggedCard.set(null);
    this.isDragOver.set(false);
    this.dropIndex.set(null);
  }

  protected startAddingCard(): void {
    this.isAddingCard.set(true);
    // Focus the input after it renders
    requestAnimationFrame(() => {
      const input = document.querySelector(
        'sc-kanban-column textarea',
      ) as HTMLTextAreaElement;
      input?.focus();
    });
  }

  protected cancelAddingCard(): void {
    this.isAddingCard.set(false);
  }

  protected submitNewCard(event: Event): void {
    event.preventDefault();
    const textarea = event.target as HTMLTextAreaElement;
    const title = textarea.value.trim();

    if (title) {
      this.addCard.emit(title);
      textarea.value = '';
    }

    this.isAddingCard.set(false);
  }

  protected submitNewCardFromButton(): void {
    const textarea = document.querySelector(
      'sc-kanban-column textarea',
    ) as HTMLTextAreaElement;
    const title = textarea?.value.trim();

    if (title) {
      this.addCard.emit(title);
    }

    this.isAddingCard.set(false);
  }

  protected onInputBlur(): void {
    // Small delay to allow button click to register
    setTimeout(() => {
      if (this.isAddingCard()) {
        this.isAddingCard.set(false);
      }
    }, 150);
  }
}
