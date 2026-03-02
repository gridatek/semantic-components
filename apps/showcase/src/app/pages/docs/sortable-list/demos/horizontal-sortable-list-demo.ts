import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScSortableItem,
  ScSortableList,
  ScSortableOverlay,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-horizontal-sortable-list-demo',
  imports: [ScSortableList, ScSortableItem, ScSortableOverlay],
  template: `
    <div class="max-w-lg">
      <div
        scSortableList
        [(items)]="items"
        orientation="horizontal"
        class="flex-wrap gap-3"
      >
        <div scSortableOverlay></div>
        @for (item of items(); track item; let i = $index) {
          <div
            scSortableItem
            [index]="i"
            [item]="item"
            class="bg-background flex size-16 items-center justify-center rounded-md border text-sm font-medium"
          >
            {{ item }}
          </div>
        }
      </div>
      <p class="text-muted-foreground mt-2 text-sm">
        Use Left/Right arrow keys to reorder.
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalSortableListDemo {
  readonly items = signal(['A', 'B', 'C', 'D', 'E', 'F']);
}
