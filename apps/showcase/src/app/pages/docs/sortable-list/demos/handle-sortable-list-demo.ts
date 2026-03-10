import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { SiGripVerticalIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-handle-sortable-list-demo',
  imports: [CdkDropList, CdkDrag, CdkDragHandle, SiGripVerticalIcon],
  template: `
    <div class="max-w-md">
      <div
        cdkDropList
        [cdkDropListData]="items()"
        (cdkDropListDropped)="drop($event)"
        class="space-y-2"
      >
        @for (item of items(); track item) {
          <div
            cdkDrag
            class="bg-background flex items-center gap-3 rounded-md border p-3"
          >
            <svg
              cdkDragHandle
              siGripVerticalIcon
              class="text-muted-foreground size-4 shrink-0 cursor-grab"
            ></svg>
            <span class="text-sm">{{ item }}</span>
          </div>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HandleSortableListDemo {
  readonly items = signal([
    'Drag me by handle',
    'Reorder with grip',
    'Move up or down',
  ]);

  drop(event: CdkDragDrop<string[]>): void {
    this.items.update((items) => {
      const updated = [...items];
      moveItemInArray(updated, event.previousIndex, event.currentIndex);
      return updated;
    });
  }
}
