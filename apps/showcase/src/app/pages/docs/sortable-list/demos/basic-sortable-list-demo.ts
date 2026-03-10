import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-basic-sortable-list-demo',
  imports: [CdkDropList, CdkDrag, JsonPipe],
  template: `
    <div class="space-y-4">
      <div
        cdkDropList
        [cdkDropListData]="items()"
        (cdkDropListDropped)="drop($event)"
        class="max-w-md space-y-2"
      >
        @for (item of items(); track item) {
          <div
            cdkDrag
            class="bg-background flex cursor-move items-center gap-3 rounded-md border p-3"
          >
            <span class="text-sm">{{ item }}</span>
          </div>
        }
      </div>
      <div class="bg-muted/50 max-w-md rounded-md border p-4">
        <pre class="text-sm">{{ items() | json }}</pre>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSortableListDemo {
  readonly items = signal(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']);

  drop(event: CdkDragDrop<string[]>): void {
    this.items.update((items) => {
      const updated = [...items];
      moveItemInArray(updated, event.previousIndex, event.currentIndex);
      return updated;
    });
  }
}
