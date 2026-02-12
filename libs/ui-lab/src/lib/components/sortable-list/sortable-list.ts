import {
  computed,
  Directive,
  InjectionToken,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { cn } from '../../utils';

export interface SortableEvent<T> {
  item: T;
  previousIndex: number;
  currentIndex: number;
}

// Token for sortable list context
export const SC_SORTABLE_LIST = new InjectionToken<ScSortableList<unknown>>(
  'SC_SORTABLE_LIST',
);

@Directive({
  selector: '[sc-sortable-list]',
  exportAs: 'scSortableList',
  providers: [{ provide: SC_SORTABLE_LIST, useExisting: ScSortableList }],
  host: {
    'data-slot': 'sortable-list',
    '[class]': 'class()',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-dragging]': 'isDragging() || null',
  },
})
export class ScSortableList<T> {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly items = model<T[]>([]);
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
  readonly disabled = input<boolean>(false);
  readonly handleOnly = input<boolean>(false);

  readonly sortChange = output<SortableEvent<T>>();
  readonly sortStart = output<{ item: T; index: number }>();
  readonly sortEnd = output<SortableEvent<T>>();

  readonly isDragging = signal(false);
  readonly draggedIndex = signal<number | null>(null);
  readonly dragOverIndex = signal<number | null>(null);

  protected readonly class = computed(() =>
    cn(
      'relative',
      this.orientation() === 'vertical' && 'flex flex-col',
      this.orientation() === 'horizontal' && 'flex flex-row',
      this.classInput(),
    ),
  );

  private registeredItems: { index: number; element: HTMLElement }[] = [];

  registerItem(index: number, element: HTMLElement): void {
    this.registeredItems.push({ index, element });
  }

  unregisterItem(index: number): void {
    this.registeredItems = this.registeredItems.filter(
      (item) => item.index !== index,
    );
  }

  startDrag(index: number): void {
    if (this.disabled()) return;
    this.isDragging.set(true);
    this.draggedIndex.set(index);
    this.sortStart.emit({ item: this.items()[index], index });
  }

  endDrag(): void {
    const draggedIdx = this.draggedIndex();
    const overIdx = this.dragOverIndex();

    if (draggedIdx !== null && overIdx !== null && draggedIdx !== overIdx) {
      this.moveItem(draggedIdx, overIdx);
    }

    this.isDragging.set(false);
    this.draggedIndex.set(null);
    this.dragOverIndex.set(null);
  }

  setDragOver(index: number | null): void {
    if (this.isDragging()) {
      this.dragOverIndex.set(index);
    }
  }

  moveItem(fromIndex: number, toIndex: number): void {
    if (this.disabled()) return;

    const items = [...this.items()];
    const [removed] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, removed);

    this.items.set(items);

    const event: SortableEvent<T> = {
      item: removed,
      previousIndex: fromIndex,
      currentIndex: toIndex,
    };

    this.sortChange.emit(event);
    this.sortEnd.emit(event);
  }

  moveUp(index: number): void {
    if (index > 0) {
      this.moveItem(index, index - 1);
    }
  }

  moveDown(index: number): void {
    if (index < this.items().length - 1) {
      this.moveItem(index, index + 1);
    }
  }
}
