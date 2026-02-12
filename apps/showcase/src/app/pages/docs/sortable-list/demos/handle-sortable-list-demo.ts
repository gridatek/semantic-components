import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSortableHandle,
  ScSortableItem,
  ScSortableList,
  ScSortableOverlay,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-handle-sortable-list-demo',
  imports: [
    ScSortableList,
    ScSortableItem,
    ScSortableHandle,
    ScSortableOverlay,
  ],
  template: `
    <div class="max-w-md">
      <div sc-sortable-list [(items)]="items" [handleOnly]="true" class="gap-2">
        <div sc-sortable-overlay></div>
        @for (item of items(); track item; let i = $index) {
          <div
            sc-sortable-item
            [index]="i"
            [item]="item"
            class="flex items-center gap-3 rounded-md border bg-background p-3"
          >
            <span sc-sortable-handle class="p-1"></span>
            <span class="text-sm">{{ item }}</span>
          </div>
        }
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HandleSortableListDemo {
  readonly items = signal([
    'Drag me by handle',
    'Reorder with grip',
    'Move up or down',
  ]);
}
