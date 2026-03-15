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
import { SiGripVerticalIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-sortable-list-demo',
  imports: [CdkDropList, CdkDrag, JsonPipe, SiGripVerticalIcon],
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
            class="bg-background flex cursor-grab items-center gap-3 rounded-md border p-3 active:cursor-grabbing"
          >
            <svg
              siGripVerticalIcon
              class="text-muted-foreground size-4 shrink-0"
            ></svg>
            <span class="text-sm">{{ item }}</span>
          </div>
        }
      </div>
      <div class="bg-muted/50 max-w-md rounded-md border p-4">
        <pre class="text-sm">{{ items() | json }}</pre>
      </div>
    </div>
  `,
  styles: `
    .cdk-drag-preview {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      border-radius: 0.375rem;
      border: 1px solid var(--border);
      padding: 0.75rem;
      background: var(--background);
      box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
    .cdk-drag-placeholder {
      border-radius: 0.375rem;
      border: 1px dashed var(--border);
      opacity: 0.5;
    }
    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
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
