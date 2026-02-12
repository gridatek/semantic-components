import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_SORTABLE_LIST, ScSortableList } from './sortable-list';
import { SC_SORTABLE_ITEM, ScSortableItem } from './sortable-item';

@Component({
  selector: '[sc-sortable-handle]',
  template: `
    <ng-content>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        class="size-4"
      >
        <circle cx="9" cy="5" r="1" />
        <circle cx="9" cy="12" r="1" />
        <circle cx="9" cy="19" r="1" />
        <circle cx="15" cy="5" r="1" />
        <circle cx="15" cy="12" r="1" />
        <circle cx="15" cy="19" r="1" />
      </svg>
    </ng-content>
  `,
  host: {
    'data-slot': 'sortable-handle',
    '[class]': 'class()',
    draggable: 'true',
    '[attr.aria-label]': '"Drag to reorder"',
    '(dragstart)': 'onDragStart($event)',
    '(mousedown)': 'onMouseDown()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSortableHandle {
  private readonly item = inject<ScSortableItem<unknown>>(SC_SORTABLE_ITEM);
  private readonly list = inject<ScSortableList<unknown>>(SC_SORTABLE_LIST);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'cursor-grab active:cursor-grabbing',
      'text-muted-foreground hover:text-foreground',
      'touch-none',
      this.classInput(),
    ),
  );

  onDragStart(event: DragEvent): void {
    event.stopPropagation();
    this.list.startDrag(this.item.index());
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', String(this.item.index()));
    }
  }

  onMouseDown(): void {
    // Prepare for potential drag
  }
}
