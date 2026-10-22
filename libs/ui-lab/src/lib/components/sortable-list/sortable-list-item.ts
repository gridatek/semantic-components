import {
  Directive,
  ElementRef,
  computed,
  contentChild,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScSortableList } from './sortable-list';
import { ScSortableListHandle } from './sortable-list-handle';

/**
 * An item — `[scSortableListItem]="item"`: a Tab stop, dragged by the
 * pointer (by its handle, if it has one; a press on its buttons and links is
 * theirs), lifted by Space or Enter. `data-dragging`, `data-lifted`.
 */
@Directive({
  selector: '[scSortableListItem]',
  exportAs: 'scSortableListItem',
  host: {
    'data-slot': 'sortable-list-item',
    '[attr.tabindex]': 'list.disabled() ? null : 0',
    '[attr.data-dragging]': '(list.dragging() && active()) || null',
    '[attr.data-lifted]': '(list.lifted() && active()) || null',
    '[attr.data-disabled]': 'list.disabled() || null',
    '[class]': 'class()',
    '(pointerdown)': 'onPointerDown($event)',
    '(keydown)': 'list.itemKeydown($event, item(), element)',
    '(dragstart)': '$event.preventDefault()',
  },
})
export class ScSortableListItem<T = unknown> {
  protected readonly list = inject<ScSortableList<T>>(
    forwardRef(() => ScSortableList),
  );
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly item = input.required<T>({ alias: 'scSortableListItem' });
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly handle = contentChild(ScSortableListHandle, {
    descendants: true,
  });

  protected readonly active = computed(
    () => this.list.active() === this.item(),
  );

  protected readonly class = computed(() =>
    cn(
      'bg-card text-card-foreground ring-foreground/10 relative rounded-lg text-sm ring-1 outline-none select-none',
      'focus-visible:ring-ring/50 focus-visible:ring-3',
      !this.handle() &&
        !this.list.disabled() &&
        'cursor-grab touch-manipulation',
      'data-dragging:z-10 data-dragging:cursor-grabbing data-dragging:shadow-lg',
      'data-lifted:ring-primary data-lifted:ring-2 data-lifted:shadow-md',
      'data-disabled:opacity-60',
      this.classInput(),
    ),
  );

  focus(): void {
    this.element.focus();
  }

  protected onPointerDown(event: PointerEvent): void {
    // With a handle, only the handle drags.
    const handle = this.handle()?.element;
    if (handle && !handle.contains(event.target as Node)) return;
    this.list.itemPointerDown(event, this.item(), this.element);
  }
}
