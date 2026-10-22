import {
  Directive,
  ElementRef,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScKanbanBoardNext } from './kanban-board-next';
import { ScKanbanColumnNext } from './kanban-column-next';

/**
 * A card — `[scKanbanCardNext]="item"` on your `li`: a Tab stop, dragged by
 * the pointer (a press on its buttons and links is theirs), lifted by Space
 * or Enter. `data-dragging`, `data-lifted` while moved.
 */
@Directive({
  selector: '[scKanbanCardNext]',
  exportAs: 'scKanbanCardNext',
  host: {
    'data-slot': 'kanban-card',
    '[attr.tabindex]': 'board.disabled() ? null : 0',
    '[attr.data-dragging]': '(board.dragging() && active()) || null',
    '[attr.data-lifted]': '(board.lifted() && active()) || null',
    '[class]': 'class()',
    '(pointerdown)': 'board.cardPointerDown($event, item(), element)',
    '(keydown)': 'board.cardKeydown($event, item(), element)',
    '(dragstart)': '$event.preventDefault()',
  },
})
export class ScKanbanCardNext<T = unknown> {
  protected readonly board = inject<ScKanbanBoardNext<T>>(
    forwardRef(() => ScKanbanBoardNext),
  );
  /** The column it is in. */
  readonly column = inject(ScKanbanColumnNext, { optional: true });
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly item = input.required<T>({ alias: 'scKanbanCardNext' });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly active = computed(
    () => this.board.active() === this.item(),
  );

  protected readonly class = computed(() =>
    cn(
      'bg-card text-card-foreground ring-foreground/10 relative cursor-grab touch-manipulation rounded-lg p-3 text-sm shadow-xs ring-1 outline-none select-none',
      'focus-visible:ring-ring/50 focus-visible:ring-3',
      'data-dragging:z-10 data-dragging:cursor-grabbing data-dragging:shadow-lg',
      'data-lifted:ring-primary data-lifted:ring-2 data-lifted:shadow-md',
      this.board.disabled() && 'cursor-default',
      this.classInput(),
    ),
  );

  focus(): void {
    this.element.focus();
  }
}
