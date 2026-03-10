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

@Component({
  selector: 'app-handle-sortable-list-demo',
  imports: [CdkDropList, CdkDrag, CdkDragHandle],
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
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-muted-foreground shrink-0 cursor-grab"
            >
              <circle cx="9" cy="5" r="1" />
              <circle cx="9" cy="12" r="1" />
              <circle cx="9" cy="19" r="1" />
              <circle cx="15" cy="5" r="1" />
              <circle cx="15" cy="12" r="1" />
              <circle cx="15" cy="19" r="1" />
            </svg>
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
