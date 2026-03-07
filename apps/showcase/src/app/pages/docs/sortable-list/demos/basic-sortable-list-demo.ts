import { JsonPipe } from '@angular/common';
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
  selector: 'app-basic-sortable-list-demo',
  imports: [ScSortableList, ScSortableItem, ScSortableOverlay, JsonPipe],
  template: `
    <div class="space-y-4">
      <div class="max-w-md space-y-2">
        <div scSortableList [(items)]="items" class="gap-2">
          <div scSortableOverlay></div>
          @for (item of items(); track item; let i = $index) {
            <div
              scSortableItem
              [index]="i"
              [item]="item"
              class="bg-background flex items-center gap-3 rounded-md border p-3"
            >
              <span class="text-sm">{{ item }}</span>
            </div>
          }
        </div>
        <p class="text-muted-foreground text-sm">
          Drag items to reorder. Use Arrow keys when focused.
        </p>
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
}
