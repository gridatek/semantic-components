import {
  Directive,
  ElementRef,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScKanbanBoard } from './kanban-board';

/**
 * A column's cards — on your list (`ul`), named by you: where cards are
 * dropped, across its whole width. `data-over` while a card is dragged over.
 */
@Directive({
  selector: '[scKanbanColumn]',
  exportAs: 'scKanbanColumn',
  host: {
    'data-slot': 'kanban-column',
    '[attr.data-over]': 'isOver() || null',
    '[class]': 'class()',
  },
})
export class ScKanbanColumn {
  private readonly board = inject(forwardRef(() => ScKanbanBoard));
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  /** Its id: a key of the board's value. */
  readonly id = input.required<string>({ alias: 'scKanbanColumn' });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly isOver = computed(() => this.board.over() === this.id());

  protected readonly class = computed(() =>
    cn(
      'flex min-h-24 flex-col gap-2 overflow-y-auto rounded-lg p-1 transition-colors',
      'data-over:bg-accent/60',
      this.classInput(),
    ),
  );
}
