import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { SC_SORTABLE_LIST, ScSortableList } from './sortable-list';

@Component({
  selector: '[sc-sortable-overlay]',
  template: `
    @if (list.isDragging()) {
      <div
        class="fixed inset-0 z-40 cursor-grabbing"
        (dragover)="onDragOver($event)"
      ></div>
    }
  `,
  host: {
    'data-slot': 'sortable-overlay',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSortableOverlay {
  readonly list = inject<ScSortableList<unknown>>(SC_SORTABLE_LIST);

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
}
