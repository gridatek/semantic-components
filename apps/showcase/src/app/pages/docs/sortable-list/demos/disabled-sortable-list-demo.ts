import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-disabled-sortable-list-demo',
  imports: [CdkDropList, CdkDrag],
  template: `
    <div class="max-w-md">
      <div
        cdkDropList
        [cdkDropListData]="items"
        [cdkDropListDisabled]="true"
        class="space-y-2"
      >
        @for (item of items; track item) {
          <div
            cdkDrag
            class="bg-muted/50 flex items-center gap-3 rounded-md border p-3 opacity-60"
          >
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
export class DisabledSortableListDemo {
  readonly items = ['Item 1', 'Item 2', 'Item 3'];
}
