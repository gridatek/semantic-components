import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SiGripVerticalIcon } from '@semantic-icons/lucide-icons';
import { SC_SORTABLE_ITEM, ScSortableItem } from './sortable-item';
import { SC_SORTABLE_LIST, ScSortableList } from './sortable-list';

@Component({
  selector: '[scSortableHandle]',
  imports: [SiGripVerticalIcon],
  template: `
    <ng-content>
      <svg siGripVerticalIcon class="size-4"></svg>
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
