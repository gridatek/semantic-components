import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  InjectionToken,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_SORTABLE_LIST, ScSortableList } from './sortable-list';

// Token for sortable item context
export const SC_SORTABLE_ITEM = new InjectionToken<ScSortableItem<unknown>>(
  'SC_SORTABLE_ITEM',
);

@Component({
  selector: '[sc-sortable-item]',
  template: `
    <ng-content />
  `,
  providers: [{ provide: SC_SORTABLE_ITEM, useExisting: ScSortableItem }],
  host: {
    'data-slot': 'sortable-item',
    '[class]': 'class()',
    '[attr.draggable]': 'canDrag()',
    '[attr.data-dragging]': 'isBeingDragged() || null',
    '[attr.data-drag-over]': 'isDragOver() || null',
    '[attr.tabindex]': 'list.disabled() ? -1 : 0',
    '(dragstart)': 'onDragStart($event)',
    '(dragend)': 'onDragEnd($event)',
    '(dragover)': 'onDragOver($event)',
    '(dragenter)': 'onDragEnter($event)',
    '(dragleave)': 'onDragLeave($event)',
    '(drop)': 'onDrop($event)',
    '(keydown)': 'onKeydown($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSortableItem<T> {
  readonly list = inject<ScSortableList<T>>(SC_SORTABLE_LIST);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly index = input.required<number>();
  readonly item = input.required<T>();

  protected readonly class = computed(() =>
    cn(
      'relative select-none',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md',
      'data-[dragging]:opacity-50 data-[dragging]:z-50',
      'data-[drag-over]:ring-2 data-[drag-over]:ring-primary',
      'transition-[box-shadow,opacity]',
      this.classInput(),
    ),
  );

  protected readonly canDrag = computed(() => {
    if (this.list.disabled()) return false;
    return !this.list.handleOnly();
  });

  protected readonly isBeingDragged = computed(
    () => this.list.draggedIndex() === this.index(),
  );

  protected readonly isDragOver = computed(() => {
    const dragOverIdx = this.list.dragOverIndex();
    const draggedIdx = this.list.draggedIndex();
    return dragOverIdx === this.index() && draggedIdx !== this.index();
  });

  // Allow handle to trigger drag
  startDragFromHandle(): void {
    this.list.startDrag(this.index());
  }

  onDragStart(event: DragEvent): void {
    if (this.list.handleOnly()) {
      // If handleOnly, prevent default drag unless triggered from handle
      event.preventDefault();
      return;
    }
    this.list.startDrag(this.index());
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', String(this.index()));
    }
  }

  onDragEnd(event: DragEvent): void {
    event.preventDefault();
    this.list.endDrag();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  onDragEnter(event: DragEvent): void {
    event.preventDefault();
    this.list.setDragOver(this.index());
  }

  onDragLeave(event: DragEvent): void {
    // Only clear if leaving to outside
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      // Check if related target is not a child
      const related = event.relatedTarget as HTMLElement;
      if (!this.elementRef.nativeElement.contains(related)) {
        this.list.setDragOver(null);
      }
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.list.endDrag();
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.list.disabled()) return;

    const isVertical = this.list.orientation() === 'vertical';

    if (
      (isVertical && event.key === 'ArrowUp') ||
      (!isVertical && event.key === 'ArrowLeft')
    ) {
      event.preventDefault();
      this.list.moveUp(this.index());
      this.focusSelf();
    } else if (
      (isVertical && event.key === 'ArrowDown') ||
      (!isVertical && event.key === 'ArrowRight')
    ) {
      event.preventDefault();
      this.list.moveDown(this.index());
      this.focusSelf();
    }
  }

  private focusSelf(): void {
    // Re-focus after move (item might have moved in DOM)
    requestAnimationFrame(() => {
      this.elementRef.nativeElement.focus();
    });
  }
}
