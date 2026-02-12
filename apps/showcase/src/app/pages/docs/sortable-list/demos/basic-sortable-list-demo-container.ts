import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicSortableListDemo } from './basic-sortable-list-demo';

@Component({
  selector: 'app-basic-sortable-list-demo-container',
  imports: [DemoContainer, BasicSortableListDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-sortable-list-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSortableListDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  ScSortableItem,
  ScSortableList,
  ScSortableOverlay,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-sortable-list-demo',
  imports: [ScSortableList, ScSortableItem, ScSortableOverlay, JsonPipe],
  template: \`
    <div class="space-y-4">
      <div class="max-w-md space-y-2">
        <div sc-sortable-list [(items)]="items" class="gap-2">
          <div sc-sortable-overlay></div>
          @for (item of items(); track item; let i = $index) {
            <div
              sc-sortable-item
              [index]="i"
              [item]="item"
              class="flex items-center gap-3 rounded-md border bg-background p-3"
            >
              <span class="text-sm">{{ item }}</span>
            </div>
          }
        </div>
        <p class="text-sm text-muted-foreground">
          Drag items to reorder. Use Arrow keys when focused.
        </p>
      </div>
      <div class="rounded-md border p-4 bg-muted/50 max-w-md">
        <pre class="text-sm">{{ items() | json }}</pre>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSortableListDemo {
  readonly items = signal(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']);
}`;
}
